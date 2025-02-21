import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Select, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "../css/Learners.css";
import moment from "moment";
import LearnerDetailsModal from "./LearnerDetailsModal";

const { Search } = Input;
const { Option } = Select;

const Learners = () => {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchLearners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/learners", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Format data properly
        const formattedLearners = response.data.map((learner) => ({
          ...learner,
          avatar: learner.avatar 
            ? `http://localhost:5000/${learner.avatar.replace(/\\/g, "/")}` 
            : "",
          courseName: learner.course?.name || "N/A",
          registrationDate: learner.createdAt 
            ? moment(learner.createdAt).format("DD-MM-YYYY") 
            : "N/A",
        }));

        setLearners(formattedLearners);
      } catch (error) {
        console.error("Error fetching learners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearners();
  }, []);

  // Handle search
  const filteredLearners = learners.filter((learner) =>
    learner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting
  const sortedLearners = [...filteredLearners].sort((a, b) => {
    if (sortBy === "name") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortBy === "course") {
      return a.courseName.localeCompare(b.courseName);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    } else if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const handleViewLearner = (learner) => {
    setSelectedLearner(learner);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Learners",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="learner-info">
          {record.avatar && <img className="learner-avatar" src={record.avatar} alt="avatar" />}
          <span>{`${record.firstName} ${record.lastName}`}</span>
        </div>
      ),
    },
    {
      title: "Course",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    {
      title: "Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="actions">
          <EyeOutlined className="action-icon view-icon" onClick={() => handleViewLearner(record)} />
          <EditOutlined className="action-icon edit-icon" />
          <DeleteOutlined className="action-icon delete-icon" />
        </div>
      ),
    },
  ];

  return (
    <div className="learners-container">
      <div className="header">
        <Search
          className="search-bar"
          placeholder="Search learners"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select className="sort-dropdown" placeholder="Sort by" onChange={(value) => setSortBy(value)}>
          <Option value="name">Name</Option>
          <Option value="course">Course</Option>
          <Option value="amount">Amount</Option>
          <Option value="date">Date</Option>
        </Select>
        <Button type="primary" className="create-btn">
          <PlusOutlined /> Create learner
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={sortedLearners}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

        <LearnerDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        learner={selectedLearner}
      />
    </div>
  );
};

export default Learners;
