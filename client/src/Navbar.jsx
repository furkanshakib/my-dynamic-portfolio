import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // 🟢 State to control the menu
  const location = useLocation();
  const path = location.pathname;

  // --- STYLES ---
  const getLinkStyle = (route) => {
    const isActive = path === route;
    return {
      textDecoration: 'none',
      color: isActive ? 'white' : '#334155',
      background: isActive ? '#2563eb' : 'transparent',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      display: 'block', // Make them fill the width in the sidebar
      marginBottom: '10px',
      transition: '0.3s'
    };
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. THE MAIN NAVBAR */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 5%', 
        background: 'white', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000 
      }}>
        
        {/* LEFT: HAMBURGER ICON + LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* 🍔 The Hamburger Button */}
          <button 
            onClick={toggleMenu}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '5px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '5px' 
            }}
          >
            <div style={{ width: '25px', height: '3px', background: '#333', borderRadius: '2px' }}></div>
            <div style={{ width: '25px', height: '3px', background: '#333', borderRadius: '2px' }}></div>
            <div style={{ width: '25px', height: '3px', background: '#333', borderRadius: '2px' }}></div>
          </button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, color: '#2563eb', fontFamily: "'Segoe UI', sans-serif" }}>Furkan Shakib</h2>
          </Link>
        </div>

        {/* RIGHT: DESKTOP LINKS (Hidden on small screens if you want, but kept here for now) */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
           {/* You can keep or remove these horizontal links. 
               For now, I'm keeping them so you have both options. */}
           <Link to="/projects" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Projects</Link>
           <Link to="/admin" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Login</Link>
        </div>
      </nav>


      {/* 2. THE SLIDING SIDEBAR MENU (Overlay) */}
      {/* This dark background covers the screen when menu is open */}
      {isOpen && (
        <div 
          onClick={toggleMenu} // Click outside to close
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 1100 
          }}
        ></div>
      )}

      {/* The Actual Sidebar */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: isOpen ? '0' : '-300px', // Slide in/out logic
        width: '250px', 
        height: '100vh', 
        background: 'white', 
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)', 
        zIndex: 1200, 
        transition: 'left 0.3s ease',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        
        {/* Close Button (X) */}
        <button 
          onClick={toggleMenu}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#64748b', 
            cursor: 'pointer',
            marginBottom: '30px',
            float: 'right'
          }}
        >
          ✕
        </button>

        {/* Sidebar Links */}
        <div style={{ marginTop: '60px' }}>
          <Link to="/" onClick={toggleMenu} style={getLinkStyle('/')}>🏠 Home</Link>
          <Link to="/experience" onClick={toggleMenu} style={getLinkStyle('/experience')}>🎓 Experience</Link>
          <Link to="/projects" onClick={toggleMenu} style={getLinkStyle('/projects')}>🚀 Projects</Link>
          <a href="/#contact" onClick={toggleMenu} style={{ ...getLinkStyle('contact'), color: '#334155', background: 'transparent' }}>📞 Contact</a>
          <div style={{ borderTop: '1px solid #eee', margin: '20px 0' }}></div>
          <Link to="/admin" onClick={toggleMenu} style={getLinkStyle('/admin')}>🔐 Admin Login</Link>
        </div>

      </div>
    </>
  );
}

export default Navbar;