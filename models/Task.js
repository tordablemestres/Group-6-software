// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: String,
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', TaskSchema);
