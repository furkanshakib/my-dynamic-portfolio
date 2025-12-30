import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // 🛑 Prevents the page from reloading
    
    // 🔐 PASSWORD CHECK
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true"); // Save the login "key" in the browser
      navigate("/dashboard"); // 🚀 Go to the dashboard
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8f9fa' }}>
      
      {/* 📝 The <form> tag makes the 'Enter' key work! */}
      <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '300px' }}>
        
        <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>🔐 Admin Login</h2>
        
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '20px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1',
            boxSizing: 'border-box',
            fontSize: '1rem'
          }}
        />
        
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          Unlock Dashboard 🔓
        </button>

      </form>
    </div>
  );
}

export default Login;