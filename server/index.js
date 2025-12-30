const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Project = require('./models/Project');
const Experience = require('./models/Experience'); 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Updated for modern Mongoose)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// 0. ROOT ROUTE (Good for checking if server is alive)
app.get('/', (req, res) => {
  res.send("API is Running Successfully! 🚀");
});

// 1. PROJECTS
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. EXPERIENCE
app.get('/api/experience', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/experience', async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    await newExp.save();
    res.json(newExp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/experience/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server (FIXED: Uses dynamic port for Render)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));