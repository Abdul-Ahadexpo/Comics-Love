import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/storage';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = getFromLocalStorage('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    saveToLocalStorage('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};