import sqlite3 from 'sqlite3'
import { config } from './config.js'

const db = new sqlite3.Database(config.dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message)
    } else {
        console.log('SQLite database connected')
    }
})

// Create Schools table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS Schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

// Promisify database methods
const dbAsync = {
    run: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) reject(err)
                else resolve({ id: this.lastID, changes: this.changes })
            })
        })
    },
    all: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err)
                else resolve(rows || [])
            })
        })
    },
    get: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) reject(err)
                else resolve(row)
            })
        })
    }
}

export default dbAsync