const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: String,
  icon: String, // We will use emojis like ⚛️ or 💻
});

module.exports = mongoose.model('Skill', SkillSchema);