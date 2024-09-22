// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config';
import './ProductForm.css';

const ProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '', images: [] });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data);
    } catch (err) {
      console.error('Failed to fetch product', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({ ...prevProduct, images: [...prevProduct.images, ...files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        if (key === 'images') {
          product.images.forEach((image, index) => {
            if (image instanceof File) {
              formData.append('images', image);
            } else {
              formData.append(`existingImages[${index}]`, image);
            }
          });
        } else {
          formData.append(key, product[key]);
        }
      });

      if (id) {
        await axios.put(`${config.apiUrl}/products/${id}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      } else {
        await axios.post(`${config.apiUrl}/products/add`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      navigate('/seller-dashboard');
    } catch (err) {
      console.error('Failed to submit product', err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
          />
          <div className="image-preview">
            {product.images.map((image, index) => (
              <img 
                key={index} 
                src={image instanceof File ? URL.createObjectURL(image) : image} 
                alt={`Preview ${index + 1}`} 
              />
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {id ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={() => navigate('/seller-dashboard')} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;