import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';
import { DollarOutlined, ClockCircleOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../css/DashboardCards.css';

const DashboardCards = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalLearners: 0,
    totalInvoices: 0,
    pendingPayments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token available. Redirect to login if required.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          totalRevenue: response.data.totalRevenue || 0,
          totalLearners: response.data.totalLearners || 0,
          totalInvoices: response.data.totalInvoices || 0,
          pendingPayments: response.data.pendingPayments?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-cards-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dashboardstats">
      <div className='dashboard-hedder'>
        <h2>Dashboard</h2>
        <p>Welcome back Admin</p>
      </div>
    <div className="dashboard-cards">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card" title={<><DollarOutlined />&nbsp; &nbsp; Collected</>}>
            ${stats.totalRevenue.toFixed(2)}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card" title={<><ClockCircleOutlined />&nbsp; &nbsp; Pending</>}>
            {stats.pendingPayments}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card" title={<><FileTextOutlined />&nbsp; &nbsp; Total Invoices</>}>
            {stats.totalInvoices}
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card" title={<><TeamOutlined />&nbsp; &nbsp; Total Learners</>}>
            {stats.totalLearners}
          </Card>
        </Col>
      </Row>
    </div>
  </div>
  );
};

export default DashboardCards;
