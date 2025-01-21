// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Unlock Your Potential with Industry-Leading Courses!</h1>
        <p>
          "Join thousands of learners gaining real-world skills and advancing their careers.
          Our world-class educators are designed to empower you to succeed."
        </p>
        <button className="hero-button">Get Started</button>
      </div>
      <div className="hero-image">
        {/* Replace `laptop.png` with your image file */}
        <img src='./images/laptop.png' alt="Laptop with hands" />
      </div>
    </section>
  );
}

export default HeroSection;
