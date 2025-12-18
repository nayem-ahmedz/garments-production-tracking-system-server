const express = require('express');
const User = require('../models/User');
const router = express.Router();
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// admin routes is protected in 2 layers
// 1. verify firebase token
// 2. verfiy user role and status from database

// list of all users
router.get('/',verifyFirebaseToken, verifyAdmin, async(req, res) => {
    try{
        const users = await User.find().select('-__v'); // exclude _v = version
        res.json({success: true, users});
    } catch(err) {
        res.status(500).json({success: false, error: err.message});
    }
});

// update user role
router.patch('/:id', verifyFirebaseToken, verifyAdmin, async(req, res) => {
    try{
        const { id } = req.params;
        const { role, status } = req.body;

        // creating updateFields with provided update field/values
        const updateFields = {};
        if (role) updateFields.role = role;
        if (status) updateFields.status = status;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }
        // console.log(id, updateFields);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;