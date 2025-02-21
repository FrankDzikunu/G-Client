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
        setInvoices(response.data || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="latest-invoices-container">
      <div className="latastInvoices-titel">
        <h2>Latest Invoices</h2>
      </div>
      <div className="latestInvoices">
        <div className="invoiceList">
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => {
              const learner = invoice.learner || null;
              const learnerName = learner
                ? `${learner.firstName} ${learner.lastName}`
                : "Unknown Learner";
              const courseName =
                learner && learner.course && learner.course.name
                  ? learner.course.name
                  : "No Course";
              const avatarUrl =
                learner && learner.avatar
                  ? `http://localhost:5000/${learner.avatar.replace(/\\/g, "/")}`
                  : "/default-avatar.png";

              return (
                <div key={invoice._id || index} className="invoiceItem">
                  <img src={avatarUrl} alt={learnerName} className="avatar" />
                  <div className="details">
                    <p className="name">{learnerName}</p>
                    <p className="course">{courseName}</p>
                  </div>
                  <p className="amount">
                    ${invoice.amountPaid ? invoice.amountPaid.toFixed(2) : "0.00"}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="no-invoices">No invoices available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestInvoices;
