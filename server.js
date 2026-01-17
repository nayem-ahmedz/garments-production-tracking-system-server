require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

// start the server after database is connected
// connectDB()
//   .then(() => {
//     app.listen(port, () => {
//     console.log('Garments Order and Production Tracker System is running on port', port);
// })
//   })
//   .catch(err => {
//     console.error('DB connection failed!', err);
//     process.exit(1); // stop the app
//   })