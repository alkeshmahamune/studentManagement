import Database from 'better-sqlite3'
import { config } from './config.js'

const db = new Database(config.dbPath)

// Enable foreign keys
db.pragma('journal_mode = WAL')

// Create Schools table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS Schools (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

console.log('SQLite database connected')

// Wrapper for async compatibility
const dbAsync = {
    run: (sql, params = []) => {
        try {
            const stmt = db.prepare(sql)
            const info = stmt.run(...params)
            return Promise.resolve({ id: info.lastInsertRowid, changes: info.changes })
        } catch (err) {
            return Promise.reject(err)
        }
    },
    all: (sql, params = []) => {
        try {
            const stmt = db.prepare(sql)
            const rows = stmt.all(...params)
            return Promise.resolve(rows || [])
        } catch (err) {
            return Promise.reject(err)
        }
    },
    get: (sql, params = []) => {
        try {
            const stmt = db.prepare(sql)
            const row = stmt.get(...params)
            return Promise.resolve(row)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export default dbAsync