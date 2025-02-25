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
      <div className="top-colour"></div>
      <div className="modal-content">
        <div className="profile-img-container">
          <img src={learner.avatar} alt="avatar" className="profile-img" />
        </div>
        <h2 className="learner-name">{`${learner.firstName} ${learner.lastName}`}</h2>
        <p className="learner-email">{learner.email}</p>
        <hr className="divider" />


        <div className="learnerinfo">
        <div className="learnerinfo-grid">
          <div className="learnerinfo-label">Program:</div>
          <div className="learnerinfo-data">{learner.course?.name || "N/A"}</div>
          <div className="learnerinfo-label">Gender:</div>
          <div className="learnerinfo-data">{learner.gender}</div>
          <div className="learnerinfo-label">Contact:</div>
          <div className="learnerinfo-data">{learner.contact || "N/A"}</div>
          <div className="learnerinfo-label">Location:</div>
          <div className="learnerinfo-data">{learner.location || "N/A"}</div>
          <div className="learnerinfo-label">Paid:</div>
          <div className="learnerinfo-data">${learner.amount.toFixed(2)}</div>
          <div className="learnerinfo-label">Bio:</div>
          <div className="learnerinfo-data">{learner.description || "N/A"}</div>
        </div>
      </div>


      </div>
    </Modal>
  );
};

export default LearnerDetailsModal;
