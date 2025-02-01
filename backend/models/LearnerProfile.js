const mongoose = require("mongoose");

const learnerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    contact: { type: String, required: true },
    bio: { type: String },
  },
  { timestamps: true }
);

const LearnerProfile = mongoose.model("LearnerProfile", learnerProfileSchema);
module.exports = LearnerProfile;
