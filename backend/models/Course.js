const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // Example: "4 weeks"
    instructor: { type: String, required: true },
    learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Learners enrolled
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
