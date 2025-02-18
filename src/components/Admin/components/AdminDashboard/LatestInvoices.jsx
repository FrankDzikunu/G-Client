import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/LatestInvoices.css';

const LatestInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user may not be authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/admin/latest-invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Use a fallback to ensure invoices is always an array
        setInvoices(response.data.recentInvoices || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div>
      <div className="latastInvoices-titel"><h2>Latest Invoices</h2></div>
        <div className= "latestInvoices">
          <div className="invoiceList">
            {invoices.map((invoice, index) => (
              <div key={index} className="invoiceItem">
                <img
                  src={invoice.image || "/default-avatar.png"}
                  alt={invoice.name}
                  className="avatar"
                />
                <div className= "details">
                  <p className="name">{invoice.name}</p>
                  <p className="course">{invoice.courseName}</p>
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
