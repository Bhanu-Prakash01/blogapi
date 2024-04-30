const express = require('express');
const Auth = require('../models/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);




router.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    const check_uname= await Auth.findOne({username: username});
    if(check_uname){
        res.send("Username already exists")
        return;
    }
    const register = new Auth({
        username:username,
        password: await bcrypt.hash(password,salt)
        })
    await register.save();
    console.log(check_uname);
    res.send("Registered !!!")
})



router.post("/login",async (req, res) => {
    const {username,password} = req.body;
    const check_uname= await Auth.findOne({username: username});
    if(!check_uname){
        res.send("Username does not exists")
        return;
    }
    const pass_check=await bcrypt.compare( password,check_uname.password)
    if(!pass_check){
        res.send("Incorrect Password")
    }
    else{
        const token = jwt.sign({id: check_uname._id},process.env.JWT_SECRET)
        res.json({token: token,id: check_uname._id})

    }
})



module.exports = router;
