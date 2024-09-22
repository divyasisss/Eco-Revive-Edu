// controllers/cartController.js
const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  console.log('Received request to get cart');

  if (!req.user || !req.user.id) {
    console.log('Unauthorized attempt to get cart:', req.ip);
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  const userId = req.user.id;
  console.log(`Fetching cart for user: ${userId}`);

  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      console.log(`No cart found for user ${userId}. Creating new cart.`);
      cart = new Cart({ user: userId, items: [] });
      await cart.save();
      console.log(`New cart created for user ${userId}. Cart ID: ${cart._id}`);
    } else {
      console.log(`Existing cart found for user ${userId}. Cart ID: ${cart._id}`);
    }

    console.log(`Cart for user ${userId} has ${cart.items.length} items`);
    res.json(cart);
  } catch (err) {
    console.error('Failed to fetch cart:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      userId: userId
    });
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
};

const addToCart = async (req, res) => {
  console.log('Received request to add item to cart:', req.body);
  const { productId, quantity } = req.body;

  if (!req.user || !req.user.id) {
    console.log('Unauthorized attempt to add to cart:', req.ip);
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  const userId = req.user.id;
  console.log(`Adding item to cart for user: ${userId}`);

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      console.log(`No cart found for user ${userId}. Creating new cart.`);
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      console.log(`Updating quantity for existing item in cart. Product ID: ${productId}`);
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      console.log(`Adding new item to cart. Product ID: ${productId}`);
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    console.log(`Cart updated successfully for user ${userId}. Cart ID: ${cart._id}`);

    res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (err) {
    console.error('Failed to add item to cart:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      userId: userId,
      productId: productId,
      quantity: quantity
    });
    res.status(500).json({ message: 'Failed to add item to cart', error: err.message });
  }
};

const updateCart = async (req, res) => {
    console.log('Received request to update cart:', req.body);
    const { itemId, quantity } = req.body;
  
    if (!req.user || !req.user.id) {
      console.log('Unauthorized attempt to update cart:', req.ip);
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }
  
    const userId = req.user.id;
    console.log(`Updating cart for user: ${userId}`);
  
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        console.log(`No cart found for user ${userId}.`);
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        console.log(`Item not found in cart. Item ID: ${itemId}`);
        return res.status(404).json({ message: 'Item not found in cart' });
      }
  
      if (quantity > 0) {
        console.log(`Updating quantity for item ${itemId} to ${quantity}`);
        cart.items[itemIndex].quantity = quantity;
      } else {
        console.log(`Removing item ${itemId} from cart`);
        cart.items.splice(itemIndex, 1);
      }
  
      await cart.save();
      console.log(`Cart updated successfully for user ${userId}. Cart ID: ${cart._id}`);
  
      res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (err) {
      console.error('Failed to update cart:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        userId: userId,
        itemId: itemId,
        quantity: quantity
      });
      res.status(500).json({ message: 'Failed to update cart', error: err.message });
    }
  };

module.exports = {
  getCart,
  addToCart,
  updateCart
};