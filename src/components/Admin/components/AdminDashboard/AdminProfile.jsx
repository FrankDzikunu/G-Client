import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AdminProfile.css";
import { FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUpload } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch admin profile on mount
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data);
      } catch (error) {
        setError("Failed to load profile.");
      }
    };

    fetchAdminProfile();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/profile`,
        { firstName: admin.firstName, lastName: admin.lastName, email: admin.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Update failed.");
    }
    setLoading(false);
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/admin/update-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Password update failed.");
    }
    setLoading(false);
  };

  // Handle profile image upload
  const handleUploadImage = async () => {
    if (!newProfileImage) return;
  
    const formData = new FormData();
    formData.append("profileImage", newProfileImage);
    
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/upload-image`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
  
      setAdmin({ ...admin, profileImage: response.data.profileImage });
      setMessage("Profile image updated!");
    } catch (error) {
      setError("Failed to upload image.");
    }
  };

  return (
    <div>
      <div className="profile-title"><h2>Account</h2></div>
    <div className="admin-profile">
      <div className="profile-header">
        <span>
        <img src={admin.profileImage
                      ? `http://localhost:5000/${admin.profileImage.replace(/\\/g, "/")}`
                      : "/default-avatar.png"
                  } alt="Profile" className="profile-pic" />
        <p>Profile picture</p>
        </span>
        <div className="uplaod-image-button">
        <label className="upload-btn">
        <FaUpload className="profile-icon" />&nbsp;&nbsp; Upload image
          <input type="file" onChange={(e) => setNewProfileImage(e.target.files[0])} />
        </label>
        <button onClick={handleUploadImage} disabled={!newProfileImage}>Update</button>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="profile-form">
        <h2>Full Name</h2>
        <div className="name-fields">
          <div className="name-input-group">
          <input type="text" placeholder="First name" value={admin.firstName} onChange={(e) => setAdmin({ ...admin, firstName: e.target.value })} required />
          </div>
          <div className="name-input-group">
          <input type="text" placeholder="Last name" value={admin.lastName} onChange={(e) => setAdmin({ ...admin, lastName: e.target.value })} required />
        </div>
        </div>

        <h2>Email</h2>
        <p>Manage account email address</p>
        <div className="email-field-container">
        <div className="email-field">
          <FaEnvelope className="profile-icon" />
          <input type="email" value={admin.email} readOnly />
        </div></div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>

      <form onSubmit={handleUpdatePassword} className="password-form">
        <h2>Password</h2>
        <p>Modify your current accounts</p>
        <div className="password-fields">
          <div className="password-input-group">
            <FaLock className="profile-icon" />
            <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password (******)"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            <span onClick={() => setShowCurrentPassword(!showCurrentPassword)}>{showCurrentPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
          <div className="password-input-group">
            <FaLock className="profile-icon" />
            <input type={showNewPassword ? "text" : "password"} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <span onClick={() => setShowNewPassword(!showNewPassword)}>{showNewPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
      </form>

      <button className="logout-btn">Logout</button>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div> 
    </div>
  );
};

export default AdminProfile;
