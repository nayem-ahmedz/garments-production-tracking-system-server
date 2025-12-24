const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/vercel-db');


// importing api routes
const adminRoutes = require('./routes/admin');
const managerRoutes = require('./routes/manager');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/order');

const port = process.env.PORT || 3000;

// middleware
const corsOption = {
    origin: process.env.FRONTEND_LINK
}
app.use(cors(corsOption));
app.use(express.json());

// connect the db, not app listen
connectDB();

// root api
app.get('/', (req, res) => {
    res.json({status: 'running', message: 'Welcome to Garments Order and Production Tracker System'});
})

// users API
app.use('/api/users', userRoutes);

// admin API
app.use('/api/admin', adminRoutes);

// manager API
app.use('/api/manager', managerRoutes);

// products API
app.use('/api/products', productRoutes);

// orders API
app.use('/api/orders', orderRoutes);

// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

module.exports = app;