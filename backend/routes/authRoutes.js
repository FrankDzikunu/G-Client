const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { getUserProfile, getAllUsers, deleteUser, updateUserRole } = require("../controllers/authController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const { sendOtpEmail, verifyOtp, sendForgotPasswordOtp, verifyForgotPasswordOtp, resetPassword } = require('../controllers/otpController');
const User = require("../models/User");

const router = express.Router();

// User Registration Route
router.post(
    "/register",
    [
      check("username", "Username is required").not().isEmpty(),
      check("email", "Enter a valid email").isEmail(),
      check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, email, password, role } = req.body;
  
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: "User already exists" });
        }
  
        user = new User({ username, email, password, role });
        await user.save();
  
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );

// User Login Route
router.post(
    "/login",
    [
      check("email", "Enter a valid email").isEmail(),
      check("password", "Password is required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
  
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
  
        res.json({ token, username: user.username, email: user.email, role: user.role });
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  

  // Forgot Password Route 
router.post("/forgot-password", sendForgotPasswordOtp);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
router.post("/reset-password", resetPassword);
// Get User Profile (Protected Route)
router.get("/profile", authMiddleware, getUserProfile);

// Admin Routes
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
router.put("/users/:id", authMiddleware, adminMiddleware, updateUserRole);

router.post('/send-otp', sendOtpEmail);
router.post('/verify-otp', verifyOtp);

module.exports = router;
