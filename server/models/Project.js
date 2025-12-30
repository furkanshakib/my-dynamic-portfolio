const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String },
  tags: { type: String },
  category: { type: String, required: true, enum: ['Web Dev', 'Research', 'Video', 'Articles'] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);