const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const {
  loginUser,
  getUserProfile,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword,
} = require("../controllers/userController.js");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/:id/update-password", authMiddleware, updatePassword);

// Admin-Only Route
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin, you have special privileges!" });
});

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
