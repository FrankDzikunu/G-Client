import React from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../css/AdminHeader.css';

const AdminHeader = ({ username, onLogout }) => {
  // Create a dropdown menu for the user profile
  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <a href="/admin/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        <a href="/admin/settings">Settings</a>
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
            <span className="admin-username">{username}</span>
            <DownOutlined className="admin-caret" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default AdminHeader;
