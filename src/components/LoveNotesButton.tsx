import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';

export const LoveNotesButton: React.FC = () => {
  const handleClick = () => {
    window.open('https://love-tag.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={handleClick}
        className="
          w-full p-6 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
          text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
          shadow-xl shadow-pink-500/50 dark:shadow-pink-600/40
          flex items-center justify-center space-x-3
          animate-pulse hover:animate-none
        "
      >
        <Mail className="w-6 h-6" />
        <span>💌 Check Your Love Notes!</span>
        <ExternalLink className="w-5 h-5" />
      </button>
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 font-bold">
        ✨ Discover secret messages from the universe! ✨
      </p>
    </div>
  );
};