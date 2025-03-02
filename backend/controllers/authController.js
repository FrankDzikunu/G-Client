const User = require("../models/User");

// Get authenticated user
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); 
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Get all users (only for admin users)
const getAllUsers = async (req, res) => {
  // Ensure the requesting user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user (only for admin users)
const deleteUser = async (req, res) => {
  // Ensure the requesting user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user role (only for admin users)
const updateUserRole = async (req, res) => {
  // Ensure the requesting user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    const { isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = isAdmin;
    await user.save();

    res.json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, getAllUsers, deleteUser, updateUserRole, };
