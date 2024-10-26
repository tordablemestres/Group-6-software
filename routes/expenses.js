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
        res.status(500).json({ message: err.message });
    }
});

// POST a new expense
router.post('/', async (req, res) => {
    const expense = new Expense({
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Additional routes (PUT, DELETE) can be added as needed
// Delete an expense by ID
// Eliminar un gasto por ID
router.delete('/:id', async (req, res) => {
    const expenseId = req.params.id;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }
        res.status(200).json({ message: 'Gasto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el gasto:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

module.exports = router;
