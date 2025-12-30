import React from 'react';
import { useTheme } from './ThemeContext';

function TechStack() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colors based on theme
  const bg = isDark ? '#0f172a' : 'white';
  const iconColor = isDark ? '#94a3b8' : '#64748b';

  const styles = {
    wrapper: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'relative',
      padding: '40px 0',
      background: bg,
    },
    track: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      animation: 'scroll 30s linear infinite',
    },
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      margin: '0 40px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: iconColor,
    }
  };

  // Add the keyframes to the document globally
  const keyframes = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  const skills = [
    { name: "React.js", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "Video Editing", icon: "🎬" },
    { name: "Premiere Pro", icon: "🎞️" },
    { name: "SPSS", icon: "📊" },
    { name: "Research", icon: "🔎" },
    { name: "Data Analysis", icon: "📈" },
    { name: "Conflict Resolution", icon: "🤝" },
    { name: "Content Creation", icon: "🎥" },
  ];

  return (
    <div style={styles.wrapper}>
      <style>{keyframes}</style>
      <div style={styles.track}>
        {/* We double the list to create a seamless loop */}
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} style={styles.item}>
            <span>{skill.icon}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStack;