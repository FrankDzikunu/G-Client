import React, { useState, useEffect } from 'react';
import { Table, Button, Spin } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../css/LatestInvoices.css';

const LatestInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest invoices from the backend
    axios
      .get('http://localhost:5000/api/admin/latest-invoices')
      .then((response) => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching latest invoices:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'Learner',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="invoice-learner">
          <img
            src={record.avatar || 'https://via.placeholder.com/40'}
            alt="avatar"
            className="invoice-avatar"
          />
          <div className="learner-details">
            <div className="invoice-name">{text}</div>
            <div className="invoice-email">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (amount) => `$${Number(amount).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <span className={`invoice-status ${status === 'Paid' ? 'paid' : 'pending'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="invoice-actions">
          <Button
            type="link"
            icon={<EyeOutlined />}
            title="View Invoice"
            onClick={() => window.location.href = `/admin/invoices/view/${record._id}`}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            title="Edit Invoice"
            onClick={() => console.log('Edit', record._id)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            title="Delete Invoice"
            onClick={() => console.log('Delete', record._id)}
            danger
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="latest-invoices-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="latest-invoices">
      <h2>Latest Invoices</h2>
      <Table columns={columns} dataSource={invoices} pagination={false} />
    </div>
  );
};

export default LatestInvoices;
