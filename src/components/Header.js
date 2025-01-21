// src/components/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
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
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Courses</Link></li>
        </ul>
      </nav>
      <button className="login-button">Login</button>
    </header>
  );
}

export default Header;
