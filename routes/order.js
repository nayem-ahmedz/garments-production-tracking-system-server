const express = require('express');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const Order = require('../models/Order');
const verifyManager = require('../middleware/verifyManager');
const router = express.Router();

// GET orders by query=status
router.get('/', verifyFirebaseToken, verifyManager, async (req, res) => {
    try {
        const status = req.query.status || 'pending';
        const orders = await Order.find({ status }).sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Fetch orders error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders'
        });
    }
});

// PATCH
// handle approval
router.patch('/:id', verifyFirebaseToken, verifyManager, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }
        const updates = { status };
        if (status === 'approved') {
            updates.approvedAt = new Date();
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({
            success: true,
            message: `Order ${status} successfully`,
            order: updatedOrder
        });
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update order'
        });
    }
});

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

// POST tracking info for a specific order
router.post('/:id/tracking', verifyFirebaseToken, verifyManager, async (req, res) => {
    try {
        const { id } = req.params;
        const { location, note, datetime, status } = req.body;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        order.tracking = order.tracking || [];
        order.tracking.push({ location, note, datetime, status });
        await order.save();
        res.json({
            success: true,
            message: 'Tracking info added successfully',
            tracking: order.tracking
        });
    } catch (err) {
        console.error('Add tracking error:', err);
        res.status(500).json({ success: false, message: 'Failed to add tracking info' });
    }
});

module.exports = router;