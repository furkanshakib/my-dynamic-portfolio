import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);
  
  // Use localhost for now
  const API_URL = "http://localhost:5000/api/projects";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Furkan Shakib</h1>
        <Link to="/admin" style={{ textDecoration: 'none', color: '#666' }}>Admin Login</Link>
      </header>

      {/* Intro Section */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#555' }}>Peace & Conflict Student | Web Developer</h2>
        <p style={{ lineHeight: '1.6', color: '#666' }}>
          Welcome to my personal portfolio. Here you will find my academic research, 
          video projects, and web development applications.
        </p>
      </section>

      {/* Projects Grid */}
      <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>My Projects</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        {projects.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {p.image && (
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            )}
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{p.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{p.description}</p>
              <div style={{ marginTop: '10px' }}>
                <span style={{ background: '#e5e7eb', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{p.tags}</span>
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '15px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
                  View Project →
                </a>
              )}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Home;