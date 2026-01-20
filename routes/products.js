const express = require('express');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const Product = require('../models/Product');
const verifyManager = require('../middleware/verifyManager');

const router = express.Router();

// get all product
router.get('/', async (req, res) => {
    try {
        const { featured, limit = 6, skip = 0 } = req.query;
        const query = {};

        // convert to number
        const limitNum = Number(limit);
        const skipNum = Number(skip);
        // check if featured products is requested
        if (featured === 'true') query.showOnHome = true;

        // total count of the products
        const total = await Product.countDocuments(query);

        // paginated query
        const products = await Product.find(query, {
            name: 1,
            category: 1,
            price: 1,
            description: 1,
            availableQuantity: 1,
            images: 1
        })
            .skip(skipNum)
            .limit(limitNum)
            .sort({ createdAt: -1 });
        // return response
        res.json({
            success: true,
            total,
            products
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// get products added by the logged-in manager
router.get('/my', verifyFirebaseToken, verifyManager, async (req, res) => {
    try {
        const { limit } = req.query;
        const query = { addedByEmail: req.tokenEmail };

        let productsQuery = Product.find(query, {
            name: 1,
            price: 1,
            images: 1,
            paymentOption: 1
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

// get single product data
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.json({ success: true, product });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
});


// POST : add a product
router.post('/', verifyFirebaseToken, verifyManager, async (req, res) => {
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
        // add email of the manager
        data.addedByEmail = req.tokenEmail;

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