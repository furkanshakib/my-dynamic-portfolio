import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // 👈 Import hook

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // 👈 Get theme data
  const location = useLocation();
  const path = location.pathname;

  // --- STYLES ---
  const isDark = theme === 'dark';
  
  // Dynamic colors based on theme
  const navBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#e2e8f0' : '#334155';
  const shadow = isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.05)';

  const getLinkStyle = (route) => {
    const isActive = path === route;
    return {
      textDecoration: 'none',
      color: isActive ? 'white' : textColor,
      background: isActive ? '#2563eb' : 'transparent',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '10px',
      transition: '0.3s'
    };
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', background: navBg, boxShadow: shadow, 
        position: 'sticky', top: 0, zIndex: 1000, transition: '0.3s'
      }}>
        
        {/* LEFT: HAMBURGER + LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '25px', height: '3px', background: isDark ? 'white' : '#333', borderRadius: '2px' }}></div>
            <div style={{ width: '25px', height: '3px', background: isDark ? 'white' : '#333', borderRadius: '2px' }}></div>
            <div style={{ width: '25px', height: '3px', background: isDark ? 'white' : '#333', borderRadius: '2px' }}></div>
          </button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, color: '#2563eb', fontFamily: "'Segoe UI', sans-serif" }}>Furkan Shakib</h2>
          </Link>
        </div>

        {/* RIGHT: THEME TOGGLE BUTTON */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={toggleTheme}
            style={{
              background: isDark ? '#334155' : '#e2e8f0',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: '0.3s'
            }}
            title="Toggle Dark Mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* SIDEBAR DRAWER */}
      {isOpen && (
        <div onClick={toggleMenu} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1100 }}></div>
      )}

      <div style={{ 
        position: 'fixed', top: 0, left: isOpen ? '0' : '-300px', 
        width: '250px', height: '100vh', 
        background: navBg, boxShadow: '4px 0 15px rgba(0,0,0,0.1)', 
        zIndex: 1200, transition: 'left 0.3s ease', padding: '20px', boxSizing: 'border-box'
      }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: textColor, cursor: 'pointer', marginBottom: '30px', float: 'right' }}>✕</button>

        <div style={{ marginTop: '60px' }}>
          <Link to="/" onClick={toggleMenu} style={getLinkStyle('/')}>🏠 Home</Link>
          <Link to="/experience" onClick={toggleMenu} style={getLinkStyle('/experience')}>🎓 Experience</Link>
          <Link to="/projects" onClick={toggleMenu} style={getLinkStyle('/projects')}>🚀 Projects</Link>
          <a href="/#contact" onClick={toggleMenu} style={{ ...getLinkStyle('contact'), color: textColor, background: 'transparent' }}>📞 Contact</a>
          <div style={{ borderTop: `1px solid ${isDark ? '#334155' : '#eee'}`, margin: '20px 0' }}></div>
          <Link to="/admin" onClick={toggleMenu} style={getLinkStyle('/admin')}>🔐 Admin Login</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;