const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('LessStress API is running');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lessstress')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const expenseRoutes = require('./routes (API routes definition)/expenses');
app.use('/api/expenses', expenseRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

