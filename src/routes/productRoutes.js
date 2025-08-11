const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Render halaman product dengan EJS
router.get('/', productController.renderProductsPage);

// API JSON untuk ambil produk bisa pakai route lain
router.get('/api', productController.getAllProducts); 
// atau sesuai yang kamu inginkan

// Route API lain tetap seperti biasa
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
