// routes/order.js

const express = require('express');
const router = express.Router();
const { addOrder, getOrdersByUser } = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/add', verifyToken, addOrder); // Correctly defining the post route
router.get('/user', verifyToken, getOrdersByUser);

module.exports = router;
