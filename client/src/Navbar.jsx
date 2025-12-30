import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // --- STYLE LOGIC ---
  // If the link matches the current page, give it the "Active Card" style.
  // Otherwise, give it the "Normal" style.
  const getLinkStyle = (route) => {
    if (path === route) {
      // 🟦 ACTIVE STATE (The Rectangular Card)
      return {
        textDecoration: 'none',
        color: 'white',
        background: '#2563eb', // Blue Background
        padding: '8px 18px',
        borderRadius: '6px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(37, 99, 235, 0.3)'
      };
    } else {
      // ⬜ NORMAL STATE
      return {
        textDecoration: 'none',
        color: '#64748b', // Grey text
        padding: '8px 18px',
        fontWeight: '500',
        transition: 'all 0.3s ease'
      };
    }
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '15px 5%', 
      background: '#ffffff', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* LOGO (Always links to Home) */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 style={{ margin: 0, color: '#2563eb', fontSize: '1.5rem', fontFamily: "'Segoe UI', sans-serif" }}>
          Furkan Shakib
        </h2>
      </Link>

      {/* MENU LINKS */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        
        <Link to="/experience" style={getLinkStyle('/experience')}>
          Experience
        </Link>
        
        <Link to="/projects" style={getLinkStyle('/projects')}>
          Projects
        </Link>
        
        {/* Contact is special: It always goes to the Home page's bottom */}
        <a href="/#contact" style={{ textDecoration: 'none', color: '#64748b', padding: '8px 18px', fontWeight: '500' }}>
          Contact
        </a>

        <Link to="/admin" style={getLinkStyle('/admin')}>
          Admin Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;