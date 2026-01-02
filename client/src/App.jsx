import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';

// 👇 CORRECT IMPORT: Use the actual filename "PortfolioManager"
import PortfolioManager from './PortfolioManager';

// 👇 IMPORT THE PAGES
import ExperiencePage from './ExperiencePage'; 
import ProjectsPage from './ProjectsPage';     

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Page Wrappers */}
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Login />} />
      
      {/* 👇 CORRECT ROUTE: Render PortfolioManager here */}
      <Route path="/dashboard" element={<PortfolioManager />} />
    </Routes>
  );
}

export default App;