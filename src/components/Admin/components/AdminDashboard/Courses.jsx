import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3; // Display 3 courses per page

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

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <Link to="/admin/create-courses">
          <button className="create-course-btn">Create Course &nbsp;&nbsp;+</button>
        </Link>
      </div>

      {/* Courses Grid (3x3 layout) */}
      <div className="courses-list">
        {currentCourses.map((course) => (
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
              <Link to={`/admin/courses/${course._id}`} >
              <button className="view-more-btn">View more →</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Courses;
