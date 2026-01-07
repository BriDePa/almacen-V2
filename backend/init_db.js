const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'almacen_minero.db');
const schemaPath = path.join(__dirname, 'schema.sql');

// Eliminar base de datos existente si existe
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Base de datos anterior eliminada');
}

// Crear nueva base de datos
const db = new sqlite3.Database(dbPath);

// Leer y ejecutar schema
const schema = fs.readFileSync(schemaPath, 'utf8');

db.exec(schema, (err) => {
    if (err) {
        console.error('Error al inicializar la base de datos:', err);
    } else {
        console.log('Base de datos inicializada correctamente');
        
        // Insertar datos de ejemplo (opcional)
        const datosEjemplo = `
            INSERT INTO Materiales (codigo, nombre, marca, uso, unidad_medida, stock_minimo) VALUES
            ('AC-001', 'Aceite Motor 15W40', 'Mobil', 'Motor', 'Litro(s)', 10),
            ('FL-001', 'Filtro Aceite', 'Fram', 'Filtración', 'Unidad(es)', 5),
            ('LL-001', 'Llanta 20x10', 'Goodyear', 'Ruedas', 'Unidad(es)', 4);
        `;
        
        db.exec(datosEjemplo, (err) => {
            if (err) {
                console.error('Error al insertar datos de ejemplo:', err);
            } else {
                console.log('Datos de ejemplo insertados');
            }
            
            db.close();
            console.log('Base de datos lista para usar');
        });
    }
});