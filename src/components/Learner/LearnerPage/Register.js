import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Error fetching courses");
    }
  };

  useEffect(() => {
    fetchCourses();
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

  // Handle select changes; if course changes, update amount with course price
  const handleSelectChange = (name, value) => {
    if (name === "course") {
      const selectedCourse = courses.find((course) => course._id === value);
      setFormData((prev) => ({
        ...prev,
        course: value,
        amount: selectedCourse ? selectedCourse.price : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to register for a course. Please log in or sign up.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("course", formData.course);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("disabled", formData.disabled);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("description", formData.description);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      await axios.post("http://localhost:5000/api/learners", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Registration successful!");
        setFormData({
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

    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className="register">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="register-container">
        {/* Left-side content */}
        <div className="register-steps">
          <div className="step">
            <div>
              <h4>Sign up and Choose Your Course</h4>
              <p>
                Create your account quickly with just your email or social media login, then explore a wide range.
              </p>
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
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-user icon"></i>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-envelope icon"></i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-map-marker-alt icon"></i>
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fetch courses dynamically */}
            <div className="form-row">
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-graduation-cap icon"></i>
                  <select name="course" value={formData.course} onChange={(e) => handleSelectChange("course", e.target.value)} required>
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
                  <select name="gender" value={formData.gender} onChange={(e) => handleSelectChange("gender", e.target.value)} required>
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
                  <select name="disabled" value={formData.disabled} onChange={(e) => handleSelectChange("disabled", e.target.value)} required>
                    <option value="">Disabled</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="input-container">
                  <i className="fas fa-phone icon"></i>
                  <input
                    type="text"
                    name="contact"
                    placeholder="contact"
                    pattern="^\+?([0-9]{1,3})[-. ]?([0-9]{3,5})[-. ]?([0-9]{4,9})$"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
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
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount || ""} 
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
