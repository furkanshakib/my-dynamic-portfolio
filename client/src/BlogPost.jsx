import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

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

  // 🧼 IMPROVED HELPER: Strips styles with single OR double quotes
  const cleanHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/style="[^"]*"/g, "")  // Remove style="..."
      .replace(/style='[^']*'/g, "")  // Remove style='...'
      .replace(/class="[^"]*"/g, "")  // Remove class="..."
      .replace(/class='[^']*'/g, ""); // Remove class='...'
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
        /* Ensure specific spacing for lists */
        .blog-content ul, .blog-content ol {
          margin-bottom: 20px;
          padding-left: 20px;
        }
        .blog-content p {
          margin-bottom: 1.5em;
        }
      `}</style>

      <article style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px' }}>
        {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '30px' }} />}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', lineHeight: '1.2' }}>{blog.title}</h1>
        <div style={{ marginBottom: '30px', opacity: 0.7 }}>
            <span>{new Date(blog.date).toLocaleDateString()}</span> • <span>{blog.category}</span>
        </div>
        
        {/* The container has the class that our new CSS targets specifically */}
        <div 
          className="blog-content" 
          dangerouslySetInnerHTML={{ __html: cleanHTML(blog.content) }}
        ></div>
      </article>
    </div>
  );
}
export default BlogPost;