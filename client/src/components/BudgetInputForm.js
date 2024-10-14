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
    const handleAddExpense = () => {
        if (expenseName && expenseAmount > 0) {
            // Lógica para agregar el gasto
            // (Se conectará con el backend en los pasos siguientes)
            console.log("Gasto añadido:", expenseName, expenseAmount);
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
