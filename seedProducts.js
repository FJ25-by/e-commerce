// seedProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/product');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Terhubung ke MongoDB Atlas');

    // Hapus produk lama
    await Product.deleteMany({});
    console.log('🗑️ Semua produk lama dihapus');

    // Produk baru
    const products = [
      {
        name: 'BASRENG / BAKSO GORENG 100 gr',
        price: 6500,
        description: 'Snack gurih dan renyah',
        category: 'food',
        image: 'basreng.jpg',
      },
      {
        name: 'Nasi Goreng Spesial',
        price: 25000,
        description: 'Nasi goreng dengan telur dan ayam',
        category: 'food',
        image: 'nasigoreng.jpg',
      },
      {
        name: 'Sate Ayam Madura',
        price: 30000,
        description: 'Sate ayam khas Madura dengan bumbu kacang',
        category: 'food',
        image: 'sateayam.jpg',
      },
      {
        name: 'Her Lip Glow Lip Gloss Glitter',
        price: 6990,
        description: 'Lip gloss cantik berkilau',
        category: 'drink', // masih minuman
        image: 'lipgloss.jpg',
      },
      {
        name: 'TWS Wireless Bluetooth Earphone',
        price: 20900,
        description: 'Earphone bluetooth kualitas tinggi',
        category: 'drink',
        image: 'earphone.jpg',
      },
      {
        name: '24pcs 3D Kuku Palsu Grosir',
        price: 6999,
        description: 'Kuku palsu 3D dengan desain cantik',
        category: 'drink',
        image: 'kuku.jpg',
      },
    ];

    await Product.insertMany(products);
    console.log('✅ Produk berhasil ditambahkan ke database');

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Gagal menambahkan produk:', err);
    mongoose.connection.close();
  }
}

seed();
