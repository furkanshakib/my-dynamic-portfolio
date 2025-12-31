const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String, // This stores the text, images, and formatting
  image: String,   // Cover image URL
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);