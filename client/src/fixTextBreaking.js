// This script removes bad inline styles from React Quill content
export const fixTextBreaking = () => {
  // Target all elements that might have inline word-break styles
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(el => {
    // Remove bad word-break styles
    if (el.style.wordBreak) {
      el.style.wordBreak = 'keep-all';
    }
    
    // Force good overflow wrap
    el.style.overflowWrap = 'break-word';
    
    // Remove any white-space issues
    if (el.style.whiteSpace === 'pre' || el.style.whiteSpace === 'pre-wrap') {
      el.style.whiteSpace = 'normal';
    }
  });
  
  // Specifically target React Quill content
  const bioContent = document.querySelector('.bio-content');
  if (bioContent) {
    bioContent.querySelectorAll('*').forEach(el => {
      el.style.wordBreak = 'keep-all';
      el.style.overflowWrap = 'break-word';
      el.style.whiteSpace = 'normal';
    });
  }
};