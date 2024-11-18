// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events (adjust to fetch events for the logged-in user when authentication is implemented)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({ hidden: { $ne: true } });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    const { title, date, color } = req.body;
    try {
        const newEvent = new Event({
            title,
            date,
            color,
            // user: req.user.id, // Use when authentication is implemented
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an event's completed or hidden status
router.put('/:id', async (req, res) => {
    const { completed, hidden } = req.body;
    try {
        const updateFields = {};
        if (completed !== undefined) updateFields.completed = completed;
        if (hidden !== undefined) updateFields.hidden = hidden;

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// (Optional) Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
