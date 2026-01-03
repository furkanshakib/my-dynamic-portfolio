import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

// ❌ REMOVED THE QUILL CSS IMPORT (It was causing the text break issue)

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

  if (!blog) return <div style={{ padding: '50px', textAlign: 'center', color: isDark?'white':'black' }}>Loading...</div>;

  const pageBg = isDark ? '#0f172a' : '#fff';
  const text = isDark ? '#f1f5f9' : '#333';

  // 🧼 HELPER: Strip styles and classes
  const cleanHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/style="[^"]*"/g, "")
      .replace(/class="[^"]*"/g, ""); 
  };

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: text, fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      
      <style>{`
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 20px 0;
          display: block;
        }
        /* 👇 THE FIX: Strict Typography Rules */
        .blog-content {
           word-break: break-word !important;   /* Only break if word is too long for screen */
           overflow-wrap: break-word !important; 
           white-space: normal !important;      /* Force normal spacing */
           line-height: 1.8;
           font-size: 1.1rem;
           text-align: left;
           color: inherit;
        }
        .blog-content p {
           margin-bottom: 20px;
        }
        .blog-content ul, .blog-content ol {
           margin-bottom: 20px;
           padding-left: 20px;
        }
      `}</style>

      <article style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '30px' }} />}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', lineHeight: '1.2' }}>{blog.title}</h1>
        <div style={{ marginBottom: '30px', opacity: 0.7 }}>
            <span>{new Date(blog.date).toLocaleDateString()}</span> • <span>{blog.category}</span>
        </div>
        
        <div 
          className="fix-text-layout blog-content" 
          style={{ padding: 0 }} 
          dangerouslySetInnerHTML={{ __html: cleanHTML(blog.content) }}
        ></div>
      </article>
    </div>
  );
}
export default BlogPost;