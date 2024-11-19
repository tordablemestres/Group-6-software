// services/eventService.js
import axiosInstance from '../utils/axiosInstance';

const API_URL = '/api/events';

const getEvents = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data;
};

const addEvent = async (eventData) => {
    const response = await axiosInstance.post(API_URL, eventData);
    return response.data;
};

const updateEvent = async (id, updateData) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, updateData);
    return response.data;
};

export default { getEvents, addEvent, updateEvent };
