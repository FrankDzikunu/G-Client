const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true }, // Ensuring email is stored in lowercase
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String }, // URL to profile picture
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Prevent double hashing
  if (
    this.password.startsWith("$2a$") || this.password.startsWith("$2b$")
  ) {
    return next();
  }

  try {
    console.log("Plaintext password before hashing:", this.password); // Debugging
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to match password during login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered password:", enteredPassword);
  console.log("Stored hashed password:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
