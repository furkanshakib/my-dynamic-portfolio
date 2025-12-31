import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const path = location.pathname;
  const isDark = theme === 'dark';

  // --- STYLES ---
  // 1. Glassmorphism Background (Semi-transparent + Blur)
  const navBg = isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  const navBorder = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)';
  const textColor = isDark ? '#f1f5f9' : '#334155';
  const highlightColor = '#2563eb';

  // Helper for Link Styles
  const linkStyle = (route) => ({
    textDecoration: 'none',
    color: path === route ? highlightColor : textColor,
    fontWeight: path === route ? 'bold' : '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    position: 'relative',
    padding: '5px 0'
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 0. CSS FOR RESPONSIVENESS (Injecting media queries directly) */}
      <style>{`
        .desktop-links { display: flex; gap: 30px; align-items: center; }
        .mobile-btn { display: none; }
        
        @media (max-width: 768px) {
          .desktop-links { display: none; }
          .mobile-btn { display: flex; }
        }
      `}</style>

      {/* 1. THE NAVBAR */}
      <nav style={{ 
        position: 'sticky', top: 0, zIndex: 1000,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '15px 5%', 
        background: navBg, 
        backdropFilter: 'blur(12px)', // 👈 The "Frosted Glass" effect
        borderBottom: navBorder,
        transition: 'background 0.3s, border 0.3s'
      }}>
        
        {/* LEFT: LOGO */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: highlightColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>F</div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: highlightColor, fontFamily: "'Segoe UI', sans-serif" }}>Furkan Shakib</h2>
        </Link>

        {/* CENTER: DESKTOP LINKS (Hidden on Mobile via CSS) */}
        <div className="desktop-links">
          <Link to="/" style={linkStyle('/')}>Home</Link>
          <Link to="/experience" style={linkStyle('/experience')}>Experience</Link>
          <Link to="/projects" style={linkStyle('/projects')}>Projects</Link>
          <a href="/#contact" style={{ ...linkStyle('contact'), cursor: 'pointer' }}>Contact</a>
        </div>

        {/* RIGHT: ACTIONS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }} title="Toggle Theme">
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Admin Lock (Desktop Only - Optional) */}
          <Link to="/admin" className="desktop-links" style={{ textDecoration: 'none', fontSize: '1.2rem' }} title="Admin Login">🔐</Link>

          {/* Mobile Hamburger Button (Visible only on Mobile) */}
          <button className="mobile-btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px' }}>
            <span style={{ width: '25px', height: '2px', background: textColor, borderRadius: '2px' }}></span>
            <span style={{ width: '25px', height: '2px', background: textColor, borderRadius: '2px' }}></span>
            <span style={{ width: '25px', height: '2px', background: textColor, borderRadius: '2px' }}></span>
          </button>

        </div>
      </nav>


      {/* 2. MOBILE SIDEBAR (Only shows when isOpen is true) */}
      {/* Overlay */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
        background: 'rgba(0,0,0,0.5)', zIndex: 1100, 
        opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'all' : 'none', transition: 'opacity 0.3s' 
      }} onClick={toggleMenu}></div>

      {/* Drawer */}
      <div style={{ 
        position: 'fixed', top: 0, right: 0, // Slide from RIGHT side
        width: '260px', height: '100vh', 
        background: isDark ? '#1e293b' : 'white', 
        boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', 
        zIndex: 1200, 
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)', // Slide logic
        transition: 'transform 0.3s ease',
        padding: '30px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: '20px'
      }}>
        
        {/* Close Button */}
        <button onClick={toggleMenu} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: '1.5rem', color: textColor, cursor: 'pointer' }}>✕</button>

        {/* Sidebar Links */}
        <Link to="/" onClick={toggleMenu} style={{ fontSize: '1.2rem', textDecoration: 'none', color: textColor, fontWeight: 'bold' }}>🏠 Home</Link>
        <Link to="/experience" onClick={toggleMenu} style={{ fontSize: '1.2rem', textDecoration: 'none', color: textColor, fontWeight: 'bold' }}>🎓 Experience</Link>
        <Link to="/projects" onClick={toggleMenu} style={{ fontSize: '1.2rem', textDecoration: 'none', color: textColor, fontWeight: 'bold' }}>🚀 Projects</Link>
        <a href="/#contact" onClick={toggleMenu} style={{ fontSize: '1.2rem', textDecoration: 'none', color: textColor, fontWeight: 'bold' }}>📞 Contact</a>
        
        <div style={{ borderTop: '1px solid #ddd', margin: '10px 0' }}></div>
        <Link to="/admin" onClick={toggleMenu} style={{ fontSize: '1rem', textDecoration: 'none', color: '#64748b' }}>🔐 Admin Login</Link>
      </div>
    </>
  );
}

export default Navbar;