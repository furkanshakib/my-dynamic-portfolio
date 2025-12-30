import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

  // --- DYNAMIC COLORS ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const headingColor = isDark ? '#e2e8f0' : '#1e293b';
  const filterBtnNormal = isDark ? '#334155' : '#e2e8f0';
  const filterTextNormal = isDark ? '#cbd5e1' : '#64748b';
  
  // 🎴 Card Colors
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardTitleColor = isDark ? '#f1f5f9' : '#333';
  const cardDescColor = isDark ? '#cbd5e1' : '#666';
  const badgeBg = isDark ? '#334155' : '#eff6ff';
  const badgeText = isDark ? '#60a5fa' : '#2563eb';
  const tagsColor = isDark ? '#94a3b8' : '#999';

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: cardDescColor, background: pageBg, minHeight: '100vh' }}>
      
      <Navbar />

      {/* 2. PROJECT GRID */}
      <div style={{ maxWidth: '1280px', width: '90%', margin: '40px auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: headingColor }}>My Portfolio</h1>
        
        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['All', 'Web Dev', 'Research', 'Video', 'Articles'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ 
                padding: '8px 20px', 
                borderRadius: '25px', 
                border: 'none', 
                cursor: 'pointer', 
                background: filter === cat ? '#2563eb' : filterBtnNormal, 
                color: filter === cat ? 'white' : filterTextNormal, 
                fontWeight: 'bold', 
                transition: '0.3s' 
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredProjects.map(p => (
            <div key={p._id} style={{ background: cardBg, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              <div style={{ padding: '20px' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px'}}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: cardTitleColor }}>{p.title}</h3>
                  <span style={{ fontSize: '0.75rem', background: badgeBg, color: badgeText, padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{p.category}</span>
                </div>
                <p style={{ color: cardDescColor, fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '15px' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small style={{ color: tagsColor }}>{p.tags}</small>
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