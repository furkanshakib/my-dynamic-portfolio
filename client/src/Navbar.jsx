import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

function Navbar({ style = {} }) {
  const { theme, toggleTheme, colorTheme, changeColorTheme, colorThemesMap } = useTheme();
  const location = useLocation();
  const isDark = theme === 'dark';

  const [isOpen, setIsOpen] = useState(false);

  // Colors
  const navBg = isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.6)';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const accent = 'var(--color-primary)';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  // 👇 ADDED "BLOGS" HERE
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav style={{
      position: 'sticky', top: '15px', zIndex: 100, maxWidth: '1200px', margin: '15px auto', borderRadius: '50px',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      background: navBg, border: `1px solid ${border}`, boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      padding: '12px 25px',
      ...style // User overrides applied here
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', height: '40px'
      }}>

        {/* LEFT: LOGO */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
          <img src="/logo.png" alt="Logo" style={{ height: '35px', width: 'auto', borderRadius: '8px' }} />
          <span style={{ fontSize: '1.3rem', fontWeight: '800', color: textColor, fontFamily: "'Cinzel', serif", textTransform: 'uppercase', letterSpacing: '1px' }}>
            Furkan Shakib
          </span>
        </Link>

        {/* CENTER: LINKS */}
        <div className="desktop-menu" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '5px', alignItems: 'center',
          background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)',
          padding: '5px', borderRadius: '30px'
        }}>
          {links.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path} style={{
                position: 'relative',
                textDecoration: 'none',
                padding: '8px 18px',
                color: isActive ? (isDark ? '#fff' : accent) : textColor,
                fontWeight: isActive ? '700' : '500',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                zIndex: 1,
                transition: 'color 0.2s'
              }}>
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: accent,
                      opacity: isDark ? 0.2 : 0.1,
                      borderRadius: '25px',
                      zIndex: -1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: THEME & MOBILE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10 }}>

          {/* Theme Color Picker */}
          <div className="color-picker" style={{ display: 'flex', gap: '8px', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '20px' }}>
            {colorThemesMap && Object.keys(colorThemesMap).map(key => (
              <button
                key={key}
                onClick={() => changeColorTheme(key)}
                style={{
                  width: '16px', height: '16px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                  background: colorThemesMap[key].primary,
                  boxShadow: colorTheme === key ? `0 0 0 2px ${navBg}, 0 0 0 4px ${colorThemesMap[key].primary}` : 'none',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          <button onClick={toggleTheme} style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: textColor, fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div style={{
          background: isDark ? '#1e293b' : 'white', borderTop: `1px solid ${border}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', position: 'absolute', top: '100%', left: 0, width: '100%', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {links.map(link => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: location.pathname === link.path ? accent : textColor, fontSize: '1.1rem', fontWeight: location.pathname === link.path ? '700' : '500', fontFamily: "'Outfit', sans-serif", display: 'block', padding: '10px 0', borderBottom: `1px solid ${border}` }}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
      <style>{`@media (max-width: 768px) { .desktop-menu { display: none !important; } .mobile-toggle { display: block !important; } }`}</style>
    </nav>
  );
}
export default Navbar;