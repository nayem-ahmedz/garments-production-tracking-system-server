const express = require('express');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const Order = require('../models/Order');
const router = express.Router();

// GET
// get my order : buyer
router.get('/my', verifyFirebaseToken, async (req, res) => {
    try {
        const userEmail = req.tokenEmail;
        const orders = await Order.find(
            { buyerEmail: userEmail },
            { _id: 1, productName: 1, quantity: 1, status: 1, totalPrice: 1 }
        ).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


// POST : place an order
router.post('/', verifyFirebaseToken, async (req, res) => {
    try {
        const {
            productId,
            productName,
            price,
            quantity,
            totalPrice,
            buyerEmail,
            firstName,
            lastName,
            contactNumber,
            address,
            notes
        } = req.body;
        // Basic validation
        if (!productId || !productName || !price || !quantity || !totalPrice || !buyerEmail || !firstName || !lastName || !contactNumber || !address) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        const newOrder = new Order({
            productId,
            productName,
            price,
            quantity,
            totalPrice,
            buyerEmail,
            firstName,
            lastName,
            contactNumber,
            address,
            notes,
            status: 'pending'
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order: savedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;