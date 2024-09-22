import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config';
import { FaUser, FaLock, FaEnvelope, FaUserTag } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Seller'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${config.apiUrl}/auth/register`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.userType
      });
      localStorage.setItem('token', res.data.token);
      window.dispatchEvent(new Event('userRegister'))
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <h2 className="register-title">User Registration</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-form-group">
            <FaUser className="input-icon" />
            <input
              className="register-form-input"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <FaEnvelope className="input-icon" />
            <input
              className="register-form-input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <FaLock className="input-icon" />
            <input
              className="register-form-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-form-group">
            <FaUserTag className="input-icon" />
            <select
              className="register-form-input"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Seller">Seller</option>
              <option value="Buyer">Buyer</option>
            </select>
          </div>
          <button className="submit-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;