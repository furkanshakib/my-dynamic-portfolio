import React from 'react';

function Experience() {
  // 💼 JOB EXPERIENCE (Kept same as before)
  const experienceData = [
    {
      year: "July 2025 - Sept 2025",
      title: "Office Assistant",
      company: "Registrar’s Office, University of Dhaka",
      description: "Documented official records of DU students injured during the July–August Uprising. Handled sensitive administrative files with accuracy and confidentiality. Prepared, sorted, and digitized daily office documents while managing bilingual data entry with MS Office tools.",
    },
    {
      year: "Aug 2023 - Jan 2024",
      title: "Content Developer",
      company: "10 Minute School",
      description: "Developed PowerPoint slides for English First & Second Paper online classes. Created lecture notes, study materials, MCQs, and exam resources to support student learning. Collaborated closely with instructors to ensure content quality and clarity.",
    },
    {
      year: "March 2022 - April 2022",
      title: "Research Assistant",
      company: "NIS Support Project – Phase 2",
      description: "Facilitated by Saifuddin Ahmed (Associate Professor, DU) and funded by JICA. Conducted endline surveys on NIS implementation, organized quantitative & qualitative field data, and managed bilingual data entry. Assisted in field coordination and preliminary data review.",
    },
  ];

  // 🎓 EDUCATION (Updated with 4 levels)
  const educationData = [
    {
      year: "2023 - Present",
      title: "Master of Social Science (MSS)",
      company: "University of Dhaka",
      description: "Department of Peace and Conflict Studies. Status: Course Running.",
    },
    {
      year: "2020 - 2023",
      title: "Bachelor of Social Science (BSS)",
      company: "University of Dhaka",
      description: "Graduated from the Department of Peace and Conflict Studies. CGPA: 3.54 / 4.00.",
    },
    {
      year: "2017 - 2019",
      title: "HSC (Humanities)",
      company: "Government Rajendra College, Faridpur",
      description: "Dhaka Board. GPA: 4.45 / 5.00.",
    },
    {
      year: "2017",
      title: "SSC (Humanities)",
      company: "Molamer Dangi High School",
      description: "Dhaka Board. GPA: 4.67 / 5.00.",
    }
  ];

  return (
    <section id="experience" style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      
      {/* --- SECTION 1: EXPERIENCE --- */}
      <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '40px', color: '#1e293b' }}>
        Professional Experience
      </h2>
      
      <div style={{ position: 'relative', borderLeft: '3px solid #e5e7eb', marginLeft: '20px', marginBottom: '80px' }}>
        {experienceData.map((item, index) => (
          <div key={index} style={{ marginBottom: '40px', paddingLeft: '30px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-11px', top: '5px', width: '20px', height: '20px', background: '#2563eb', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 0 2px #2563eb' }}></div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
                {item.year}
              </span>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.25rem' }}>{item.title}</h3>
              <h4 style={{ margin: '0 0 10px 0', color: '#666', fontWeight: 'normal' }}>{item.company}</h4>
              <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECTION 2: EDUCATION --- */}
      <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '40px', color: '#1e293b' }}>
        Education
      </h2>
      
      <div style={{ position: 'relative', borderLeft: '3px solid #e5e7eb', marginLeft: '20px' }}>
        {educationData.map((item, index) => (
          <div key={index} style={{ marginBottom: '40px', paddingLeft: '30px', position: 'relative' }}>
            {/* Green Dot for Education */}
            <div style={{ position: 'absolute', left: '-11px', top: '5px', width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', border: '4px solid white', boxShadow: '0 0 0 2px #10b981' }}></div>
            
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ background: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '15px', fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px' }}>
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