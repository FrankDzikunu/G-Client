import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AdminHeader from '../components/AdminDashboard/AdminHeader';
import  './css/AdminDashboard.css';
import CreateCourses from '../components/AdminDashboard/CreateCourses';

const { Sider, Content } = Layout;

const AdminDashboard = ({ username, onLogout }) => {
  return (
    <Layout className="admin-dashboard-layout">
      <Sider className="admin-dashboard-sider" width={350}>
        <Sidebar />
      </Sider>
      <Layout>
        <AdminHeader username={username} onLogout={onLogout} />
        <Content className="admin-dashboard-content">
          <div className="dashboardContainer">
           <CreateCourses />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
