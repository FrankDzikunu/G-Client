import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AdminHeader from '../components/AdminDashboard/AdminHeader';
import  './css/AdminDashboard.css';
import Invoices from '../components/AdminDashboard/Invoices';

const { Sider, Content } = Layout;

const AdminDashboard = ({ username, onLogout }) => {
  return (
    <Layout className="admin-dashboard-layout">
      <Sider className="admin-dashboard-sider" width={250}>
        <Sidebar />
      </Sider>
      <Layout>
        <AdminHeader username={username} onLogout={onLogout} />
        <Content className="admin-dashboard-content">
          <Invoices />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
