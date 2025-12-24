const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const verifyManager = require('../middleware/verifyManager');
const Product = require('../models/Product');

// udpate a products
router.patch('/products/:id', verifyFirebaseToken, verifyManager, async (req, res) => {
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
router.delete('/products/:id', verifyFirebaseToken, verifyManager, async (req, res) => {
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

module.exports = router;