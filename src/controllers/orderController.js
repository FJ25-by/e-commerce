const Order = require('../models/order');

exports.createOrder = async (orderData) => {
  const order = new Order({
    userId: orderData.userId,
    products: orderData.productIds.map(id => ({ productId: id, quantity: 1 })), // disesuaikan
    status: orderData.status?.toLowerCase() || 'pending'
  });
  await order.save();
  return order;
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('products.productId');

    res.render('orderHistory', {
      user: req.session.user,
      orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving order history');
  }
};
