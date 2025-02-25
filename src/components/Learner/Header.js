import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './css/Header.css';
import OTPModal from './OTPModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ResetPasswordModal from './ResetPasswordModal';
import AuthPopup from './AuthPopup'; // Import the unified AuthPopup component

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
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
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', name);
      localStorage.setItem('userRole', role);
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUsername(name);
      setUserRole(role);
      setIsLoginOpen(false);
      navigate(role === 'admin' ? '/admin' : '/');
    } catch (error) {
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
      if (forgotEmail) {
        const response = await axios.post('http://localhost:5000/api/auth/verify-forgot-password-otp', {
          email: forgotEmail,
          otp: cleanedOtp
        });
        if (response.status === 200) {
          setIsOtpModalOpen(false);
          toast.success('OTP verified successfully for password reset.');
          setIsResetPasswordModalOpen(true);
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      } else {
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

      {(isLoginOpen || isSignupOpen) && (
        <AuthPopup
          isLoginOpen={isLoginOpen}
          isSignupOpen={isSignupOpen}
          loginPopupRef={loginPopupRef}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          toggleSignup={toggleSignup}
          toggleLogin={toggleLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          setSignupUsername={setSignupUsername}
          setSignupEmail={setSignupEmail}
          setSignupPassword={setSignupPassword}
          setSignupConfirmPassword={setSignupConfirmPassword}
          email={email}
          password={password}
          signupUsername={signupUsername}
          signupEmail={signupEmail}
          signupPassword={signupPassword}
          signupConfirmPassword={signupConfirmPassword}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          setIsForgotOpen={setIsForgotOpen}

          handleGoogleResponse={async (credentialResponse) => {
            try {
              const response = await fetch("http://localhost:5000/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: credentialResponse.credential }),
              });
              const data = await response.json();
              console.log("Google auth data:", data);
              localStorage.setItem("token", data.token);
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("username", data.name); // Save username here!
              setIsLoggedIn(true);
              setUsername(data.name);
              setUserRole(data.role);
              setIsLoginOpen(false);
              navigate(data.role === 'admin' ? '/admin' : '/');
            } catch (error) {
              console.error("Google auth error:", error);
              toast.error("Google auth error");
            }
          }}
          
        />
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

      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        openOTPModal={openOTPModal}
        setForgotEmail={setForgotEmail}
      />

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
