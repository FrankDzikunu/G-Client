const Invoice = require("../models/Invoice");

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private (Admin)
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("learner").populate("course");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private (Admin)
const createInvoice = async (req, res) => {
  const { learner, course, amountPaid, status } = req.body;

  try {
    const invoice = new Invoice({ learner, course, amountPaid, status });
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
    const invoice = await Invoice.findById(req.params.id).populate("learner").populate("course");
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private (Admin)
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private (Admin)
const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });
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
