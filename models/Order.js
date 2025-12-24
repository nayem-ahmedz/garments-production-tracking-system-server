const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  buyerEmail: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'inProduction', 'shipped', 'delivered'],
    default: 'pending'
  },
  approvedBy: { type: String }, // manager/admin email
  approvedAt: { type: Date }, // timestamp when approved
  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  tracking: {
    type: [
      {
        location: { type: String },
        note: { type: String },
        datetime: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: [
            "Cutting Completed",
            "Sewing Started",
            "Finishing",
            "QC Checked",
            "Packed",
            "Shipped",
            "Out for Delivery"
          ]
        }
      }
    ],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);