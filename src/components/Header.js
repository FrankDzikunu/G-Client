import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Courses</Link></li>
          <li><button className="login-button">Login <i className="fas fa-sign-in-alt"></i></button></li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
}

export default Header;