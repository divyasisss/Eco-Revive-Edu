// src/pages/SellerDashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import './SellerDashboard.css';

const DEFAULT_IMAGE = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await axios.get(`${config.apiUrl}/products/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err.response?.data || err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.apiUrl}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="dashboard">
      <h2>Seller Dashboard</h2>
      <div className="actions">
        <button onClick={() => navigate('/products/add')} className="add-button">Add Product</button>
      </div>
      {products.length === 0 ? (
        <p>No products published yet.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img 
                src={product.images && product.images.length > 0 ? product.images[0] : DEFAULT_IMAGE} 
                alt={product.name} 
                className="product-image"
                onClick={() => navigate(`/products/${product._id}`)}
              />
              <div className="product-details">
                <div className="product-name" onClick={() => navigate(`/products/${product._id}`)}>
                  {product.name}
                </div>
                <div className="product-price">₹{product.price}</div>
                <div className="product-actions">
                  <button onClick={() => navigate(`/products/edit/${product._id}`)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Product Details</h3>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
            <p><strong>Published by:</strong> {selectedProduct.seller.name}</p>
            <div className="product-images">
              <strong>Images:</strong>
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                selectedProduct.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index + 1}`} className="product-image" />
                ))
              ) : (
                <img src={DEFAULT_IMAGE} alt="Default product" className="product-image" />
              )}
            </div>
            <button onClick={handleCloseModal} className="close-button">Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default SellerDashboard;
