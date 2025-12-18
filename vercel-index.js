const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/vercel-db');


// importing api routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const port = process.env.PORT || 3000;

// middleware
const corsOption = {
    origin: process.env.FRONTEND_LINK
}
app.use(cors(corsOption));
app.use(express.json());

// connect DB (no listen)
connectDB();

// root api
app.get('/', (req, res) => {
    res.json({status: 'running', message: 'Welcome to Garments Order and Production Tracker System'});
})

// users API
app.use('/api/users', userRoutes);

// admin API
app.use('/api/admin/users', adminRoutes);

// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

module.exports = app;