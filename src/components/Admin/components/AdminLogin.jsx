import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, {
        email,
        password,
      });

      // Store token, username, and role (explicitly "admin") in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.name);
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to admin dashboard 
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Left side illustration & text */}
      <div className="left-section">
        <img src="/images/azubi-logo.png" alt="Signup Illustration" />
        <p>Login to Manage and Access the Dashboard Effortlessly.</p>
      </div>
      {/* Right side login form */}
      <div className="admin-signup-right">
        <div className="signup-form-container" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="signup-header">
            <p>Need to create an account?</p>
            <Link to="/admin-signup" className="signuplink">
              Sign up
            </Link>
          </div>
          <h2>Login into your account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            {error && <p className="error-message">{error}</p>}

            <div className="signup-input-group">
              <FaEnvelope className="signup-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="signup-input-group">
              <FaLock className="signup-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgotpassword">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
