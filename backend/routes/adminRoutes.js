const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../utils/cloudinary"); // Import Cloudinary configuration
const { getDashboardStats, getRecentRevenue, getLatestInvoices, updateAdminProfile, updateProfilePicture, getAdminProfile, registerAdmin, authAdmin, updatePassword } = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

// Configure Multer to upload directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Gclient-images", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed image formats
  },
});

const upload = multer({ storage });

// Routes
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

// Upload image route: Handles image upload to Cloudinary
router.put("/upload-image", authMiddleware, adminMiddleware, upload.single("profileImage"), updateProfilePicture);

module.exports = router;
