import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AdminHeader from '../components/AdminDashboard/AdminHeader';
import  './css/AdminDashboard.css';
import CreateCourses from '../components/AdminDashboard/CreateCourses';


const { Sider, Content } = Layout;

const AdminCreateCourses = ({ username, onLogout }) => {
  return (
    <Layout className="admin-dashboard-layout">
      <Sider className="admin-dashboard-sider" width={250}>
        <Sidebar />
      </Sider>
      <Layout>
        <AdminHeader username={username} onLogout={onLogout} />
        <Content className="admin-dashboard-content">
          <CreateCourses />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminCreateCourses;
