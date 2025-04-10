// controllers/googleAuthController.js
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const googleLogin = async (req, res) => {
  const { credential } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = new User({
        username: name,
        email: email.toLowerCase(),
        password: Math.random().toString(36).slice(-8), // generate a random password
        role: "user", // explicitly set role as user
        profileImage: picture,
      });
      await user.save();
      console.log("New user created:", user);
    } else {
      // Ensure the user document has the correct email and role
      user.email = email.toLowerCase();
      user.role = user.role || "user";
      await user.save();
      console.log("Existing user updated:", user);
    }

    // Force the role to "user" regardless of what is in user.role
    const token = generateToken(user._id, user.email, user.role);

    return res.json({
      _id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
};

module.exports = { googleLogin };
