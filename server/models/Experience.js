const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  year: String,
  description: String,
  type: String, // 'job' or 'education'
});

module.exports = mongoose.model('Experience', experienceSchema);