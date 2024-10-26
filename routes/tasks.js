// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Description is required' });
    }

    const task = new Task({
        description,
        completed: false,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update task completion
router.put('/:id', async (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { completed },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
