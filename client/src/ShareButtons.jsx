import React from 'react';
import { useTheme } from './ThemeContext';

function ShareButtons({ title, id, compact = false }) {
    // 🔗 SMART LINK: Points to Backend Proxy for correct preview
    const smartLink = `https://furkanshakib.onrender.com/api/share/blogs/${id}`;

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const iconStyle = {
        width: compact ? '28px' : '32px',
        height: compact ? '28px' : '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: isDark ? '#1e293b' : 'white',
        color: isDark ? '#f1f5f9' : '#333',
        textDecoration: 'none',
        fontSize: compact ? '0.9rem' : '1rem' // Adjust icon size slightly
    };

    const shareLinks = [
        { name: 'Copy Link', icon: '🔗', action: () => { navigator.clipboard.writeText(smartLink); alert('Smart Link copied!'); } },
        { name: 'Facebook', icon: '📘', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(smartLink)}` },
        { name: 'WhatsApp', icon: '💬', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + smartLink)}` },
        { name: 'LinkedIn', icon: '💼', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(smartLink)}` },
        { name: 'Twitter', icon: '🐦', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(smartLink)}&text=${encodeURIComponent(title)}` },
    ];

    // Container style: specific spacing for full post vs compact card
    const containerStyle = compact ? {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginTop: '15px'
    } : {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
    };

    return (
        <div style={containerStyle}>
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', marginRight: '5px' }}>Share:</span>
            {shareLinks.map(s => (
                s.action ? (
                    <button key={s.name} onClick={(e) => { e.preventDefault(); s.action(); }} title={s.name}
                        style={iconStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {s.icon}
                    </button>
                ) : (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer" title={s.name}
                        style={iconStyle}
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking share
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {s.icon}
                    </a>
                )
            ))}
        </div>
    );
}

export default ShareButtons;
