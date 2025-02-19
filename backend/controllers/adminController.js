const Invoice = require("../models/Invoice");
const Learner = require("../models/Learner");
const Course = require("../models/Course");
const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    // Aggregate total revenue from all invoices
    const totalRevenueAgg = await Invoice.aggregate([
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // Calculate pending revenue: compute (learner.amount - amountPaid) and sum these differences. 
    const pendingRevenueAgg = await Invoice.aggregate([
      { $match: { status: "pending" } },
      {
        $lookup: {
          from: "learners", 
          localField: "learner",
          foreignField: "_id",
          as: "learnerData"
        }
      },
      { $unwind: "$learnerData" },
      {
        $project: {
          pendingAmount: { $subtract: [ "$learnerData.amount", "$amountPaid" ] }
        }
      },
      {
        $group: {
          _id: null,
          totalPending: { $sum: "$pendingAmount" }
        }
      }
    ]);
    const pendingRevenue = pendingRevenueAgg[0]?.totalPending || 0;
    // Count total learners, courses, and invoices
    const totalLearners = await Learner.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalInvoices = await Invoice.countDocuments();
    const paymentMade = await Invoice.countDocuments({ status: "paid" });
    const pendingPayments = await Invoice.countDocuments({ status: "pending" });

    res.json({
      totalRevenue,
      pendingRevenue,
      totalLearners,
      totalCourses,
      totalInvoices,
      paymentMade,
      pendingPayments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get recent revenue (last 7 days)
// @route   GET /api/admin/recent-revenue
// @access  Private (Admin)
const getRecentRevenue = async (req, res) => {
  try {
    const revenue = await Invoice.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$amountPaid" } } },
      { $sort: { _id: 1 } },
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get latest invoices
// @route   GET /api/admin/latest-invoices
// @access  Private (Admin)
const getLatestInvoices = async (req, res) => {
  try {
    const latestInvoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "learner",
        select: "firstName lastName email avatar course",
        populate: { path: "course", select: "name" }
      })
      
    res.json(latestInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: `${admin.firstName} ${admin.lastName}`,
      email: admin.email,
      profileImage: admin.profileImage,
      token: generateToken(admin._id, "admin"),  // Set role explicitly to "admin"
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private (Admin Only)
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    res.json({
      _id: admin._id,
      name: `${admin.firstName} ${admin.lastName}`,
      email: admin.email,
      profileImage: admin.profileImage,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private (Admin Only)
const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);
  if (admin) {
    if (req.body.name) {
      const nameParts = req.body.name.split(" ");
      admin.firstName = nameParts[0];
      admin.lastName = nameParts.slice(1).join(" ") || "";
    }
    admin.email = req.body.email || admin.email;
    // If profileImage is provided via file upload middleware, it is already updated in updateProfilePicture route
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: `${updatedAdmin.firstName} ${updatedAdmin.lastName}`,
      email: updatedAdmin.email,
      profileImage: updatedAdmin.profileImage,
      token: generateToken(updatedAdmin._id, "admin"),
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// Update profile picture
const updateProfilePicture = async (req, res) => {
  const adminId = req.admin._id;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.profileImage = req.file.path;
    await admin.save();
    res.json({ message: "Profile picture updated", profileImage: admin.profileImage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, contact } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
    });

    await newAdmin.save();

    // Generate token
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        contact: newAdmin.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentRevenue,
  getLatestInvoices,
  authAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
  updateProfilePicture,
};
