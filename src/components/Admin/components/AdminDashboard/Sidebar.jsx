import React from 'react';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  BookOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/admin/dashboard">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <DashboardOutlined className="sidebar-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/invoices">
              <FileTextOutlined className="sidebar-icon" />
              <span>Invoices</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/learners">
              <TeamOutlined className="sidebar-icon" />
              <span>Learners</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/courses">
              <BookOutlined className="sidebar-icon" />
              <span>Courses</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/reports">
              <BarChartOutlined className="sidebar-icon" />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/settings">
              <SettingOutlined className="sidebar-icon" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <LogoutOutlined className="sidebar-icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
