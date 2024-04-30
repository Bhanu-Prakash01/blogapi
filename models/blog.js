const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
      type: String,
      required: true
  },
  year: {
      type: Date
  }
});


const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;