import React, { useState } from 'react';
import axios from 'axios';
import './css/ForgotPasswordModal.css';

function ForgotPasswordModal({ isOpen, onClose, openOTPModal, setForgotEmail }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

      if (response.status === 200) {
        setMessage("A 6-digit OTP has been sent to your email.");
        setForgotEmail(email);
        // Close this modal & open the OTP modal
        onClose();
        openOTPModal();
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP. User might not exist.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="Forgot-modal-overlay">
      <div className="Forgot-modal-content">
        <h2>Forgot Password</h2>
        <p>Enter your email, and we'll send you a reset link.</p>
        <form onSubmit={handleForgotPassword}>
          <div className="Forgot-input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
