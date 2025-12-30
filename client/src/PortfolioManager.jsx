import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PortfolioManager() {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  // --- PROJECTS STATE ---
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
  
  // --- EXPERIENCE STATE ---
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '', type: 'job' });

  // API URLs
  const API_PROJECTS = "https://furkanshakib.onrender.com/api/projects";
  const API_EXP = "https://furkanshakib.onrender.com/api/experience";

  // Check Login
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin");
    fetchData();
  }, [navigate]);

  const fetchData = () => {
    axios.get(API_PROJECTS).then(res => setProjects(res.data));
    axios.get(API_EXP).then(res => setExperiences(res.data));
  };

  // --- HANDLERS ---
  const handleAddProject = () => {
    axios.post(API_PROJECTS, newProject).then(() => {
      alert("Project Added!");
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
    axios.post(API_EXP, newExp).then(() => {
      alert("Experience Added!");
      setNewExp({ title: '', company: '', year: '', description: '', type: 'job' });
      fetchData();
    });
  };

  const handleDeleteExp = (id) => {
    if(window.confirm("Delete this item?")) {
      axios.delete(`${API_EXP}/${id}`).then(() => fetchData());
    }
  };

  const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', marginBottom: '10px' };
  const buttonStyle = { padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>👑 Admin Dashboard</h1>
        <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('projects')} style={{ padding: '10px 20px', background: activeTab === 'projects' ? '#2563eb' : '#ddd', color: activeTab === 'projects' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Projects</button>
        <button onClick={() => setActiveTab('experience')} style={{ padding: '10px 20px', background: activeTab === 'experience' ? '#2563eb' : '#ddd', color: activeTab === 'experience' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Experience & Education</button>
      </div>

      {/* --- PROJECTS TAB --- */}
      {activeTab === 'projects' && (
        <div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
            <h3>➕ Add New Project</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
              <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={inputStyle}>
                <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
              </select>
              <input placeholder="Image URL" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
              <input placeholder="Link URL" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={inputStyle} />
              <input placeholder="Tags (e.g. React, SPSS)" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} style={inputStyle} />
            </div>
            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} style={{ ...inputStyle, height: '80px' }} />
            <button onClick={handleAddProject} style={buttonStyle}>Add Project</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {projects.map(p => (
              <div key={p._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: 'white' }}>
                <h4>{p.title}</h4>
                <button onClick={() => handleDeleteProject(p._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- EXPERIENCE TAB --- */}
      {activeTab === 'experience' && (
        <div>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
            <h3>➕ Add Experience / Education</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input placeholder="Title (e.g. Office Assistant)" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} style={inputStyle} />
              <input placeholder="Company / University" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} style={inputStyle} />
              <input placeholder="Year (e.g. 2024 - 2025)" value={newExp.year} onChange={e => setNewExp({...newExp, year: e.target.value})} style={inputStyle} />
              <select value={newExp.type} onChange={e => setNewExp({...newExp, type: e.target.value})} style={inputStyle}>
                <option value="job">Job Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
            <textarea placeholder="Description" value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} style={{ ...inputStyle, height: '80px' }} />
            <button onClick={handleAddExp} style={buttonStyle}>Add Item</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {experiences.map(e => (
              <div key={e._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: 'white' }}>
                <span style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{e.type.toUpperCase()}</span>
                <h4 style={{ margin: '5px 0' }}>{e.title}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#666' }}>{e.company}</p>
                <button onClick={() => handleDeleteExp(e._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PortfolioManager;