
import React from "react";
import "./css/ApplicationProfile.css";

const ApplicationProfile = () => {
  return (
    <div className="application-profile">
        <div className="table_title">
            <h2>Application <span>&nbsp; Profile</span></h2>
        </div>
      <div className="profile-header">
        <div>
          <p className="label">Program</p>
          <p>Data Science</p>
        </div>
        <hr className="divider_vert" />
        <div>
          <p className="label">Date registered</p>
          <p>2024/11/16</p>
        </div>
        <hr className="divider_vert" />
        <div>
          <p className="label">Status</p>
          <p>Registered</p>
        </div>
        <hr className="divider_vert" />
        <div>
          <p className="label">Paid</p>
          <p>$150.00</p>
        </div>
      </div>
      <hr className="divider" />
      <div className="tools">
        <button className="tool-button powerbi">PowerBI</button>
        <button className="tool-button python">Python</button>
        <button className="tool-button excel">Excel</button>
        <button className="tool-button tableau">Tableau</button>
      </div>
      <div className="actions">
        <button className="action-button home">Home</button>
        <button className="action-button new-application">Start new application</button>
      </div>
    </div>
  );
};

export default ApplicationProfile;
