
const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middleware/authMiddleware');
const ProductController = require('../controllers/productController');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Protected route requiring authentication token
router.post('/add', verifyToken, upload.array('images', 5), ProductController.addProduct);

// Fetch all products
router.get('/', ProductController.getAllProducts);

// Fetch products by seller
router.get('/seller', verifyToken, ProductController.getSellerProducts);

// Fetch a product
router.get('/:id', ProductController.getProductById);

// Update product details
router.put('/:id', verifyToken, upload.array('images', 5), ProductController.updateProduct);

// Delete product
router.delete('/:id', verifyToken, ProductController.deleteProduct);

module.exports = router;