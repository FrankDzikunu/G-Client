import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import "./css/ApplicationProfile.css";

const ApplicationProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState(undefined);

  useEffect(() => {
    const fetchApplicationProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        // Get all learner records
        const response = await axios.get("http://localhost:5000/api/learners", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Find the learner record whose email matches the logged-in user's email
        const learnerProfile = response.data.find(
          (learner) => learner.email.toLowerCase() === user.email.toLowerCase()
        );
        // If not found, set to null; else set the found object
        setApplication(learnerProfile || null);
      } catch (error) {
        console.error(
          "Error fetching application profile:",
          error.response?.data?.message || error.message
        );
        // If there's an error, we also set null so we don't remain stuck in "Loading..."
        setApplication(null);
      }
    };

    if (user && user.email) {
      fetchApplicationProfile();
    } else {
      // If user is not logged in or has no email, we set null to show no-application UI
      setApplication(null);
    }
  }, [user]);

  // If application is still undefined, show "Loading..."
  if (application === undefined) {
    return <div className="application-profile">Loading application profile...</div>;
  }

  // If no application found, show the "no application" UI
  if (!application) {
    return (
      <div className="application-profile">
        <div className="table_title">
          <h2>
            Application{" "}
            <span>
              &nbsp; <Link to="/profile" className="profile-link">Profile</Link>
            </span>
          </h2>
        </div>

        {/* No-application UI */}
        <div className="application-profile">
          <img
            src="/path/to/no-application.png"  // Replace with your actual image path
            alt="No Application"
            className="no-app-img"
          />
          <p className="no-app-text">!!! OOPs no application</p>
          <div className="no-app-actions">
            <button className="action-button back-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <Link to="/startnewapplication">
              <button className="action-button new-application-button">
                Start new application
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, user has an application
  const formattedDate = new Date(application.createdAt).toLocaleDateString();
  const program = application.course ? application.course.name : "N/A";
  const stacks = application.course?.stacks?.length
    ? application.course.stacks
    : [];

  // Optional random color border for each stack button
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="application-profile">
      <div className="table_title">
        <h2>
          Application{" "}
          <span>
            &nbsp; <Link to="/profile" className="profile-link">Profile</Link>
          </span>
        </h2>
      </div>
      <div className="profile-header">
        <div>
          <p className="label">Program</p>
          <p>{program}</p>
        </div>
        <hr className="divider_vertical" />
        <div>
          <p className="label">Date registered</p>
          <p>{formattedDate}</p>
        </div>
        <hr className="divider_vertical" />
        <div>
          <p className="label">Status</p>
          <p>Registered</p>
        </div>
        <hr className="divider_vertical" />
        <div>
          <p className="label">Paid</p>
          <p>${Number(application.amount).toFixed(2)}</p>
        </div>
      </div>
      <hr className="divider" />
      <div className="tools">
        {stacks.map((stack, index) => (
          <button key={index} className="tool" style={{ borderColor: getRandomColor() }}>
            {stack}
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="action-button home">Home</button>
        <Link to="/startnewapplication">
          <button className="action-button new-application">Start new application</button>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationProfile;
