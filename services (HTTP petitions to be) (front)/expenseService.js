import axios from 'axios';

const API_URL = '/api/expenses';

// Fetch all expenses
const getExpenses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export default { getExpenses };
