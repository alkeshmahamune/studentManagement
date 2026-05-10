import mysql from 'mysql2'
import { config } from './config.js'
const connection = mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database,
    port:config.dbPort
})

connection.connect((err)=>{
    if(err){
        console.log("Database connection failed!")
    }else{
        console.log("MySql connected")
    }
})

export default connection