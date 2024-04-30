
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Auth = require('../models/auth');
const { verifyToken } = require('../middlewares/auth');
// Welcome Page
router.get('/', async (req, res)=>{
    const all_blogs = await Blog.find();
    res.send(all_blogs);
});

router.post("/create/:uid",verifyToken,async (req, res)=>{
    const {title,content,tags} = req.body;
    const name = await Auth.findById(req.params.uid);
    const new_blog = new Blog({
        title:title,
        content:content,
        tags:tags,
        author: name.username,
        readable:true,
        comments:[],
        time:Date.now()
    })
    await new_blog.save();
    console.log(new_blog);
    res.send("Blog Created!!!")
})

module.exports = router;
