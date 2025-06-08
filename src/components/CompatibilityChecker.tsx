import React, { useState, useEffect } from 'react';
import { Users, Heart, Calendar, ArrowRight, Info, Clock, Save, Target } from 'lucide-react';
import { getZodiacSign, getDayOfWeek, calculateAge, calculateAgeDifference } from '../utils/zodiac';
import { calculateCompatibility, getCompatibilityMessage, getCompatibilityBreakdown } from '../utils/compatibility';
import { CompatibilityResult } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';
import { MilestoneChecker } from './MilestoneChecker';
import { LoveTimeline } from './LoveTimeline';
import { CoupleProfileSaver } from './CoupleProfileSaver';

export const CompatibilityChecker: React.FC = () => {
  const [person1Date, setPerson1Date] = useState('');
  const [person2Date, setPerson2Date] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [showMilestones, setShowMilestones] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const saved = getFromLocalStorage('compatibilityData');
    if (saved) {
      setPerson1Date(saved.person1Date || '');
      setPerson2Date(saved.person2Date || '');
      if (saved.person1Date && saved.person2Date) {
        calculateCompatibilityResult(saved.person1Date, saved.person2Date);
      }
    }
  }, []);

  useEffect(() => {
    if (result) {
      let current = 0;
      const target = result.compatibilityScore === 999 ? 100 : result.compatibilityScore;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 20);
      
      return () => clearInterval(timer);
    }
  }, [result]);

  const calculateCompatibilityResult = (date1: string, date2: string) => {
    if (!date1 || !date2) {
      setResult(null);
      return;
    }

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const zodiac1 = getZodiacSign(d1.getMonth() + 1, d1.getDate());
    const zodiac2 = getZodiacSign(d2.getMonth() + 1, d2.getDate());

    const person1 = {
      sign: zodiac1.sign,
      dayOfWeek: getDayOfWeek(d1),
      age: calculateAge(d1),
      emoji: zodiac1.emoji,
      isSpecial: zodiac1.isSpecial
    };

    const person2 = {
      sign: zodiac2.sign,
      dayOfWeek: getDayOfWeek(d2),
      age: calculateAge(d2),
      emoji: zodiac2.emoji,
      isSpecial: zodiac2.isSpecial
    };

    const ageDifference = calculateAgeDifference(d1, d2);
    const compatibilityScore = calculateCompatibility(person1.sign, person2.sign, person1.dayOfWeek, person2.dayOfWeek, d1, d2);
    const { message, emoji } = getCompatibilityMessage(compatibilityScore, person1.sign, person2.sign);
    const compatibilityBreakdown = getCompatibilityBreakdown(person1.sign, person2.sign, person1.dayOfWeek, person2.dayOfWeek, d1, d2);

    const compatibilityResult: CompatibilityResult = {
      person1,
      person2,
      ageDifference,
      compatibilityScore,
      message,
      emoji
    };

    setResult(compatibilityResult);
    setBreakdown(compatibilityBreakdown);
    saveToLocalStorage('compatibilityData', { person1Date: date1, person2Date: date2 });
  };

  const handlePerson1Change = (date: string) => {
    setPerson1Date(date);
    calculateCompatibilityResult(date, person2Date);
  };

  const handlePerson2Change = (date: string) => {
    setPerson2Date(date);
    calculateCompatibilityResult(person1Date, date);
  };

  const getScoreDisplay = () => {
    if (result?.compatibilityScore === 999) {
      return "∞";
    }
    return `${animatedScore}`;
  };

  const getScoreColor = () => {
    if (result?.compatibilityScore === 999) {
      return "from-pink-500 via-purple-500 to-red-500";
    }
    if (animatedScore >= 75) return "from-pink-500 to-rose-500";
    if (animatedScore >= 60) return "from-purple-500 to-pink-500";
    if (animatedScore >= 50) return "from-blue-500 to-purple-500";
    return "from-gray-500 to-blue-500";
  };

  const getAgeGapWarning = () => {
    if (!result) return null;
    
    const { person1, person2 } = result;
    const younger = person1.age < person2.age ? person1 : person2;
    const older = person1.age < person2.age ? person2 : person1;
    const ageDiff = older.age - younger.age;
    
    // Check for concerning age gaps
    if (younger.age < 18 && ageDiff > 3) {
      const messages = [
        "😅 You might have to wait a few years, but love always finds a way!",
        "💫 The stars aren't sure… but let's hope for a time skip!",
        "⏰ Time will make this connection even more magical!"
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
    
    return null;
  };

  const getLegalCountdown = () => {
    if (!result) return null;
    
    const { person1, person2 } = result;
    const today = new Date();
    
    // Calculate when both will be 18
    const person1_18 = new Date(new Date(person1Date).getFullYear() + 18, new Date(person1Date).getMonth(), new Date(person1Date).getDate());
    const person2_18 = new Date(new Date(person2Date).getFullYear() + 18, new Date(person2Date).getMonth(), new Date(person2Date).getDate());
    
    const bothLegal = Math.max(person1_18.getTime(), person2_18.getTime());
    const bothLegalDate = new Date(bothLegal);
    
    if (bothLegalDate > today) {
      const daysUntil = Math.ceil((bothLegalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const yearsBoth18 = bothLegalDate.getFullYear();
      
      return {
        days: daysUntil,
        year: yearsBoth18,
        message: `⏳ ${daysUntil} days until you're both legal adults! 🎉 You'll both be 18 in ${yearsBoth18}!`
      };
    }
    
    return null;
  };

  const ageWarning = getAgeGapWarning();
  const legalCountdown = getLegalCountdown();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-pink-200/50 dark:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105">
        <div className="text-center mb-6">
          <Users className="w-8 h-8 mx-auto mb-3 text-pink-500 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            💕 Love Compatibility Checker 💕
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            See if you're meant to be! 🔮
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Person 1's Birthday 🎂
              </label>
              <input
                type="date"
                value={person1Date}
                onChange={(e) => handlePerson1Change(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-pink-300 dark:border-gray-600 bg-pink-50 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-purple-400 transition-all duration-300 text-center font-bold dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Person 2's Birthday 🎂
              </label>
              <input
                type="date"
                value={person2Date}
                onChange={(e) => handlePerson2Change(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-pink-300 dark:border-gray-600 bg-pink-50 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-purple-400 transition-all duration-300 text-center font-bold dark:text-white"
              />
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              {/* Zodiac Display */}
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex-1">
                  <div className="text-3xl mb-2">{result.person1.emoji}</div>
                  <p className="font-bold text-gray-800 dark:text-white">{result.person1.sign}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{result.person1.dayOfWeek}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Age: {result.person1.age}</p>
                </div>
                
                <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
                
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex-1">
                  <div className="text-3xl mb-2">{result.person2.emoji}</div>
                  <p className="font-bold text-gray-800 dark:text-white">{result.person2.sign}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{result.person2.dayOfWeek}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Age: {result.person2.age}</p>
                </div>
              </div>

              {/* Age Difference */}
              <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">📅 Age Difference</h3>
                <p className="text-blue-700 dark:text-blue-300 font-bold">
                  {result.ageDifference.years > 0 && `${result.ageDifference.years} years`}
                  {result.ageDifference.years > 0 && result.ageDifference.days > 0 && ' and '}
                  {result.ageDifference.days > 0 && `${result.ageDifference.days} days`}
                  {result.ageDifference.years === 0 && result.ageDifference.days === 0 && 'Same age! 🎯'}
                </p>
              </div>

              {/* Age Gap Warning */}
              {ageWarning && (
                <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-300 dark:border-yellow-600">
                  <p className="font-bold text-gray-800 dark:text-white text-sm">
                    🥺 Too Young Alert
                  </p>
                  <p className="text-yellow-700 dark:text-yellow-300 font-bold mt-1">
                    {ageWarning}
                  </p>
                </div>
              )}

              {/* Legal Countdown */}
              {legalCountdown && (
                <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 animate-pulse">
                  <Clock className="inline w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  <p className="font-bold text-green-700 dark:text-green-300">
                    {legalCountdown.message}
                  </p>
                </div>
              )}

              {/* Compatibility Score */}
              <div className={`text-center p-6 rounded-2xl transition-all duration-500 ${
                result.compatibilityScore === 999 
                  ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-red-200 dark:from-pink-900/60 dark:via-purple-900/60 dark:to-red-900/60 animate-pulse' 
                  : 'bg-gradient-to-br from-rose-100 to-pink-200 dark:from-rose-900/40 dark:to-pink-900/40'
              }`}>
                <div className="flex items-center justify-center mb-4">
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg mr-2">
                    {result.emoji} Compatibility Score {result.emoji}
                  </h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="p-1 rounded-full bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-600/70 transition-all duration-200"
                    title="Show breakdown"
                  >
                    <Info className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreColor()} rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: result.compatibilityScore === 999 ? '100%' : `${animatedScore}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-2xl font-bold ${
                      result.compatibilityScore === 999 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500' 
                        : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      {getScoreDisplay()}{result.compatibilityScore === 999 ? '' : '%'}
                    </span>
                  </div>
                </div>

                {/* Breakdown Tooltip */}
                {showBreakdown && (
                  <div className="mb-4 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 text-left">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-center">💫 Compatibility Breakdown</h4>
                    <div className="space-y-1">
                      {breakdown.map((item, index) => (
                        <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hearts Animation */}
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-6 h-6 transition-all duration-500 ${
                        result.compatibilityScore === 999 || i < Math.floor((result.compatibilityScore === 999 ? 100 : result.compatibilityScore) / 20)
                          ? 'text-pink-500 fill-current animate-pulse'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                <p className="font-bold text-gray-800 dark:text-white text-lg">
                  {result.message}
                </p>
              </div>

              {/* Special Message for Scorpio/Sagittarius */}
              {(result.person1.isSpecial || result.person2.isSpecial) && result.compatibilityScore !== 999 && (
                <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-800/40 dark:to-orange-800/40 animate-pulse">
                  <p className="font-bold text-gray-800 dark:text-white">
                    ⭐ Special Cosmic Connection Detected! ⭐
                    <br />
                    <span className="text-sm">One of you has extra magical energy! 🌟</span>
                  </p>
                </div>
              )}

              {/* Special Soulmate Message */}
              {result.compatibilityScore === 999 && (
                <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 dark:from-pink-800/60 dark:via-purple-800/60 dark:to-red-800/60 animate-pulse border-4 border-pink-400 dark:border-pink-600">
                  <div className="text-4xl mb-4">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>💖</span>
                    <span className="animate-bounce" style={{ animationDelay: '200ms' }}>✨</span>
                    <span className="animate-bounce" style={{ animationDelay: '400ms' }}>💫</span>
                    <span className="animate-bounce" style={{ animationDelay: '600ms' }}>✨</span>
                    <span className="animate-bounce" style={{ animationDelay: '800ms' }}>💖</span>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-white text-xl">
                    🌟 INFINITE MATCH DETECTED! 🌟
                    <br />
                    <span className="text-lg">Abdul Ahad & Charu = Pure Magic! ✨</span>
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowMilestones(!showMilestones)}
                  className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <Target className="w-5 h-5" />
                  <span>🎯 Milestones</span>
                </button>

                <button
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <Clock className="w-5 h-5" />
                  <span>💘 Timeline</span>
                </button>

                <CoupleProfileSaver 
                  person1Date={person1Date}
                  person2Date={person2Date}
                  result={result}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Milestone Checker */}
      {showMilestones && result && (
        <MilestoneChecker 
          person1Date={person1Date}
          person2Date={person2Date}
          result={result}
        />
      )}

      {/* Love Timeline */}
      {showTimeline && result && (
        <LoveTimeline 
          person1Date={person1Date}
          person2Date={person2Date}
          result={result}
        />
      )}
    </div>
  );
};