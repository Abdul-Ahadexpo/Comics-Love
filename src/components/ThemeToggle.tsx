import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 transform hover:scale-110
        ${isDark 
          ? 'bg-purple-600 text-yellow-300 shadow-lg shadow-purple-500/30' 
          : 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
        }
        animate-pulse hover:animate-none
      `}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};