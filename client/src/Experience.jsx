import React from 'react';

function Experience() {
  // 📝 EDIT YOUR EXPERIENCE HERE
  const timelineData = [
    {
      year: "2025 - Present",
      title: "Master's Student",
      company: "University of Dhaka",
      description: "Pursuing a Master's degree in Peace and Conflict Studies. Focusing on conflict resolution, human rights, and geopolitical analysis.",
    },
    {
      year: "2024 - 2025",
      title: "Independent Researcher",
      company: "Academic Projects",
      description: "Conducted in-depth qualitative research on the 'Reign of Terror' and the 'Israel-Hamas Conflict', analyzing state terrorism and asymmetric warfare.",
    },
    {
      year: "2023 - Present",
      title: "Video Content Creator",
      company: "Freelance / Personal",
      description: "Producing educational and analytical video content. Skilled in scriptwriting, video editing (Premiere Pro), and visual storytelling.",
    },
    {
      year: "2023",
      title: "B.S.S. (Honours)",
      company: "University of Dhaka",
      description: "Graduated with honors in Peace and Conflict Studies. Developed a strong foundation in political science and sociology.",
    }
  ];

  return (
    <section id="experience" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '40px' }}>
        Experience & Education
      </h2>
      
      <div style={{ position: 'relative', borderLeft: '3px solid #e5e7eb', marginLeft: '20px' }}>
        {timelineData.map((item, index) => (
          <div key={index} style={{ marginBottom: '40px', paddingLeft: '30px', position: 'relative' }}>
            
            {/* The Dot on the Line */}
            <div style={{ 
              position: 'absolute', 
              left: '-11px', 
              top: '5px', 
              width: '20px', 
              height: '20px', 
              background: '#2563eb', 
              borderRadius: '50%', 
              border: '4px solid white',
              boxShadow: '0 0 0 2px #2563eb'
            }}></div>

            {/* The Content Card */}
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ 
                background: '#eff6ff', 
                color: '#2563eb', 
                padding: '4px 10px', 
                borderRadius: '15px', 
                fontSize: '0.85rem', 
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '10px'
              }}>
                {item.year}
              </span>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem' }}>{item.title}</h3>
              <h4 style={{ margin: '0 0 10px 0', color: '#666', fontWeight: 'normal' }}>{item.company}</h4>
              <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;