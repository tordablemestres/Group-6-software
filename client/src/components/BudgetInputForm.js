// client/src/components/BudgetInputForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BudgetInputForm() {
    const [budget, setBudget] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    // Función para obtener todos los gastos al cargar el componente
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await axios.get('/api/expenses');
                setExpenses(res.data);
                // Calcular el total de gastos
                const total = res.data.reduce((acc, expense) => acc + expense.amount, 0);
                setTotalExpenses(total);
            } catch (err) {
                console.error(err);
            }
        };
        fetchExpenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExpense = {
            amount: parseFloat(amount),
            description,
            category,
        };
        try {
            const res = await axios.post('/api/expenses', newExpense);
            setExpenses([...expenses, res.data]);
            setTotalExpenses(totalExpenses + parseFloat(amount));
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Gestión de Presupuesto</h2>
            <div>
                <label>Presupuesto Total:</label>
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                />
            </div>
            <h3>Total de Gastos: {totalExpenses}</h3>
            <h3>Presupuesto Restante: {budget - totalExpenses}</h3>

            <h2>Agregar Gasto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>

            <h2>Lista de Gastos</h2>
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
