const express = require("express");
const router = express.Router();
const { getDashboardStats, getRecentRevenue, getLatestInvoices, updateAdminProfile, updateProfilePicture, getAdminProfile, registerAdmin, authAdmin  } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Example admin route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});
router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats); // Dashboard overview stats
router.get("/recent-revenue", authMiddleware, adminMiddleware, getRecentRevenue); // Recent revenue data
router.get("/latest-invoices", authMiddleware, adminMiddleware, getLatestInvoices); // Latest invoices

// Admin signup route
router.post("/register", registerAdmin);

router.post("/login", authAdmin);
// Get admin profile
router.get("/profile", authMiddleware, adminMiddleware, getAdminProfile);

// Update admin profile (name, email, password)
router.put("/profile", authMiddleware, adminMiddleware, upload.single("profileImage"), updateAdminProfile);

// Update profile picture
router.put("/profile-picture", authMiddleware, adminMiddleware, upload.single("profileImage"), updateProfilePicture);


module.exports = router;
