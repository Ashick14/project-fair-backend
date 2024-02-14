// loads .env file contents into process.env by default
require('dotenv').config()

// import express

const express=require('express')

const cors=require('cors')

const db=require('./DB/connection')

const router=require('./Routes/router')

const appMiddleware = require('./Middlewares/appMiddleware')

// Create a backend application using the express
const pfserver=express()

// use cors
pfserver.use(cors())
pfserver.use(express.json())
pfserver.use(appMiddleware)
pfserver.use(router)
// image exporting to frontend
pfserver.use('/uploads',express.static('./uploads'))
// port creation
const PORT=4000 || process.env.PORT

// server listen
pfserver.listen(PORT,()=>{
    console.log("listening on the port" +PORT);
})

// localhost:4000 -> res pfServer is started...
pfserver.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started</h1>`)
})