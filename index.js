const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const corsOption = {
    origin: [
        'http://localhost:5173'
    ]
}
app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.json({status: 'running', message: 'Welcome to Garments Order and Production Tracker System'});
})

app.listen(port, () => {
    console.log('Garments Order and Production Tracker System is running on port', port);
})