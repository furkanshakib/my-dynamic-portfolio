export const fixTextBreaking = () => {
  // Wait a bit for content to load
  setTimeout(() => {
    // Target ALL elements on the page
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      // Force remove bad styles directly
      if (el.style) {
        el.style.wordBreak = 'normal';
        el.style.overflowWrap = 'normal';
        el.style.whiteSpace = 'normal';
        el.style.setProperty('word-break', 'normal', 'important');
        el.style.setProperty('overflow-wrap', 'normal', 'important');
      }
    });
    
    // Specifically target bio content
    const bioElements = document.querySelectorAll('.bio-content, .bio-content *');
    bioElements.forEach(el => {
      if (el.hasAttribute('style')) {
        let styleAttr = el.getAttribute('style');
        // Remove the problematic styles from the attribute
        styleAttr = styleAttr
          .replace(/overflow-wrap:\s*[^;]+;?/gi, '')
          .replace(/word-break:\s*[^;]+;?/gi, '')
          .replace(/white-space:\s*[^;]+;?/gi, '');
        el.setAttribute('style', styleAttr);
      }
    });
  }, 100);
};