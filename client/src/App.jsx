import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import PortfolioManager from './PortfolioManager';
import Login from './Login';

// A special component that acts like a Security Guard 👮‍♂️
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  // Check if the user already has the key in their pocket (Local Storage)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminAuth") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Protected Admin Page */}
        <Route path="/admin" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PortfolioManager />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;