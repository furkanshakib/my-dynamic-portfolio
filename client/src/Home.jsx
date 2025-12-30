import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Home() {
  const myPhoto = "/profile.png"; 
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm('service_y65owe5', 'template_kygrxid', form.current, '1HTfvq6f969VEiM88')
      .then(() => {
          alert("Message Sent to Furkan! 🚀");
          e.target.reset();
          setIsSending(false);
      }, (error) => {
          console.log(error.text);
          alert("Failed to send. Please try again.");
          setIsSending(false);
      });
  };

  const contactLinkStyle = {
    display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', textDecoration: 'none',
    fontSize: '1.1rem', marginBottom: '10px', padding: '10px', background: '#334155', borderRadius: '8px', transition: '0.3s'
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#333', background: '#f8f9fa', minHeight: '100vh', width: '100%' }}>
      
      {/* 1. NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 5%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100, width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ margin: 0, color: '#2563eb' }}>Furkan Shakib</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/experience" style={{ textDecoration: 'none', color: '#555', fontWeight: '500' }}>Experience</Link>
          <Link to="/projects" style={{ textDecoration: 'none', color: '#555', fontWeight: '500' }}>Projects</Link>
          <a href="#contact" style={{ textDecoration: 'none', color: '#555' }}>Contact</a>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Admin Login</Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', width: '90%', margin: '60px auto', flexWrap: 'wrap-reverse' }}>
        <div style={{ flex: '1', minWidth: '300px', paddingRight: '20px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#111' }}>Furkan Azad Shakib</h1>
          <h2 style={{ fontSize: '1.5rem', color: '#666', fontWeight: 'normal', margin: '0 0 20px 0' }}>
            Peace & Conflict Student | <span style={{ color: '#2563eb', fontWeight: 'bold' }}>Researcher</span>
          </h2>
          <p style={{ lineHeight: '1.6', color: '#555', fontSize: '1.1rem', maxWidth: '600px' }}>
            Detail-oriented professional pursuing a Master's in Peace and Conflict Studies at the University of Dhaka. 
            Experienced in administration, documentation, and data management with a passion for digital solutions.
          </p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <Link to="/projects" style={{ padding: '12px 24px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>View My Work</Link>
            <a href="/cv.pdf" download="Furkan_Shakib_CV.pdf" style={{ padding: '12px 24px', background: 'transparent', border: '2px solid #2563eb', color: '#2563eb', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}>
              Download CV 📄
            </a>
          </div>
        </div>
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src={myPhoto} alt="Furkan Shakib" style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '5px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
        </div>
      </header>

      {/* 3. CONTACT SECTION */}
      <section id="contact" style={{ padding: '80px 20px', background: '#1e293b', color: 'white', marginTop: '60px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Let's Connect</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            <a href="mailto:furkanshakib@gmail.com" style={contactLinkStyle}>📧 furkanshakib@gmail.com</a>
            <a href="https://wa.me/8801624767370" target="_blank" rel="noreferrer" style={contactLinkStyle}>📞 +880 1624-767370 (WhatsApp)</a>
            <a href="https://www.linkedin.com/in/furkanshakib/" target="_blank" rel="noreferrer" style={contactLinkStyle}>💼 LinkedIn Profile</a>
            <a href="https://www.facebook.com/furkan.shakib/" target="_blank" rel="noreferrer" style={contactLinkStyle}>💙 Facebook Profile</a>
          </div>

          <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '20px' }}>Or send me a direct message:</p>

          <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="user_name" required placeholder="Your Name" style={{ padding: '12px', borderRadius: '5px', border: 'none', background: '#334155', color: 'white' }} />
            <input type="email" name="user_email" required placeholder="your@email.com" style={{ padding: '12px', borderRadius: '5px', border: 'none', background: '#334155', color: 'white' }} />
            <textarea name="message" required placeholder="How can I help you?" style={{ padding: '12px', borderRadius: '5px', border: 'none', background: '#334155', color: 'white', height: '120px' }} />
            <button type="submit" disabled={isSending} style={{ padding: '15px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' }}>
              {isSending ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default Home;