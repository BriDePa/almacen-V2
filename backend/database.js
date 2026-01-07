const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'almacen_minero.db');

class Database {
    constructor() {
        this.db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos:', err.message);
            } else {
                console.log('Conectado a la base de datos SQLite');
                this.initDatabase();
            }
        });
    }

    initDatabase() {
        const fs = require('fs');
        const schemaPath = path.join(__dirname, 'schema.sql');
        
        fs.readFile(schemaPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer schema.sql:', err);
                return;
            }
            
            this.db.exec(data, (err) => {
                if (err) {
                    console.error('Error al ejecutar schema:', err);
                } else {
                    console.log('Base de datos inicializada correctamente');
                }
            });
        });
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, changes: this.changes });
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = new Database();