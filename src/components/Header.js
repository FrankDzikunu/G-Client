import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const popupRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsLoginOpen(false);
      }
    };

    if (isLoginOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginOpen]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="client Logo"
            className="logo"
          />
        </Link>
      </div>
      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Courses</Link></li>
          <li>
            <button
              className={`login-button ${isLoginOpen ? 'active' : ''}`}
              onClick={toggleLogin}>
              Login <i className="fas fa-sign-in-alt"></i>
            </button>
            {isLoginOpen && (
              <div className="login-popup" ref={popupRef}>
                <h2>Login</h2>
                <button className="google-login">
                <img src="/images/google.png"alt="client Logo"/>Log in using Google
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                    />
                    <i
                      className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    ></i>
                  </div>
                  <div className="forgot-password">
                  <Link to="/forgot-password" >Forgot password?</Link>
                  </div>
                  <button type="submit" className="login-submit">Login</button>
                </form>
                < p className='signup-link' >
                  Need to create an account? <Link className='signup' to="/signup">signup</Link>
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
