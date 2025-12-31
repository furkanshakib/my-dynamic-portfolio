import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    axios.get("https://furkanshakib.onrender.com/api/blogs")
      .then(res => setBlogs(res.data.reverse()))
      .catch(console.error);
  }, []);

  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const cardBg = isDark ? '#1e293b' : 'white';
  const text = isDark ? '#f1f5f9' : '#333';

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: text, fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>Blogs & Articles</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogs.map(blog => (
            <div key={blog._id} style={{ background: cardBg, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              <div style={{ padding: '20px' }}>
                <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold' }}>{blog.category}</span>
                <h2 style={{ fontSize: '1.4rem', margin: '10px 0' }}>{blog.title}</h2>
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>
                  {/* Show snippet */}
                  {blog.content.replace(/<[^>]+>/g, '').substring(0, 100)}...
                </div>
                <Link to={`/blogs/${blog._id}`} style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Read Article →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BlogPage;