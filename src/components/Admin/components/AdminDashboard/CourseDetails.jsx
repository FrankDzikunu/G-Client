// src/components/CourseDetails/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Route parameter id:", id);
    // Check if id is valid and not the literal string ":id"
    if (!id || id === ":id") {
      setError("Invalid course ID.");
      setLoading(false);
      return;
    }
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleUpdate = () => {
    navigate(`/admin/courses/update/${id}`);
  };

  if (loading) {
    return <div className="course-details-loading">Loading course details...</div>;
  }

  if (error) {
    return <div className="course-details-error">{error}</div>;
  }

  if (!course) {
    return <div className="course-details-error">Course not found.</div>;
  }

  // Destructure the course fields
  const {
    name,
    description,
    price,
    duration,
    instructor,
    stacks = [],
    image,
    createdAt,
  } = course;

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="courses-container" style={{maxWidth: "920px"}}>
        <div className="Courses-heading"><h2><span><Link to="/admin/courses">Courses | </Link></span>details</h2></div>
      {/* Left Section: Course Card */}
      <div className="course-details-card"> 
      <div className="coursecard">
        <div className="image-wraper">
        <img
          src={image ? `http://localhost:5000/${image}` : "/default-course.png"}
          alt={name}
          className="course-image"
        />

        <h2 className="course-title">{name}</h2>
        </div>

        <div className="course-info">
          <h3>About Course</h3>
          <p className="about-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>

          <div className="info-item">
           <span> Price:</span> <strong>${price.toFixed(2)}</strong>
          </div>
          <div className="info-item">
           <span> Duration:</span> <strong>{duration}</strong>
          </div>
          <div className="info-item">
            <span>Instructor:</span> <strong>{instructor}</strong>
          </div>
          <div className="info-item">
            <span>Date:</span>{" "}
            <strong>{new Date(createdAt).toLocaleDateString()}</strong>
          </div>
        </div>
      </div>

      {/* Right Section: Description & Stacks */}
      <div className="coursedetails">
        <h3>Description</h3>
        <p className="description-text">{description}</p>

        <h3>Stacks</h3>
        <div className="stacks">
          {stacks.length > 0 ? (
            stacks.map((stack, index) => (
              <span key={index} className="stack" style={{ borderColor: getRandomColor() }}>
                {stack}
              </span>
            ))
          ) : (
            <p>No stacks provided.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="Course-details-buttons">
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseDetails;
