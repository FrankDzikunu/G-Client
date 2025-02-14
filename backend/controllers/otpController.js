// otpController.js
const SibApiV3Sdk = require("sib-api-v3-sdk");
const crypto = require("crypto");
const User = require("../models/User");

// Initialize Sendinblue API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SENDINBLUE_API_KEY;

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// We'll use a shared in-memory store for OTPs (for production, use Redis or a DB)
const otpStore = new Map();

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// Existing sendOtpEmail for signup (unchanged)
const sendOtpEmail = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in instead." });
    }

    // Generate OTP for signup
    const otp = generateOtp();
    const expiryTime = Date.now() + OTP_EXPIRY_TIME;
    otpStore.set(normalizedEmail, { otp, expiryTime, username, password });

    const emailData = {
      to: [{ email: normalizedEmail }],
      sender: { email: "fdzikunu@stu.ucc.edu.gh", name: "G Client" },
      subject: "Your OTP Code for Signup Verification",
      htmlContent: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    await apiInstance.sendTransacEmail(emailData);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// New function: sendForgotPasswordOtp
const sendForgotPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  
  const normalizedEmail = email.toLowerCase();

  try {
    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP for password reset
    const otp = generateOtp();
    const expiryTime = Date.now() + OTP_EXPIRY_TIME;
    otpStore.set(normalizedEmail, { otp, expiryTime });

    // Send OTP via Sendinblue
    const emailData = {
      to: [{ email: normalizedEmail }],
      sender: { email: "fdzikunu@stu.ucc.edu.gh", name: "G Client" },
      subject: "Your OTP Code for Password Reset",
      htmlContent: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    await apiInstance.sendTransacEmail(emailData);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Forgot password OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Existing verifyOtp (for signup) remains the same
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = email.toLowerCase();

  console.log(`Verifying OTP for email: ${normalizedEmail}`);
  console.log("Current OTP store before verification:", otpStore);

  const storedOtpData = otpStore.get(normalizedEmail);
  if (!storedOtpData) {
    console.log(`No OTP data found for ${normalizedEmail}`);
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const { otp: storedOtp, expiryTime, username, password } = storedOtpData;

  console.log(`Stored OTP: ${storedOtp}, Entered OTP: ${otp}`);

  if (Date.now() > expiryTime) {
    console.log(`OTP expired for ${normalizedEmail}`);
    otpStore.delete(normalizedEmail);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otp !== storedOtp) {
    console.log(`Invalid OTP entered for ${normalizedEmail}`);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    // For signup, register the user
    const newUser = new User({ username, email: normalizedEmail, password });
    await newUser.save();

    otpStore.delete(normalizedEmail);
    console.log(`OTP successfully verified and user registered for ${normalizedEmail}`);
    res.status(201).json({ message: "User registered successfully. Please login." });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendOtpEmail, verifyOtp, sendForgotPasswordOtp };
