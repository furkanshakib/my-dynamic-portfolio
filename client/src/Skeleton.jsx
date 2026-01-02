import React from 'react';

function Skeleton({ height = '200px', width = '100%', style = {} }) {
  return (
    <div className="skeleton-pulse" style={{ 
      height, 
      width, 
      borderRadius: '12px', 
      background: 'rgba(150, 150, 150, 0.1)', 
      marginBottom: '15px',
      ...style 
    }}>
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
        .skeleton-pulse {
          animation: pulse 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Skeleton;