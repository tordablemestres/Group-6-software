import expenseService from '../services/expenseService';  // Asegúrate de la ruta correcta

import React, { useState } from 'react';

const BudgetInputForm = () => {
    const [budget, setBudget] = useState(0);  // Almacena el presupuesto total
    const [expenseName, setExpenseName] = useState('');  // Almacena el nombre del gasto
    const [expenseAmount, setExpenseAmount] = useState(0);  // Almacena la cantidad del gasto

    const handleBudgetChange = (e) => {
        setBudget(parseFloat(e.target.value));  // Actualiza el presupuesto
    };

    const handleExpenseNameChange = (e) => {
        setExpenseName(e.target.value);  // Actualiza el nombre del gasto
    };

    const handleExpenseAmountChange = (e) => {
        setExpenseAmount(e.target.value);  // Actualiza la cantidad del gasto
    };

    // Aquí manejamos lo que sucede cuando se envía el formulario
    const handleAddExpense = async () => {
        if (expenseName && expenseAmount > 0) {
            const newExpense = {
                description: expenseName,
                amount: parseFloat(expenseAmount),
            };
            try {
                const savedExpense = await expenseService.addExpense(newExpense);  // Enviar el gasto al backend
                console.log("Expense added successfully:", savedExpense);  // Mostrar en consola para verificar
                setExpenseName('');  // Limpiar campos de entrada
                setExpenseAmount(0);
            } catch (error) {
                console.error("Error adding expense:", error);
            }
        }
    };


    return (
        <div>
            <h2>Budget Management</h2>
            <div>
                <label>Total Budget:</label>
                <input
                    type="number"
                    value={budget}
                    onChange={handleBudgetChange}
                    placeholder="Enter your total budget"
                />
            </div>

            <div>
                <label>Expense Name:</label>
                <input
                    type="text"
                    value={expenseName}
                    onChange={handleExpenseNameChange}
                    placeholder="Enter expense description"
                />
                <label>Amount:</label>
                <input
                    type="number"
                    value={expenseAmount}
                    onChange={handleExpenseAmountChange}
                    placeholder="Enter expense amount"
                />
                <button onClick={handleAddExpense}>Add Expense</button>
            </div>
        </div>
    );
};

export default BudgetInputForm;
