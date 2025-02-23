import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './css/Header.css';
import OTPModal from './OTPModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal'; // Import the new Reset Password Modal

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false); // Controls Forgot Password Modal
  const [forgotEmail, setForgotEmail] = useState(""); // Email for forgot-password flow
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false); // Controls Reset Password Modal
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const loginPopupRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const openOTPModal = () => setIsOtpModalOpen(true);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');

    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
      setUsername(storedUsername || 'User');
      setUserRole(storedUserRole);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsSignupOpen(false);
  };

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
    setIsLoginOpen(false);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleForgotPassword = () => setIsForgotOpen(!isForgotOpen);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
      if (response.data.requiresOtp) {
        setIsOtpModalOpen(true);
        return;
      }
  
      const { name, role, token } = response.data;
  
      // Store necessary data in local storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', name);
      localStorage.setItem('userRole', role);
      localStorage.setItem('token', token);
  
      setIsLoggedIn(true);
      setUsername(name);
      setUserRole(role);
      setIsLoginOpen(false);
  
      // Redirect based on user role
      navigate(role === 'admin' ? '/admin' : '/');
  
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Invalid email or password. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword
      });

      if (response.status === 300) {
        toast.error('User already exists. Please log in instead.');
        return;
      }

      setIsSignupOpen(false);
      setIsOtpModalOpen(true);
      setEmail(signupEmail);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.setItem('forceLogout', Date.now());
    window.location.href = '/';
  };

  const handleOtpSubmit = async () => {
    try {
      const cleanedOtp = otpCode.replace(/,/g, '');
      // If forgotEmail is set, we're in forgot-password flow.
      if (forgotEmail) {
        const response = await axios.post('http://localhost:5000/api/auth/verify-forgot-password-otp', {
          email: forgotEmail,
          otp: cleanedOtp
        });
        if (response.status === 200) {
          setIsOtpModalOpen(false);
          toast.success('OTP verified successfully for password reset.');
          setIsResetPasswordModalOpen(true); // Open Reset Password Modal
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      } else {
        // Registration flow
        const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
          email: signupEmail,
          otp: cleanedOtp
        });
        if (response.status === 201) {
          setIsOtpModalOpen(false);
          toast.success('Registration Successful! You can now log in.');
          navigate('/');
        } 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  };

  // Function to handle resetting password after OTP verification.
  const handleResetPassword = async (newPassword) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: forgotEmail,
        newPassword,
      });
      if (response.status === 200) {
        toast.error("Password reset successfully! Please log in with your new password.");
        setIsResetPasswordModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginPopupRef.current && !loginPopupRef.current.contains(event.target)) {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleStorageChange = (event) => {
      if (event.key === 'forceLogout') {
        window.location.href = '/';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className="header">
      <ToastContainer />
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Client Logo" className="logo" />
        </Link>
      </div>
      <nav className={`nav ${isLoggedIn || isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Courses</Link>
              </li>
              <button className="login-button" onClick={toggleLogin}>
                Login <i className="fas fa-sign-in-alt"></i>
              </button>
            </>
          ) : (
            <div className="user-dropdown">
              <button className="user-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="user-initials">{username[0]}</span> {username}{' '}
                <i className="fas fa-caret-down"></i>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  <div 
                    className="dropdown-item"
                    onClick={() => window.location.href = "/dashboard"}
                  >
                    <i className="fas fa-graduation-cap"></i> Portal
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>

      {!isLoggedIn && (
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      )}

      {isLoginOpen && (
        <div className="login-popup" ref={loginPopupRef}>
          <h2>Login</h2>
          <button className="google-login">
            <img src="/images/google.png" alt="Google Login" /> Log in using Google
          </button>
          <p>or</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button className='eye-icon' type="button" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="forgot-password">
              <button className='forget-password' type="button" onClick={() => setIsForgotOpen(true)}>
                Forgot password?
              </button>
            </div>
            <button type="submit" className="login-submit">Login</button>
          </form>
          <p className="signup-link">
            Need to create an account? <span className="signup" onClick={toggleSignup}>Signup</span>
          </p>
        </div>
      )}

      {isSignupOpen && (
        <div className="login-popup" ref={loginPopupRef}>
          <h2>Signup</h2>
          <button className="google-login">
            <img src="/images/google.png" alt="Google Signup" /> Signup using Google
          </button>
          <p>or</p>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button className='eye-icon' type="button" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button className='eye-icon' type="button" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <button type="submit" className="login-submit">Register</button>
          </form>
          <p className="signup-link">
            Already have an account? <span className="signup" onClick={toggleLogin}>Log in</span>
          </p>
        </div>
      )}

      {isOtpModalOpen && (
        <OTPModal
          otpCode={otpCode}
          isOpen={isOtpModalOpen}
          setOtpCode={setOtpCode}
          onSubmit={handleOtpSubmit}
          onClose={() => setIsOtpModalOpen(false)}
          email={forgotEmail || signupEmail}
        />
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        openOTPModal={openOTPModal}
        setForgotEmail={setForgotEmail}
      />

      {/* Reset Password Modal */}
      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
          email={forgotEmail}
          onSubmit={handleResetPassword}
        />
      )}
    </header>
  );
}

export default Header;
