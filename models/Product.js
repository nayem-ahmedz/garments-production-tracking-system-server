const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    images: {
      type: [String],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    color: String,
    fabric: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);