const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true, min: 0 },
    moq: { type: Number, required: true, min: 1 },
    demoVideoLink: { type: String },
    paymentOption: { type: String, enum: ["Cash on Delivery", "Pay First"], required: true },
    showOnHome: { type: Boolean, default: false },
    size: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] },
    color: String,
    fabric: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    addedByEmail: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);