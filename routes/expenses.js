// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        console.error('Error fetching expenses:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new expense
router.post('/', async (req, res) => {
    const { amount, description, category } = req.body;

    if (!description || !category || isNaN(amount)) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const expense = new Expense({
        amount,
        description,
        category,
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        console.error('Error adding expense:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// DELETE an expense
router.delete('/:id', async (req, res) => {
    const expenseId = req.params.id;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
