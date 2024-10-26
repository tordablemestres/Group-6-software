// ExpensesList.js
import React from 'react';
import axios from 'axios';

function ExpensesList({ expenses, setExpenses, totalExpenses, setTotalExpenses }) {

    const handleDelete = async (expenseId, amount) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este gasto?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/expenses/${expenseId}`);
            // Remover el gasto eliminado del estado
            setExpenses(expenses.filter((expense) => expense._id !== expenseId));
            // Actualizar el total de gastos
            setTotalExpenses(totalExpenses - amount);
        } catch (error) {
            console.error('Error al eliminar el gasto:', error);
            alert('Error al eliminar el gasto');
        }
    };

    return (
        <div className="expenses-list">
            <h2>Lista de Gastos</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        {expense.description}: ${expense.amount}
                        <button onClick={() => handleDelete(expense._id, expense.amount)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExpensesList;
