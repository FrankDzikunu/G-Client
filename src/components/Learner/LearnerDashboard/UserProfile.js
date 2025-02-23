import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./css/UserProfile.css"; 
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data?.message || error.message);
      }
    };
    fetchUserProfile();
  }, []);

  const handlePasswordUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  
    if (!oldPassword || !newPassword) {
      alert("Please enter both old and new passwords.");
      return;
    }
  
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}/update-password`, 
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Password update failed. Please try again.");
    }
  };
  

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="application-profile">
      <div className="table_title">
        <h2><span><Link to="/dashboard" className="profile-link">Application</Link></span>&nbsp;&nbsp; <b>Profile</b></h2>
      </div>
      
      <div className="profile-header">
        {/* Profile Image and Name */}
        <div className="profile-info">
        <div className="profile-avatar">
          {user.profileImage ? (
            <img src={`http://localhost:5000/${user.profileImage}`} alt="Profile" />
          ) : (
            user.name?.charAt(0)
          )}
        </div>
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        </div>
        <hr className="divider_vertical" />
        <div >
          <p className="label">Location:</p> 
          <p>Kumasi</p>
        </div>
        <hr className="divider_vertical" />
        <div>
          <p className="label">Gender:</p> 
          <p>Male</p>
        </div>
        <hr className="divider_vertical" />
        <div>
          <p className="label">Phone:</p> 
          <p>+23341002402</p>
        </div>
      </div>
      <hr className="divider" />
      <div className="password-section">
        {/* Old Password Field */}
        <div className="password-input">
          <FaLock className="password-icon" />
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {showOldPassword ? (
            <FaEyeSlash className="password-icon" onClick={() => setShowOldPassword(false)} />
          ) : (
            <FaEye className="password-icon" onClick={() => setShowOldPassword(true)} />
          )}
        </div>

        {/* New Password Field */}
        <div className="password-input">
          <FaLock className="password-icon" />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showNewPassword ? (
            <FaEyeSlash className="password-icon" onClick={() => setShowNewPassword(false)} />
          ) : (
            <FaEye className="password-icon" onClick={() => setShowNewPassword(true)} />
          )}
        </div>

        <button onClick={handlePasswordUpdate}>Update</button>
      </div>

      <div className="profile-buttons">
        <button className="back-btn">Back</button>
        <button className="edit-btn">Edit</button>
      </div>
    </div>
  );
};

export default UserProfile;
