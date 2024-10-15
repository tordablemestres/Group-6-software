const express = require('express');
const cors = require('cors'); // Importar cors
const mongoose = require('mongoose');
const path = require('path'); // Necesario para manejar rutas de archivos
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Usar middleware cors

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/lessstress')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Rutas básicas
app.get('/', (req, res) => {
    res.send('LessStress API is running');
});

// Importar rutas de la API
const expenseRoutes = require('./routes/expenses');
app.use('/api/expenses', expenseRoutes);

// Servir archivos estáticos (aplicación React)
if (process.env.NODE_ENV === 'production') {
    // Establecer carpeta estática
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Manejar cualquier otra ruta y servir la aplicación React
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

