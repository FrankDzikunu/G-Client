const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
      min: [0, "Amount paid must be a positive number"],
    },
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
