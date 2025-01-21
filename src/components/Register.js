// src/components/Register.js
import React from 'react';
import './Register.css';

function Register() {
  return (
    <section className="register">
      <div className="register-container">
        {/* Left-side content */}
        <div className="register-steps">
          <div className="step">
            <div>
              <h4>Sign up and Choose Your Course</h4>
              <p>Create your account quickly with just your email or social media login, then explore a wide range.</p>
            </div>
          </div>
          <div className="step">
            <div>
              <h4>Onboarding</h4>
              <p>Quickly onboard and get all the guidance you need to succeed in your journey.</p>
            </div>
          </div>
          <div className="step">
            <div>
              <h4>Start Learning</h4>
              <p>Access industry-relevant courses and begin learning with top experts.</p>
            </div>
          </div>
        </div>

        {/* Right-side form */}
        <div>
        <h2>Register</h2>
        <form className="register-form">
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-user icon"></i>
                <input type="text" placeholder="First name" required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-user icon"></i>
                <input type="text" placeholder="Last name" required />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-envelope icon"></i>
                <input type="email" placeholder="Email" required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-map-marker-alt icon"></i>
                <input type="text" placeholder="Location" required />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-graduation-cap icon"></i>
                <select required>
                  <option value="">Choose module</option>
                  <option value="software-development">Software Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="cloud-computing">Cloud Computing</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-venus-mars icon"></i>
                <select required>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
                <div className="input-container">
                    <i className="fas fa-wheelchair icon"></i> 
                    <select required>
                        <option value="">Disabled</option>
                        <option value="disabled1">Yes</option>
                        <option value="disabled2">No</option>
                    </select>
                </div>
            </div>
            <div className='form-group'>
              <div className="input-container">
                <i className="fas fa-phone icon"></i>
                <input type="text" placeholder="Phone" required />
              </div>
            </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-image icon"></i>
                <input type="file" required />
              </div>
            </div>
          
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-dollar-sign icon"></i>
                <input type="text" placeholder="Amount" required />
              </div>
            </div>
          </div>
          <textarea placeholder="Description" rows="4" required></textarea>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
      </div>
    </section>
  );
}

export default Register;
