import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaWheelchair, FaMapMarkerAlt, FaBook, FaPhone, FaDollarSign, FaImage, FaPencilAlt } from "react-icons/fa";
import { Select } from "antd";
import "../css/CreateLearner.css";

const { Option } = Select;

const CreateLearner = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    program: "",
    gender: "",
    location: "",
    phone: "",
    disabled: "",
    amount: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="courses-container">
        <div className="head-tit">
      <span>Learners</span><hr className="divider_vet" /><h2>Create Learners</h2>
      </div>
      <form className="create-learner-form">
      <div className="formdata">
    <div className="form-row-A">
        <div className="input-container-A">
            <div className="icon-input">
            <FaUser/>
            <input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
            </div>
        </div>
        <div className="input-container-A">
            <div className="icon-input">
            <FaUser/>
            <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
            </div>
        </div>
     </div>
        <div className="form-group-A">
            <div className="input-container-A">
                    <div className="icon-input">
                        <FaEnvelope/>
                        <input style={{ width: '100%' , border: 'none', outline: 'none' }} 
                        type="email" name="email" placeholder="Email" onChange={handleChange} />
                    </div>
            </div>
        </div>
        
        <div className="form-row-A">
        <div className="form-group">
        <div className="input-container-A">
            <div className="icon-input">
                <FaBook />
                <Select style={{ width: '100%', border: 'none', outline: 'none' }}
                placeholder="Select program" onChange={(value) => handleSelectChange("program", value)}>
                    <Option value="program1">Program 1</Option>
                    <Option value="program2">Program 2</Option>
                </Select>
            </div>
          </div>
          <div className="input-container-A">
            <div className="icon-input">
                <FaUser />
                <Select style={{ width: '100%', border: 'none', outline: 'none' }}
                placeholder="Gender" onChange={(value) => handleSelectChange("gender", value)}>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </div>
          </div>
        </div>
        </div>

        <div className="form-row-A">
        <div className="form-group">
          <div className="input-container-A">
            <div className="icon-input">
                <FaMapMarkerAlt/>
                <input type="text" name="location" placeholder="Location" onChange={handleChange} />
            </div>
            </div>
          <div className="input-container-A">
            <div className="icon-input">
                <FaPhone/>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            </div>
          </div>
        </div>
        </div>

        <div className="form-row-A">
        <div className="form-group">
            <div className="input-container-A">
            <div className="icon-input">
            <FaWheelchair />
            <Select style={{ width: '100%', border: 'none', outline: 'none' }}
            placeholder="Disabled" onChange={(value) => handleSelectChange("disabled", value)}>
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
            </Select>
            </div>
          </div>
          <div className="input-container-A">
            <div className="icon-input">
                <FaDollarSign/>
                <input type="text" name="amount" placeholder="Amount" onChange={handleChange} />
            </div>
          </div>
        </div>
        </div>

        <div className="form-group-A">
            <div className="input-container-A">
                <div className="icon-input file-upload">
                    <FaImage/>
                    <input type="file" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                    <label>Upload image</label>
                </div>
            </div>
        </div>

        <div className="form-group-A">
            <div className="input-container-A">
                <div className="icon-input">
                <FaPencilAlt/>
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                </div>
            </div>
        </div>
    </div>
            <div className="buttonz">
                <Link to="/admin/learners">
                <button type="button" className="cancel-btn">
                    Cancel
                </button>
                </Link>
                <button type="submit" className="submit-btn">Create learner</button>
            </div>

      </form>
    </div>
  );
};

export default CreateLearner;
