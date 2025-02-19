const mongoose = require("mongoose");
const Invoice = require("../models/Invoice");

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private (Admin)
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("learner", "firstName lastName email avatar")
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private (Admin)
const createInvoice = async (req, res) => {
  const { learner, amountPaid, status, date, paymentDetails, email } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(learner)) {
      return res.status(400).json({ message: "Invalid learner ID" });
    }

    if (!amountPaid || isNaN(amountPaid)) {
      return res.status(400).json({ message: "Amount paid must be a number" });
    }

    const invoice = new Invoice({
      learner: new mongoose.Types.ObjectId(learner),
      amountPaid: parseFloat(amountPaid),
      status,
      date,
      paymentDetails,
      email,
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private (Admin)
const getInvoice = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid invoice ID" });
    }

    const invoice = await Invoice.findById(req.params.id)
      .populate("learner", "email")

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private (Admin)
const updateInvoice = async (req, res) => {
  try {
    const { learner, course, amountPaid, status, email, paymentDetails } = req.body;

    const updatedData = {
      learner: mongoose.Types.ObjectId(learner),
      course: mongoose.Types.ObjectId(course),
      amountPaid: parseFloat(amountPaid),
      status,
      email,
      paymentDetails,
    };

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private (Admin)
const deleteInvoice = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid invoice ID" });
    }

    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  createInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
