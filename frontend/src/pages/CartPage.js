// CartPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart. Please try again later.');
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.put(`${config.apiUrl}/cart/update`, {
        itemId,
        quantity: newQuantity
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchCart(); // Refresh cart after update
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const totalPrice = cart ? cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0) : 0;

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {loading && <p>Loading cart...</p>}
      {error && <p>{error}</p>}
      {cart && cart.items.length === 0 && <p>Your cart is empty.</p>}
      {cart && cart.items.length > 0 && (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.product.images[0]} alt={item.product.name} className="item-image" />
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.product.name}</h3>
                    <p className="item-price">₹{item.product.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} disabled={item.quantity <= 0}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <p className="item-total">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button className="order-button">Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;