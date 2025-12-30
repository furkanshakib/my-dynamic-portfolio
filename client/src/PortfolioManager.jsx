import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PortfolioManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    tags: "",
    category: "Web Dev" // Default value
  });

  const API_URL = "https://furkanshakib.onrender.com/api/projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      alert("Project Added! 🚀");
      // Reset form
      setForm({ title: "", description: "", image: "", link: "", tags: "", category: "Web Dev" }); 
      fetchProjects(); 
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>📂 Portfolio Manager</h1>
        <div style={{ display: 'flex', gap: '10px'}}>
             <Link to="/" style={{ textDecoration: 'none', color: '#2563eb', padding: '10px' }}>View Home 🏠</Link>
             <button onClick={handleLogout} style={{ background: '#333', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Log Out 🔒</button>
        </div>
      </div>
      
      {/* --- ADD PROJECT FORM --- */}
      <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add New Project</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <input name="title" placeholder="Project Title" value={form.title} onChange={handleChange} required style={{ padding: '10px' }} />
          
          {/* 👇 NEW CATEGORY DROPDOWN */}
          <select name="category" value={form.category} onChange={handleChange} style={{ padding: '10px' }}>
            <option value="Web Dev">Web Dev</option>
            <option value="Research">Research (Peace & Conflict)</option>
            <option value="Video">Video Production</option>
            <option value="Articles">Articles/Op-Eds</option>
          </select>

          <textarea name="description" placeholder="Description..." value={form.description} onChange={handleChange} required style={{ padding: '10px', height: '80px' }} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={{ padding: '10px' }} />
          <input name="link" placeholder="Live Link" value={form.link} onChange={handleChange} style={{ padding: '10px' }} />
          <input name="tags" placeholder="Tags (e.g. React, Qualitative Analysis)" value={form.tags} onChange={handleChange} style={{ padding: '10px' }} />
          
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Add Project ➕</button>
        </form>
      </div>

      {/* --- PROJECT LIST --- */}
      <div>
        <h3>Your Projects ({projects.length})</h3>
        {projects.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{p.title} <span style={{fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '4px'}}>{p.category || "No Category"}</span></h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{p.description}</p>
            </div>
            <button onClick={() => handleDelete(p._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Delete 🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioManager;