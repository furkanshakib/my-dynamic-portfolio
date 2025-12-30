import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // 👈 Import the Brain

function PortfolioManager() {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();
  
  // Theme Logic
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // --- STATES ---
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
  
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '', type: 'job' });

  // API URLs
  const API_PROJECTS = "https://furkanshakib.onrender.com/api/projects";
  const API_EXP = "https://furkanshakib.onrender.com/api/experience";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin");
    fetchData();
  }, [navigate]);

  const fetchData = () => {
    // Adding timestamp to force fresh data
    axios.get(`${API_PROJECTS}?t=${Date.now()}`).then(res => setProjects(res.data)).catch(console.error);
    axios.get(`${API_EXP}?t=${Date.now()}`).then(res => setExperiences(res.data)).catch(console.error);
  };

  // --- HANDLERS ---
  const handleAddProject = () => {
    if(!newProject.title) return alert("Title required!");
    axios.post(API_PROJECTS, newProject).then(() => {
      alert("✅ Project Added!");
      setNewProject({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
      fetchData();
    });
  };

  const handleDeleteProject = (id) => {
    if(window.confirm("Delete this project?")) {
      axios.delete(`${API_PROJECTS}/${id}`).then(() => fetchData());
    }
  };

  const handleAddExp = () => {
    if(!newExp.title) return alert("Title required!");
    axios.post(API_EXP, newExp).then(() => {
      alert("✅ Experience Added!");
      setNewExp({ title: '', company: '', year: '', description: '', type: 'job' });
      fetchData();
    });
  };

  const handleDeleteExp = (id) => {
    if(window.confirm("Delete this item?")) {
      axios.delete(`${API_EXP}/${id}`).then(() => fetchData());
    }
  };

  // --- DYNAMIC STYLES ---
  const pageBg = isDark ? '#0f172a' : '#fff';
  const headingColor = isDark ? '#f1f5f9' : '#1e293b';
  
  // Card Styles
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardText = isDark ? '#e2e8f0' : '#333';
  const cardBorder = isDark ? '#334155' : '#e2e8f0';

  // Input Styles
  const inputBg = isDark ? '#334155' : 'white';
  const inputText = isDark ? 'white' : 'black';
  const inputBorder = isDark ? '#475569' : '#ccc';

  const inputStyle = { 
    padding: '10px', borderRadius: '5px', 
    border: `1px solid ${inputBorder}`, 
    background: inputBg, color: inputText,
    width: '100%', marginBottom: '10px', boxSizing: 'border-box' 
  };

  const buttonStyle = { padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
  const deleteBtnStyle = { background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: headingColor }}>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
             <button onClick={fetchData} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>🔄 Refresh</button>
             <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{ background: '#64748b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('projects')} style={{ padding: '10px 20px', background: activeTab === 'projects' ? '#2563eb' : '#94a3b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Projects</button>
        <button onClick={() => setActiveTab('experience')} style={{ padding: '10px 20px', background: activeTab === 'experience' ? '#2563eb' : '#94a3b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Experience & Education</button>
      </div>

      {/* --- PROJECTS TAB --- */}
      {activeTab === 'projects' && (
        <div>
          <div style={{ background: cardBg, padding: '25px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: `1px solid ${cardBorder}` }}>
            <h3 style={{ marginTop: 0, color: cardText }}>➕ Add New Project</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
              <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={inputStyle}>
                <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
              </select>
              <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
              <input placeholder="Link URL" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={inputStyle} />
              <input placeholder="Tags" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} style={inputStyle} />
            </div>
            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} style={{ ...inputStyle, height: '80px', marginTop: '10px' }} />
            <button onClick={handleAddProject} style={buttonStyle}>Add Project</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {projects.map(p => (
              <div key={p._id} style={{ border: `1px solid ${cardBorder}`, padding: '15px', borderRadius: '8px', background: cardBg, color: cardText, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{p.title}</h4>
                    <span style={{ fontSize: '0.8rem', background: isDark ? '#334155' : '#eff6ff', color: isDark ? '#60a5fa' : '#2563eb', padding: '2px 8px', borderRadius: '4px' }}>{p.category}</span>
                </div>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleDeleteProject(p._id)} style={deleteBtnStyle}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- EXPERIENCE TAB --- */}
      {activeTab === 'experience' && (
        <div>
          <div style={{ background: cardBg, padding: '25px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: `1px solid ${cardBorder}` }}>
            <h3 style={{ marginTop: 0, color: cardText }}>➕ Add Experience</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Title" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} style={inputStyle} />
              <input placeholder="Company" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} style={inputStyle} />
              <input placeholder="Year" value={newExp.year} onChange={e => setNewExp({...newExp, year: e.target.value})} style={inputStyle} />
              <select value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} style={inputStyle}>
                <option value="job">Job Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
            <textarea placeholder="Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} style={{ ...inputStyle, height: '80px', marginTop: '10px' }} />
            <button onClick={handleAddExp} style={buttonStyle}>Add Item</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {experiences.map(e => (
              <div key={e._id} style={{ border: `1px solid ${cardBorder}`, padding: '15px', borderRadius: '8px', background: cardBg, color: cardText, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: isDark ? '#334155' : '#eff6ff', color: isDark ? '#60a5fa' : '#2563eb', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {e.type}
                    </span>
                    <h4 style={{ margin: '10px 0 5px 0', fontSize: '1.1rem' }}>{e.title}</h4>
                    <p style={{ margin: '0 0 10px 0', color: isDark ? '#94a3b8' : '#666', fontSize: '0.9rem' }}>{e.company}</p>
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleDeleteExp(e._id)} style={deleteBtnStyle}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PortfolioManager;