import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

// --- ICONS (Reused from your old code) ---
function SocialIcon({ href, iconPath, color }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" 
       style={{ 
         display: 'flex', alignItems: 'center', justifyContent: 'center',
         width: '40px', height: '40px', borderRadius: '10px',
         background: 'rgba(255,255,255,0.05)', color: color,
         border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s'
       }}
       onMouseEnter={(e) => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; }}
       onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = color; }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{iconPath}</svg>
    </a>
  );
}

function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);

  // Fetch Data
  useEffect(() => {
    // Fetch Projects
    axios.get("https://furkanshakib.onrender.com/api/projects")
      .then(res => setProjects(res.data.reverse().slice(0, 4))) // Get top 4
      .catch(console.error);

    // Fetch Experience
    axios.get("https://furkanshakib.onrender.com/api/experience")
      .then(res => setExperience(res.data.reverse().slice(0, 3))) // Get top 3
      .catch(console.error);
  }, []);

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const subText = isDark ? '#94a3b8' : '#64748b';
  const borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const highlight = '#2563eb';

  // --- STATIC DATA ---
  const skills = [
    { name: "React.js", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "SPSS", icon: "📊" },
    { name: "Research", icon: "🔎" },
    { name: "Premiere Pro", icon: "🎬" },
    { name: "Data Analysis", icon: "📈" }
  ];

  const services = [
    { title: "Academic Research", icon: "🎓" },
    { title: "Web Development", icon: "💻" },
    { title: "Video Editing", icon: "🎥" },
  ];

  return (
    <div style={{ background: pageBg, minHeight: '100vh', color: textColor, fontFamily: "'Inter', sans-serif", paddingBottom: '50px' }}>
      <Navbar />

     {/* CSS GRID STYLES */}
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr; /* 3 Columns on Desktop */
          grid-template-rows: auto auto;
          gap: 20px;
          max-width: 1400px;
          margin: 40px auto;
          padding: 0 20px;
        }

        /* CARD STYLE */
        .bento-card {
          background: ${cardBg};
          border: 1px solid ${borderColor};
          border-radius: 24px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        .bento-card:hover { transform: translateY(-3px); }

        /* 👇 FIXED RESPONSIVE RULES */
        
        /* Tablets (Medium Screens) */
        @media (max-width: 1100px) {
          .bento-grid { 
            grid-template-columns: 1fr 1fr; /* Switch to 2 columns */
          }
          .profile-box { 
            grid-column: span 2; /* Profile takes full width on top */
            flex-direction: row; /* Layout profile side-by-side if you want, or keep column */
            align-items: center;
            gap: 30px;
          }
          .profile-box img {
            width: 200px !important; /* Smaller image on tablet */
            height: 200px !important;
            margin-bottom: 0 !important;
          }
        }

        /* Mobile (Phones) - FORCE STACK */
        @media (max-width: 768px) {
          .bento-grid {
            display: flex; /* Override Grid */
            flex-direction: column; /* Stack everything vertically */
            gap: 20px;
          }
          
          .profile-box {
            flex-direction: column; /* Stack profile image and text */
            text-align: center;
          }
          
          .profile-box img {
            width: 100% !important; /* Full width image again */
            height: auto !important;
            max-height: 350px;
            margin-bottom: 20px !important;
          }
        }
      `}</style>

      <div className="bento-grid">
        
        {/* 1. PROFILE BOX (Top Left) */}
        <div className="bento-card profile-box" style={{ gridRow: 'span 2' }}>
         <img 
  src="/profile.png" 
  alt="Profile" 
  style={{ 
    width: '100%', 
    maxHeight: '350px', 
    objectFit: 'contain', 
    borderRadius: '16px', 
    marginBottom: '20px',
    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' 
  }} 
/>
          <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>Furkan Shakib 👋</h1>
          <p style={{ color: subText, fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px' }}>
            A passionate <b>Peace & Conflict Researcher</b> and <b>Full Stack Developer</b>. I bridge the gap between social science and modern technology.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <Link to="/contact" style={{ flex: 1, textAlign: 'center', background: highlight, color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Let's Talk</Link>
            <a href="/cv.pdf" download style={{ flex: 1, textAlign: 'center', background: 'transparent', border: `1px solid ${borderColor}`, color: textColor, padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>View CV</a>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${borderColor}` }}>
             <SocialIcon href="https://linkedin.com" color="#0077b5" iconPath={<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>} />
             <SocialIcon href="mailto:furkanshakib@gmail.com" color="#ef4444" iconPath={<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>} />
             <SocialIcon href="https://wa.me/8801624767370" color="#22c55e" iconPath={<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/>} />
          </div>
        </div>

        {/* 2. MIDDLE COLUMN (Experience & Skills) */}
        <div className="middle-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
         {/* Work Experience */}
          <div className="bento-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Work Experience</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {experience.length > 0 ? experience.map(exp => {
                
                // 👇 HELPER: Check company name and pick logo
                let logoUrl = null;
                const txt = exp.company.toLowerCase();
                
                if (txt.includes('dhaka')) logoUrl = '/du.png';
                else if (txt.includes('10 minute')) logoUrl = '/10ms.png';
                else if (txt.includes('integrity') || txt.includes('jica')) logoUrl = '/jica.png';

                return (
                  <div key={exp._id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                     
                     {/* LOGO OR LETTER FALLBACK */}
                     <div style={{ 
                       width: '50px', height: '50px', 
                       background: 'rgba(37, 99, 235, 0.1)', 
                       borderRadius: '10px', 
                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                       fontSize: '1.2rem', fontWeight: 'bold', color: highlight,
                       overflow: 'hidden' // Keeps image inside rounded corners
                     }}>
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                          exp.company.charAt(0)
                        )}
                     </div>

                     <div>
                       <h4 style={{ margin: 0, fontSize: '1rem' }}>{exp.title}</h4>
                       <span style={{ fontSize: '0.8rem', color: subText }}>{exp.company} • {exp.year}</span>
                     </div>
                  </div>
                );
              }) : <p style={{color: subText}}>Loading experience...</p>}
            </div>
          </div>

          {/* Expert Area (Static Skills) */}
          <div className="bento-card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>My Expert Area</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ 
                  background: isDark ? '#0f172a' : '#f1f5f9', 
                  padding: '15px 5px', borderRadius: '12px', textAlign: 'center' 
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{skill.icon}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. RECENT PROJECTS (Right Column) */}
        <div className="bento-card projects-box" style={{ gridRow: 'span 2', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Recent Projects</h3>
             <Link to="/projects" style={{ fontSize: '0.9rem', color: highlight, textDecoration: 'none' }}>All Projects →</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '5px' }}>
             {projects.map(p => (
               <a href={p.link} target="_blank" rel="noreferrer" key={p._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                 <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '160px', border: `1px solid ${borderColor}` }}>
                    {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />}
                    <div style={{ 
                      position: 'absolute', bottom: 0, left: 0, width: '100%', 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', 
                      padding: '15px', boxSizing: 'border-box' 
                    }}>
                      <span style={{ fontSize: '0.7rem', background: highlight, color: 'white', padding: '2px 6px', borderRadius: '4px' }}>{p.category}</span>
                      <h4 style={{ color: 'white', margin: '5px 0 0 0', fontSize: '1rem' }}>{p.title}</h4>
                    </div>
                 </div>
               </a>
             ))}
          </div>
        </div>

        {/* 4. SERVICES ROW (Bottom Left) */}
        <div className="bento-card services-box" style={{ gridColumn: 'span 2', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
           {services.map((s, i) => (
             <div key={i} style={{ textAlign: 'center', minWidth: '120px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px', color: highlight }}>{s.icon}</div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>{s.title}</h4>
             </div>
           ))}
        </div>

        {/* 5. CTA (Bottom Right - tucked into grid naturally) */}
        {/* Note: In this layout, if rows align, we can just leave it or add a small CTA */}
        
      </div>
    </div>
  );
}

export default Home;