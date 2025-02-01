const express = require("express");
const router = express.Router();
const { getDashboardStats, getRecentRevenue, getLatestInvoices } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

// Example admin route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});
router.get("/stats", authMiddleware, getDashboardStats); // Dashboard overview stats
router.get("/recent-revenue", authMiddleware, getRecentRevenue); // Recent revenue data
router.get("/latest-invoices", authMiddleware, getLatestInvoices); // Latest invoices

module.exports = router;
