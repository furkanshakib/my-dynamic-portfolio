import React from 'react';
import { Link } from 'react-router-dom';
import Experience from './Experience';

function ExperiencePage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#333', background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* 1. NAVBAR (Reuse same style as Home) */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 5%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, color: '#2563eb' }}>Furkan Shakib</h2>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>Home</Link>
          <Link to="/#projects" style={{ textDecoration: 'none', color: '#555' }}>Projects</Link>
          <Link to="/#contact" style={{ textDecoration: 'none', color: '#555' }}>Contact</Link>
        </div>
      </nav>

      {/* 2. THE TIMELINE CONTENT */}
      <div style={{ paddingTop: '40px' }}>
        <Experience />
      </div>

      {/* 3. FOOTER BUTTON */}
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Link to="/#contact" style={{ padding: '12px 24px', background: '#1e293b', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Get in Touch →
        </Link>
      </div>

    </div>
  );
}

export default ExperiencePage;