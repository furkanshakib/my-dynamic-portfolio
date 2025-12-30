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
    // Add a timestamp to prevent browser caching
    axios.get(`${API_PROJECTS}?t=${Date.now()}`).then(res => setProjects(res.data)).catch(err => console.error(err));
    axios.get(`${API_EXP}?t=${Date.now()}`).then(res => setExperiences(res.data)).catch(err => console.error(err));
  };

  // --- HANDLERS ---
  const handleAddProject = () => {
    if(!newProject.title) return alert("Title is required!");
    
    axios.post(API_PROJECTS, newProject)
      .then(() => {
        alert("✅ Project Added!");
        setNewProject({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
        fetchData();
      })
      .catch(err => alert("❌ Error adding project: " + err.message));
  };

  const handleDeleteProject = (id) => {
    if(!id) return alert("Error: No ID found for this item.");
    
    if(window.confirm("Are you sure you want to delete this project?")) {
      axios.delete(`${API_PROJECTS}/${id}`)
        .then(() => {
            alert("🗑️ Project Deleted");
            fetchData();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Failed to delete. Check console for details.");
        });
    }
  };

  const handleAddExp = () => {
    if(!newExp.title) return alert("Title is required!");

    axios.post(API_EXP, newExp)
      .then(() => {
        alert("✅ Experience Added!");
        setNewExp({ title: '', company: '', year: '', description: '', type: 'job' });
        fetchData();
      })
      .catch(err => alert("❌ Error adding experience: " + err.message));
  };

  const handleDeleteExp = (id) => {
    if(!id) return alert("Error: No ID found for this item.");

    if(window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`${API_EXP}/${id}`)
        .then(() => {
            alert("🗑️ Item Deleted");
            fetchData();
        })
        .catch(err => {
            console.error(err);
            alert("❌ Failed to delete. Check console for details.");
        });
    }
  };

  // Styles
  const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', marginBottom: '10px', boxSizing: 'border-box' };
  const buttonStyle = { padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
  const deleteBtnStyle = { background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
             <button onClick={() => fetchData()} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>🔄 Refresh Data</button>
             <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{ background: '#64748b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('projects')} style={{ padding: '10px 20px', background: activeTab === 'projects' ? '#2563eb' : '#e2e8f0', color: activeTab === 'projects' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: '0.3s' }}>Projects</button>
        <button onClick={() => setActiveTab('experience')} style={{ padding: '10px 20px', background: activeTab === 'experience' ? '#2563eb' : '#e2e8f0', color: activeTab === 'experience' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: '0.3s' }}>Experience & Education</button>
      </div>

      {/* --- PROJECTS TAB --- */}
      {activeTab === 'projects' && (
        <div>
          <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>➕ Add New Project</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} style={inputStyle} />
              <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} style={inputStyle}>
                <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
              </select>
              <input placeholder="Image URL (e.g. /project1.jpg or https://...)" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} style={inputStyle} />
              <input placeholder="Link URL" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} style={inputStyle} />
              <input placeholder="Tags (e.g. React, SPSS)" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} style={inputStyle} />
            </div>
            <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} style={{ ...inputStyle, height: '80px', marginTop: '10px' }} />
            <button onClick={handleAddProject} style={buttonStyle}>Add Project</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {projects.map(p => (
              <div key={p._id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{p.title}</h4>
                    <span style={{ fontSize: '0.8rem', background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '4px' }}>{p.category}</span>
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
          <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>➕ Add Experience / Education</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input placeholder="Title (e.g. Office Assistant)" value={newExp.title} onChange={e => setNewExp({...newExp, title: e.target.value})} style={inputStyle} />
              <input placeholder="Company / University" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} style={inputStyle} />
              <input placeholder="Year (e.g. 2024 - 2025)" value={newExp.year} onChange={e => setNewExp({...newExp, year: e.target.value})} style={inputStyle} />
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
              <div key={e._id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: e.type === 'job' ? '#eff6ff' : '#ecfdf5', color: e.type === 'job' ? '#2563eb' : '#059669', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        {e.type}
                    </span>
                    <h4 style={{ margin: '10px 0 5px 0', fontSize: '1.1rem' }}>{e.title}</h4>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem' }}>{e.company} ({e.year})</p>
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