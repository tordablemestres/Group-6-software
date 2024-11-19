// client/src/components/BudgetInputForm.js
import React, { useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
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
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const expenses = await expenseService.getExpenses();
            setExpenses(expenses);
            const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
            setTotalExpenses(total);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExpense = {
            amount: parseFloat(amount),
            description,
            category,
        };
        try {
            const addedExpense = await expenseService.addExpense(newExpense);
            setExpenses([...expenses, addedExpense]);
            setTotalExpenses(totalExpenses + parseFloat(amount));
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="budget-container">
            <h2>Budget Management</h2>
            <div>
                <label>Total Budget:</label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                />
            </div>
            <h3>Total Expenses: {totalExpenses}</h3>
            <h3>Remaining Budget: {budget - totalExpenses}</h3>

            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>

            <h2>Expense List</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.description}: ${expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BudgetInputForm;
