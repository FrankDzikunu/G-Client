const Learner = require("../models/Learner");
const Course = require("../models/Course");

// Existing function: Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    // Calculate total revenue from paid learners
    const totalRevenue = await Learner.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]);

    // If no paid learners, default totalRevenue to 0
    const totalRevenueValue = totalRevenue[0]?.total || 0;

    const totalLearners = await Learner.countDocuments();
    const totalInvoices = await Learner.countDocuments({ paymentStatus: "Paid" }); // Calculate total invoices (paid learners)

    // Fetch recent invoices for paid learners
    const recentInvoices = await Learner.find({ paymentStatus: "Paid" })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("course", "name") // Populate course name
      .select("name image amountPaid paymentStatus course");

    // Fetch learners with pending payments
    const pendingPayments = await Learner.find({ paymentStatus: { $ne: "Paid" } })
      .select("name email amountDue paymentStatus");

    res.json({
      totalRevenue: totalRevenueValue, // Use the default value
      totalLearners,
      totalInvoices, // Return totalInvoices instead of totalCourses
      recentInvoices: recentInvoices.map(inv => ({
        name: inv.name,
        image: inv.image || "/default-avatar.png",
        courseName: inv.course?.name || "Unknown",
        amountPaid: inv.amountPaid,
      })),
      pendingPayments,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// New function: Get Recent Revenue (last 7 days, aggregated by day)
const getRecentRevenue = async (req, res) => {
  try {
    const revenue = await Learner.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          total: { $sum: "$amountPaid" },
        },
      },
      { $sort: { _id: -1 } }, // sort by date DESC (latest first)
      { $limit: 7 }, // only last 7 revenue days
      { $sort: { _id: 1 } }, // sort ASC for charts
    ]);

    res.json(revenue);
  } catch (error) {
    console.error("Revenue Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getDashboardStats, getRecentRevenue };