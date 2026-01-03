import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import PortfolioManager from './PortfolioManager';

// 👇 IMPORT ALL PAGES
import ExperiencePage from './ExperiencePage'; 
import ProjectsPage from './ProjectsPage';     
import BlogPage from './BlogPage';  // New
import BlogPost from './BlogPost';  // New

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Page Wrappers */}
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      
      {/* 👇 NEW BLOG ROUTES */}
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blogs/:id" element={<BlogPost />} />
      
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<PortfolioManager />} />
    </Routes>
  );
}

export default App;