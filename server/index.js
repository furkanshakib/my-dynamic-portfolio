require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// If you haven't created the 'models' folder yet, comment out the next line by adding // at the start
const Project = require('./models/Project'); 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected to Portfolio Database!"))
  .catch(err => console.error("❌ Connection Error:", err));

// --- ROUTES ---

// 1. GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 }); 
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST a new project
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));