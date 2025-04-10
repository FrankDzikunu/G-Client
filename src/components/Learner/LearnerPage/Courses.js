import React, { useState } from 'react';
import './css/Courses.css';

const coursesData = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Unlock your potential with comprehensive training in modern software development',
    rating: 4.0,
    price: 350,
    image: '/images/software.png',
  },
  {
    id: 2,
    title: 'Data Science Mastery',
    description: 'Equip yourself with the skills to analyze, interpret, and leverage data.',
    rating: 4.0,
    price: 350,
    image: '/images/data-analysis.png',
  },
  {
    id: 3,
    title: 'Cloud Computing Expertise',
    description: 'Gain hands-on experience in cloud preparing you to  manage scalable..',
    rating: 4.0,
    price: 350,
    image: '/images/cloud-computing.png',
  },
];


const TopCourses = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3; // Display 3 courses per page

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

      // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
        <div className="dashboardcontainer" style={{justifyContent: "center"}}>
        <div className="Courses-content">
            <span className="dashboard-text">Courses</span>
      </div>
    </div>
    <div className="top-courses-container">
      <input
        type="text"
        placeholder="Search course"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2 className="top-title">Top Courses</h2>

      <div className="courses-wrapper">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="course-rating-price">
              <div className="stars">⭐⭐⭐⭐ </div>
              <span className="rating">{course.rating}</span>
              <span className="price">Price: <strong>${course.price}</strong></span>
            </div>
            <button className="preview-button">Preview course</button>
          </div>
        ))}
      </div>

        {/* Pagination Buttons */}
        <div className="pagination-container">
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
    </div>
  );
};

export default TopCourses;
