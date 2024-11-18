// models/Event.js
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: { // Date of the event
        type: Date,
        required: true,
    },
    color: { // Color assigned to the event
        type: String,
        default: '#000000', // Default color black
    },
    completed: { // Whether the event is completed
        type: Boolean,
        default: false,
    },
    hidden: { // Whether the event is hidden from the interface
        type: Boolean,
        default: false,
    },
    user: { // User who created the event
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true, // Uncomment when authentication is implemented
    },
});

module.exports = mongoose.model('Event', EventSchema);
