import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <div className="dashboard-content">
            <img src="/images/dashboard-icon.png " alt="dashboard" className="dashboard-icon"/>
            <span className="dashboard-text">Dashboard</span>
      </div>
    </div>
  );
};

export default Dashboard;
