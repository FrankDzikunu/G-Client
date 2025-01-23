import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [username, setUsername] = useState('John Doe'); // Example username
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const loginPopupRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginPopupRef.current && !loginPopupRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="client Logo" className="logo" />
        </Link>
      </div>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Courses</Link>
          </li>
          <li>
            {!isLoggedIn ? (
              <button
                className={`login-button ${isLoginOpen ? 'active' : ''}`}
                onClick={toggleLogin}
              >
                Login <i className="fas fa-sign-in-alt"></i>
              </button>
            ) : (
              <div className="user-dropdown">
                <button className="user-button" onClick={toggleDropdown}>
                  <span className="user-initials">JD</span> {username}{' '}
                  <i className="fas fa-caret-down"></i>
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    <Link to="/portal" className="dropdown-item">
                      <i className="fas fa-graduation-cap"></i> Portal
                    </Link>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                  </div>
                )}
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
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    ></i>
                  </div>
                  <div className="forgot-password">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                  <button type="submit" className="login-submit">
                    Login
                  </button>
                </form>
                <p className="signup-link">
                  Need to create an account?{' '}
                  <Link className="signup" to="/signup">
                    Signup
                  </Link>
                </p>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
}

export default Header;
