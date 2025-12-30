const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Project = require('./models/Project');
const Experience = require('./models/Experience'); // 👈 Import new model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// 1. PROJECTS
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

app.delete('/api/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});

// 2. EXPERIENCE (New!)
app.get('/api/experience', async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

app.post('/api/experience', async (req, res) => {
  const newExp = new Experience(req.body);
  await newExp.save();
  res.json(newExp);
});

app.delete('/api/experience/:id', async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: "Experience deleted" });
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));