// src/components/BudgetInputForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetInputForm.css';

function BudgetInputForm() {
    const [budget, setBudget] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    // Fetch expenses on component mount
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await axios.get('/api/expenses');
                setExpenses(res.data);
                // Calculate total expenses
                const total = res.data.reduce((acc, expense) => acc + expense.amount, 0);
                setTotalExpenses(total);
            } catch (err) {
                console.error('Error fetching expenses:', err);
            }
        };
        fetchExpenses();
    }, []);

    // Add a new expense
    const handleAddExpense = async (e) => {
        e.preventDefault();
        const newExpense = {
            amount: parseFloat(amount),
            description: description.trim(),
            category: category.trim(),
        };
        if (!newExpense.description || !newExpense.category || isNaN(newExpense.amount)) {
            alert('Please fill in all fields with valid data.');
            return;
        }
        try {
            const res = await axios.post('/api/expenses', newExpense);
            setExpenses([...expenses, res.data]);
            setTotalExpenses(totalExpenses + newExpense.amount);
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (err) {
            console.error('Error adding expense:', err);
            alert('Error adding expense. Please try again.');
        }
    };

    // Delete an expense
    const handleDelete = async (expenseId, amount) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/expenses/${expenseId}`);
            // Remove the deleted expense from the state
            setExpenses(expenses.filter((expense) => expense._id !== expenseId));
            // Update total expenses
            setTotalExpenses(totalExpenses - amount);
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Error deleting expense');
        }
    };

    return (
        <div className="budget-input-form">
            <h2>Expenses</h2>
            <table className="expenses-table">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id}>
                        <td>{expense.description}</td>
                        <td>{expense.category}</td>
                        <td>${expense.amount}</td>
                        <td>
                            <button onClick={() => handleDelete(expense._id, expense.amount)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Add New Expense Form */}
            <form onSubmit={handleAddExpense} className="add-expense-form">
                <table className="expenses-table">
                    <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category"
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                                step="0.01"
                                required
                            />
                        </td>
                        <td>
                            <button type="submit">Add</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            {/* Budget Input and Remaining Budget */}
            <div className="budget-summary">
                <div>
                    <label>Total Budget:</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(parseFloat(e.target.value) || '')}
                        placeholder="Enter budget"
                    />
                </div>
                <h3>Remaining Budget: ${budget - totalExpenses || 0}</h3>
            </div>
        </div>
    );
}

export default BudgetInputForm;
