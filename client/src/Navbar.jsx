import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';
  
  // State for Mobile Menu
  const [isOpen, setIsOpen] = useState(false);

  // Styles
  const navBg = isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const accent = '#2563eb';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // Links Configuration
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav style={{ 
      position: 'sticky', top: 0, zIndex: 100, 
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      background: navBg, borderBottom: `1px solid ${border}`,
      padding: '15px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* 👇 LOGO & NAME RESTORED */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Change '/logo.png' to your actual file name if different! */}
          <img src="/logo.png" alt="Logo" style={{ height: '40px', width: 'auto', borderRadius: '8px' }} /> 
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: textColor, fontFamily: "'Inter', sans-serif" }}>
            Furkan Shakib
          </span>
        </Link>

        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {links.map(link => (
            <Link key={link.name} to={link.path} style={{ 
              textDecoration: 'none', 
              color: location.pathname === link.path ? accent : textColor, 
              fontWeight: location.pathname === link.path ? 'bold' : 'normal',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>
              {link.name}
            </Link>
          ))}
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* MOBILE TOGGLE (Visible on Mobile) */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: textColor, fontSize: '1.5rem', cursor: 'pointer' }}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div style={{ 
          background: isDark ? '#1e293b' : 'white', 
          borderTop: `1px solid ${border}`, 
          padding: '20px', 
          display: 'flex', flexDirection: 'column', gap: '15px',
          position: 'absolute', top: '100%', left: 0, width: '100%', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {links.map(link => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} style={{ 
              textDecoration: 'none', 
              color: location.pathname === link.path ? accent : textColor, 
              fontSize: '1.1rem', fontWeight: '500', display: 'block', padding: '10px 0', borderBottom: `1px solid ${border}`
            }}>
              {link.name}
            </Link>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
             <span style={{ color: textColor }}>Theme</span>
             <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, padding:'8px 15px', borderRadius:'6px', cursor: 'pointer', fontSize: '0.9rem', color: textColor }}>
                {isDark ? 'Switch to Light ☀️' : 'Switch to Dark 🌙'}
             </button>
          </div>
        </div>
      )}

      {/* CSS FOR MEDIA QUERIES */}
      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;