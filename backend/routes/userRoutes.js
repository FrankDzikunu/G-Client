const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const { loginUser, getUserProfile, logoutUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController.js");

const router = express.Router();

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

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/logout", logoutUser);
module.exports = router;
