import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../css/LatestInvoices.module.css';

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
    <div className={styles.latestInvoices}>
      <h3>Latest Invoices</h3>
      <div className={styles.invoiceList}>
        {invoices.map((invoice, index) => (
          <div key={index} className={styles.invoiceItem}>
            <img
              src={invoice.image || "/default-avatar.png"}
              alt={invoice.name}
              className={styles.avatar}
            />
            <div className={styles.details}>
              <p className={styles.name}>{invoice.name}</p>
              <p className={styles.course}>{invoice.courseName}</p>
            </div>
            <p className={styles.amount}>${invoice.amountPaid.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestInvoices;
