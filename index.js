const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

// importing api routes
const userRoutes = require('./routes/user');

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