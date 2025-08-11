const Cart = require('../models/cart');
const Product = require('../models/product');

// Helper untuk dapatkan query cart berdasarkan login/guest
function getCartQuery(req) {
  if (req.session.userId) {
    return { userId: req.session.userId };
  } else {
    return { sessionId: req.sessionID };
  }
}

// ✅ View Cart
exports.viewCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const cart = await Cart.findOne(query).populate('items.productId');

    let totalPrice = 0;
    let validItems = [];
    if (cart && cart.items.length > 0) {
      validItems = cart.items.filter(item => item.productId !== null);
      totalPrice = validItems.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
      }, 0);
    }

    res.render('cart', {
      cartItems: validItems,
      totalPrice
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal memuat keranjang');
  }
};


// ✅ Add Item to Cart
exports.addItemToCart = async (req, res) => {
  try {
    const productId = req.body.productId;
    if (!productId) {
      return res.status(400).send('Product ID tidak ditemukan');
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Produk tidak ditemukan');
    }

    const query = getCartQuery(req);
    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({ ...query, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal menambahkan produk ke keranjang');
  }
};

// ✅ Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const productId = req.params.productId;

    await Cart.updateOne(query, { $pull: { items: { productId } } });
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal menghapus item dari keranjang');
  }
};

// ✅ Update Quantity via AJAX
exports.updateItemQuantityAjax = async (req, res) => {
  try {
    const query = getCartQuery(req);
    const { productId, action } = req.body;

    const cart = await Cart.findOne(query).populate('items.productId');
    if (!cart) return res.json({ success: false });

    // filter valid items dulu
    const validItems = cart.items.filter(i => i.productId !== null);

    const item = validItems.find(i => i.productId._id.toString() === productId);
    if (!item) return res.json({ success: false });

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      item.quantity = Math.max(item.quantity - 1, 1);
    }

    await cart.save();

    const totalPrice = validItems.reduce((sum, i) => sum + i.productId.price * i.quantity, 0);

    res.json({
      success: true,
      newQuantity: item.quantity,
      totalPrice
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};


// ✅ Clear Cart
exports.clearCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    let cart = await Cart.findOne(query);

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Gagal mengosongkan keranjang');
  }
};
