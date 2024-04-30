const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const Auth = require("../models/auth");
const { verifyToken } = require("../middlewares/auth");
// Welcome Page
router.get("/", async (req, res) => {
  const all_blogs = await Blog.find();
  res.send(all_blogs);
});

router.get("/:blogid", async (req, res) => {
    const blog= await Blog.findById(req.params.blogid);
    res.send(blog);
  });

router.post("/create/:uid", verifyToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const name = await Auth.findById(req.params.uid);
  const new_blog = new Blog({
    title: title,
    content: content,
    tags: tags,
    author: name.username,
    readable: true,
    comments: [],
    time: Date.now(),
  });
  await new_blog.save();
  console.log(new_blog);
  res.send("Blog Created!!!");
});

router.delete("/delete/:uid/:blogId", verifyToken, async (req, res) => {
  const check_blog = await Blog.findById(req.params.blogId);
  if (check_blog) {
    const delete_blog = await Blog.findByIdAndDelete(req.params.blogId);
    res.send("Blog Deleted!!!");
    return;
  }
  res.status(404).send("Already Deleted!!!");
});

router.put("/update/:uid/:blogId", verifyToken, async (req, res) => {
  const check_blog = await Blog.findById(req.params.blogId);
  if (check_blog) {
    const update_blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body
    );
    res.send("Blog Updated!!!");
    return;
  }
  res.status(404).send("Not found!!!");
});

router.post("/comments/:uid/:blogid", verifyToken, async (req, res) => {
  const check_blog = await Blog.findById(req.params.blogid);
  const check_name = await Author.findById(req.params.uid);
  if (check_blog) {
    const update_blog = await Blog.findByIdAndUpdate(req.params.blogid, {
      $push: {
        comments: {
          text: req.body.comment,
          commenter: check_name.username,
        },
      },
    });
    res.send("Blog Updated!!!");
    return;
  }
  res.status(404).send("Not found!!!");
});

module.exports = router;
