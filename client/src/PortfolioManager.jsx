import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PortfolioManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    tags: ""
  });

  // Use localhost for now
  const API_URL = "http://localhost:5000/api/projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLogout = () => {
  localStorage.removeItem("adminAuth"); // Throw away the key
  window.location.href = "/"; // Go back to home
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      alert("Project Added! 🚀");
      setForm({ title: "", description: "", image: "", link: "", tags: "" }); // Reset form
      fetchProjects(); // Refresh list
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>📂 Portfolio Manager</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1>📂 Portfolio Manager</h1>
  <button onClick={handleLogout} style={{ background: '#333', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
    Log Out 🔒
  </button>
</div>
      
      {/* --- ADD PROJECT FORM --- */}
      <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h3>Add New Project</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="title" placeholder="Project Title (e.g., F-Commerce)" value={form.title} onChange={handleChange} required style={{ padding: '10px' }} />
          <textarea name="description" placeholder="Short Description..." value={form.description} onChange={handleChange} required style={{ padding: '10px', height: '80px' }} />
          <input name="image" placeholder="Image URL (Paste a link)" value={form.image} onChange={handleChange} style={{ padding: '10px' }} />
          <input name="link" placeholder="Live Website Link" value={form.link} onChange={handleChange} style={{ padding: '10px' }} />
          <input name="tags" placeholder="Tags (React, Node, MongoDB)" value={form.tags} onChange={handleChange} style={{ padding: '10px' }} />
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Add Project ➕</button>
        </form>
      </div>

      {/* --- PROJECT LIST --- */}
      <div>
        <h3>Your Projects ({projects.length})</h3>
        {projects.map(p => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{p.title}</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{p.description}</p>
              <small style={{ color: '#2563eb' }}>{p.tags}</small>
            </div>
            <button onClick={() => handleDelete(p._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Delete 🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioManager;