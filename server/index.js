const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
require('dotenv').config();

// Import Models
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Blog = require('./models/Blog');
const Skill = require('./models/SkillItem');
const Admin = require('./models/Admin');
const Profile = require('./models/Profile');

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key_123";

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 🔧 HELPER FUNCTION: Clean HTML from React Quill
function cleanHTML(html) {
  if (!html) return html;

  // Remove ALL style attributes completely
  let cleaned = html
    .replace(/\s+style="[^"]*"/gi, '')
    .replace(/\s+style='[^']*'/gi, '');

  return cleaned;
}

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

// --- PROTECTED ROUTES ---

// 1. PROJECTS
app.get('/api/projects', async (req, res) => {
  const data = await Project.find();
  // Clean descriptions
  const cleanedData = data.map(project => ({
    ...project.toObject(),
    description: cleanHTML(project.description)
  }));
  res.json(cleanedData);
});
app.post('/api/projects', auth, async (req, res) => {
  // Clean description before saving
  if (req.body.description) {
    req.body.description = cleanHTML(req.body.description);
  }
  const newP = new Project(req.body);
  await newP.save();
  res.json(newP);
});
app.delete('/api/projects/:id', auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});
app.put('/api/projects/:id', auth, async (req, res) => {
  // Clean description before updating
  if (req.body.description) {
    req.body.description = cleanHTML(req.body.description);
  }
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
app.get('/api/blogs', async (req, res) => {
  const data = await Blog.find();
  // Clean blog content
  const cleanedData = data.map(blog => ({
    ...blog.toObject(),
    content: cleanHTML(blog.content)
  }));
  res.json(cleanedData);
});
app.get('/api/blogs/:id', async (req, res) => {
  const data = await Blog.findById(req.params.id);
  if (data) {
    const cleaned = {
      ...data.toObject(),
      content: cleanHTML(data.content)
    };
    res.json(cleaned);
  } else {
    res.json(data);
  }
});
app.post('/api/blogs', auth, async (req, res) => {
  // Clean content before saving
  if (req.body.content) {
    req.body.content = cleanHTML(req.body.content);
  }
  const newB = new Blog(req.body);
  await newB.save();
  res.json(newB);
});
app.delete('/api/blogs/:id', auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});
app.put('/api/blogs/:id', auth, async (req, res) => {
  // Clean content before updating
  if (req.body.content) {
    req.body.content = cleanHTML(req.body.content);
  }
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🌟 SMART SHARE LINK: Server-Side Rendering for Social Previews
app.get('/api/share/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");

    // The actual URL where the user should go
    // Note: In production, this should be the deployed frontend URL (e.g., https://furkanshakib.vercel.app/blogs/...)
    // For now, we assume standard routing
    const targetUrl = `https://furkanshakib.vercel.app/blogs/${req.params.id}`;

    // Clean HTML for description (remove tags, limit length)
    const rawDesc = blog.content ? blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "Read this article on Furkan's Portfolio.";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Social Meta Tags -->
        <meta property="og:title" content="${blog.title}" />
        <meta property="og:description" content="${rawDesc}" />
        <meta property="og:image" content="${blog.image || 'https://furkanshakib.vercel.app/preview.png'}" />
        <meta property="og:url" content="${targetUrl}" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${blog.title}">
        <meta name="twitter:description" content="${rawDesc}">
        <meta name="twitter:image" content="${blog.image || 'https://furkanshakib.vercel.app/preview.png'}">

        <title>${blog.title}</title>

        <!-- Immediate Client-Side Redirect -->
        <script>
            window.location.href = "${targetUrl}";
        </script>
      </head>
      <body>
        <p>Redirecting to article...</p>
      </body>
      </html>
    `;

    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// 4. SKILLS
app.get('/api/skills', async (req, res) => { const data = await Skill.find(); res.json(data); });
app.post('/api/skills', auth, async (req, res) => { const newS = new Skill(req.body); await newS.save(); res.json(newS); });
app.delete('/api/skills/:id', auth, async (req, res) => { await Skill.findByIdAndDelete(req.params.id); res.json({ msg: "Deleted" }); });

// 5. PROFILE
app.get('/api/profile', async (req, res) => {
  const profile = await Profile.findOne();
  if (profile && profile.bio) {
    // Clean the bio before sending
    const cleanedProfile = {
      ...profile.toObject(),
      bio: cleanHTML(profile.bio)
    };
    res.json(cleanedProfile);
  } else {
    res.json(profile || {});
  }
});

app.post('/api/profile', auth, async (req, res) => {
  // Clean bio before saving
  if (req.body.bio) {
    req.body.bio = cleanHTML(req.body.bio);
  }

  // Upsert: update if exists, insert if not
  const updated = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(updated);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));