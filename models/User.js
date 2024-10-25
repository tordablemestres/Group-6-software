// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash the password before saving the user model
UserSchema.pre('save', async function (next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Replace the plain password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password for login
UserSchema.methods.isValidPassword = async function (password) {
    try {
        // Compare the hashed password
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('User', UserSchema);
