// controllers/productController.js

const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const readStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
    });
    readStream.pipe(writeStream);
  });
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Failed to fetch product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const addProduct = async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request files:', req.files);
  
  const { name, description, price } = req.body;
  const seller = req.user.id;
  const files = req.files;

  console.log('Extracted data:');
  console.log('Name:', name);
  console.log('Description:', description);
  console.log('Price:', price);
  console.log('Seller:', seller);
  console.log('Files:', files);

  try {
    let imageUrls = [];
    if (files && files.length > 0) {
      console.log('Uploading files to Cloudinary...');
      imageUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file.buffer))
      );
      console.log('Uploaded image URLs:', imageUrls);
    } else {
      console.log('No files uploaded');
    }

    console.log('Creating new product...');
    const newProduct = new Product({
      name,
      description,
      price,
      seller,
      images: files ? imageUrls.map(image => image.secure_url) : []
    });

    console.log('Saving new product...');
    await newProduct.save();
    console.log('Product saved successfully');
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Failed to add product:', err);
    if (err.name === 'ValidationError') {
      console.log('Validation error details:', err.errors);
    }
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Failed to fetch products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


const getSellerProducts = async (req, res) => {
  try {
    console.log('Fetching products for seller:', req.user.id);
    const sellerId = req.user.id;

    const products = await Product.find({ seller: sellerId })
      .sort({ createdAt: -1 });

    console.log(`Found ${products.length} products for seller ${sellerId}`);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const files = req.files;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (files && files.length > 0) {
      const newImageUrls = await Promise.all(
        files.map(file => uploadToCloudinary(file.buffer))
      );
      product.images = [...product.images, ...newImageUrls.map(image => image.secure_url)];
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    console.error('Failed to update product:', err);
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const sellerId = req.user.id;

  try {
    const product = await Product.findOne({ _id: productId, seller: sellerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to delete it' });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Failed to delete product:', err);
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

module.exports = {
  getProductById,
  addProduct,
  getAllProducts,
  getSellerProducts,
  updateProduct,
  deleteProduct
};
