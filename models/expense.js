// models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    category: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);
