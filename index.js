const bodyParser = require("body-parser");
const express =  require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
require('dotenv').config()
const app= express()
app.use(morgan())
app.use(bodyParser.json())

mongoose.connect(process.env.DB)
    .then(()=>console.log("Connected"))
    .catch(()=>console.log("Err in db connection"))


app.get("/",(req,res)=>{
    res.send("Hey !!!!!")
})

app.use("/auth",require("./routes/auth.js"))

app.use("/blog",require("./routes/blog.js"))


app.listen(process.env.PORT,()=>{
    console.log(`app is listening at http://localhost:${process.env.PORT}`)
})