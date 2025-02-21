import React from "react";
import { Modal } from "antd";
import "../css/LearnerDetailsModal.css";

const LearnerDetailsModal = ({ visible, onClose, learner }) => {
  if (!learner) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      className="learner-modal"
      closable={false}
    >
      <div className="modal-header">
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="modal-content">
        <div className="profile-img-container">
          <img src={learner.avatar} alt="avatar" className="profile-img" />
        </div>
        <h2 className="learner-name">{`${learner.firstName} ${learner.lastName}`}</h2>
        <p className="learner-email">{learner.email}</p>
        <hr className="divider" />

        <div className="learner-info">
          <p><strong>Program:</strong> {learner.course?.name || "N/A"}</p>
          <p><strong>Gender:</strong> {learner.gender}</p>
          <p><strong>Contact:</strong> {learner.contact || "N/A"}</p>
          <p><strong>Location:</strong> {learner.location || "N/A"}</p>
          <p><strong>Paid:</strong> ${learner.amount.toFixed(2)}</p>
          <p><strong>Bio:</strong> {learner.description || "N/A"}</p>
        </div>
      </div>
    </Modal>
  );
};

export default LearnerDetailsModal;
