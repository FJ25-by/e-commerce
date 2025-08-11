// routes/food.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/food', async (req, res) => {
  try {
    // Ambil produk kategori food dari MongoDB
    const products = await Product.find({ category: 'food' });
    res.render('food', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data produk');
  }
});

module.exports = router;
