const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Models
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Blog = require('./models/Blog');
const Skill = require('./models/SkillItem'); // 👈 NEW IMPORT

const app = express();

// Middleware (With 50mb limit for images)
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// 1. PROJECTS
app.get('/api/projects', async (req, res) => { const data = await Project.find(); res.json(data); });
app.post('/api/projects', async (req, res) => { const newP = new Project(req.body); await newP.save(); res.json(newP); });
app.delete('/api/projects/:id', async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/projects/:id', async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 2. EXPERIENCE
app.get('/api/experience', async (req, res) => { const data = await Experience.find(); res.json(data); });
app.post('/api/experience', async (req, res) => { const newE = new Experience(req.body); await newE.save(); res.json(newE); });
app.delete('/api/experience/:id', async (req, res) => { await Experience.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/experience/:id', async (req, res) => {
  const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 3. BLOGS
app.get('/api/blogs', async (req, res) => { const data = await Blog.find(); res.json(data); });
app.get('/api/blogs/:id', async (req, res) => { const data = await Blog.findById(req.params.id); res.json(data); });
app.post('/api/blogs', async (req, res) => { const newB = new Blog(req.body); await newB.save(); res.json(newB); });
app.delete('/api/blogs/:id', async (req, res) => { await Blog.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/blogs/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 4. SKILLS (👇 NEW SECTION)
app.get('/api/skills', async (req, res) => { const data = await Skill.find(); res.json(data); });
app.post('/api/skills', async (req, res) => { const newS = new Skill(req.body); await newS.save(); res.json(newS); });
app.delete('/api/skills/:id', async (req, res) => { await Skill.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));