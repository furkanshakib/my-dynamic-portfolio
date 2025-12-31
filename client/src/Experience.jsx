import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

function Experience() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State for fetching data
  const [experiences, setExperiences] = useState([]);
  const API_URL = "https://furkanshakib.onrender.com/api/experience";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        // 🔄 REVERSE THE DATA so newest (last added) shows first
        setExperiences(res.data.reverse()); 
      })
      .catch(err => console.error(err));
  }, []);

  // Filter into two lists
  const jobs = experiences.filter(e => e.type === 'job');
  const education = experiences.filter(e => e.type === 'education');

  // --- STYLES ---
  const titleColor = isDark ? '#e2e8f0' : '#1e293b';
  const dotBorder = isDark ? '#0f172a' : 'white';
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardTextColor = isDark ? '#f1f5f9' : '#333';
  const subTextColor = isDark ? '#94a3b8' : '#666';
  const descColor = isDark ? '#cbd5e1' : '#555';
  
  // Job Badges
  const badgeBg = isDark ? '#334155' : '#eff6ff';
  const badgeText = isDark ? '#60a5fa' : '#2563eb';
  
  // Education Badges
  const eduBadgeBg = isDark ? '#064e3b' : '#ecfdf5';
  const eduBadgeText = isDark ? '#34d399' : '#059669';

  const renderTimeline = (items, isEdu = false) => (
    <div style={{ position: 'relative', borderLeft: '3px solid #e5e7eb', marginLeft: '20px', marginBottom: '80px' }}>
      {items.map((item) => (
        <div key={item._id} style={{ marginBottom: '40px', paddingLeft: '30px', position: 'relative' }}>
          
          {/* Dot */}
          <div style={{ 
            position: 'absolute', left: '-11px', top: '5px', width: '20px', height: '20px', 
            background: isEdu ? '#10b981' : '#2563eb', 
            borderRadius: '50%', border: `4px solid ${dotBorder}`, 
            boxShadow: `0 0 0 2px ${isEdu ? '#10b981' : '#2563eb'}` 
          }}></div>

          {/* Card */}
          <div style={{ background: cardBg, padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={{ 
              background: isEdu ? eduBadgeBg : badgeBg, 
              color: isEdu ? eduBadgeText : badgeText, 
              padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' 
            }}>
              {item.year}
            </span>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem', color: cardTextColor }}>{item.title}</h3>
            <h4 style={{ margin: '0 0 10px 0', color: subTextColor, fontWeight: 'normal' }}>{item.company}</h4>
            <p style={{ margin: 0, color: descColor, lineHeight: '1.6' }}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="experience" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      
      {/* 1. JOBS */}
      <h2 style={{ textAlign: 'center', borderBottom: `2px solid ${isDark ? '#334155' : '#ddd'}`, paddingBottom: '10px', marginBottom: '40px', color: titleColor }}>
        Professional Experience
      </h2>
      {jobs.length > 0 ? renderTimeline(jobs) : <p style={{textAlign:'center', color: descColor}}>No experience added yet.</p>}

      {/* 2. EDUCATION */}
      <h2 style={{ textAlign: 'center', borderBottom: `2px solid ${isDark ? '#334155' : '#ddd'}`, paddingBottom: '10px', marginBottom: '40px', color: titleColor }}>
        Education
      </h2>
      {education.length > 0 ? renderTimeline(education, true) : <p style={{textAlign:'center', color: descColor}}>No education added yet.</p>}

    </section>
  );
}

export default Experience;