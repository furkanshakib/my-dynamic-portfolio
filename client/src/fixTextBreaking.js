// This script removes bad inline styles from React Quill content
export const fixTextBreaking = () => {
  // Target the bio content specifically
  const bioContent = document.querySelector('.bio-content');
  
  if (bioContent) {
    // Get all elements with inline styles
    const elementsWithStyles = bioContent.querySelectorAll('[style]');
    
    elementsWithStyles.forEach(el => {
      // Get current style
      const currentStyle = el.getAttribute('style');
      
      // Remove overflow-wrap: break-word and replace with normal
      let newStyle = currentStyle
        .replace(/overflow-wrap:\s*break-word/gi, 'overflow-wrap: normal')
        .replace(/word-break:\s*keep-all/gi, 'word-break: normal')
        .replace(/white-space:\s*normal/gi, 'white-space: normal');
      
      // Set the new style
      el.setAttribute('style', newStyle);
      
      // Also set via style object to be sure
      el.style.wordBreak = 'normal';
      el.style.overflowWrap = 'normal';
      el.style.whiteSpace = 'normal';
    });
  }
  
  // Apply globally to catch all content
  document.querySelectorAll('[style*="overflow-wrap"]').forEach(el => {
    el.style.overflowWrap = 'normal';
    el.style.wordBreak = 'normal';
  });
};