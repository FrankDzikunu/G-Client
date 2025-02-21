const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getDashboardStats, getRecentRevenue, getLatestInvoices, updateAdminProfile, updateProfilePicture, getAdminProfile, registerAdmin, authAdmin, updatePassword } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Example admin route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});
router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);
router.get("/recent-revenue", authMiddleware, adminMiddleware, getRecentRevenue);
router.get("/latest-invoices", authMiddleware, adminMiddleware, getLatestInvoices);

router.post("/register", registerAdmin);
router.post("/login", authAdmin);
router.get("/profile", authMiddleware, adminMiddleware, getAdminProfile);

// Update admin profile (name, email, password)
router.put("/profile", authMiddleware, adminMiddleware, updateAdminProfile);

// Admin-specific routes
router.put("/update-password", authMiddleware, updatePassword);
router.put("/upload-image", authMiddleware, adminMiddleware, upload.single("profileImage"), updateProfilePicture);

module.exports = router;
