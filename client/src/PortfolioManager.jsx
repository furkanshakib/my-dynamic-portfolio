import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill-new/dist/quill.snow.css'; 
import { useTheme } from './ThemeContext';

Quill.register('modules/blotFormatter', BlotFormatter);

function PortfolioManager() {
  const [activeTab, setActiveTab] = useState('overview'); // Default to Overview
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // --- DATA STATES ---
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]); 

  // --- INPUT STATES ---
  const [newProject, setNewProject] = useState({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '', type: 'job' });
  const [newBlog, setNewBlog] = useState({ title: '', category: 'Article', image: '', content: '' });
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' }); 

  const API_BASE = "https://furkanshakib.onrender.com/api";

  // 👇 PASTE THIS NEW CODE INSTEAD
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem("token"); // 1. Grab the token from storage

    // 2. If no admin flag OR no token, kick them out
    if (!isAdmin || !token) navigate("/admin");
    
    // 3. IMPORTANT: Attach the token to the header of every Axios request
    if(token) axios.defaults.headers.common['x-auth-token'] = token; 

    fetchData();
  }, [navigate]);

  const fetchData = () => {
    axios.get(`${API_BASE}/projects`).then(res => setProjects(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/experience`).then(res => setExperiences(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/blogs`).then(res => setBlogs(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/skills`).then(res => setSkills(res.data.reverse())).catch(console.error);
  };

  const resetForms = () => {
    setEditingId(null);
    setNewProject({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
    setNewExp({ title: '', company: '', year: '', description: '', type: 'job' });
    setNewBlog({ title: '', category: 'Article', image: '', content: '' });
    setNewSkill({ name: '', icon: '' });
  };

  // --- SUBMIT HANDLERS ---
  const handleSaveProject = () => {
    const apiCall = editingId ? axios.put(`${API_BASE}/projects/${editingId}`, newProject) : axios.post(`${API_BASE}/projects`, newProject);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Added!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message));
  };

  const handleSaveExp = () => {
    const apiCall = editingId ? axios.put(`${API_BASE}/experience/${editingId}`, newExp) : axios.post(`${API_BASE}/experience`, newExp);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Added!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message));
  };

  const handleSaveBlog = () => {
    if(!newBlog.title || !newBlog.content) return alert("Title and Content required!");
    setLoading(true);
    const apiCall = editingId ? axios.put(`${API_BASE}/blogs/${editingId}`, newBlog) : axios.post(`${API_BASE}/blogs`, newBlog);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Published!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message)).finally(() => setLoading(false));
  };

  const handleSaveSkill = () => {
    if(!newSkill.name || !newSkill.icon) return alert("Name and Icon required!");
    axios.post(`${API_BASE}/skills`, newSkill)
      .then(() => { alert("✅ Skill Added!"); resetForms(); fetchData(); })
      .catch(err => alert("❌ Error: " + err.message));
  };

  const handleDelete = (type, id) => {
    if(window.confirm("Delete this?")) axios.delete(`${API_BASE}/${type}/${id}`).then(fetchData);
  };

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const sidebarBg = isDark ? '#1e293b' : 'white';
  const text = isDark ? '#f1f5f9' : '#333';
  const cardBg = isDark ? '#1e293b' : 'white';
  const border = isDark ? '#334155' : '#e2e8f0';
  const inputBg = isDark ? '#0f172a' : '#f8f9fa';
  const activeColor = '#2563eb';

  const sidebarItemStyle = (tabName) => ({
    padding: '12px 20px',
    margin: '5px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    color: activeTab === tabName ? 'white' : text,
    background: activeTab === tabName ? activeColor : 'transparent',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    display: 'flex', alignItems: 'center', gap: '10px',
    transition: 'all 0.2s'
  });

  const btnStyle = { padding: '10px 20px', background: activeColor, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
  const inputStyle = { padding: '12px', borderRadius: '8px', border: `1px solid ${border}`, background: inputBg, color: text, width: '100%', marginBottom: '15px', outline: 'none' };

  // --- EDITOR MODULES ---
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'video'], 
      ['clean']
    ],
    blotFormatter: {}
  }), []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: pageBg, color: text, fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. SIDEBAR */}
      <div style={{ width: '250px', background: sidebarBg, borderRight: `1px solid ${border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '40px', display:'flex', alignItems:'center', gap:'10px' }}>👑 Admin</h2>
        
        <div style={sidebarItemStyle('overview')} onClick={() => setActiveTab('overview')}>📊 Dashboard</div>
        <div style={sidebarItemStyle('projects')} onClick={() => {setActiveTab('projects'); resetForms();}}>🚀 Projects</div>
        <div style={sidebarItemStyle('experience')} onClick={() => {setActiveTab('experience'); resetForms();}}>🎓 Experience</div>
        <div style={sidebarItemStyle('blogs')} onClick={() => {setActiveTab('blogs'); resetForms();}}>📝 Blogs</div>
        <div style={sidebarItemStyle('skills')} onClick={() => {setActiveTab('skills'); resetForms();}}>⚡ Skills</div>

        <div style={{ marginTop: 'auto', borderTop: `1px solid ${border}`, paddingTop: '20px' }}>
          <button onClick={() => window.open('/', '_blank')} style={{ ...sidebarItemStyle(''), justifyContent: 'center', background: isDark?'#334155':'#e2e8f0' }}>👀 View Site</button>
          <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{ ...sidebarItemStyle(''), color: '#ef4444', marginTop: '10px' }}>🚪 Logout</button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ marginBottom: '10px' }}>Welcome back, Furkan! 👋</h1>
            <p style={{ opacity: 0.7, marginBottom: '40px' }}>Here is what's happening on your portfolio.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <StatCard title="Projects" count={projects.length} icon="🚀" bg={cardBg} border={border} />
              <StatCard title="Experience" count={experiences.length} icon="🎓" bg={cardBg} border={border} />
              <StatCard title="Articles" count={blogs.length} icon="📝" bg={cardBg} border={border} />
              <StatCard title="Skills" count={skills.length} icon="⚡" bg={cardBg} border={border} />
            </div>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div style={{ maxWidth: '900px' }}>
             <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <h2>Projects ({projects.length})</h2>
                {editingId && <button onClick={resetForms} style={{...btnStyle, background:'#64748b'}}>Cancel Edit</button>}
             </div>
             
             {/* FORM */}
             <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <input placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                  <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={inputStyle}>
                      <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
                  </select>
                  <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
                </div>
                <input placeholder="Project Link" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={inputStyle} />
                <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', color: 'black' }}>
                  <ReactQuill theme="snow" value={newProject.description} onChange={val => setNewProject({...newProject, description: val})} modules={modules} placeholder="Describe your project..." />
                </div>
                <button onClick={handleSaveProject} style={{...btnStyle, width:'100%'}}>{editingId ? "Update Project" : "Add Project"}</button>
             </div>

             {/* LIST */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {projects.map(p => (
                  <ItemCard key={p._id} title={p.title} subtitle={p.category} bg={cardBg} border={border} 
                    onEdit={() => {setEditingId(p._id); setNewProject(p); window.scrollTo(0,0);}} 
                    onDelete={() => handleDelete('projects', p._id)} />
                ))}
             </div>
          </div>
        )}

        {/* --- EXPERIENCE TAB --- */}
        {activeTab === 'experience' && (
          <div style={{ maxWidth: '900px' }}>
             <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <h2>Experience ({experiences.length})</h2>
                {editingId && <button onClick={resetForms} style={{...btnStyle, background:'#64748b'}}>Cancel Edit</button>}
             </div>
             
             <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px' }}>
                <input placeholder="Job Title" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} style={inputStyle} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                  <input placeholder="Company / Org" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} style={inputStyle} />
                  <input placeholder="Year (e.g. 2023 - Present)" value={newExp.year} onChange={e => setNewExp({...newExp, year: e.target.value})} style={inputStyle} />
                </div>
                <select value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} style={inputStyle}>
                    <option value="job">Job Experience</option><option value="education">Education</option>
                </select>
                <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', color: 'black' }}>
                  <ReactQuill theme="snow" value={newExp.description} onChange={val => setNewExp({...newExp, description: val})} modules={modules} />
                </div>
                <button onClick={handleSaveExp} style={{...btnStyle, width:'100%'}}>{editingId ? "Update Item" : "Add Item"}</button>
             </div>

             <div style={{ display: 'grid', gap: '20px' }}>
                {experiences.map(e => (
                  <ItemCard key={e._id} title={e.title} subtitle={`${e.company} • ${e.year}`} bg={cardBg} border={border} 
                    onEdit={() => {setEditingId(e._id); setNewExp(e); window.scrollTo(0,0);}} 
                    onDelete={() => handleDelete('experience', e._id)} />
                ))}
             </div>
          </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
          <div style={{ maxWidth: '900px' }}>
             <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <h2>Blogs ({blogs.length})</h2>
                {editingId && <button onClick={resetForms} style={{...btnStyle, background:'#64748b'}}>Cancel Edit</button>}
             </div>
             
             <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px' }}>
                <input placeholder="Article Title" value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} style={inputStyle} />
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
                  <select value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} style={inputStyle}>
                      <option>Article</option><option>Opinion</option><option>Research Note</option>
                  </select>
                  <input placeholder="Cover Image URL" value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', color: 'black' }}>
                  <ReactQuill theme="snow" value={newBlog.content} onChange={val => setNewBlog({...newBlog, content: val})} modules={modules} />
                </div>
                <button onClick={handleSaveBlog} style={{...btnStyle, width:'100%', opacity: loading ? 0.7 : 1}} disabled={loading}>
                  {loading ? "Publishing..." : (editingId ? "Update Article" : "Publish Article")}
                </button>
             </div>

             <div style={{ display: 'grid', gap: '20px' }}>
                {blogs.map(b => (
                  <ItemCard key={b._id} title={b.title} subtitle={b.category} bg={cardBg} border={border} 
                    onEdit={() => {setEditingId(b._id); setNewBlog(b); window.scrollTo(0,0);}} 
                    onDelete={() => handleDelete('blogs', b._id)} />
                ))}
             </div>
          </div>
        )}

        {/* --- SKILLS TAB --- */}
        {activeTab === 'skills' && (
          <div style={{ maxWidth: '900px' }}>
             <h2>Skills ({skills.length})</h2>
             <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px', marginTop:'20px' }}>
                <div style={{ display:'flex', gap:'20px' }}>
                   <input placeholder="Name (e.g. React)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} style={{...inputStyle, marginBottom:0, flex:2}} />
                   <input placeholder="Icon (e.g. ⚛️)" value={newSkill.icon} onChange={e => setNewSkill({...newSkill, icon: e.target.value})} style={{...inputStyle, marginBottom:0, flex:1}} />
                   <button onClick={handleSaveSkill} style={btnStyle}>Add</button>
                </div>
             </div>

             <div style={{ display: 'flex', flexWrap:'wrap', gap: '15px' }}>
                {skills.map(s => (
                   <div key={s._id} style={{ background: cardBg, border: `1px solid ${border}`, padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize:'1.2rem' }}>{s.icon}</span>
                      <span style={{ fontWeight:'bold' }}>{s.name}</span>
                      <button onClick={() => handleDelete('skills', s._id)} style={{ background:'none', border:'none', cursor:'pointer', marginLeft:'5px', color:'#ef4444' }}>✕</button>
                   </div>
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ title, count, icon, bg, border }) {
  return (
    <div style={{ background: bg, padding: '25px', borderRadius: '16px', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ fontSize: '2.5rem' }}>{icon}</div>
      <div>
        <h3 style={{ margin: 0, fontSize: '2rem' }}>{count}</h3>
        <span style={{ opacity: 0.7 }}>{title}</span>
      </div>
    </div>
  );
}

function ItemCard({ title, subtitle, bg, border, onEdit, onDelete }) {
  return (
    <div style={{ background: bg, padding: '20px', borderRadius: '12px', border: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 5px 0' }}>{title}</h4>
        <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{subtitle}</span>
      </div>
      <div style={{ display:'flex', gap:'10px' }}>
        <button onClick={onEdit} style={{ background:'#f59e0b', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' }}>Edit</button>
        <button onClick={onDelete} style={{ background:'#ef4444', color:'white', border:'none', padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' }}>Delete</button>
      </div>
    </div>
  );
}

export default PortfolioManager;