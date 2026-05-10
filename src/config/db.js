import initSqlJs from 'sql.js'
import fs from 'fs'
import { config } from './config.js'

let db = null

const initDB = async () => {
    const SQL = await initSqlJs()
    
    // Try to load existing database from file
    let data
    try {
        data = fs.readFileSync(config.dbPath)
        db = new SQL.Database(data)
    } catch (err) {
        // Create new database if file doesn't exist
        db = new SQL.Database()
    }
    
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
    
    saveDB()
    console.log('SQLite database initialized')
    return db
}

const saveDB = () => {
    const data = db.export()
    const buffer = Buffer.from(data)
    fs.writeFileSync(config.dbPath, buffer)
}

// Async wrapper for compatibility
const dbAsync = {
    run: async (sql, params = []) => {
        try {
            db.run(sql, params)
            saveDB()
            // Return lastID for INSERT operations
            const result = db.exec('SELECT last_insert_rowid() as id')
            const lastID = result.length > 0 ? result[0].values[0][0] : null
            return { id: lastID, changes: 1 }
        } catch (err) {
            throw err
        }
    },
    all: async (sql, params = []) => {
        try {
            const stmt = db.prepare(sql)
            stmt.bind(params)
            const rows = []
            while (stmt.step()) {
                rows.push(stmt.getAsObject())
            }
            stmt.free()
            return rows || []
        } catch (err) {
            throw err
        }
    },
    get: async (sql, params = []) => {
        try {
            const stmt = db.prepare(sql)
            stmt.bind(params)
            let row = null
            if (stmt.step()) {
                row = stmt.getAsObject()
            }
            stmt.free()
            return row
        } catch (err) {
            throw err
        }
    }
}

export { initDB, dbAsync as default }