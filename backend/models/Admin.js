const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "admin" },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
