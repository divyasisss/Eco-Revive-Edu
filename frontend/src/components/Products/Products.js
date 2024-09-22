import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Products.css";
import config from '../../config/config'
import '../Toast/Toast.css';
import Toast from '../Toast/Toast';

const DEFAULT_IMAGE = 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.apiUrl}/products/`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`${config.apiUrl}/cart/add`, {
        productId: productId,
        quantity: 1
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      
      console.log('Product added to cart:', response.data);
      setToast({ show: true, message: 'Product added to cart successfully!', type: 'success' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setToast({ show: true, message: 'Failed to add product to cart. Please try again.', type: 'error' });
    }
  };

  const handleCloseToast = () => {
    setToast({ show: false, message: '', type: '' });
  };


  return (
    <div>
      {/* Products */}
      <div className="products-container">
        {/* <h2 className="heading">Our Products</h2> */}
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <Link to={`/products/${product._id}`}>
                  <img src={product.images && product.images.length > 0 ? product.images[0] : DEFAULT_IMAGE} 
                  alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                </Link>
                <button 
                  className="btn" 
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
            {toast.show && (
                  <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={handleCloseToast}
                  />
                )}
          </div>
        )}
      </div>

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
};

export default Products;
