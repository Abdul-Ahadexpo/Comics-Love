import React from 'react';
import { Header } from './components/Header';
import { ThemeToggle } from './components/ThemeToggle';
import { ZodiacChecker } from './components/ZodiacChecker';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { LoveNotesButton } from './components/LoveNotesButton';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    }`}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Zodiac Checker Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                🌟 Step 1: Discover Your Cosmic Identity
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Find out your zodiac sign and birth day magic!
              </p>
            </div>
            <ZodiacChecker />
          </section>

          {/* Compatibility Checker Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                💕 Step 2: Check Your Love Compatibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                See how well you match with someone special!
              </p>
            </div>
            <CompatibilityChecker />
          </section>

          {/* Love Notes Button Section */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                💌 Step 3: Get Your Love Messages
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ready for some cosmic love notes from the universe?
              </p>
            </div>
            <LoveNotesButton />
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 mt-16">
          <div className="text-4xl mb-4">
            <span className="animate-pulse">💫</span>
            <span className="animate-bounce mx-2">💖</span>
            <span className="animate-pulse">💫</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 font-bold">
            ✨ Love is written in the stars ✨
            <br />
            <span className="text-sm text-pink-500 dark:text-pink-400">
              Find your cosmic connection today! 🌙💕
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;