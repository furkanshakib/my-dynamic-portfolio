import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // States
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch Data
  useEffect(() => {
    axios.get("https://furkanshakib.onrender.com/api/projects")
      .then(res => {
        const data = res.data.reverse();
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(console.error);
  }, []);

  // Filter Handler
  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === category));
    }
  };

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardBorder = isDark ? '1px solid #334155' : '1px solid #e2e8f0';
  const subText = isDark ? '#94a3b8' : '#64748b';
  const highlight = '#2563eb';

  const btnStyle = (category) => ({
    padding: '8px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: activeCategory === category ? highlight : (isDark ? '#334155' : '#e2e8f0'),
    color: activeCategory === category ? 'white' : (isDark ? '#cbd5e1' : '#475569'),
    transition: 'all 0.3s'
  });

  // Helper to strip HTML tags for preview text
  const stripHtml = (html) => {
     let tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: textColor, fontFamily: "'Inter', sans-serif", paddingBottom: '50px' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* 👇 UPDATED TITLE HERE */}
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>Featured Projects</h1>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '50px' }}>
          {['All', 'Web Dev', 'Research', 'Video', 'Articles'].map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)} style={btnStyle(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {filteredProjects.map(p => (
            <div key={p._id} style={{ background: cardBg, borderRadius: '16px', border: cardBorder, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Image Area */}
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                 {p.image ? (
                   <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 ) : (
                   <div style={{ width: '100%', height: '100%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>No Image</div>
                 )}
                 <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                   {p.category}
                 </span>
              </div>

              {/* Content Area */}
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{p.title}</h3>
                
                {/* Preview Description (Stripped of HTML) */}
                <p style={{ color: subText, fontSize: '0.95rem', lineHeight: '1.6', flex: 1, marginBottom: '20px' }}>
                  {p.description ? stripHtml(p.description).substring(0, 100) + "..." : "No description available."}
                </p>

                <a href={p.link} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-end', color: highlight, fontWeight: 'bold', textDecoration: 'none' }}>
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: subText }}>
            No projects found in this category.
          </div>
        )}

      </div>
    </div>
  );
}

export default ProjectsPage;