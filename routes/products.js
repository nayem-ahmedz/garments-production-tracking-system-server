const express = require('express');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const Product = require('../models/Product');

const router = express.Router();

// get all product
router.get('/', async (req, res) => {
    try {
        const { featured, limit } = req.query;
        const query = {};
        // check if featured products is requested
        if(featured === 'true') query.showOnHome = true; 
        let productsQuery = Product.find(query, {
            name: 1,
            category: 1,
            price: 1,
            description: 1,
            availableQuantity: 1,
            images: 1
        });
        // check limit exist
        if(limit){
            productsQuery = productsQuery.limit(Number(limit));
        }
        const products = await productsQuery.exec();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

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