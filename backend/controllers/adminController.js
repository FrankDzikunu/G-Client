const Invoice = require("../models/Invoice");
const Learner = require("../models/Learner");
const Course = require("../models/Course");

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const totalRevenue = await Invoice.aggregate([{ $group: { _id: null, total: { $sum: "$amountPaid" } } }]);
    const totalLearners = await Learner.countDocuments();
    const totalCourses = await Course.countDocuments();
    const pendingPayments = await Invoice.countDocuments({ status: "pending" });

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalLearners,
      totalCourses,
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
    const latestInvoices = await Invoice.find().sort({ createdAt: -1 }).limit(5).populate("learner").populate("course");
    res.json(latestInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentRevenue,
  getLatestInvoices,
};
