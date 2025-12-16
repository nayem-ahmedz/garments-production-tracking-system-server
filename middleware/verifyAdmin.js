const User = require("../models/User");

async function verifyAdmin(req, res, next) {
    const loggedInUser = await User.findOne({ email: req.tokenEmail });
    if (!loggedInUser || loggedInUser.role !== 'admin' || loggedInUser.status !== 'active') {
        return res.status(403).json({ message: 'Forbidden access: Admins only' });
    }
    next();
}

module.exports = verifyAdmin;