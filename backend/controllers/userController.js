const User = require("../models/User");
const generateToken = require("../utils/generateToken.js");

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase(); // Ensure consistency

  console.log("Login attempt for email:", normalizedEmail);
  console.log("Entered password:", password);

  try {
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log("User not found in database.");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log the stored hashed password for debugging
    console.log("Stored hashed password:", user.password);

    // Compare passwords
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
      const token = generateToken(user._id);
      return res.status(200).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        token, // Include token for the frontend
      });
    } else {
      console.log("Password mismatch for user:", normalizedEmail);
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({ _id: user._id, name: user.username, email: user.email, role: user.role });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};

module.exports = { loginUser, getUserProfile, logoutUser, getAllUsers, getUserById, updateUser, deleteUser };
