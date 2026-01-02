import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

function Experience() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [experiences, setExperiences] = useState([]);
  const API_URL = "https://furkanshakib.onrender.com/api/experience";

  useEffect(() => {
    axios.get(API_URL).then(res => setExperiences(res.data.reverse())).catch(console.error);
  }, []);

  const jobs = experiences.filter(e => e.type === 'job');
  const education = experiences.filter(e => e.type === 'education');

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const headingColor = isDark ? '#f1f5f9' : '#1e293b';
  const timelineLine = isDark ? '#334155' : '#e2e8f0';
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardTitle = isDark ? '#f1f5f9' : '#333';
  const cardSubtitle = isDark ? '#94a3b8' : '#555';
  const cardDesc = isDark ? '#cbd5e1' : '#666';
  const cardBorder = isDark ? '1px solid #334155' : '1px solid white';
  const shadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
  const jobBadge = { bg: isDark ? '#1e3a8a' : '#eff6ff', text: isDark ? '#60a5fa' : '#2563eb' };
  const eduBadge = { bg: isDark ? '#064e3b' : '#ecfdf5', text: isDark ? '#34d399' : '#059669' };

  const renderTimeline = (items, isEdu) => (
    <div style={{ position: 'relative', paddingLeft: '20px', marginTop: '30px' }}>
      <div style={{ position: 'absolute', left: '29px', top: '10px', bottom: '0', width: '2px', background: timelineLine, borderRadius: '2px' }}></div>

      {items.map((item, index) => {
        let logoUrl = null;
        const txt = item.company.toLowerCase();
        if (txt.includes('dhaka')) logoUrl = '/du.png';
        else if (txt.includes('10 minute')) logoUrl = '/10ms.png';
        else if (txt.includes('integrity') || txt.includes('jica')) logoUrl = '/jica.png';

        return (
          <div key={item._id} className="timeline-item" style={{ position: 'relative', marginBottom: '50px', paddingLeft: '45px', animationDelay: `${index * 0.1}s` }}>
            <div style={{ position: 'absolute', left: '0', top: '0', width: '60px', height: '60px', background: isEdu ? eduBadge.bg : jobBadge.bg, color: isEdu ? eduBadge.text : jobBadge.text, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: `4px solid ${pageBg}`, zIndex: 2, boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden', background: 'white' }}>
              {logoUrl ? <img src={logoUrl} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '5px' }} /> : (isEdu ? '🎓' : '💼')}
            </div>

            <div style={{ background: cardBg, padding: '25px', borderRadius: '12px', border: cardBorder, boxShadow: shadow, transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <span style={{ background: isEdu ? eduBadge.bg : jobBadge.bg, color: isEdu ? eduBadge.text : jobBadge.text, padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>{item.year}</span>
              </div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem', color: cardTitle }}>{item.title}</h3>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: cardSubtitle, fontWeight: '500' }}>{item.company}</h4>
              
              {/* 👇 THE CONTENT BOX */}
              <div 
                className="experience-content"
                style={{ color: cardDesc, fontSize: '1rem', lineHeight: '1.6' }} 
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
            
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: pageBg, fontFamily: "'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .timeline-item { opacity: 0; animation: slideUp 0.6s ease forwards; }

        /* 👇 THIS IS THE CRITICAL FIX */
        .experience-content {
           width: 100%;
        }
        
        /* Force every single text element (p, span, li, etc) to behave normally */
        .experience-content * {
           white-space: normal !important;  /* Ignore editor line breaks */
           word-break: normal !important;   /* Do NOT break words in the middle */
           overflow-wrap: break-word !important; /* Only break if word is too long */
           hyphens: none !important;        /* No auto-hyphens */
           max-width: 100% !important;      /* Prevent overflow */
        }

        .experience-content ul, .experience-content ol { 
           padding-left: 20px; margin: 10px 0; 
        }
        .experience-content li { 
           margin-bottom: 5px; 
        }
      `}</style>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px', color: headingColor }}>My Journey</h1>
        <p style={{ textAlign: 'center', color: cardSubtitle, marginBottom: '60px' }}>A timeline of my professional career and academic achievements.</p>
        <h2 style={{ fontSize: '1.8rem', color: headingColor, borderBottom: `2px solid ${timelineLine}`, paddingBottom: '10px', marginBottom: '20px' }}>Professional Experience</h2>
        {jobs.length > 0 ? renderTimeline(jobs, false) : <p style={{ color: cardSubtitle }}>No experience added yet.</p>}
        <h2 style={{ fontSize: '1.8rem', color: headingColor, borderBottom: `2px solid ${timelineLine}`, paddingBottom: '10px', marginBottom: '20px', marginTop: '60px' }}>Education</h2>
        {education.length > 0 ? renderTimeline(education, true) : <p style={{ color: cardSubtitle }}>No education added yet.</p>}
      </div>
    </div>
  );
}

export default Experience;