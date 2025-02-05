const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, 
    instructor: { type: String, required: true },
    learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    description: { type: String, required: true },
    stacks: [{ type: String, required: true }], 
    image: { type: String }, 
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
