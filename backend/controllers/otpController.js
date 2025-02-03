const SibApiV3Sdk = require("sib-api-v3-sdk");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import your User model

// Initialize Sendinblue API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.SENDINBLUE_API_KEY;

const OTP_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Store OTPs in memory (use Redis or DB in production)
const otpStore = new Map();

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

const sendOtpEmail = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const normalizedEmail = email.toLowerCase(); // Normalize email

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in instead." });
    }

    // Store user data along with OTP in memory (DO NOT HASH THE PASSWORD HERE)
    const otp = generateOtp();
    const expiryTime = Date.now() + OTP_EXPIRY_TIME;
    otpStore.set(normalizedEmail, { otp, expiryTime, username, password });

    // Send OTP email
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

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = email.toLowerCase(); // Ensure case consistency

  console.log(`Verifying OTP for email: ${normalizedEmail}`);
  console.log("Current OTP store before verification:", otpStore);

  const storedOtpData = otpStore.get(normalizedEmail); // Use otpStore for OTP verification
  if (!storedOtpData) {
    console.log(`No OTP data found for ${normalizedEmail}`);
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const { otp: storedOtp, expiryTime, username, password } = storedOtpData;

  console.log(`Stored OTP: ${storedOtp}, Entered OTP: ${otp}`);

  if (Date.now() > expiryTime) {
    console.log(`OTP expired for ${normalizedEmail}`);
    otpStore.delete(normalizedEmail); // Clear expired OTP
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otp !== storedOtp) {
    console.log(`Invalid OTP entered for ${normalizedEmail}`);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  try {
    // Save user data to the database (password will be hashed by the pre("save") hook)
    const newUser = new User({ username, email: normalizedEmail, password });
    await newUser.save();

    // Delete OTP after successful verification
    otpStore.delete(normalizedEmail);

    console.log(`OTP successfully verified and user registered for ${normalizedEmail}`);
    res.status(201).json({ message: "User registered successfully. Please login." });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { sendOtpEmail, verifyOtp };