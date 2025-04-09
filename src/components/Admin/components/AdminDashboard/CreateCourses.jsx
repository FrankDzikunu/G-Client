import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/CreateCourses.css";
import { FaBook, FaDollarSign, FaUser, FaClock, FaGlobe, FaImage, FaPencilAlt } from "react-icons/fa";

const CoursesPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    instructor: "",
    duration: "",
    stacks: [],
    image: null,
    description: "",
  });

  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }, []);

  const [multiSelectOpen, setMultiSelectOpen] = useState(false);
  const dropdownRef = useRef(null);

  const stacksOptions = [
    "React",
    "Node.js",
    "MongoDB",
    "Python",
    "Django",
    "Java",
    "Spring Boot",
    "Flutter",
    "Swift",
    "C++",
  ];

  const handleToggleMultiSelect = () => {
    setMultiSelectOpen((prev) => !prev);
  };

  const handleStackSelection = (stack) => {
    setFormData((prevData) => ({
      ...prevData,
      stacks: prevData.stacks.includes(stack)
        ? prevData.stacks.filter((item) => item !== stack)
        : [...prevData.stacks, stack],
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMultiSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "image") {
        formDataToSend.append(key, formData[key]);
      } else if (key === "stacks") {
        formData[key].forEach((stack) => formDataToSend.append("stacks", stack));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const token = localStorage.getItem("token"); // Ensure token is stored in localStorage
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("Course added:", response.data);
      setFormData({
        name: "",
        price: "",
        instructor: "",
        duration: "",
        stacks: [],
        image: null,
        description: "",
      });
    } catch (error) {
      console.error("Error adding course:", error.message);
    }
  };
  

  return (
    <div className="courses-container">
        <div className="head-tit">
      <span>Courses</span><hr className="divider_vet" /><h2>Create Course</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formdata">
      <div className="form-row-A">
                <div className="input-container-A">
                    <div className="icon-input">
                        <FaBook />
                        <input
                        type="text"
                        name="name"
                        placeholder="Course Title"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </div>
                </div>
                    <div className="input-container-A">
                        <div className="icon-input">
                            <FaDollarSign />
                            <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    </div>
        </div>
        <div >
            <div className="form-group-A">
              <div className="input-container-A">
              <div className="icon-input">
                <FaUser />
                <input
                    type="text"
                    name="instructor"
                    placeholder="Instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    required
                />
                </div>
              </div>
            </div>
          </div>

          <div >
            <div className="form-group-A">
              <div className="input-container-A">
              <div className="icon-input">
                <FaClock />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
                </div>
              </div>
            </div>
          </div>

        {/* Multi-select dropdown */}
        <div className="multi-select-container" ref={dropdownRef}>
          <div className="multi-select-header" onClick={handleToggleMultiSelect}>
          <div className="icon-input">
          <FaGlobe />{formData.stacks.length > 0 ? formData.stacks.join(", ") : "Select Stacks"}
          </div>
          </div>
          {multiSelectOpen && (
            <div className="multi-select-options">
              {stacksOptions.map((stack) => (
                <div
                  key={stack}
                  className={`multi-select-option ${
                    formData.stacks.includes(stack) ? "selected" : ""
                  }`}
                  onClick={() => handleStackSelection(stack)}
                >
                  {stack}
                </div>
              ))}
            </div>
          )}
        </div>

        <div >
            <div className="form-group-A">
              <div className="input-container-A">
              <div className="icon-input file-upload">
                <FaImage />
                <input type="file" name="image" accept="image/*" onChange={handleChange} />
                <label>Upload image</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="form-group-A">
              <div className="input-container-A">
              <div className="icon-input">
                <FaPencilAlt />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                ref={textareaRef}
                />
                </div>
              </div>
            </div>
          </div>
    </div>
        <div className="buttonz">
          <Link to="/admin/courses">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          </Link>
          <button type="submit" className="submit-btn">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoursesPage;
