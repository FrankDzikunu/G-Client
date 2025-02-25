const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { getUserProfile, getAllUsers, deleteUser, updateUserRole } = require("../controllers/authController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");
const { sendOtpEmail, verifyOtp, sendForgotPasswordOtp, verifyForgotPasswordOtp, resetPassword } = require('../controllers/otpController');
const User = require("../models/User");
const { googleLogin } = require("../controllers/googleAuthController");

const router = express.Router();

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

// POST /api/auth/google for Google login/signup
router.post("/google", googleLogin);

module.exports = router;
