// routes/cart.js

const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware');

// Get user's cart
router.get('/', verifyToken, getCart);

// Add item to cart
router.post('/add', verifyToken, addToCart);

router.put('/update', verifyToken, updateCart);

module.exports = router;