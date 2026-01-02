import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Projects from './ProjectsPage';
import Contact from './Contact';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import ExperiencePage from './ExperiencePage'; // 👈 IMPORT THE PAGE, NOT THE COMPONENT

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* 👇 Point this route to ExperiencePage */}
      <Route path="/experience" element={<ExperiencePage />} /> 
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;