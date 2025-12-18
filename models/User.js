const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,   // User must provide a name
            trim: true
        },
        photoURL: {
            type: String,
            default: ""       // Optional, default empty string
        },
        email: {
            type: String,
            required: true,
            unique: true,     // No two users can have same email
            lowercase: true,  // Converts email to lowercase
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "active", "rejected"], // restrict values
            default: "pending"  // Default is "pending"
        },
        role: {
            type: String,
            enum: ["buyer", "manager", "admin"], // restrict roles
            default: "buyer"
        }
    },
    {
        timestamps: true // Adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model('User', UserSchema);