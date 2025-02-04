const express = require("express");
const router = express.Router();
const { getDashboardStats, getRecentRevenue, getLatestInvoices } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

// Example admin route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});
router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats); // Dashboard overview stats
router.get("/recent-revenue", authMiddleware, adminMiddleware, getRecentRevenue); // Recent revenue data
router.get("/latest-invoices", authMiddleware, adminMiddleware, getLatestInvoices); // Latest invoices

module.exports = router;
