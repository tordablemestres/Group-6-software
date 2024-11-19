// client/src/services/expenseService.js
import axiosInstance from '../utils/axiosInstance';

const API_URL = '/api/expenses';

const getExpenses = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

const addExpense = async (expenseData) => {
    const response = await axiosInstance.post(API_URL, expenseData);
    return response.data;
};

export default {
    getExpenses,
    addExpense,
};
