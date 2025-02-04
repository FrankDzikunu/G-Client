const express = require("express");
const { getInvoices, createInvoice, getInvoice, updateInvoice, deleteInvoice } = require("../controllers/invoiceController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getInvoices); // Get all invoices
router.post("/", authMiddleware, adminMiddleware, createInvoice); // Create a new invoice
router.get("/:id", authMiddleware, adminMiddleware, getInvoice); // Get a single invoice
router.put("/:id", authMiddleware, adminMiddleware, updateInvoice); // Update invoice
router.delete("/:id", authMiddleware, adminMiddleware, deleteInvoice); // Delete invoice

module.exports = router;
