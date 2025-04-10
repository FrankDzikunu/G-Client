import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Input, Select, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learners`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Format data properly
        const formattedLearners = response.data.map((learner) => ({
          ...learner,
          avatar: learner.avatar 
            ? `${learner.avatar.replace(/\\/g, "/")}` 
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

  // Function to handle deletion with confirmation popup using SweetAlert2
  const handleDeleteLearner = async (learnerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this learner. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/learners/${learnerId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // Update state to remove the deleted learner
          setLearners((prev) => prev.filter((l) => l._id !== learnerId));
          Swal.fire("Deleted!", "Learner has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting learner:", error);
          Swal.fire("Error!", "Learner deletion failed. Please try again.", "error");
        }
      }
    });
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
          <DeleteOutlined
            className="action-icon delete-icon"
            onClick={() => handleDeleteLearner(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="learners-container">
      <div className="header">
        <Search
          className="Learners-search-bar"
          placeholder="Search learners"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="sort-by-container">
        <Select className="sort-dropdown" placeholder="Sort by" onChange={(value) => setSortBy(value)}>
          <Option value="name">Name</Option>
          <Option value="course">Course</Option>
          <Option value="amount">Amount</Option>
          <Option value="date">Date</Option>
        </Select>
        </div>
        <Link to="/admin/create-learners">
          <Button type="primary" className="create-btn">
            <PlusOutlined /> Create learner
          </Button>
        </Link>
      </div>
    <div className="Learner-table">
      <Table
        columns={columns}
        dataSource={sortedLearners}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
      <LearnerDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        learner={selectedLearner}
      />
    </div>
  );
};

export default Learners;
