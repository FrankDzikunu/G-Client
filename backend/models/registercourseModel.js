const mongoose = require("mongoose");

const UserRegistrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  location: String,
  course: { type: String, required: true },
  gender: String,
  disabled: String,
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  amount: { type: Number, required: true },
  description: String,
  avatar: String,
}, { timestamps: true });

module.exports = mongoose.model("UserRegistration", UserRegistrationSchema);
