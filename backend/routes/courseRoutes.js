const express = require("express");
const { getCourses, createCourse, getCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../multerConfig");

const router = express.Router();

router.get("/", getCourses); // Get all courses
router.post("/", upload.single("image"), authMiddleware, adminMiddleware, createCourse); // Add a new course
router.get("/:id", getCourse); // Get a single course
router.put("/:id", authMiddleware, adminMiddleware, updateCourse); // Update course
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse); // Delete course

module.exports = router;
