import express from 'express'
import { config } from './config/config.js'
import cors from 'cors'
import schoolRouter from './router/school.router.js'

// variable calling the express package 
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// default routing 
app.use('/',schoolRouter)

// port from .env or default port 
const PORT = config.port || 5000;

// home route 
app.get("/", (req, res) => {
  res.send("School Management API Running");
});

//server 
app.listen(PORT,()=>{
    console.log('SERVER IS UP AND RUNNING...'+PORT)
})