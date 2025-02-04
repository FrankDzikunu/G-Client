
import React, { useState,} from "react";
import axios from "axios";
import "./css/NewApplication.css";


const NewApllication = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      module: "",
      gender: "",
      disabled: "",
      contact: "",
      amount: "",
      description: "",
      avatar: null,
    });

      // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    // Handle file upload
    const handleFileChange = (e) => {
      setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
    };

      // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post("http://localhost:5000/api/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="application-profile">
        <div className="table_title">
            <h2>Application <span>&nbsp; Profile</span></h2>
        </div>
        <div>
        <form className="registerform"  onSubmit={handleSubmit}>
          <h2>Start new application</h2>  

          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-user icon"></i>
                <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-user icon"></i>
                <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-envelope icon"></i>
                <input type="email" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-map-marker-alt icon"></i>
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-graduation-cap icon"></i>
                <select name="module" value={formData.module} onChange={handleChange} required>
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
                <select name="gender" value={formData.gender} onChange={handleChange} required>
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
                    <select name="disabled" value={formData.disabled} onChange={handleChange} required>
                        <option value="">Disabled</option>
                        <option value="disabled1">Yes</option>
                        <option value="disabled2">No</option>
                    </select>
                </div>
            </div>
            <div className='form-group'>
              <div className="input-container">
                <i className="fas fa-phone icon"></i>
                <input type="text" name="contact" placeholder="contact" pattern="^\+?([0-9]{1,3})[-. ]?([0-9]{3,5})[-. ]?([0-9]{4,9})$" value={formData.contact} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="form-group">
              <div className="input-container">
                <i className="fas fa-image icon"></i>
                <input type="file" name="avatar" onChange={handleFileChange} required />
              </div>
            </div>
          
            <div className="form-row">
            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-dollar-sign icon"></i>
                <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="form-group">
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" required />
          </div>
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
    </div>
  );
};

export default NewApllication;
