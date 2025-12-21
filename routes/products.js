const express = require('express');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const Product = require('../models/Product');

const router = express.Router();

// add a product
router.post('/', verifyFirebaseToken, async (req, res) => {
    try {
        const data = req.body;
        // validate images
        if (!data.images || data.images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required"
            });
        }
        data.demoVideoLink = data.demoVideoLink || "";
        const product = new Product(data);
        await product.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;