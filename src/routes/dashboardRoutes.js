const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) return next();
    res.redirect('/auth/login');
}

// ✅ Route untuk /dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const products = await Product.find();
        const user = req.session.user;
        
        res.render('dashboard', {
            user,
            products
        });
    } catch (error) {
        console.error('Gagal memuat dashboard:', error);
        res.status(500).send('Gagal memuat dashboard');
    }
});

module.exports = router;
