const express = require("express");
const { getInvoices, createInvoice, getInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getInvoices); // Get all invoices
router.post("/", authMiddleware, createInvoice); // Create a new invoice
router.get("/:id", authMiddleware, getInvoice); // Get a single invoice
router.put("/:id", authMiddleware, updateInvoice); // Update invoice
router.delete("/:id", authMiddleware, deleteInvoice); // Delete invoice

module.exports = router;
