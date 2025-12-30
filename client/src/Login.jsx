import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔒 THE SECRET PASSWORD (Change this to whatever you want!)
  const secretKey = "admin123"; 

  const handleLogin = () => {
    if (password === secretKey) {
      localStorage.setItem("adminAuth", "true"); // Save the "Key" in the browser pocket
      setIsLoggedIn(true);
      navigate("/admin"); // Send them to the dashboard
    } else {
      alert("Wrong Password! Access Denied.");
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h2>🔐 Admin Login</h2>
        <input 
          type="password" 
          placeholder="Enter Secret Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '200px', marginBottom: '20px', display: 'block', margin: '10px auto' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Unlock Dashboard
        </button>
      </div>
    </div>
  );
}

export default Login;