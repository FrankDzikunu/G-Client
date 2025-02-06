import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AdminHeader from '../components/AdminDashboard/AdminHeader';
import  './css/AdminDashboard.css';
import Courses from '../components/AdminDashboard/Courses';


const { Sider, Content } = Layout;

const AdminCourses = ({ username, onLogout }) => {
  return (
    <Layout className="admin-dashboard-layout">
      <Sider className="admin-dashboard-sider" width={350}>
        <Sidebar />
      </Sider>
      <Layout>
        <AdminHeader username={username} onLogout={onLogout} />
        <Content className="admin-dashboard-content">
          <Courses />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminCourses;
