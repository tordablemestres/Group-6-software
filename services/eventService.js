// services/eventService.js
import axios from 'axios';

const API_URL = '/api/events';

// Fetch all events
const getEvents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new event
const addEvent = async (eventData) => {
    const response = await axios.post(API_URL, eventData);
    return response.data;
};

// Update an event
const updateEvent = async (id, updateData) => {
    const response = await axios.put(`${API_URL}/${id}`, updateData);
    return response.data;
};

export default { getEvents, addEvent, updateEvent };
