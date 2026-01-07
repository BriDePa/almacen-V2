const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener materiales con stock bajo
router.get('/stock-bajo', async (req, res) => {
    try {
        const stockBajo = await db.query(
            "SELECT * FROM VistaStock WHERE estado = 'REORDEN'"
        );
        res.json(stockBajo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener movimientos con filtros
router.get('/movimientos', async (req, res) => {
    try {
        let query = 'SELECT * FROM VistaHistorial WHERE 1=1';
        const params = [];
        
        // Aplicar filtros
        const { fecha_inicio, fecha_fin, tipo_movimiento, material, marca, uso } = req.query;
        
        if (fecha_inicio) {
            query += ' AND date(fecha_movimiento) >= date(?)';
            params.push(fecha_inicio);
        }
        
        if (fecha_fin) {
            query += ' AND date(fecha_movimiento) <= date(?)';
            params.push(fecha_fin);
        }
        
        if (tipo_movimiento) {
            query += ' AND tipo_movimiento = ?';
            params.push(tipo_movimiento);
        }
        
        if (material) {
            query += ' AND material = ?';
            params.push(material);
        }
        
        if (marca) {
            query += ' AND marca = ?';
            params.push(marca);
        }
        
        if (uso) {
            query += ' AND uso = ?';
            params.push(uso);
        }
        
        query += ' ORDER BY fecha_movimiento DESC';
        
        const movimientos = await db.query(query, params);
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener opciones para filtros
router.get('/filtros', async (req, res) => {
    try {
        const materiales = await db.query(
            'SELECT DISTINCT nombre, marca, uso FROM Materiales WHERE activo = 1 ORDER BY nombre'
        );
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;