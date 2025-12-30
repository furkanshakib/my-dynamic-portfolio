import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './Home';
import Login from './Login';
import PortfolioManager from './PortfolioManager';
import ExperiencePage from './ExperiencePage'; // 👈 1. WE IMPORT THE NEW FILE HERE

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the addresses (URLs) for your site */}
        
        {/* When user goes to mysite.com/ -> Show Home */}
        <Route path="/" element={<Home />} />

        {/* When user goes to mysite.com/admin -> Show Login */}
        <Route path="/admin" element={<Login />} />

        {/* When user goes to mysite.com/dashboard -> Show Manager */}
        <Route path="/dashboard" element={<PortfolioManager />} />

        {/* When user goes to mysite.com/experience -> Show ExperiencePage */}
        <Route path="/experience" element={<ExperiencePage />} /> {/* 👈 2. WE ADD THE NEW ROUTE HERE */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;