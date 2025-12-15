const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, photoURL, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        // Create a user
        const user = await User.create({
            name,
            email,
            photoURL: photoURL || '',
            role: role || 'buyer',
            status: 'pending'
        });
        res.status(201).json({
            success: true,
            message: 'User is added',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to add user' });
    }
});

module.exports = router;