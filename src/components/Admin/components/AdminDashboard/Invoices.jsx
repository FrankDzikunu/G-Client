import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Invoices.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Confirmation and deletion for an invoice using SweetAlert2
  const handleDeleteInvoice = (invoiceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this invoice. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Remove deleted invoice from state
          setInvoices((prev) => prev.filter((invoice) => invoice._id !== invoiceId));
          Swal.fire("Deleted!", "Invoice has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting invoice:", error);
          Swal.fire("Error!", "Invoice deletion failed. Please try again.", "error");
        }
      }
    });
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const learnerName = `${invoice.learner.firstName || ""} ${invoice.learner.lastName || ""}`;
    const learnerEmail = invoice.learner.email || "";
    const searchLower = searchTerm.toLowerCase();
    return (
      learnerName.toLowerCase().includes(searchLower) ||
      learnerEmail.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  return (
    <div className="invoices-container">
      <div className="invoices-hedden">
        <h2>Invoices</h2>
      </div>
      <div className="invoices-header">
        <div className="invoices-top">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Invoices"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/admin/create-invoices">
            <button className="create-invoice-btn">
              Create Invoice &ensp; <FaPlus />
            </button>
          </Link>
        </div>
      </div>

      <table className="invoices-table">
        <thead>
          <tr>
            <th>Learners</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td className="learner-cell">
                <img
                  src={
                    invoice.learner.avatar
                      ? `http://localhost:5000/${invoice.learner.avatar.replace(/\\/g, "/")}`
                      : "/default-avatar.png"
                  }
                  alt={invoice.learner.email}
                  className="learner-avatar"
                />{" "}
                {invoice.learner.firstName} {invoice.learner.lastName}
              </td>
              <td className="learner-cell">{invoice.learner.email}</td>
              <td className="learner-cell">${invoice.amountPaid.toFixed(2)}</td>
              <td className="learner-cell">{new Date(invoice.date).toLocaleDateString()}</td>
              <td className="learner-cell">
                <span className={`status ${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </span>
              </td>
              <td className="learner-cell">
                <button className="learner-edit-btn">
                   <EditOutlined className="action-icon edit-icon" />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteInvoice(invoice._id)}>
                <DeleteOutlined className="action-icon delete-icon"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="invoices-pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</button>
        <span>
          {currentPage} of {Math.ceil(filteredInvoices.length / invoicesPerPage)} pages
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredInvoices.length / invoicesPerPage))
            )
          }
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Invoices;
