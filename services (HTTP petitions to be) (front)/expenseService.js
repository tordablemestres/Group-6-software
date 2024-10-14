import axios from 'axios';

const API_URL = '/api/expenses';

// Fetch all expenses
const getExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addExpense = async (expenseData) => {
    const response = await axios.post('/api/expenses', expenseData);
    return response.data;
};

export default { getExpenses, addExpense };
