import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaWheelchair, FaMapMarkerAlt, FaBook, FaPhone, FaDollarSign, FaImage, FaPencilAlt } from "react-icons/fa";
import { Select } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/CreateLearner.css";

const { Option } = Select;

const CreateLearner = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    gender: "",
    location: "",
    contact: "",
    disabled: "",
    amount: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Handle text/number input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Select dropdown changes
  const handleSelectChange = (name, value) => {
    let updatedData = { ...formData, [name]: value };
    // When a course is selected, update the amount with the course price
    if (name === "course") {
      const selectedCourse = courses.find((course) => course._id === value);
      if (selectedCourse) {
        updatedData.amount = selectedCourse.price;
      } else {
        updatedData.amount = "";
      }
    }
    setFormData(updatedData);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build FormData for multipart/form-data
      const fd = new FormData();
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("email", formData.email);
      fd.append("course", formData.course);
      fd.append("gender", formData.gender);
      fd.append("location", formData.location);
      fd.append("contact", formData.contact);
      fd.append("disabled", formData.disabled);
      fd.append("amount", formData.amount);
      fd.append("description", formData.description);
      if (formData.image) {
        fd.append("avatar", formData.image);
      }

      // Get token from localStorage for admin auth
      const token = localStorage.getItem("token");

      // Send POST request to your backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/learners`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Learner created:", response.data);
      toast.success("Learner created successfully!");
      navigate("/admin/learners");
    } catch (error) {
      console.error("Error creating learner:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to create learner. Please try again.");
    }
  };

  return (
    <div className="courses-container">
      <div className="head-tit">
        <span>Learners</span>
        <hr className="divider_vet" />
        <h2>Create Learners</h2>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
      <form className="create-learner-form" onSubmit={handleSubmit}>
        <div className="formdata">
          <div className="form-row-A">
            <div className="input-container-A">
              <div className="icon-input">
                <FaUser />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-container-A">
              <div className="icon-input">
                <FaUser />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group-A">
            <div className="input-container-A">
              <div className="icon-input">
                <FaEnvelope />
                <input
                  style={{ width: "100%", border: "none", outline: "none" }}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row-A">
            <div className="form-group">
              <div className="input-container-A">
                <div className="icon-input">
                  <FaBook />
                  <Select
                    style={{ width: "100%", border: "none", outline: "none" }}
                    placeholder="Select course"
                    onChange={(value) => handleSelectChange("course", value)}
                    required
                  >
                    {courses.map((course) => (
                      <Option key={course._id} value={course._id}>
                        {course.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="input-container-A">
                <div className="icon-input">
                  <FaUser />
                  <Select
                    style={{ width: "100%", border: "none", outline: "none" }}
                    placeholder="Gender"
                    onChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row-A">
            <div className="form-group">
              <div className="input-container-A">
                <div className="icon-input">
                  <FaMapMarkerAlt />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="input-container-A">
                <div className="icon-input">
                  <FaPhone />
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-row-A">
            <div className="form-group">
              <div className="input-container-A">
                <div className="icon-input">
                  <FaWheelchair />
                  <Select
                    style={{ width: "100%", border: "none", outline: "none" }}
                    placeholder="Disabled"
                    onChange={(value) => handleSelectChange("disabled", value)}
                  >  
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </div>
              </div>
              <div className="input-container-A">
                <div className="icon-input">
                  <FaDollarSign />
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount || ""} 
                    readOnly
                    placeholder="Amount"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group-A">
            <div className="input-container-A">
              <div className="icon-input file-upload">
                <FaImage />
                <input type="file" name="image" onChange={handleFileChange} />
                <label>Upload image</label>
              </div>
            </div>
          </div>

          <div className="form-group-A">
            <div className="input-container-A">
              <div className="icon-input">
                <FaPencilAlt />
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="buttonz">
          <Link to="/admin/learners">
            <button type="button" className="cancel-btn">
              Cancel
            </button>
          </Link>
          <button type="submit" className="submit-btn">
            Create learner
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLearner;
