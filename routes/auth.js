// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user without hashing the password here
        user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Use the isValidPassword method to compare passwords
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Passwords match, login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
