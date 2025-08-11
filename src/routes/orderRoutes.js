const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const Cart = require('../models/cart');

// Middleware cek login
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
}

// Buat pesanan dari keranjang
router.post('/place', requireLogin, async (req, res) => {
  try {
    const userId = req.session.userId;

    let productIds = req.body.productIds;

    if (productIds) {
      // Pesan langsung dari form "Pesan"
      if (!Array.isArray(productIds)) {
        productIds = [productIds];
      }
    } else {
      // Pesan dari isi cart
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart || cart.items.length === 0) {
        return res.redirect('/cart');
      }
      productIds = cart.items.map(item => item.productId._id);

      // Kosongkan cart setelah order nanti
      cart.items = [];
      await cart.save();
    }

    const newOrder = {
      userId,
      productIds,
      status: 'pending'
    };

    await orderController.createOrder(newOrder);

    res.redirect('/orders/history/' + userId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal memproses pesanan');
  }
});


// Halaman riwayat order
router.get('/history/:userId', requireLogin, orderController.getOrderHistory);

module.exports = router;
