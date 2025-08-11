const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.get('/login', (req, res) => {
    const message = req.query.message || null;
    res.render('login', { error: null, message });
});
router.get('/register', (req, res) => {
    res.render('register', { error: null });
});
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);

module.exports = router;
