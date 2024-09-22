// controllers/orderController.js

const Order = require('../models/Order');

const addOrder = async (req, res) => {
  console.log('Received request to add order:', req.body);
  const { productId, quantity } = req.body;

  if (!req.user || !req.user.id) {
    console.log('Unauthorized attempt to add order:', req.ip);
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  const userId = req.user.id;
  console.log(`Adding order for user: ${userId}`);

  try {
    const newOrder = new Order({ productId, quantity, user: userId });
    console.log('New order object created:', newOrder);

    await newOrder.save();
    console.log('Order saved successfully. Order ID:', newOrder._id);

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (err) {
    console.error('Failed to add order:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      userId: userId,
      productId: productId,
      quantity: quantity
    });
    res.status(500).json({ message: 'Failed to add order', error: err.message });
  }
};

const getOrdersByUser = async (req, res) => {
  console.log('Received request to get orders for user:', req.user?.id);
  
  if (!req.user || !req.user.id) {
    console.log('Unauthorized attempt to get orders:', req.ip);
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  const userId = req.user.id;

  try {
    console.log(`Fetching orders for user: ${userId}`);
    const orders = await Order.find({ user: userId });
    console.log(`Found ${orders.length} orders for user ${userId}`);

    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch user orders:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      userId: userId
    });
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = {
  addOrder,
  getOrdersByUser
};