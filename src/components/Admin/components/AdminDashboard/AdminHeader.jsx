import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminHeader.css';

const AdminHeader = ({ onLogout }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("http://localhost:5000/api/admin/profile", {
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

  
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/admin/settings">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={onLogout}>
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
