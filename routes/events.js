// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all events for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.userId, hidden: { $ne: true } });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new event
router.post('/', auth, async (req, res) => {
    const { title, date, color } = req.body;
    try {
        const newEvent = new Event({
            title,
            date,
            color,
            user: req.user.userId,
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an event
router.put('/:id', auth, async (req, res) => {
    const { completed, hidden } = req.body;
    try {
        const updateFields = {};
        if (completed !== undefined) updateFields.completed = completed;
        if (hidden !== undefined) updateFields.hidden = hidden;

        const updatedEvent = await Event.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            updateFields,
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
