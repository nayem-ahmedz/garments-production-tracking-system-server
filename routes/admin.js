const express = require('express');
const User = require('../models/User');
const router = express.Router();
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// admin routes is protected in 2 layers
// 1. verify firebase token
// 2. verfiy user role and status from database

// list of all users
router.get('/', verifyAdmin, async(req, res) => {
    try{
        const users = await User.find().select('-__v'); // exclude _v = version
        res.json({success: true, users});
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }
});

module.exports = router;