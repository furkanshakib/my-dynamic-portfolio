import React from 'react';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Navbar from './Navbar';

function ExperiencePage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#333', background: '#f8f9fa', minHeight: '100vh' }}>
      
      {/* 1. NAVBAR (Reuse same style as Home) */}
      <Navbar />

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