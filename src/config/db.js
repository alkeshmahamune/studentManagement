import mysql from 'mysql2'
import { config } from './config.js'

const pool = mysql.createPool({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database,
    port:config.dbPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

pool.on('error', (err) => {
    console.error('Database pool error:', err)
})

console.log("MySql pool created")

export default pool.promise()