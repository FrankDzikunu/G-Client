const express = require("express");
const { getDashboardStats, getRecentRevenue } = require("../controllers/dashboardController.js");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getDashboardStats);
router.get("/recent-revenue", authMiddleware, getRecentRevenue);

module.exports = router;
