import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/CreateInvoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faDollarSign, faCalendar, faClock, faPen } from "@fortawesome/free-solid-svg-icons";

const CreateInvoice = () => {
  const [learners, setLearners] = useState([]);
  const [invoice, setInvoice] = useState({
    learner: "",
    amountPaid: "",
    date: "",
    status: "",
    details: "", // We'll use this as paymentDetails
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch learners from backend
  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/learners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLearners(res.data);
      } catch (err) {
        console.error("Failed to load learners:", err);
        setError("Failed to load learners.");
      }
    };
    fetchLearners();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  // Handle invoice submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/invoices",
        {
          learner: invoice.learner,
          amountPaid: invoice.amountPaid,
          status: invoice.status,
          date: invoice.date,
          paymentDetails: invoice.details, // changed field name here
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Invoice created successfully!");
      setInvoice({
        learner: "",
        amountPaid: "",
        date: "",
        status: "",
        details: "",
      });
    } catch (err) {
      console.error("Error creating invoice:", err);
      setError(err.response?.data?.message || "Failed to create invoice.");
    }
    setLoading(false);
  };

  return (
    <div className="courses-container">
        <div className="head-tit">
      <span>Invoices</span><hr className="divider_vet" /><h2>Create Invoice</h2>
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="formdata">
        {/* Select Learner */}
        <div className="form-group-A">
        <div className="input-container-A">
        <div className="icon-input">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <select className="select-input" name="learner" value={invoice.learner} onChange={handleChange} required>
            <option value="">Select learner</option>
            {learners.map((learner) => (
              <option key={learner._id} value={learner._id}>
                {learner.firstName} {learner.lastName} ({learner.email})
              </option>
            ))}
          </select>
        </div>
        </div>
        </div>

        {/* Amount in USD */}
        <div className="form-group-A">
            <div className="input-container-A">
        <div className="icon-input">
          <FontAwesomeIcon icon={faDollarSign} className="input-icon" />
          <input
            type="number"
            name="amountPaid"
            value={invoice.amountPaid}
            onChange={handleChange}
            placeholder="Enter amount in USD"
            required
          />
        </div></div></div>

        {/* Collection Date */}
        <div className="form-group-A">
            <div className="input-container-A">
        <div className="icon-input">
          <FontAwesomeIcon icon={faCalendar} className="input-icon" />
          <input
            type="date"
            name="date"
            value={invoice.date}
            onChange={handleChange}
            required
          />
        </div></div></div>

        {/* Status */}
        <div className="form-group-A">
            <div className="input-container-A">
        <div className="icon-input">
          <FontAwesomeIcon icon={faClock} className="input-icon" />
          <select className="select-input" name="status" value={invoice.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div></div></div>

        {/* Payment details */}
        <div className="form-group-A">
            <div className="input-container-A">
        <div className="icon-input">
          <FontAwesomeIcon icon={faPen} className="input-icon" />
          <input
            type="text"
            name="details"
            value={invoice.details}
            onChange={handleChange}
            placeholder="Payment details"
          />
        </div></div></div>

        <div className="invoice-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="create-btn" disabled={loading}>
            {loading ? "Creating..." : "Create invoice"}
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
