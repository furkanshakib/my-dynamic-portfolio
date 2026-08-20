import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const colorThemesMap = {
  blue: {
    primary: '#2563eb',
    gradientBtn: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
    titleGradient: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
    glowColorLight: 'rgba(59, 130, 246, 0.4)',
    glowColorDark: 'rgba(59, 130, 246, 0.8)',
    plateauSurfaceLight: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, rgba(37, 99, 235, 0.2) 100%)',
    plateauSurfaceDark: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, rgba(37, 99, 235, 0.2) 100%)',
    orbLight: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
    orbDark: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
    meshDark: 'linear-gradient(120deg, #0f172a, #1e1b4b, #172554, #0a0f1d)',
    meshLight: 'linear-gradient(120deg, #f8f9fa, #eef2ff, #f3f4f6, #f8f9fa)'
  },
  emerald: {
    primary: '#10b981',
    gradientBtn: 'linear-gradient(180deg, #34d399 0%, #047857 100%)',
    titleGradient: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
    glowColorLight: 'rgba(16, 185, 129, 0.4)',
    glowColorDark: 'rgba(16, 185, 129, 0.8)',
    plateauSurfaceLight: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.05) 50%, rgba(5, 150, 105, 0.2) 100%)',
    plateauSurfaceDark: 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.05) 50%, rgba(5, 150, 105, 0.2) 100%)',
    orbLight: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.05) 40%, transparent 70%)',
    orbDark: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.1) 40%, transparent 70%)',
    meshDark: 'linear-gradient(120deg, #0f172a, #064e3b, #065f46, #022c22)',
    meshLight: 'linear-gradient(120deg, #f8f9fa, #ecfdf5, #d1fae5, #f8f9fa)'
  },
  violet: {
    primary: '#8b5cf6',
    gradientBtn: 'linear-gradient(180deg, #a78bfa 0%, #6d28d9 100%)',
    titleGradient: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)',
    glowColorLight: 'rgba(139, 92, 246, 0.4)',
    glowColorDark: 'rgba(139, 92, 246, 0.8)',
    plateauSurfaceLight: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, rgba(109, 40, 217, 0.2) 100%)',
    plateauSurfaceDark: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, rgba(109, 40, 217, 0.2) 100%)',
    orbLight: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.05) 40%, transparent 70%)',
    orbDark: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(109, 40, 217, 0.1) 40%, transparent 70%)',
    meshDark: 'linear-gradient(120deg, #0f172a, #2e1065, #4c1d95, #1e1b4b)',
    meshLight: 'linear-gradient(120deg, #f8f9fa, #f5f3ff, #ede9fe, #f8f9fa)'
  },
  rose: {
    primary: '#e11d48',
    gradientBtn: 'linear-gradient(180deg, #fb7185 0%, #be123c 100%)',
    titleGradient: 'linear-gradient(135deg, #fda4af 0%, #e11d48 100%)',
    glowColorLight: 'rgba(225, 29, 72, 0.4)',
    glowColorDark: 'rgba(225, 29, 72, 0.8)',
    plateauSurfaceLight: 'linear-gradient(180deg, transparent 0%, rgba(225, 29, 72, 0.05) 50%, rgba(190, 18, 60, 0.2) 100%)',
    plateauSurfaceDark: 'linear-gradient(180deg, transparent 0%, rgba(225, 29, 72, 0.05) 50%, rgba(190, 18, 60, 0.2) 100%)',
    orbLight: 'radial-gradient(circle, rgba(225, 29, 72, 0.2) 0%, rgba(190, 18, 60, 0.05) 40%, transparent 70%)',
    orbDark: 'radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, rgba(190, 18, 60, 0.1) 40%, transparent 70%)',
    meshDark: 'linear-gradient(120deg, #0f172a, #4c0519, #881337, #1e1b4b)',
    meshLight: 'linear-gradient(120deg, #f8f9fa, #fff1f2, #ffe4e6, #f8f9fa)'
  },
  amber: {
    primary: '#d97706',
    gradientBtn: 'linear-gradient(180deg, #fbbf24 0%, #b45309 100%)',
    titleGradient: 'linear-gradient(135deg, #fcd34d 0%, #d97706 100%)',
    glowColorLight: 'rgba(217, 119, 6, 0.4)',
    glowColorDark: 'rgba(217, 119, 6, 0.8)',
    plateauSurfaceLight: 'linear-gradient(180deg, transparent 0%, rgba(217, 119, 6, 0.05) 50%, rgba(180, 83, 9, 0.2) 100%)',
    plateauSurfaceDark: 'linear-gradient(180deg, transparent 0%, rgba(217, 119, 6, 0.05) 50%, rgba(180, 83, 9, 0.2) 100%)',
    orbLight: 'radial-gradient(circle, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.05) 40%, transparent 70%)',
    orbDark: 'radial-gradient(circle, rgba(217, 119, 6, 0.4) 0%, rgba(180, 83, 9, 0.1) 40%, transparent 70%)',
    meshDark: 'linear-gradient(120deg, #0f172a, #451a03, #78350f, #2e1065)',
    meshLight: 'linear-gradient(120deg, #f8f9fa, #fffbeb, #fef3c7, #f8f9fa)'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [colorTheme, setColorTheme] = useState(localStorage.getItem('colorTheme') || 'blue');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeColorTheme = (color) => {
    setColorTheme(color);
    localStorage.setItem('colorTheme', color);
  };

  useEffect(() => {
    // Inject global DOM Body defaults
    document.body.style.backgroundColor = theme === 'light' ? '#f8f9fa' : '#0f172a';
    document.body.style.color = theme === 'light' ? '#333' : '#f1f5f9';

    // Mount dynamic CSS Custom Properties (Variables)
    const c = colorThemesMap[colorTheme];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', c.primary);
    root.style.setProperty('--gradient-btn', c.gradientBtn);
    root.style.setProperty('--title-gradient', c.titleGradient);

    // Switch dynamic arrays based on light/dark mode simultaneously
    root.style.setProperty('--glow-color', theme === 'dark' ? c.glowColorDark : c.glowColorLight);
    root.style.setProperty('--plateau-surface', theme === 'dark' ? c.plateauSurfaceDark : c.plateauSurfaceLight);
    root.style.setProperty('--contact-orb', theme === 'dark' ? c.orbDark : c.orbLight);
    root.style.setProperty('--mesh-bg', theme === 'dark' ? c.meshDark : c.meshLight);

  }, [theme, colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, changeColorTheme, colorThemesMap }}>
      {children}
    </ThemeContext.Provider>
  );
};