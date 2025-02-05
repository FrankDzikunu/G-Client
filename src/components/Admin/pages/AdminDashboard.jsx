import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/AdminDashboard/Sidebar';
import AdminHeader from '../components/AdminDashboard/AdminHeader';
import DashboardCards from '../components/AdminDashboard/DashboardCards';
import RevenueChart from '../components/AdminDashboard/RevenueChart';
import LatestInvoices from '../components/AdminDashboard/LatestInvoices';
import  './css/AdminDashboard.css';

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
          <DashboardCards />
          <div className="dashboardContainer">
            <div className="leftSection">
              <RevenueChart />
            </div>
            <div className="rightSection">
              <LatestInvoices />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
