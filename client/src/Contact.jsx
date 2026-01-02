import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

function Contact() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const textMain = isDark ? '#f1f5f9' : '#1e293b';
  const textSub = isDark ? '#94a3b8' : '#64748b';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const inputBg = isDark ? '#0f172a' : '#f1f5f9';

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // 👇 REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS LATER IF NEEDED
    emailjs.sendForm('service_y65owe5', 'template_kygrxid', form.current, '1HTfvq6f969VEiM88')
      .then(() => { 
          alert("Message Sent Successfully! 🚀"); 
          e.target.reset(); 
          setIsSending(false); 
      }, (error) => { 
          alert("Failed to send message. Please try again."); 
          console.error(error);
          setIsSending(false); 
      });
  };

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: textMain, fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* 1. LEFT SIDE: INFO */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: '1.2' }}>Let's work <br/> <span style={{ color: '#2563eb' }}>together.</span></h1>
          <p style={{ color: textSub, fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6' }}>
            I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ContactItem icon="📧" label="Mail me at" value="furkanshakib@gmail.com" link="mailto:furkanshakib@gmail.com" sub={textSub} />
            <ContactItem icon="📞" label="Call me at" value="+880 1624 767370" link="https://wa.me/8801624767370" sub={textSub} />
            <ContactItem icon="💼" label="LinkedIn" value="Furkan Shakib" link="https://linkedin.com" sub={textSub} />
          </div>
        </div>

        {/* 2. RIGHT SIDE: FORM */}
        <div style={{ flex: '1', minWidth: '300px', background: cardBg, padding: '40px', borderRadius: '24px', border: `1px solid ${border}`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Send me a message 🚀</h3>
          
          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="user_name" placeholder="Your Name" required 
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: `1px solid ${border}`, background: inputBg, color: textMain, outline: 'none' }} 
            />
            <input type="email" name="user_email" placeholder="Your Email" required 
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: `1px solid ${border}`, background: inputBg, color: textMain, outline: 'none' }} 
            />
            <textarea name="message" placeholder="Tell me about your project..." required rows="5"
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: `1px solid ${border}`, background: inputBg, color: textMain, outline: 'none', resize: 'none' }} 
            ></textarea>
            
            <button type="submit" disabled={isSending} style={{ padding: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', transition: 'opacity 0.2s' }}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// Helper Component for List Items
function ContactItem({ icon, label, value, link, sub }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ width: '50px', height: '50px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', color: sub }}>{label}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{value}</div>
      </div>
    </a>
  );
}

export default Contact;