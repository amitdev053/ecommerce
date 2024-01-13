require('dotenv').config()
const express = require("express")
const app = express()
const router = require('./Routes/routes')
const connectDb = require('./Utils/db')


// We can also use to set this code for defining the routes

// app.get("/", (req, res)=>{
//     res.status(200).send("Welcome to our backend Home Page")
// })

// We can also use to set this code for defining the routes
const port = 5000
app.use(express.json())   
app.use("/backend/home", router)

connectDb().then(()=>{

app.listen(port, ()=>{
    console.log(`yahhh...! Server is running at port ${port} `)
}) 
})