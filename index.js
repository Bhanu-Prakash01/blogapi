const express =  require("express");
const mongoose = require('mongoose');
require('dotenv').config()
const app= express()

mongoose.connect(process.env.DB)
    .then(()=>console.log("Connected"))
    .catch(()=>console.log("Err in db connection"))


app.get("/",(req,res)=>{
    res.send("Hey !!!!!")
})


app.use("/blog",require("./routes/blog.js"))
app.listen(process.env.PORT,()=>{
    console.log(`app is listening at http://localhost:${process.env.PORT}`)
})