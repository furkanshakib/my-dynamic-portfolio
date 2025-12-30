import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  
  // Live Server Link
  const API_URL = "https://furkanshakib.onrender.com/api/projects";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#333', background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* 1. NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 5%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, color: '#2563eb' }}>Furkan Shakib</h2>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>Home</Link>
          <Link to="/experience" style={{ textDecoration: 'none', color: '#555' }}>Experience</Link>
          <Link to="/projects" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Projects</Link>
          <Link to="/#contact" style={{ textDecoration: 'none', color: '#555' }}>Contact</Link>
        </div>
      </nav>

      {/* 2. PROJECT GRID */}
      <div style={{ maxWidth: '1280px', width: '90%', margin: '40px auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#1e293b' }}>My Portfolio</h1>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['All', 'Web Dev', 'Research', 'Video', 'Articles'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer', background: filter === cat ? '#2563eb' : '#e2e8f0', color: filter === cat ? 'white' : '#64748b', fontWeight: 'bold', transition: '0.3s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredProjects.map(p => (
            <div key={p._id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              <div style={{ padding: '20px' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px'}}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{p.title}</h3>
                  <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{p.category}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: '#999' }}>{p.tags}</small>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>View →</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProjectsPage;