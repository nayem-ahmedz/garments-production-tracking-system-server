const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        photoURL: { type: String, default: "" },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        status: {
            type: String,
            enum: ["pending", "active", "rejected", "suspended"], // added suspended
            default: "pending"
        },
        role: { type: String, enum: ["buyer", "manager", "admin"], default: "buyer" },
        suspendReason: { type: String, default: "" },   // for suspension reason
        suspendFeedback: { type: String, default: "" }  // for feedback to user
    },
    { timestamps: true }
);


module.exports = mongoose.model('User', UserSchema);