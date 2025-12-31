import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// 👇 IMPORTS FOR IMAGE RESIZING
import ReactQuill, { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';

import 'react-quill-new/dist/quill.snow.css'; 
import { useTheme } from './ThemeContext';

// 👇 REGISTER THE MODULE
Quill.register('modules/imageResize', ImageResize);

function PortfolioManager() {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // --- DATA STATES ---
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // --- INPUT STATES ---
  const [newProject, setNewProject] = useState({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '', type: 'job' });
  const [newBlog, setNewBlog] = useState({ title: '', category: 'Article', image: '', content: '' });

  const API_BASE = "https://furkanshakib.onrender.com/api";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin");
    fetchData();
  }, [navigate]);

  const fetchData = () => {
    axios.get(`${API_BASE}/projects`).then(res => setProjects(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/experience`).then(res => setExperiences(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/blogs`).then(res => setBlogs(res.data.reverse())).catch(console.error);
  };

  // --- HANDLERS ---
  const handleAddProject = () => {
    axios.post(`${API_BASE}/projects`, newProject)
      .then(() => { alert("✅ Project Added!"); setNewProject({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' }); fetchData(); })
      .catch(err => alert("❌ Error adding project: " + err.message));
  };
  const handleDeleteProject = (id) => { if(window.confirm("Delete?")) axios.delete(`${API_BASE}/projects/${id}`).then(fetchData); };

  const handleAddExp = () => {
    axios.post(`${API_BASE}/experience`, newExp)
      .then(() => { alert("✅ Experience Added!"); setNewExp({ title: '', company: '', year: '', description: '', type: 'job' }); fetchData(); })
      .catch(err => alert("❌ Error adding experience: " + err.message));
  };
  const handleDeleteExp = (id) => { if(window.confirm("Delete?")) axios.delete(`${API_BASE}/experience/${id}`).then(fetchData); };

  const handleAddBlog = () => {
    console.log("Attempting to publish:", newBlog);
    if(!newBlog.title) return alert("❌ Title is required!");
    if(!newBlog.content) return alert("❌ Content is required!");

    setLoading(true);
    axios.post(`${API_BASE}/blogs`, newBlog)
      .then(() => {
        alert("✅ Article Published Successfully!");
        setNewBlog({ title: '', category: 'Article', image: '', content: '' });
        fetchData();
      })
      .catch(err => {
        console.error("Publish Error:", err);
        alert("❌ Failed to publish. Check console for details. Server might be sleeping.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const handleDeleteBlog = (id) => { if(window.confirm("Delete this article?")) axios.delete(`${API_BASE}/blogs/${id}`).then(fetchData); };

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#fff';
  const text = isDark ? '#f1f5f9' : '#333';
  const cardBg = isDark ? '#1e293b' : 'white';
  const inputBg = isDark ? '#334155' : 'white';
  const inputColor = isDark ? 'white' : 'black';
  const border = isDark ? '#475569' : '#ccc';

  const inputStyle = { padding: '10px', borderRadius: '5px', border: `1px solid ${border}`, background: inputBg, color: inputColor, width: '100%', marginBottom: '10px' };
  const btnStyle = { padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
  const deleteBtn = { background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' };

  // 👇 UPDATED MODULES TO INCLUDE IMAGE RESIZE
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }], // Adds alignment options (left, center, right)
      ['link', 'image', 'video'], 
      ['clean']
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh', background: pageBg, color: text, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>👑 Admin Dashboard</h1>
        <div style={{display:'flex', gap:'10px'}}>
             <button onClick={fetchData} style={{...btnStyle, background:'#3b82f6'}}>🔄 Refresh</button>
             <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{...btnStyle, background:'#64748b'}}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('projects')} style={{ ...btnStyle, background: activeTab === 'projects' ? '#2563eb' : '#94a3b8' }}>Projects</button>
        <button onClick={() => setActiveTab('experience')} style={{ ...btnStyle, background: activeTab === 'experience' ? '#2563eb' : '#94a3b8' }}>Experience</button>
        <button onClick={() => setActiveTab('blogs')} style={{ ...btnStyle, background: activeTab === 'blogs' ? '#2563eb' : '#94a3b8' }}>📝 Blogs</button>
      </div>

      {activeTab === 'projects' && (
        <div>
          <div style={{ background: cardBg, padding: '25px', borderRadius: '10px', marginBottom: '30px', border: `1px solid ${border}` }}>
            <h3>➕ Add Project</h3>
            <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
            <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={inputStyle}>
                <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
            </select>
            <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
            <input placeholder="Link URL" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={inputStyle} />
            <input placeholder="Tags" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} style={inputStyle} />
            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} style={{ ...inputStyle, height: '80px' }} />
            <button onClick={handleAddProject} style={btnStyle}>Add Project</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {projects.map(p => (
              <div key={p._id} style={{ border: `1px solid ${border}`, padding: '15px', borderRadius: '8px', background: cardBg }}>
                <h4>{p.title}</h4>
                <button onClick={() => handleDeleteProject(p._id)} style={deleteBtn}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div>
          <div style={{ background: cardBg, padding: '25px', borderRadius: '10px', marginBottom: '30px', border: `1px solid ${border}` }}>
            <h3>➕ Add Experience</h3>
            <input placeholder="Title" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} style={inputStyle} />
            <input placeholder="Company" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} style={inputStyle} />
            <input placeholder="Year" value={newExp.year} onChange={e => setNewExp({...newExp, year: e.target.value})} style={inputStyle} />
            <select value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} style={inputStyle}>
                <option value="job">Job Experience</option><option value="education">Education</option>
            </select>
            <textarea placeholder="Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} style={{ ...inputStyle, height: '80px' }} />
            <button onClick={handleAddExp} style={btnStyle}>Add Item</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {experiences.map(e => (
              <div key={e._id} style={{ border: `1px solid ${border}`, padding: '15px', borderRadius: '8px', background: cardBg }}>
                <h4>{e.title}</h4>
                <button onClick={() => handleDeleteExp(e._id)} style={deleteBtn}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'blogs' && (
        <div>
          <div style={{ background: cardBg, padding: '25px', borderRadius: '10px', marginBottom: '30px', border: `1px solid ${border}` }}>
            <h3>✍️ Write New Article</h3>
            <input placeholder="Article Title" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} style={inputStyle} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <select value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} style={inputStyle}>
                <option>Article</option><option>Opinion</option><option>Research Note</option>
              </select>
              <input placeholder="Cover Image URL (Optional)" value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} style={inputStyle} />
            </div>
            
            <div style={{ background: 'white', color: 'black', marginBottom: '20px', borderRadius: '5px', overflow: 'hidden' }}>
              {/* 👇 UPDATED EDITOR COMPONENT */}
              <ReactQuill 
                theme="snow" 
                value={newBlog.content} 
                onChange={val => setNewBlog({...newBlog, content: val})} 
                modules={modules} 
              />
            </div>

            <button onClick={handleAddBlog} style={{...btnStyle, opacity: loading ? 0.7 : 1}} disabled={loading}>
              {loading ? "Publishing... ⏳" : "Publish Article 🚀"}
            </button>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {blogs.map(b => (
              <div key={b._id} style={{ border: `1px solid ${border}`, padding: '15px', borderRadius: '8px', background: cardBg, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <h4 style={{ margin: 0 }}>{b.title}</h4>
                   <small style={{ opacity: 0.7 }}>{new Date(b.date).toLocaleDateString()}</small>
                </div>
                <button onClick={() => handleDeleteBlog(b._id)} style={deleteBtn}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PortfolioManager;