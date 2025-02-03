const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    contact: { type: String, required: true, match: /^[0-9]{10}$/ }, // Ensure proper phone format
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amountPaid: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ["Paid", "Pending"], default: "Pending" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

const Learner = mongoose.model("Learner", learnerSchema);
module.exports = Learner;
