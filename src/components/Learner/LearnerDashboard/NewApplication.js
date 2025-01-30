
import React from "react";
import "./css/NewApplication.css";
import { Link } from "react-router-dom";

const NewApllication = () => {
  return (
    <div className="application-profile">
        <div className="table_title">
            <h2>Application <span>&nbsp; Profile</span></h2>
        </div>
        <div>
        <form className="registerform">
          <h2>Start new application</h2>  
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
          <div className="form-group">
          <textarea placeholder="Description" rows="4" required></textarea>
          </div>
        <div className="actions">
        <Link to="/dashboard"><button className="action-button home">&lt; Back</button></Link>
        <button className="action-button new-application">Register &gt;</button>
      </div>
        </form>
      </div>

    </div>
  );
};

export default NewApllication;
