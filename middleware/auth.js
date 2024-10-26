// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your JWT secret
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;
