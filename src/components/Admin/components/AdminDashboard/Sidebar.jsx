import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <DashboardOutlined /> },
    { path: "/admin/invoices", label: "Invoices", icon: <FileTextOutlined /> },
    { path: "/admin/learners", label: "Learners", icon: <TeamOutlined /> },
    { path: "/admin/courses", label: "Courses", icon: <BookOutlined /> },
    { path: "/admin/reports", label: "Reports", icon: <BarChartOutlined /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/admin">
          <img src="/images/logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span className="sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
          <div className="sidebar-divider">
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
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
