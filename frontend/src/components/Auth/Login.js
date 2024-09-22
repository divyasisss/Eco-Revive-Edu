import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.apiUrl}/auth/login`, formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('userLogin'))
      
      if (user.role === 'Seller') {
        navigate('/seller-dashboard');
      } else if (user.role === 'Buyer') {
        navigate('/');
      } else {
        console.error('Unknown user role:', user.role);
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Handle login failure (e.g., show error message to user)
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2 className="login-title">User Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <FaUser className="input-icon" />
            <input 
              className="login-form-input"
              type="email" 
              name="email" 
              placeholder="Email"
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>
          <div className="login-form-group">
            <FaLock className="input-icon" />
            <input 
              className="login-form-input"
              type="password" 
              name="password" 
              placeholder="Password"
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
          <button className="submit-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;