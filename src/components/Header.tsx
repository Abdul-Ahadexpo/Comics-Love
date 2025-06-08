import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex justify-center items-center space-x-2 mb-4">
        <Sparkles className="w-8 h-8 text-pink-500 animate-spin" />
        <Heart className="w-10 h-10 text-pink-500 animate-pulse fill-current" />
        <Sparkles className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
        ✨ Cosmic Love Lab ✨
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 font-bold max-w-2xl mx-auto">
        🌙 Discover your zodiac magic & find your perfect match! 🌙
        <br />
        <span className="text-sm text-pink-500 dark:text-pink-400">
          Made with 💕 for Gen-Z hearts
        </span>
      </p>
      
      <div className="flex justify-center space-x-4 mt-4 text-2xl">
        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>💫</span>
        <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🔮</span>
        <span className="animate-bounce" style={{ animationDelay: '400ms' }}>💖</span>
        <span className="animate-bounce" style={{ animationDelay: '600ms' }}>🌟</span>
        <span className="animate-bounce" style={{ animationDelay: '800ms' }}>✨</span>
      </div>
    </header>
  );
};