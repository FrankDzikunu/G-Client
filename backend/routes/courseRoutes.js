const express = require("express");
const { getCourses, createCourse, getCourse, updateCourse, deleteCourse } = require("../controllers/courseController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCourses); // Get all courses
router.post("/", authMiddleware, createCourse); // Add a new course
router.get("/:id", getCourse); // Get a single course
router.put("/:id", authMiddleware, updateCourse); // Update course
router.delete("/:id", authMiddleware, deleteCourse); // Delete course

module.exports = router;
