import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../css/AdminHeader.css';

const AdminHeader = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Admin Profile Data:", response.data); // Debugging
        setUsername(`${response.data.firstName} ${response.data.lastName}`);
      } catch (error) {
        console.error("Error fetching user info:", error.response?.data?.message || error.message);
      }
    };
  
    fetchUserInfo();
  }, []);

  // This is the function that gets triggered when the user clicks logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');

    // Optionally, redirect the user to the login page
    navigate('/admin-login'); 
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/admin/settings">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="admin-header">
      <div className="admin-header-title">
      </div>
      <div className="admin-header-user">
        <Dropdown overlay={menu} trigger={['click']}>
          <div className="admin-header-user-info">
            <Avatar size="large" icon={<UserOutlined />} className="admin-avatar" />
            <span className="admin-username">{username ? username : "Admin"}</span>
            <DownOutlined className="admin-caret" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default AdminHeader;
