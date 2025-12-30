import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import PortfolioManager from './PortfolioManager';
import ExperiencePage from './ExperiencePage'; 
import ProjectsPage from './ProjectsPage'; // 👈 1. IMPORT THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<PortfolioManager />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} /> {/* 👈 2. ADD ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;