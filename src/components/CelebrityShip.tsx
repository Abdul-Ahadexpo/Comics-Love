import React, { useState } from 'react';
import { Star, Search, X, Copy, CheckCircle, ExternalLink } from 'lucide-react';

export const CelebrityShip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [celebrityName, setCelebrityName] = useState('');
  const [showWiki, setShowWiki] = useState(false);

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

  const popularCelebs = [
    'Zendaya', 'Tom_Holland', 'Billie_Eilish', 'Timothée_Chalamet',
    'Ariana_Grande', 'Shawn_Mendes', 'Olivia_Rodrigo', 'Noah_Centineo',
    'Millie_Bobby_Brown', 'Jacob_Elordi', 'Sabrina_Carpenter', 'Walker_Scobell',
    'Taylor_Swift', 'Harry_Styles', 'Dua_Lipa', 'The_Weeknd'
  ];

  const handleCelebClick = (celeb: string) => {
    setCelebrityName(celeb.replace(/_/g, ' '));
    setShowWiki(true);
  };

  const resetSearch = () => {
    setShowWiki(false);
    setCelebrityName('');
  };

  return (
    <div className="relative">
      {/* Celebrity Ship Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Star className="w-5 h-5" />
        <span>🎬 Ship with a Celebrity</span>
        <Search className="w-4 h-4" />
      </button>

      {/* Celebrity Ship Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                🎬 Celebrity Birthday Finder
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetSearch();
                }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {!showWiki ? (
              <div className="space-y-4">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    🌟 Enter Celebrity Name:
                  </label>
                  <input
                    type="text"
                    value={celebrityName}
                    onChange={(e) => setCelebrityName(e.target.value)}
                    placeholder="e.g., Zendaya, Tom Holland, Taylor Swift..."
                    className="w-full p-3 rounded-xl border-2 border-yellow-300 dark:border-gray-600 bg-yellow-50 dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  disabled={!celebrityName.trim()}
                  className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold transition-all duration-300"
                >
                  <Search className="w-4 h-4" />
                  <span>🔍 Find Birthday on Wikipedia</span>
                </button>

                {/* Popular Celebrities */}
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    ✨ Popular Celebrities:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCelebs.map((celeb) => (
                      <button
                        key={celeb}
                        onClick={() => handleCelebClick(celeb)}
                        className="p-2 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/40 dark:hover:to-purple-800/40 text-xs font-bold text-gray-800 dark:text-white transition-all duration-200"
                      >
                        {celeb.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                    📖 How it works:
                  </h4>
                  <ol className="text-sm text-blue-600 dark:text-blue-400 space-y-1 list-decimal list-inside">
                    <li>Search for your favorite celebrity</li>
                    <li>Wikipedia will open with their info</li>
                    <li>Look for their birthday in the first paragraph</li>
                    <li>Copy the date and close this window</li>
                    <li>Paste it into the compatibility checker!</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Back Button */}
                <button
                  onClick={resetSearch}
                  className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold transition-all duration-200"
                >
                  <span>← Back to Search</span>
                </button>

                {/* Celebrity Info Header */}
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                    🌟 {celebrityName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
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
                  onClick={() => {
                    setIsOpen(false);
                    resetSearch();
                  }}
                  className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Done! Found the Birthday ✅</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
