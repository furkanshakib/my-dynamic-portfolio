import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Navbar from './Navbar';
import TechStack from './TechStack';
import { useTheme } from './ThemeContext';

// --- ICONS ---
function ContactIcon({ href, color, iconPath, label }) {
  const [isHovered, setIsHovered] = useState(false);
  const iconStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '65px', height: '65px', borderRadius: '50%',
    background: color, color: 'white', textDecoration: 'none',
    boxShadow: isHovered ? '0 8px 15px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
  };
  return (
    <a href={href} target="_blank" rel="noreferrer" style={iconStyle}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} aria-label={label}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor">{iconPath}</svg>
    </a>
  );
}

function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const myPhoto = "/profile.png"; 
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  
  // Projects State
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    axios.get("https://furkanshakib.onrender.com/api/projects")
      .then(res => {
        const top3 = res.data.reverse().slice(0, 3);
        setFeaturedProjects(top3);
      })
      .catch(err => console.error(err));
  }, []);

  // --- STYLES & THEME ---
  const textColor = isDark ? '#e2e8f0' : '#333';
  const subTextColor = isDark ? '#94a3b8' : '#555';
  const sectionBg = isDark ? '#0f172a' : '#ffffff';
  const secondaryBg = isDark ? '#1e293b' : '#f8f9fa'; 
  
  // Card Styles
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardTitle = isDark ? '#f1f5f9' : '#333';
  const cardDesc = isDark ? '#cbd5e1' : '#666';
  const cardBorder = isDark ? '1px solid #334155' : '1px solid #e2e8f0';

  // Input Styles
  const inputBg = '#334155'; 
  const inputText = 'white'; 
  const inputBorder = '1px solid #475569';

  // --- SERVICES DATA ---
  const services = [
    {
      emoji: "🔎",
      title: "Academic Research",
      desc: "Specialized in Peace & Conflict Studies. Experienced in qualitative data analysis, SPSS, and conducting field surveys."
    },
    {
      emoji: "💻",
      title: "Web Development",
      desc: "Building dynamic MERN Stack applications (MongoDB, Express, React, Node) with secure admin panels and responsive design."
    },
    {
      emoji: "🎬",
      title: "Multimedia & Content",
      desc: "Professional video editing using Premiere Pro. Creating engaging educational content and digital storytelling assets."
    }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs.sendForm('service_y65owe5', 'template_kygrxid', form.current, '1HTfvq6f969VEiM88')
      .then(() => { alert("Message Sent! 🚀"); e.target.reset(); setIsSending(false); }, 
            () => { alert("Failed. Try again."); setIsSending(false); });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: textColor, minHeight: '100vh', width: '100%', background: sectionBg }}>
      <Navbar />

      {/* 1. HERO SECTION */}
      <header style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        maxWidth: '1280px', width: '90%', margin: '60px auto', flexWrap: 'wrap-reverse',
        padding: '20px 0'
      }}>
        <div style={{ flex: '1', minWidth: '300px', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: isDark ? 'white' : '#111' }}>Furkan Azad Shakib</h1>
          <h2 style={{ fontSize: '1.5rem', color: subTextColor, fontWeight: 'normal', margin: '0 0 20px 0' }}>
            Peace & Conflict Student | <span style={{ color: '#2563eb', fontWeight: 'bold' }}>Researcher</span>
          </h2>
          <p style={{ lineHeight: '1.6', color: subTextColor, fontSize: '1.1rem', maxWidth: '600px' }}>
            Detail-oriented professional pursuing a Master's in Peace and Conflict Studies at the University of Dhaka. 
            Merging academic rigor with modern digital solutions.
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <Link to="/projects" style={{ padding: '12px 24px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>View My Work</Link>
            <a href="/cv.pdf" download="Furkan_Shakib_CV.pdf" style={{ padding: '12px 24px', background: 'transparent', border: '2px solid #2563eb', color: '#2563eb', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}>
              Download CV 📄
            </a>
          </div>
        </div>
        
        {/* Photo with Glow Effect */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative' }}>
           {/* The Glow */}
           <div style={{ 
             position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', 
             background: 'rgba(37, 99, 235, 0.4)', filter: 'blur(50px)', zIndex: 0 
           }}></div>
           {/* The Image */}
           <img src={myPhoto} alt="Furkan Shakib" style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '5px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', position: 'relative', zIndex: 1 }} />
        </div>
      </header>


      {/* 2. NEW: "WHAT I DO" SERVICES SECTION */}
      <section style={{ background: secondaryBg, padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', width: '90%', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '50px', color: cardTitle }}>What I Do</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map((s, index) => (
              <div key={index} style={{ 
                background: cardBg, padding: '30px', borderRadius: '12px', border: cardBorder,
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{s.emoji}</div>
                <h3 style={{ marginBottom: '15px', color: cardTitle }}>{s.title}</h3>
                <p style={{ color: cardDesc, lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. FEATURED PROJECTS */}
      {featuredProjects.length > 0 && (
        <section style={{ maxWidth: '1280px', width: '90%', margin: '80px auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', margin: 0, color: cardTitle }}>Latest Work</h2>
            <Link to="/projects" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>View All →</Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {featuredProjects.map(p => (
              <div key={p._id} style={{ background: cardBg, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: cardBorder }}>
                {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />}
                <div style={{ padding: '20px' }}>
                  <span style={{ fontSize: '0.75rem', background: isDark ? '#334155' : '#eff6ff', color: isDark ? '#60a5fa' : '#2563eb', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                    {p.category}
                  </span>
                  <h3 style={{ margin: '10px 0', fontSize: '1.2rem', color: cardTitle }}>{p.title}</h3>
                  <p style={{ color: cardDesc, fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '15px' }}>
                    {p.description.substring(0, 100)}...
                  </p>
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CONTACT SECTION */}
      <section id="contact" style={{ padding: '80px 20px', background: secondaryBg, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: cardTitle }}>Let's Connect</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '50px', flexWrap: 'wrap' }}>
            <ContactIcon href="mailto:furkanshakib@gmail.com" color="#ef4444" label="Email" iconPath={<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>} />
            <ContactIcon href="https://wa.me/8801624767370" color="#22c55e" label="WhatsApp" iconPath={<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.29-1.14l-.31-.18-3.19.84.85-3.1-.2-.32c-.86-1.38-1.32-2.96-1.32-4.58 0-4.63 3.77-8.4 8.4-8.4 2.24 0 4.35.87 5.94 2.46 1.59 1.59 2.46 3.7 2.46 5.94 0 4.63-3.77 8.4-8.39 8.4z"/>} />
            <ContactIcon href="https://www.linkedin.com/in/furkanshakib/" color="#0077b5" label="LinkedIn" iconPath={<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z"/>} />
            <ContactIcon href="https://www.facebook.com/furkan.shakib/" color="#1877f2" label="Facebook" iconPath={<path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3v-2.29c0-2.88 1.71-4.51 4.38-4.51 1.28 0 2.64.23 2.64.23v2.88h-1.49c-1.43 0-1.88.89-1.88 1.79V12h3.2l-.51 3H13.5v6.8c4.56-.93 8-4.96 8-9.8z"/>} />
          </div>
          
          <p style={{ color: subTextColor, marginBottom: '20px' }}>Or send me a direct message:</p>
          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="user_name" required placeholder="Your Name (Anonymous if left blank)" style={{ padding: '12px', borderRadius: '5px', border: inputBorder, background: inputBg, color: inputText }} />
            <textarea name="message" required placeholder="Write your message here..." style={{ padding: '12px', borderRadius: '5px', border: inputBorder, background: inputBg, color: inputText, height: '120px' }} />
            <button type="submit" disabled={isSending} style={{ padding: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' }}>
              {isSending ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>
      </section>

      {/* 5. TECH STACK (Bottom) */}
      <TechStack />
    </div>
  );
}

export default Home;