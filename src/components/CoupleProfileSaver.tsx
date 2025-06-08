import React, { useState, useEffect } from 'react';
import { Save, Heart, Download } from 'lucide-react';
import { CompatibilityResult } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

interface CoupleProfileSaverProps {
  person1Date: string;
  person2Date: string;
  result: CompatibilityResult | null;
}

interface SavedProfile {
  id: string;
  label: string;
  person1Date: string;
  person2Date: string;
  compatibilityScore: number;
  timestamp: number;
}

export const CoupleProfileSaver: React.FC<CoupleProfileSaverProps> = ({ 
  person1Date, 
  person2Date, 
  result 
}) => {
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [profileLabel, setProfileLabel] = useState('');
  const [showSavedList, setShowSavedList] = useState(false);

  useEffect(() => {
    const saved = getFromLocalStorage('savedCoupleProfiles') || [];
    setSavedProfiles(saved);
  }, []);

  const saveProfile = () => {
    if (!person1Date || !person2Date || !result || !profileLabel.trim()) return;

    const newProfile: SavedProfile = {
      id: Date.now().toString(),
      label: profileLabel.trim(),
      person1Date,
      person2Date,
      compatibilityScore: result.compatibilityScore,
      timestamp: Date.now()
    };

    const updatedProfiles = [...savedProfiles, newProfile];
    setSavedProfiles(updatedProfiles);
    saveToLocalStorage('savedCoupleProfiles', updatedProfiles);
    
    setProfileLabel('');
    setShowSaveForm(false);
  };

  const loadProfile = (profile: SavedProfile) => {
    // This would trigger a re-calculation in the parent component
    // For now, we'll just show a message
    alert(`Loading ${profile.label}... 💕`);
  };

  const deleteProfile = (id: string) => {
    const updatedProfiles = savedProfiles.filter(p => p.id !== id);
    setSavedProfiles(updatedProfiles);
    saveToLocalStorage('savedCoupleProfiles', updatedProfiles);
  };

  const getProfileEmoji = (score: number) => {
    if (score === 999) return '♾️';
    if (score >= 85) return '💕';
    if (score >= 70) return '💖';
    if (score >= 60) return '💝';
    return '💫';
  };

  const generateSuggestedLabel = () => {
    if (!result) return '';
    
    const suggestions = [
      'Me & My Love 💕',
      'Us Forever 💖',
      'Soulmate Check ✨',
      'Love Birds 🐦',
      'Perfect Match 💫',
      'Destiny Duo 🌟'
    ];
    
    if (result.compatibilityScore === 999) {
      return 'Me & Charu 💕';
    }
    
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  return (
    <div className="space-y-4">
      {/* Save Button */}
      <button
        onClick={() => {
          setShowSaveForm(!showSaveForm);
          if (!showSaveForm) {
            setProfileLabel(generateSuggestedLabel());
          }
        }}
        disabled={!person1Date || !person2Date || !result}
        className="w-full flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
      >
        <Save className="w-5 h-5" />
        <span>💾 Save Profile</span>
      </button>

      {/* Save Form */}
      {showSaveForm && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                value={profileLabel}
                onChange={(e) => setProfileLabel(e.target.value)}
                placeholder="Me & My Love 💕"
                className="w-full p-3 rounded-xl border-2 border-green-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={saveProfile}
                disabled={!profileLabel.trim()}
                className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold transition-all duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveForm(false)}
                className="px-4 py-2 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-bold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Profiles Button */}
      {savedProfiles.length > 0 && (
        <button
          onClick={() => setShowSavedList(!showSavedList)}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold transition-all duration-300 transform hover:scale-105"
        >
          <Heart className="w-4 h-4" />
          <span>💕 My Saved Couples ({savedProfiles.length})</span>
        </button>
      )}

      {/* Saved Profiles List */}
      {showSavedList && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
          <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-center">
            💕 Your Saved Love Stories
          </h4>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {savedProfiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/70 dark:bg-gray-800/70 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getProfileEmoji(profile.compatibilityScore)}</span>
                    <span className="font-bold text-gray-800 dark:text-white">
                      {profile.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {profile.compatibilityScore === 999 ? '∞' : profile.compatibilityScore}% match • {new Date(profile.timestamp).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadProfile(profile)}
                    className="text-blue-500 hover:text-blue-700 font-bold text-sm"
                    title="Load profile"
                  >
                    📂
                  </button>
                  <button
                    onClick={() => deleteProfile(profile.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                    title="Delete profile"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};