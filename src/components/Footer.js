import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section: Logo and Copyright */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/images/ciclient.png" alt="CIClient Logo" />
          </div>
        </div>


        {/* Right Section: Contact and Social */}
        <div className="footer-right">
        <div className='footer-menu'>
          <h4>Menu</h4>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Courses</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>+23341002000</p>
          <p>New Reiss, Ghana, Accra</p>
        </div>
        <div>
          <h4>Social</h4>
          <p>LinkedIn</p>
          <p>Facebook</p>
        </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="footer-line"></div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© copyright 2025 – G-client, All rights reserved</p>
        </div>
        <div className="footer-back-to-top">
          <a href="#top">Back to top &nbsp; ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
