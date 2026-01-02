import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Experience from './Experience';
import { useTheme } from './ThemeContext';

function ExperiencePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamic Styles
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const textColor = isDark ? '#f1f5f9' : '#333';
  const buttonBg = isDark ? '#334155' : '#1e293b';

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: textColor, background: pageBg, minHeight: '100vh' }}>
      
      <Navbar />

      {/* 2. THE TIMELINE CONTENT */}
      <div style={{ paddingTop: '40px' }}>
        <Experience />
      </div>

      {/* 3. FOOTER BUTTON */}
      <div style={{ textAlign: 'center', padding: '40px' }}>
        {/* 👇 FIXED: Points to /contact now */}
        <Link to="/contact" style={{ padding: '12px 24px', background: buttonBg, color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', transition: '0.3s' }}>
            Get in Touch →
        </Link>
      </div>

    </div>
  );
}

export default ExperiencePage;