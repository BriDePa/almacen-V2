const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas
const materialesRoutes = require('./routes/materiales');
const movimientosRoutes = require('./routes/movimientos');
const reportesRoutes = require('./routes/reportes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// Rutas API
app.use('/api/materiales', materialesRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/reportes', reportesRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API Almacén Minero' });
});

// En producción, servir React
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});