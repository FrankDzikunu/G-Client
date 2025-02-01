const Learner = require("../models/Learner");
const Course = require("../models/Course");

// @desc    Get Dashboard Statistics
// @route   GET /api/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const totalRevenue = await Learner.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$amountPaid" } } },
    ]);

    const totalLearners = await Learner.countDocuments();
    const totalCourses = await Course.countDocuments();

    const recentInvoices = await Learner.find({ paymentStatus: "Paid" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email amountPaid paymentStatus createdAt");

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalLearners,
      totalCourses,
      recentInvoices,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats,};