const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

// Protected Route (Only Logged-in Users)
router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.id}, you are logged in!` });
  });
  
  // Admin-Only Route
  router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome Admin, you have special privileges!" });
  });

// Get all users (Admin only)
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// Get user by ID
router.get("/:id", authMiddleware, getUserById);

// Update user
router.put("/:id", authMiddleware, updateUser);

// Delete user (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
