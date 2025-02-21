const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getLearners,
  createLearner,
  getLearner,
  updateLearner,
  deleteLearner,
} = require("../controllers/learnerController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save images to 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"), false);
  }
};

const upload = require("../multerConfig");


// Use the correct endpoint for registration with avatar upload
router.post("/", authMiddleware, upload.single("avatar"), createLearner);
router.get("/", authMiddleware, adminMiddleware, getLearners);
router.get("/:id", authMiddleware, getLearner);
router.put("/:id", authMiddleware, adminMiddleware, upload.single("avatar"), updateLearner);
router.delete("/:id", authMiddleware, deleteLearner);

module.exports = router;
