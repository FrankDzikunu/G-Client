import React, { useState } from "react";
import axios from "axios";
import "./css/ResetPasswordModal.css";
import { FaLock, FaArrowRight } from "react-icons/fa";

const ResetPasswordModal = ({ isOpen, onClose, email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email is provided
    if (!email) {
      setError("Email is missing. Please try again.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword,
      });

      setMessage(response.data.message);
      // Reset fields on success
      setNewPassword("");
      setConfirmPassword("");

      // Close modal after a short delay (2 seconds)
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reset-password-modal">
      <div className="modal-content">
        <h2>Reset password</h2>
        <p>Create a new password and get started</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset password"} <FaArrowRight className="btn-icon" />
          </button>
        </form>

        <p className="signup-text">
          Need to create an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
