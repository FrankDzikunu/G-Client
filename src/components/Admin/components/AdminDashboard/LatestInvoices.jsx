import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/LatestInvoices.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const LatestInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user may not be authenticated.");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/admin/latest-invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Response is directly an array of invoices
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="latest-invoices-container">
      <div  className="latastInvoices-titel">
        <h2>Latest Invoices</h2>
      </div>
      <div className="latestInvoices">
        <div className="invoiceList">
          {invoices.map((invoice, index) => (
            <div key={index} className="invoiceItem">
              <img
                src={
                  invoice.learner && invoice.learner.avatar
                    ? `http://localhost:5000/${invoice.learner.avatar.replace(/\\/g, "/")}`
                    : "/default-avatar.png"
                }
                alt={
                  invoice.learner
                    ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
                    : "Invoice Avatar"
                }
                className="avatar"
              />
              <div className="details">
                <p className="name">
                  {invoice.learner 
                    ? `${invoice.learner.firstName} ${invoice.learner.lastName}`
                    : "Unknown Learner"}
                </p>
                <p className="course">
                  {invoice.learner.course && invoice.learner.course.name
                    ? invoice.learner.course.name
                    : "No course"}
                </p>
              </div>
              <p className="amount">${invoice.amountPaid.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestInvoices;
