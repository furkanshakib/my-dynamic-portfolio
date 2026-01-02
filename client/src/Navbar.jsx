import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';
  
  const [isOpen, setIsOpen] = useState(false);

  // Colors
  const navBg = isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const accent = '#2563eb';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav style={{ 
      position: 'sticky', top: 0, zIndex: 100, 
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      background: navBg, borderBottom: `1px solid ${border}`,
      padding: '15px 20px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', // Pushes Logo Left, Toggle Right
        position: 'relative', // Needed for absolute centering
        height: '40px'
      }}>
        
        {/* 1. LEFT: LOGO & NAME */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
          <img src="/logo.png" alt="Logo" style={{ height: '35px', width: 'auto', borderRadius: '8px' }} /> 
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: textColor, fontFamily: "'Inter', sans-serif" }}>
            FURKAN SHAKIB
          </span>
        </Link>

        {/* 2. CENTER: NAVIGATION LINKS (Absolute Positioned) */}
        <div className="desktop-menu" style={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)', // This trick perfectly centers it
            display: 'flex', 
            gap: '30px', 
            alignItems: 'center' 
        }}>
          {links.map(link => (
            <Link key={link.name} to={link.path} style={{ 
              textDecoration: 'none', 
              color: location.pathname === link.path ? accent : textColor, 
              fontWeight: location.pathname === link.path ? 'bold' : '500',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. RIGHT: THEME TOGGLE (& Hamburger on Mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10 }}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{ 
             background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
             border: 'none', 
             borderRadius: '50%', 
             width: '35px', height: '35px', 
             cursor: 'pointer', 
             fontSize: '1.1rem', 
             display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Mobile Hamburger (Hidden on Desktop) */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: textColor, fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
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
        </div>
      )}

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; } /* Hide center links on mobile */
          .mobile-toggle { display: block !important; } /* Show hamburger */
        }
      `}</style>
    </nav>
  );
}

export default Navbar;