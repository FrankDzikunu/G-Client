import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext"; // Assuming you have AuthContext
import "./css/Register.css";

function Register() {
  const { user } = useAuth(); // Get logged-in user
  const [courses, setCourses] = useState([]); // Store courses from the database
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    course: "",
    gender: "",
    disabled: "",
    contact: "",
    amount: "",
    description: "",
    avatar: null,
  });

  // Fetch courses from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then((response) => {
        setCourses(response.data); // Assuming response.data is an array of courses
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

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

    if (!user) {
      alert("You must be logged in to register for a course. Please log in or sign up.");
      return;
    }

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
          <form className="register-form" onSubmit={handleSubmit}>
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
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-map-marker-alt icon"></i>
                  <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Fetch courses dynamically */}
            <div className="form-row">
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-graduation-cap icon"></i>
                  <select name="course" value={formData.course} onChange={handleChange} required>
                    <option value="">Choose Course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name} - ${course.price}
                      </option>
                    ))}
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
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <div className="input-container">
                  <i className="fas fa-phone icon"></i>
                  <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-image icon"></i>
                <input type="file" name="avatar" onChange={handleFileChange} required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-container">
                <i className="fas fa-dollar-sign icon"></i>
                <input type="text" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" required />
            </div>

            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
