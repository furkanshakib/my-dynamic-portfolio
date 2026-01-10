import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTheme } from './ThemeContext';

function PortfolioManager() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // --- DATA STATES ---
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({ profilePicture: '', name: '', bio: '' });

  // --- EDITOR STATES ---
  const [bioEditorState, setBioEditorState] = useState(EditorState.createEmpty());
  const [projectEditorState, setProjectEditorState] = useState(EditorState.createEmpty());
  const [expEditorState, setExpEditorState] = useState(EditorState.createEmpty());
  const [blogEditorState, setBlogEditorState] = useState(EditorState.createEmpty());

  // --- INPUT STATES ---
  const [newProject, setNewProject] = useState({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
  const [newExp, setNewExp] = useState({ title: '', company: '', year: '', description: '', type: 'job' });
  const [newBlog, setNewBlog] = useState({ title: '', category: 'Article', image: '', content: '' });
  const [newSkill, setNewSkill] = useState({ name: '', icon: '' });

  const API_BASE = "https://furkanshakib.onrender.com/api";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem("token");

    if (!isAdmin || !token) navigate("/admin");

    if (token) axios.defaults.headers.common['x-auth-token'] = token;

    fetchData();
  }, [navigate]);

  const fetchData = () => {
    axios.get(`${API_BASE}/projects`).then(res => setProjects(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/experience`).then(res => setExperiences(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/blogs`).then(res => setBlogs(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/skills`).then(res => setSkills(res.data.reverse())).catch(console.error);
    axios.get(`${API_BASE}/profile`).then(res => { 
      if (res.data) {
        setProfile(res.data);
        // Load bio into editor
        if (res.data.bio) {
          const blocksFromHTML = convertFromHTML(res.data.bio);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setBioEditorState(EditorState.createWithContent(contentState));
        }
      }
    }).catch(console.error);
  };

  const resetForms = () => {
    setEditingId(null);
    setNewProject({ title: '', category: 'Research', image: '', link: '', description: '', tags: '' });
    setNewExp({ title: '', company: '', year: '', description: '', type: 'job' });
    setNewBlog({ title: '', category: 'Article', image: '', content: '' });
    setNewSkill({ name: '', icon: '' });
    setProjectEditorState(EditorState.createEmpty());
    setExpEditorState(EditorState.createEmpty());
    setBlogEditorState(EditorState.createEmpty());
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("❌ File is too big! Please use an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (type === 'project') setNewProject({ ...newProject, image: reader.result });
      if (type === 'blog') setNewBlog({ ...newBlog, image: reader.result });
      if (type === 'profile') setProfile({ ...profile, profilePicture: reader.result });
    };
  };

  // --- SUBMIT HANDLERS ---
  const handleSaveProject = () => {
    const description = draftToHtml(convertToRaw(projectEditorState.getCurrentContent()));
    const projectData = { ...newProject, description };
    const apiCall = editingId ? axios.put(`${API_BASE}/projects/${editingId}`, projectData) : axios.post(`${API_BASE}/projects`, projectData);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Added!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message));
  };

  const handleSaveExp = () => {
    const description = draftToHtml(convertToRaw(expEditorState.getCurrentContent()));
    const expData = { ...newExp, description };
    const apiCall = editingId ? axios.put(`${API_BASE}/experience/${editingId}`, expData) : axios.post(`${API_BASE}/experience`, expData);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Added!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message));
  };

  const handleSaveBlog = () => {
    const content = draftToHtml(convertToRaw(blogEditorState.getCurrentContent()));
    if (!newBlog.title || !content) return alert("Title and Content required!");
    setLoading(true);
    const blogData = { ...newBlog, content };
    const apiCall = editingId ? axios.put(`${API_BASE}/blogs/${editingId}`, blogData) : axios.post(`${API_BASE}/blogs`, blogData);
    apiCall.then(() => { alert(editingId ? "✅ Updated!" : "✅ Published!"); resetForms(); fetchData(); }).catch(err => alert("❌ Error: " + err.message)).finally(() => setLoading(false));
  };

  const handleSaveSkill = () => {
    if (!newSkill.name || !newSkill.icon) return alert("Name and Icon required!");
    axios.post(`${API_BASE}/skills`, newSkill)
      .then(() => { alert("✅ Skill Added!"); resetForms(); fetchData(); })
      .catch(err => alert("❌ Error: " + err.message));
  };

  const handleSaveProfile = () => {
    const bio = draftToHtml(convertToRaw(bioEditorState.getCurrentContent()));
    const profileData = { ...profile, bio };
    axios.post(`${API_BASE}/profile`, profileData)
      .then(() => alert("✅ Profile Updated!"))
      .catch(err => alert("❌ Error: " + err.message));
  };

  const handleDelete = (type, id) => {
    if (window.confirm("Delete this?")) axios.delete(`${API_BASE}/${type}/${id}`).then(fetchData);
  };

  // Load content into editor when editing
  const handleEdit = (type, item) => {
    setEditingId(item._id);
    window.scrollTo(0, 0);
    
    if (type === 'project') {
      setNewProject(item);
      if (item.description) {
        const blocksFromHTML = convertFromHTML(item.description);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setProjectEditorState(EditorState.createWithContent(contentState));
      }
    } else if (type === 'experience') {
      setNewExp(item);
      if (item.description) {
        const blocksFromHTML = convertFromHTML(item.description);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setExpEditorState(EditorState.createWithContent(contentState));
      }
    } else if (type === 'blog') {
      setNewBlog(item);
      if (item.content) {
        const blocksFromHTML = convertFromHTML(item.content);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setBlogEditorState(EditorState.createWithContent(contentState));
      }
    }
  };

  // --- STYLES ---
  const pageBg = isDark ? '#0f172a' : '#f8f9fa';
  const sidebarBg = isDark ? '#1e293b' : 'white';
  const text = isDark ? '#f1f5f9' : '#333';
  const cardBg = isDark ? '#1e293b' : 'white';
  const border = isDark ? '#334155' : '#e2e8f0';
  const inputBg = isDark ? '#0f172a' : '#f8f9fa';
  const activeColor = '#2563eb';

  const sidebarItemStyle = (tabName) => ({
    padding: '12px 20px', margin: '5px 0', borderRadius: '8px', cursor: 'pointer',
    color: activeTab === tabName ? 'white' : text,
    background: activeTab === tabName ? activeColor : 'transparent',
    fontWeight: activeTab === tabName ? 'bold' : 'normal',
    display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
  });

  const btnStyle = { padding: '10px 20px', background: activeColor, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
  const inputStyle = { padding: '12px', borderRadius: '8px', border: `1px solid ${border}`, background: inputBg, color: text, width: '100%', marginBottom: '15px', outline: 'none' };
  const fileInputStyle = { ...inputStyle, padding: '10px', background: isDark ? '#1e293b' : '#fff' };

  const editorWrapperStyle = {
    border: `1px solid ${border}`,
    borderRadius: '8px',
    marginBottom: '20px',
    background: 'white'
  };

  const editorToolbarConfig = {
    options: ['inline', 'list', 'textAlign', 'link', 'remove'],
    inline: {
      options: ['bold', 'italic', 'underline']
    },
    list: {
      options: ['unordered', 'ordered']
    },
    textAlign: {
      options: ['left', 'center', 'right']
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: pageBg, color: text, fontFamily: "'Inter', sans-serif" }}>

      {/* 1. SIDEBAR */}
      <div style={{ width: '250px', background: sidebarBg, borderRight: `1px solid ${border}`, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>👑 Admin</h2>

        <div style={sidebarItemStyle('overview')} onClick={() => setActiveTab('overview')}>📊 Dashboard</div>
        <div style={sidebarItemStyle('projects')} onClick={() => { setActiveTab('projects'); resetForms(); }}>🚀 Projects</div>
        <div style={sidebarItemStyle('experience')} onClick={() => { setActiveTab('experience'); resetForms(); }}>🎓 Experience</div>
        <div style={sidebarItemStyle('blogs')} onClick={() => { setActiveTab('blogs'); resetForms(); }}>📝 Blogs</div>
        <div style={sidebarItemStyle('skills')} onClick={() => { setActiveTab('skills'); resetForms(); }}>⚡ Skills</div>
        <div style={sidebarItemStyle('profile')} onClick={() => { setActiveTab('profile'); }}>⚙️ Profile</div>

        <div style={{ marginTop: 'auto', borderTop: `1px solid ${border}`, paddingTop: '20px' }}>
          <button onClick={() => window.open('/', '_blank')} style={{ ...sidebarItemStyle(''), justifyContent: 'center', background: isDark ? '#334155' : '#e2e8f0' }}>👀 View Site</button>
          <button onClick={() => { localStorage.removeItem("isAdmin"); navigate("/"); }} style={{ ...sidebarItemStyle(''), color: '#ef4444', marginTop: '10px' }}>🚪 Logout</button>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
          <div>
            <h1 style={{ marginBottom: '10px' }}>Welcome back, Furkan! 👋</h1>
            <p style={{ opacity: 0.7, marginBottom: '40px' }}>Here is what's happening on your portfolio.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <StatCard title="Projects" count={projects.length} icon="🚀" bg={cardBg} border={border} />
              <StatCard title="Experience" count={experiences.length} icon="🎓" bg={cardBg} border={border} />
              <StatCard title="Articles" count={blogs.length} icon="📝" bg={cardBg} border={border} />
              <StatCard title="Skills" count={skills.length} icon="⚡" bg={cardBg} border={border} />
            </div>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Projects ({projects.length})</h2>
              {editingId && <button onClick={resetForms} style={{ ...btnStyle, background: '#64748b' }}>Cancel Edit</button>}
            </div>

            <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px' }}>
              <input placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <select value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })} style={inputStyle}>
                  <option>Research</option><option>Web Dev</option><option>Video</option><option>Articles</option>
                </select>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block', marginBottom: '5px' }}>Project Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'project')} style={fileInputStyle} />
                </div>
              </div>

              {newProject.image && <img src={newProject.image} alt="Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginBottom: '15px', border: `1px solid ${border}` }} />}

              <input placeholder="Project Link" value={newProject.link} onChange={e => setNewProject({ ...newProject, link: e.target.value })} style={inputStyle} />
              
              <div style={editorWrapperStyle}>
                <Editor
                  editorState={projectEditorState}
                  onEditorStateChange={setProjectEditorState}
                  toolbar={editorToolbarConfig}
                  placeholder="Describe your project..."
                  editorStyle={{ minHeight: '150px', padding: '10px' }}
                />
              </div>
              
              <button onClick={handleSaveProject} style={{ ...btnStyle, width: '100%' }}>{editingId ? "Update Project" : "Add Project"}</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {projects.map(p => (
                <ItemCard key={p._id} title={p.title} subtitle={p.category} bg={cardBg} border={border}
                  onEdit={() => handleEdit('project', p)}
                  onDelete={() => handleDelete('projects', p._id)} />
              ))}
            </div>
          </div>
        )}

        {/* --- EXPERIENCE TAB --- */}
        {activeTab === 'experience' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Experience ({experiences.length})</h2>
              {editingId && <button onClick={resetForms} style={{ ...btnStyle, background: '#64748b' }}>Cancel Edit</button>}
            </div>

            <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px' }}>
              <input placeholder="Job Title" value={newExp.title} onChange={e => setNewExp({ ...newExp, title: e.target.value })} style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <input placeholder="Company / Org" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} style={inputStyle} />
                <input placeholder="Year (e.g. 2023 - Present)" value={newExp.year} onChange={e => setNewExp({ ...newExp, year: e.target.value })} style={inputStyle} />
              </div>
              <select value={newExp.type} onChange={e => setNewExp({ ...newExp, type: e.target.value })} style={inputStyle}>
                <option value="job">Job Experience</option><option value="education">Education</option>
              </select>
              
              <div style={editorWrapperStyle}>
                <Editor
                  editorState={expEditorState}
                  onEditorStateChange={setExpEditorState}
                  toolbar={editorToolbarConfig}
                  placeholder="Description..."
                  editorStyle={{ minHeight: '150px', padding: '10px' }}
                />
              </div>
              
              <button onClick={handleSaveExp} style={{ ...btnStyle, width: '100%' }}>{editingId ? "Update Item" : "Add Item"}</button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {experiences.map(e => (
                <ItemCard key={e._id} title={e.title} subtitle={`${e.company} • ${e.year}`} bg={cardBg} border={border}
                  onEdit={() => handleEdit('experience', e)}
                  onDelete={() => handleDelete('experience', e._id)} />
              ))}
            </div>
          </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
          <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Blogs ({blogs.length})</h2>
              {editingId && <button onClick={resetForms} style={{ ...btnStyle, background: '#64748b' }}>Cancel Edit</button>}
            </div>

            <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px' }}>
              <input placeholder="Article Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <select value={newBlog.category} onChange={e => setNewBlog({ ...newBlog, category: e.target.value })} style={inputStyle}>
                  <option>Article</option><option>Opinion</option><option>Research Note</option>
                </select>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block', marginBottom: '5px' }}>Article Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'blog')} style={fileInputStyle} />
                </div>
              </div>

              {newBlog.image && <img src={newBlog.image} alt="Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '6px', marginBottom: '15px', border: `1px solid ${border}` }} />}

              <div style={editorWrapperStyle}>
                <Editor
                  editorState={blogEditorState}
                  onEditorStateChange={setBlogEditorState}
                  toolbar={editorToolbarConfig}
                  placeholder="Write your article content..."
                  editorStyle={{ minHeight: '300px', padding: '10px' }}
                />
              </div>
              
              <button onClick={handleSaveBlog} style={{ ...btnStyle, width: '100%', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                {loading ? "Publishing..." : (editingId ? "Update Article" : "Publish Article")}
              </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {blogs.map(b => (
                <ItemCard key={b._id} title={b.title} subtitle={b.category} bg={cardBg} border={border}
                  onEdit={() => handleEdit('blog', b)}
                  onDelete={() => handleDelete('blogs', b._id)} />
              ))}
            </div>
          </div>
        )}

        {/* --- SKILLS TAB --- */}
        {activeTab === 'skills' && (
          <div style={{ maxWidth: '900px' }}>
            <h2>Skills ({skills.length})</h2>
            <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginBottom: '40px', marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <input placeholder="Name (e.g. React)" value={newSkill.name} onChange={e => setNewSkill({ ...newSkill, name: e.target.value })} style={{ ...inputStyle, marginBottom: 0, flex: 2 }} />
                <input placeholder="Icon (e.g. ⚛️)" value={newSkill.icon} onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                <button onClick={handleSaveSkill} style={btnStyle}>Add</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {skills.map(s => (
                <div key={s._id} style={{ background: cardBg, border: `1px solid ${border}`, padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                  <span style={{ fontWeight: 'bold' }}>{s.name}</span>
                  <button onClick={() => handleDelete('skills', s._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '5px', color: '#ef4444' }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PROFILE TAB --- */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '600px' }}>
            <h2>Edit Profile</h2>
            <div style={{ background: cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${border}`, marginTop: '20px' }}>

              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px auto', border: `4px solid ${border}`, background: '#333' }}>
                  <img src={profile.profilePicture || '/profile.png'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <label style={{ ...btnStyle, background: '#334155', cursor: 'pointer' }}>
                  Change Photo
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} style={{ display: 'none' }} />
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
                <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={inputStyle} placeholder="Your Name" />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bio / Description</label>
                <div style={editorWrapperStyle}>
                  <Editor
                    editorState={bioEditorState}
                    onEditorStateChange={setBioEditorState}
                    toolbar={editorToolbarConfig}
                    placeholder="I'm Your Name, a professional description..."
                    editorStyle={{ minHeight: '150px', padding: '10px' }}
                  />
                </div>
              </div>

              <button onClick={handleSaveProfile} style={{ ...btnStyle, width: '100%' }}>Save Profile</button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ title, count, icon, bg, border }) {
  return (
    <div style={{ background: bg, padding: '25px', borderRadius: '16px', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ fontSize: '2.5rem' }}>{icon}</div>
      <div>
        <h3 style={{ margin: 0, fontSize: '2rem' }}>{count}</h3>
        <span style={{ opacity: 0.7 }}>{title}</span>
      </div>
    </div>
  );
}

function ItemCard({ title, subtitle, bg, border, onEdit, onDelete }) {
  return (
    <div style={{ background: bg, padding: '20px', borderRadius: '12px', border: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4 style={{ margin: '0 0 5px 0' }}>{title}</h4>
        <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{subtitle}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onEdit} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
        <button onClick={onDelete} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
      </div>
    </div>
  );
}

export default PortfolioManager;