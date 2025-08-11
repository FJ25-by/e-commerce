const Product = require('../models/product');

// Function to search for products (API JSON)
exports.searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({ name: new RegExp(query, 'i') });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Function to add a new product (API JSON)
exports.addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const newProduct = new Product({ name, price, description, category });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Function to retrieve product details (API JSON)
exports.getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product details', error });
  }
};

// Render halaman produk dengan EJS (main route /products)
exports.renderProductsPage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', {
      products,
      user: req.session.user || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal memuat produk');
  }
};

// Get all products (API JSON)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Update a product (API JSON)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product (API JSON)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Alias getProductById sama dengan getProductDetails
exports.getProductById = exports.getProductDetails;
