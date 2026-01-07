const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener todos los materiales
router.get('/', async (req, res) => {
    try {
        const materiales = await db.query('SELECT * FROM VistaStock');
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un material por ID
router.get('/:id', async (req, res) => {
    try {
        const material = await db.get(
            'SELECT * FROM Materiales WHERE id_material = ?',
            [req.params.id]
        );
        if (material) {
            res.json(material);
        } else {
            res.status(404).json({ error: 'Material no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo material
router.post('/', async (req, res) => {
    try {
        const { codigo, nombre, marca, uso, unidad_medida, stock_minimo } = req.body;
        
        const result = await db.run(
            `INSERT INTO Materiales (codigo, nombre, marca, uso, unidad_medida, stock_minimo) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [codigo, nombre, marca, uso, unidad_medida, stock_minimo]
        );
        
        res.status(201).json({
            id: result.id,
            message: 'Material creado correctamente'
        });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(400).json({ error: 'El código ya existe' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// Actualizar material
router.put('/:id', async (req, res) => {
    try {
        const { codigo, nombre, marca, uso, unidad_medida, stock_minimo } = req.body;
        
        const result = await db.run(
            `UPDATE Materiales 
             SET codigo = ?, nombre = ?, marca = ?, uso = ?, unidad_medida = ?, stock_minimo = ?
             WHERE id_material = ?`,
            [codigo, nombre, marca, uso, unidad_medida, stock_minimo, req.params.id]
        );
        
        if (result.changes > 0) {
            res.json({ message: 'Material actualizado correctamente' });
        } else {
            res.status(404).json({ error: 'Material no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar material
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.run(
            'DELETE FROM Materiales WHERE id_material = ?',
            [req.params.id]
        );
        
        if (result.changes > 0) {
            res.json({ message: 'Material eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Material no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;