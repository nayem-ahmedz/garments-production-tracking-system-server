const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const verifyAdmin = require('../middleware/verifyAdmin');

// admin routes is protected in 2 layers
// 1. verify firebase token
// 2. verfiy user role and status from database

// list of all users
router.get('/users', verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-__v'); // exclude _v = version
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// // update user role
// router.patch('/users/:id', verifyFirebaseToken, verifyAdmin, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { role, status } = req.body;

//         // creating updateFields with provided update field/values
//         const updateFields = {};
//         if (role) updateFields.role = role;
//         if (status) updateFields.status = status;

//         if (Object.keys(updateFields).length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No valid fields to update'
//             });
//         }
//         // console.log(id, updateFields);

//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             { $set: updateFields },
//             { new: true, runValidators: true }
//         ).select('-__v');

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         res.json({
//             success: true,
//             message: 'User updated successfully',
//             user: updatedUser
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             error: err.message
//         });
//     }
// });

// update user role or suspend
router.patch('/users/:id', verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { role, status, suspendReason, suspendFeedback } = req.body;
        // create updateFields with provided update field/values
        const updateFields = {};
        if (role) updateFields.role = role;
        if (status) updateFields.status = status;
        // add suspend info if status is suspended
        if (status === 'suspended') {
            if (!suspendReason || !suspendFeedback) {
                return res.status(400).json({
                    success: false,
                    message: 'Suspend reason and feedback are required'
                });
            }
            updateFields.suspendReason = suspendReason;
            updateFields.suspendFeedback = suspendFeedback;
        }
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }
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
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// get products added by the managers | admin route
router.get('/products', verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
        const { limit } = req.query;
        let productsQuery = Product.find({}, {
            name: 1,
            price: 1,
            images: 1,
            category: 1,
            showOnHome: 1,
            addedByEmail: 1
        });
        if (limit) {
            productsQuery = productsQuery.limit(Number(limit));
        }
        const products = await productsQuery.exec();
        res.json({ success: true, products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// udpate a products
router.patch('/products/:id', verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, product: updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// delete a product
router.delete('/products/:id', verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.json({
            success: true,
            message: 'Product deleted successfully',
            productId: id,
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
        });
    }
});

// dashboard stats
// routes/adminDashboard.js
router.get("/dashboard-stats", verifyFirebaseToken, verifyAdmin, async (req, res) => {
    try {
      const adminCount = await User.countDocuments({ role: "admin" });
      const managerCount = await User.countDocuments({ role: "manager" });
      const buyerCount = await User.countDocuments({ role: "buyer" });

      const totalProducts = await Product.countDocuments();
      const totalOrders = await Order.countDocuments();
      res.json({
        success: true,
        users: {
          admin: adminCount,
          manager: managerCount,
          buyer: buyerCount,
        },
        products: totalProducts,
        orders: totalOrders,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
      res.status(500).json({
        success: false,
        message: "Failed to load dashboard stats",
      });
    }
  }
);

module.exports = router;