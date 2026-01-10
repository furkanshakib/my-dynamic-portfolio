// This script removes bad inline styles from React Quill content
export const fixTextBreaking = () => {
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.style.wordBreak === 'break-all' || el.style.wordBreak === 'break-word') {
      el.style.wordBreak = 'keep-all';
    }
  });
};