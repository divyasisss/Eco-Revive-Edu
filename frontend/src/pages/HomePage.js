import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./HomePage.css";
import config from '../config/config'
import wallE from '../resources/wallE.png'


const HomePage = () => {
  return (
    <div className="home-page">
      
      <main className="main-content">
        <div className="text-content">
          <h1>Partner for Sustainable Solutions Reviving the Future</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque suscipit et repellendus assumenda nihil, autem dignissimos quis magnam? Magni, debitis.</p>
          {/* <button className="explore-btn"></button> */}
          <Link className="explore-btn" to="/products">Explore Now →</Link>
        </div>
        <div className="image-content">
          <img src={wallE} alt="WALL-E Robot" className="robot-image" />
        </div>
      </main>
      
      {/* Footer */}
      <div className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Us</h3>
              <p>We provide high-quality electronic components for your projects.</p>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>Email: info@example.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <p>Facebook | Twitter | Instagram</p>
            </div>
          </div>
          <hr />
          <p className="copyright">Copyright &copy; 2023 Your Company Name</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
