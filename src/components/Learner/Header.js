import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Header.css';
import OTPModal from './OTPModal';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
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

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
  
      if (response.data.requiresOtp) {
        setIsOtpModalOpen(true); // Show OTP modal if required
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
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
  
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Invalid email or password. Please try again.';
      alert(errorMessage);
    }
  };

  

  const handleSignup = async (event) => {
    event.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword
      });

      if (response.status === 300) {
        alert('User already exists. Please log in instead.');
        return;
      }

      setIsSignupOpen(false);
      setIsOtpModalOpen(true);
      setEmail(signupEmail);
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed. Please try again.');
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
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: signupEmail,
        otp: cleanedOtp
      });

      if (response.status === 201) {
        setIsOtpModalOpen(false);
        alert('Registration Successful! You can now log in.');
        navigate('/');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'OTP verification failed. Please try again.');
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
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Client Logo" className="logo" />
        </Link>
      </div>
      <nav className={`nav ${isLoggedIn || isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          {!isLoggedIn ? (
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Courses</Link>
              </li>
              <button className="login-button" onClick={toggleLogin}>
                Login <i className="fas fa-sign-in-alt"></i>
              </button>
            </ul>
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
              <button type="button" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
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
              <button type="button" onClick={togglePasswordVisibility}>
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
              <button type="button" onClick={togglePasswordVisibility}>
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
            setOtpCode={setOtpCode}
            onSubmit={handleOtpSubmit}
            onClose={() => setIsOtpModalOpen(false)}
            email={signupEmail} // Pass the email to OTPModal
          />
        )}

    </header>
  );
}

export default Header;
