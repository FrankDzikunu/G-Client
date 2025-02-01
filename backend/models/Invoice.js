const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amountPaid: { type: Number, required: true },
    status: { type: String, enum: ["paid", "pending"], default: "pending" },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
