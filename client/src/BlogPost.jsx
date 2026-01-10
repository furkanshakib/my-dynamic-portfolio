
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import { Helmet } from 'react-helmet-async';

function ShareButtons({ title, id }) {
  // 🔗 SMART LINK: Points to Backend Proxy for correct preview
  const smartLink = `https://furkanshakib.onrender.com/api/share/blogs/${id}`;

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const iconStyle = {
    width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, cursor: 'pointer', transition: 'all 0.2s',
    background: isDark ? '#1e293b' : 'white', color: isDark ? '#f1f5f9' : '#333', textDecoration: 'none'
  };

  const shareLinks = [
    { name: 'Copy Link', icon: '🔗', action: () => { navigator.clipboard.writeText(smartLink); alert('Smart Link copied!'); } },
    { name: 'Facebook', icon: '📘', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(smartLink)}` },
    { name: 'WhatsApp', icon: '💬', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + smartLink)}` },
    { name: 'LinkedIn', icon: '💼', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(smartLink)}` },
    { name: 'Twitter', icon: '🐦', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(smartLink)}&text=${encodeURIComponent(title)}` },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}` }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', marginRight: '5px' }}>Share:</span>
      {shareLinks.map(s => (
        s.action ? (
          <button key={s.name} onClick={s.action} title={s.name}
            style={iconStyle}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {s.icon}
          </button>
        ) : (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name}
            style={iconStyle}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {s.icon}
          </a>
        )
      ))}
    </div>
  );
}

function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    axios.get(`https://furkanshakib.onrender.com/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(console.error);
  }, [id]);

  if (!blog) return <div style={{ padding: '50px', textAlign: 'center', color: isDark ? 'white' : 'black' }}>Loading...</div>;

  const pageBg = isDark ? '#0f172a' : '#fff';
  const text = isDark ? '#f1f5f9' : '#333';

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: text, fontFamily: "'Segoe UI', sans-serif" }}>
      <Helmet>
        <title>{blog.title} | Furkan Shakib</title>
        <meta name="description" content={`Read about ${blog.title} by Furkan Shakib.`} />
        {/* Note: Standard OG tags here only work for basic scrapers, 
            smart sharing (server-side) is needed for FB/WhatsApp */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={`Read about ${blog.title} by Furkan Shakib.`} />
        {blog.image && <meta property="og:image" content={blog.image} />}
      </Helmet>

      <Navbar />

      <style>{`
        /* Local CSS to ensure images and spacing look good */
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 20px 0;
          display: block;
        }
        .blog-content p {
          margin-bottom: 1.5em; /* Nice gap between paragraphs */
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 20px;
          padding-left: 20px;
        }
      `}</style>

      <article style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '30px' }} />}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', lineHeight: '1.2' }}>{blog.title}</h1>
        <div style={{ marginBottom: '20px', opacity: 0.7 }}>
          <span>{new Date(blog.date).toLocaleDateString()}</span> • <span>{blog.category}</span>
        </div>

        <ShareButtons title={blog.title} id={id} />

        {/* Render the Cleaned HTML */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </article>
    </div>
  );
}
export default BlogPost;