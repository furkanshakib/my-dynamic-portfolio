import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext'; // 👈 Import this

import Home from './Home';
import Login from './Login';
import PortfolioManager from './PortfolioManager';
import ExperiencePage from './ExperiencePage';
import ProjectsPage from './ProjectsPage';

function App() {
  return (
    <ThemeProvider> {/* 👈 Wrap everything in this */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/dashboard" element={<PortfolioManager />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;