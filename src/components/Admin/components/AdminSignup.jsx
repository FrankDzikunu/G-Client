import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./AdminSignup.css";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
        const res = await axios.post("http://localhost:5000/api/admin/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          contact: formData.contact,
        });
  
        if (res.status === 201) {
          navigate("/admin-login"); // Redirect after successful signup
        }
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
      }
    };

  return (
    <div className="admin-signup-container">
      {/* Left side illustration & text */}
      <div className="left-section">
      <img src="/images/azubi-logo.png" alt="Signup Illustration" />
        <p>Create Your Account to Manage and Access the Dashboard Effortlessly.</p>
      </div>

      {/* Right side signup form */}
      <div className="admin-signup-right">
        <div className="signup-form-container">
        <div className="signup-header">
          <p>Already have an account?</p>
          <Link to="/admin-login" className="signuplink">
            login
          </Link>
        </div>
        <h2>Register to get started</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-row">
            <div className="signup-input-group">
              <FaUser className="signup-icon" />
              <input
                type="text"
                name="firstName"
                placeholder="FirstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-input-group">
              <FaUser className="signup-icon" />
              <input
                type="text"
                name="lastName"
                placeholder="LastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <FaEnvelope className="signup-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-form-row">
            <div className="signup-input-group">
              <FaLock className="signup-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup-input-group">
              <FaLock className="signup-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <FaPhoneAlt className="signup-icon" />
            <input
              type="text"
              name="contact"
              placeholder="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Creating account..." : "Create accounts"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <p className="terms-text">
          By confirming your email, you agree to our <span>Terms of Service</span> <br></br>and that you have read and understood our <span>Privacy Policy</span>.
        </p>
      </div>
      </div>
    </div>
  );
};

export default AdminSignup;
