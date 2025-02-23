const mongoose = require("mongoose");

const LearnerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    disabled: { type: String, enum: ["yes", "no"], required: true },
    contact: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    avatar: { type: String }, 
  },
  { timestamps: true } 
);

LearnerSchema.index({ email: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("Learner", LearnerSchema);
