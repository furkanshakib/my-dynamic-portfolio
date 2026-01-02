import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

// 👇 IMPORT THE PAGES (Not just the components)
import ExperiencePage from './ExperiencePage'; 
import ProjectsPage from './ProjectsPage';     

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* 👇 USE THE PAGE WRAPPERS */}
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;