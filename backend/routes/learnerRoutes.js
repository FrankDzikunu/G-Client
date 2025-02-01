const express = require("express");
const { getLearners, createLearner, getLearner, updateLearner, deleteLearner } = require("../controllers/learnerController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getLearners); // Get all learners
router.post("/", authMiddleware, createLearner); // Register a new learner
router.get("/:id", authMiddleware, getLearner); // Get a single learner
router.put("/:id", authMiddleware, updateLearner); // Update learner details
router.delete("/:id", authMiddleware, deleteLearner); // Delete learner

module.exports = router;
