const express = require('express');
const session = require('express-session');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // ✅ tambahkan ini
const databaseConfig = require('../config/database');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to the database
mongoose.connect(databaseConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'KyRiKnsiGNjmvrx9',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
const foodRouter = require('./routes/food');
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
app.use(foodRouter);
app.use('/products', productRoutes);
app.use('/', dashboardRoutes); // ✅ tambahkan ini

// Home route
app.get('/', (req, res) => {
    res.render('home');
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
