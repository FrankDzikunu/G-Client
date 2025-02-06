import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../css/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses-container">
        <div className="Courses-heading"><h2>Courses</h2></div>
        <div className="Courses-top-buttons">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Search Course"
                    className="search-box"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Link to="/admin/create-courses"><button className="create-course-btn">Create Course &nbsp;&nbsp;+</button></Link>
      </div>
      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              src={`http://localhost:5000/${course.image}`}
              alt={course.name}
              className="course-image"
            />
            <div className="course-details">
              <h3>{course.name}</h3>
              <p>Price:<div className="courses-data-value"> ${course.price}</div></p>
              <p>Duration:<div className="courses-data-value"> {course.duration}</div></p>
              <p>Instructor:<div className="courses-data-value"> {course.instructor}</div></p>
              <p>Learners:<div className="courses-data-value"> +{course.learners.length}</div></p>
              <button className="view-more-btn">View more →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
