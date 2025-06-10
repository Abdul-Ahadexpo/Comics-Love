import React, { useState, useEffect } from 'react';
import { Star, Search, X, Copy, CheckCircle, ExternalLink } from 'lucide-react';

export const CelebrityShip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [celebrityName, setCelebrityName] = useState('');
  const [showWiki, setShowWiki] = useState(false);

  // Disable body scroll when modal is open


  
  useEffect(() => {
  // Remove disabling body scroll when modal is open
  // So do nothing here to keep page scrollable

  // Cleanup isn't needed anymore, but let's keep a safe reset
  return () => {
    document.body.style.overflow = 'auto';
  };



    
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const getWikipediaUrl = (name: string) => {
    const formattedName = name.trim().replace(/\s+/g, '_');
    return `https://en.wikipedia.org/wiki/${formattedName}`;
  };

  const getGoogleUrl = (name: string) => {
    const searchQuery = `${name} birthday date of birth`;
    return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleSearch = () => {
    if (!celebrityName.trim()) return;
    setShowWiki(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowWiki(false);
    setCelebrityName('');
  };

  const resetSearch = () => {
    setShowWiki(false);
    setCelebrityName('');
  };

  // Updated celebrity list with BTS & Anime characters
  const popularCelebs = [
    // BTS Members
    { name: 'Jungkook', category: '🔥 BTS' },
    { name: 'V (singer)', category: '🔥 BTS' },
    { name: 'Jimin', category: '🔥 BTS' },
    { name: 'SUGA', category: '🔥 BTS' },
    { name: 'RM (musician)', category: '🔥 BTS' },
    { name: 'Jin (singer)', category: '🔥 BTS' },
    { name: 'J-Hope', category: '🔥 BTS' },
    
    // Popular Celebrities
  { name: 'Lisa (rapper)', category: '⭐ Celebs' },
  { name: 'Jennie (singer)', category: '⭐ Celebs' },
  { name: 'Rosé (singer)', category: '⭐ Celebs' },
  { name: 'Jisoo', category: '⭐ Celebs' },
  { name: 'IU (entertainer)', category: '⭐ Celebs' },
    
    // Anime Characters (with official birthdays)
  { name: 'Makima', category: '✨ Anime', note: 'Sep 3' },
  { name: 'Satoru Gojo', category: '✨ Anime', note: 'Dec 7' },
  { name: 'Levi Ackerman', category: '✨ Anime', note: 'Dec 25' },
  { name: 'Zero Two', category: '✨ Anime', note: 'Feb 2' },
  { name: 'Shoto Todoroki', category: '✨ Anime', note: 'Jan 11' },
  { name: 'Mikasa Ackerman', category: '✨ Anime', note: 'Feb 10' },
  ];

  const groupedCelebs = popularCelebs.reduce((acc, celeb) => {
    if (!acc[celeb.category]) {
      acc[celeb.category] = [];
    }
    acc[celeb.category].push(celeb);
    return acc;
  }, {} as Record<string, typeof popularCelebs>);

  const handleCelebClick = (celeb: typeof popularCelebs[0]) => {
    setCelebrityName(celeb.name);
    if (celeb.note) {
      // For anime characters, show a helpful note
      alert(`💡 ${celeb.name}'s official birthday is ${celeb.note}! You can search for more details or use this date directly.`);
    }
  };

  return (
    <div className="relative">
      {/* Celebrity Ship Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Star className="w-5 h-5" />
        <span>🎬 Ship with a Celebrity</span>
        <Search className="w-4 h-4" />
      </button>

      {/* Modal Backdrop & Container - PERFECTLY CENTERED */}
      {isOpen && (
        <div className="relative inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 text-pink-300 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💖</div>
            <div className="absolute top-20 right-20 text-purple-300 text-xl animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
            <div className="absolute bottom-20 left-20 text-yellow-300 text-lg animate-bounce" style={{ animationDelay: '2s' }}>🌟</div>
            <div className="absolute bottom-10 right-10 text-pink-300 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>💫</div>
          </div>

          {/* Modal Container - CENTERED WITH FLEXBOX */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl transform transition-all duration-300 scale-100 flex flex-col">
            {/* Modal Header - FIXED */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border-b border-pink-200 dark:border-gray-700 rounded-t-3xl flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span>🎬 Celebrity Birthday Finder</span>
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-white/70 dark:bg-gray-700/70 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Modal Content - SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {!showWiki ? (
                  <>
                    {/* Search Input */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        🌟 Enter Celebrity Name:
                      </label>
                      <input
                        type="text"
                        value={celebrityName}
                        onChange={(e) => setCelebrityName(e.target.value)}
                        placeholder="e.g., Zendaya, Jungkook, Naruto..."
                        className="w-full p-4 rounded-2xl border-2 border-yellow-300 dark:border-gray-600 bg-yellow-50 dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all duration-300"
                        onKeyPress={(e) => e.key === 'Enter' && celebrityName.trim() && handleSearch()}
                      />
                    </div>

                    {/* Search Buttons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={handleSearch}
                        disabled={!celebrityName.trim()}
                        className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                      >
                        <Search className="w-5 h-5" />
                        <span>📖 Search Wikipedia</span>
                      </button>

                      <button
                        onClick={() => window.open(getGoogleUrl(celebrityName), '_blank')}
                        disabled={!celebrityName.trim()}
                        className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>🔍 Search Google</span>
                      </button>
                    </div>

                    {/* Popular Celebrities by Category */}
                    <div>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">
                        🎲 Or pick from our favorites:
                      </p>
                      
                      {Object.entries(groupedCelebs).map(([category, celebs]) => (
                        <div key={category} className="mb-6">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-center">
                            {category}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {celebs.map((celeb) => (
                              <button
                                key={celeb.name}
                                onClick={() => handleCelebClick(celeb)}
                                className="p-3 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/40 dark:hover:to-purple-800/40 text-xs font-bold text-gray-800 dark:text-white transition-all duration-200 transform hover:scale-105"
                              >
                                <div>{celeb.name}</div>
                                {celeb.note && (
                                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    {celeb.note}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Instructions */}
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-2xl">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center">
                        <Copy className="w-4 h-4 mr-2" />
                        📖 How it works:
                      </h4>
                      <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-2 list-decimal list-inside">
                        <li>Enter a celebrity name or pick from our list</li>
                        <li>Choose Wikipedia (best for birthdays) or Google search</li>
                        <li>Look for their birthday in the search results</li>
                        <li>Copy the date (format: YYYY-MM-DD)</li>
                        <li>Close this popup and paste into compatibility checker!</li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Search Results */}
                    <div className="space-y-4">
                      {/* Back Button */}
                      <button
                        onClick={resetSearch}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold transition-all duration-200"
                      >
                        <span>← Back to Search</span>
                      </button>

                      {/* Celebrity Info Header */}
                      <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                        <h4 className="font-bold text-gray-800 dark:text-white text-lg flex items-center justify-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>🌟 {celebrityName}</span>
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          Look for their birthday in the Wikipedia article below!
                        </p>
                      </div>

                      {/* External Links */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(getWikipediaUrl(celebrityName), '_blank')}
                          className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>📖 Open Wikipedia</span>
                        </button>
                        
                        <button
                          onClick={() => window.open(getGoogleUrl(celebrityName), '_blank')}
                          className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>🔍 Google Search</span>
                        </button>
                      </div>

                      {/* Wikipedia Iframe */}
                      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                        <iframe
                          src={getWikipediaUrl(celebrityName)}
                          className="w-full h-96 border-0"
                          title={`${celebrityName} Wikipedia`}
                          sandbox="allow-scripts allow-same-origin allow-popups"
                        />
                      </div>

                      {/* Instructions */}
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <p className="text-sm font-bold text-green-700 dark:text-green-300">
                            💡 Birthday Hunting Tips:
                          </p>
                        </div>
                        <ul className="text-xs text-green-600 dark:text-green-400 space-y-1 list-disc list-inside">
                          <li>Look for "born" or "birthday" in the first paragraph</li>
                          <li>Format: Usually shows as "Month Day, Year" (e.g., "September 1, 1996")</li>
                          <li>Convert to YYYY-MM-DD format (e.g., "1996-09-01")</li>
                          <li>If Wikipedia doesn't work, try the Google search button!</li>
                        </ul>
                      </div>

                      {/* Done Button */}
                      <button
                        onClick={closeModal}
                        className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Done! Found the Birthday ✅</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
