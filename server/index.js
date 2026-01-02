const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth'); // 👈 IMPORT THE BOUNCER
require('dotenv').config();

// Import Models
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Blog = require('./models/Blog');
const Skill = require('./models/SkillItem'); 
const Admin = require('./models/Admin');

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key_123";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();
  res.json({ msg: "Admin Created!" });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, SECRET_KEY);
  res.json({ token, admin: { username: admin.username } });
});

// --- PROTECTED ROUTES (Added 'auth' middleware) ---

// 1. PROJECTS
app.get('/api/projects', async (req, res) => { const data = await Project.find(); res.json(data); });
app.post('/api/projects', auth, async (req, res) => { const newP = new Project(req.body); await newP.save(); res.json(newP); });
app.delete('/api/projects/:id', auth, async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/projects/:id', auth, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 2. EXPERIENCE
app.get('/api/experience', async (req, res) => { const data = await Experience.find(); res.json(data); });
app.post('/api/experience', auth, async (req, res) => { const newE = new Experience(req.body); await newE.save(); res.json(newE); });
app.delete('/api/experience/:id', auth, async (req, res) => { await Experience.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/experience/:id', auth, async (req, res) => {
  const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 3. BLOGS
app.get('/api/blogs', async (req, res) => { const data = await Blog.find(); res.json(data); });
app.get('/api/blogs/:id', async (req, res) => { const data = await Blog.findById(req.params.id); res.json(data); });
app.post('/api/blogs', auth, async (req, res) => { const newB = new Blog(req.body); await newB.save(); res.json(newB); });
app.delete('/api/blogs/:id', auth, async (req, res) => { await Blog.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });
app.put('/api/blogs/:id', auth, async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 4. SKILLS
app.get('/api/skills', async (req, res) => { const data = await Skill.find(); res.json(data); });
app.post('/api/skills', auth, async (req, res) => { const newS = new Skill(req.body); await newS.save(); res.json(newS); });
app.delete('/api/skills/:id', auth, async (req, res) => { await Skill.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));