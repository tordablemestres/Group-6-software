// services/taskService.js
import axiosInstance from '../utils/axiosInstance';

const API_URL = '/api/tasks';

const getTasks = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

const addTask = async (taskData) => {
    const response = await axiosInstance.post(API_URL, taskData);
    return response.data;
};

const updateTask = async (id, updateData) => {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, updateData);
    return response.data;
};

export default { getTasks, addTask, updateTask };
