const express = require("express");
const multer = require("multer");
const { getLearners, createLearner, getLearner, updateLearner, deleteLearner } = require("../controllers/learnerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save images to 'uploads' folder
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", authMiddleware, getLearners);
router.post("/", authMiddleware, upload.single("avatar"), createLearner); // Handle file upload
router.get("/:id", authMiddleware, getLearner);
router.put("/:id", authMiddleware, updateLearner);
router.delete("/:id", authMiddleware, deleteLearner);

module.exports = router;
