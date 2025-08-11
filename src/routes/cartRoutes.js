// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Middleware untuk memastikan user login
function ensureLoggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect('/auth/login');
}

// Debug cek fungsi di controller
console.log('Cart Controller Keys:', Object.keys(cartController));

router.get('/', ensureLoggedIn, cartController.viewCart);
router.post('/add', ensureLoggedIn, cartController.addItemToCart);
router.post('/remove/:productId', ensureLoggedIn, cartController.removeItemFromCart);

// ✅ Pastikan ini ada di cartController
if (typeof cartController.updateItemQuantityAjax === 'function') {
  router.post('/update-ajax', ensureLoggedIn, cartController.updateItemQuantityAjax);
} else {
  console.error('❌ updateItemQuantityAjax tidak ditemukan di cartController!');
}

// Clear cart
router.post('/clear', ensureLoggedIn, cartController.clearCart);

module.exports = router;
