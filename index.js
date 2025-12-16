const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

// firebase admin



// importing api routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const port = process.env.PORT || 3000;

// middleware
const corsOption = {
    origin: [
        'http://localhost:5173'
    ]
}
app.use(cors(corsOption));
app.use(express.json());

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

// start the server after database is connected
connectDB()
  .then(() => {
    app.listen(port, () => {
    console.log('Garments Order and Production Tracker System is running on port', port);
})
  })
  .catch(err => {
    console.error('DB connection failed!', err);
    process.exit(1); // stop the app
  })