import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config'

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/products`);
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (product) => {
    try {
      const response = await axios.get(`${config.apiUrl}/products/${product._id}`);
      setSelectedProduct(response.data);
    } catch (err) {
      console.error('Failed to fetch product details', err);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="dashboard-container">
      <h2>Buyer Dashboard</h2>
      {products.length === 0 ? (
        <div>
          <p>No products available yet. Please come back later.</p>
        </div>
      ) : (
        <div className="product-list">
          <h3>Available Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product._id} className="product-item">
                <span onClick={() => handleProductClick(product)}>{product.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedProduct && (
        <div className="product-details-modal modal">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <p><strong>Published by:</strong> {selectedProduct.seller.name}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
