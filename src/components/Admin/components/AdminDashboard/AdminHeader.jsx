import React, { useEffect, useState } from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
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

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          
        });

        setUsername(response.data.username);
        
        console.log("Fetched username:", response.data.username);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/admin/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        <Link to="/admin/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <h1>Admin Dashboard</h1>
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
