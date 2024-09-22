import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import './NavigationBar.css';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = decodeJWT(token);
      setUserName(decodedToken.name);
      setUserRole(decodedToken.role);
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setUserRole('');
    }
  };

  useEffect(() => {
    checkLoginStatus();

    // Add event listeners for login and logout
    window.addEventListener('userLogin', checkLoginStatus);
    window.addEventListener('userLogout', checkLoginStatus);
    window.addEventListener('userRegister', checkLoginStatus);

    // Cleanup
    return () => {
      window.removeEventListener('userLogin', checkLoginStatus);
      window.removeEventListener('userLogout', checkLoginStatus);
      window.addEventListener('userRegister', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      const decoded = JSON.parse(jsonPayload);
      return {
        name: decoded.user.name,
        role: decoded.user.role
      };
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  
  
  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Company Logo" />
        </Link>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {userRole === 'Seller' && <Link to="/seller-dashboard">Sell</Link>}
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="nav-icons">
          {isLoggedIn ? (
            <div className="user-info">
              <div className="dropdown">
                <FaUser className="account-icon" />
                <div className="dropdown-content">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              </div>
              <div className="cart">
                <Link to="/cart" className="cart-icon">
                  <FaShoppingCart />
                </Link>
              </div>
            </div>
            
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
            </div>
          )}
          <span className="user-name">{userName}</span>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;