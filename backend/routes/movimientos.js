const express = require("express");
const router = express.Router();
const db = require("../database");

// Obtener todos los movimientos
router.get("/", async (req, res) => {
  try {
    const movimientos = await db.query("SELECT * FROM VistaHistorial");
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener materiales para el dropdown
router.get("/materiales/activos", async (req, res) => {
  try {
    const materiales = await db.query(
      "SELECT id_material, codigo, nombre, marca, uso FROM Materiales WHERE activo = 1"
    );
    res.json(materiales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo movimiento
router.post("/", async (req, res) => {
  try {
    const {
      id_material,
      tipo_movimiento,
      cantidad,
      responsable,
      proyecto_destino,
      observaciones,
    } = req.body;

    // Validación básica servidor
    if (!id_material)
      return res.status(400).json({ error: "Se requiere id_material" });
    const cantidadNum = parseFloat(cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0)
      return res.status(400).json({ error: "Cantidad inválida" });
    if (!["entrada", "salida"].includes(tipo_movimiento))
      return res.status(400).json({ error: "Tipo de movimiento inválido" });

    // Validar stock para salidas
    if (tipo_movimiento === "salida") {
      const material = await db.get(
        "SELECT stock_actual FROM Materiales WHERE id_material = ?",
        [id_material]
      );

      if (!material || material.stock_actual < cantidadNum) {
        return res.status(400).json({ error: "Stock insuficiente" });
      }
    }

    const result = await db.run(
      `INSERT INTO Movimientos (id_material, tipo_movimiento, cantidad, responsable, proyecto_destino, observaciones) 
             VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id_material,
        tipo_movimiento,
        cantidadNum,
        responsable,
        proyecto_destino,
        observaciones,
      ]
    );

    res.status(201).json({
      id: result.id,
      message: "Movimiento registrado correctamente",
    });
  } catch (error) {
    console.error("Error creando movimiento:", error);
    res.status(500).json({ error: "Error interno al crear movimiento" });
  }
});

// Actualizar movimiento
router.put("/:id", async (req, res) => {
  try {
    const {
      tipo_movimiento,
      cantidad,
      responsable,
      proyecto_destino,
      observaciones,
    } = req.body;

    const result = await db.run(
      `UPDATE Movimientos 
             SET tipo_movimiento = ?, cantidad = ?, responsable = ?, proyecto_destino = ?, observaciones = ?
             WHERE id_movimiento = ?`,
      [
        tipo_movimiento,
        cantidad,
        responsable,
        proyecto_destino,
        observaciones,
        req.params.id,
      ]
    );

    if (result.changes > 0) {
      res.json({ message: "Movimiento actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Movimiento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar movimiento
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.run(
      "DELETE FROM Movimientos WHERE id_movimiento = ?",
      [req.params.id]
    );

    if (result.changes > 0) {
      res.json({ message: "Movimiento eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Movimiento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
