import React, { useState } from 'react';
import axios from 'axios';
import config from '../config/config'

const AddProductPage = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post(`${config.apiUrl}/products/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Product added successfully to your store.');
      setFormData({ name: '', description: '', price: '' });
    } catch (err) {
      console.error('Failed to add product:', err);
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
