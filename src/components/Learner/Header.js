import React, { useState, useEffect, useRef } from 'react';
import './css/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false); // New state for signup
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loginPopupRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('username');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
      setUsername(storedUsername || 'John Doe');
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsSignupOpen(false); // Ensure signup is closed when opening login
  };

  const toggleSignup = () => {
    setIsSignupOpen(!isSignupOpen);
    setIsLoginOpen(false); // Ensure login is closed when opening signup
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    setUsername('John Doe');
    setIsLoginOpen(false);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', 'John Doe');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  // Clear session storage and local storage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  // Close all opened tabs
  localStorage.setItem('forceLogout', Date.now());
  // Redirect to home page
  window.location.href = '/';
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
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
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
          <form>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
              />
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                required
              />
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePasswordVisibility}></i>
            </div>
            <button type="submit" className="login-submit">Register</button>
          </form>
          <p className="signup-link">
            Already have an account? <span className="signup" onClick={toggleLogin}>Log in</span>
          </p>
        </div>
      )}
    </header>
  );
}

export default Header;
