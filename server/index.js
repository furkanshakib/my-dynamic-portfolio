const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Models
const Project = require('./models/Project');
const Experience = require('./models/Experience'); 

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
// ... existing imports ...
const Blog = require('./models/Blog'); // 👈 Import the new model

// --- BLOG ROUTES ---

// 1. Get All Blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) { res.status(500).json(err); }
});

// 2. Get Single Blog (by ID)
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) { res.status(500).json(err); }
});

// 3. Create New Blog
app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.json(newBlog);
  } catch (err) { res.status(500).json(err); }
});

// 4. Delete Blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json(err); }
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));