const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  sessionId: { type: String }, // Untuk pengguna tanpa login
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Untuk pengguna login
  items: [cartItemSchema]
});

cartSchema.index({ userId: 1, sessionId: 1 }, { unique: true });


module.exports = mongoose.model('Cart', cartSchema);
