const User = require("../models/User");

async function verifyManager(req, res, next) {
    const loggedInUser = await User.findOne({ email: req.tokenEmail });
    if (!loggedInUser || loggedInUser.role !== 'manager' || loggedInUser.status !== 'active') {
        return res.status(403).json({ message: 'Forbidden access: Manager only' });
    }
    next();
}

module.exports = verifyManager;