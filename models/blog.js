const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
      type: String,
      required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  readable:{ 
    type: Boolean,
    default:true
  },
  comments: {
    type: [{text:String,commenter:String}]
  },
  time: {
      type: Date,
      default:Date.now()
  }
});


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;