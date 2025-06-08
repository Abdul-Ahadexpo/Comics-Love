import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';
import { getZodiacSign, getDayOfWeek, calculateAge } from '../utils/zodiac';
import { ZodiacResult } from '../types';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage';

export const ZodiacChecker: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [currentAge, setCurrentAge] = useState<number | null>(null);

  useEffect(() => {
    const saved = getFromLocalStorage('birthDate');
    if (saved) {
      setBirthDate(saved);
      handleDateChange(saved);
    }
  }, []);

  const handleDateChange = (dateString: string) => {
    setBirthDate(dateString);
    saveToLocalStorage('birthDate', dateString);

    if (dateString) {
      const date = new Date(dateString);
      const zodiac = getZodiacSign(date.getMonth() + 1, date.getDate());
      const dayOfWeek = getDayOfWeek(date);
      const age = calculateAge(date);

      const zodiacResult: ZodiacResult = {
        sign: zodiac.sign,
        dayOfWeek,
        age,
        emoji: zodiac.emoji,
        isSpecial: zodiac.isSpecial
      };

      setResult(zodiacResult);
      setCurrentAge(age);
    } else {
      setResult(null);
      setCurrentAge(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`
        p-6 rounded-3xl transition-all duration-500 transform hover:scale-105
        ${result?.isSpecial 
          ? 'bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-600 dark:to-pink-700 shadow-2xl shadow-pink-500/30' 
          : 'bg-white dark:bg-gray-800 shadow-xl shadow-pink-200/50 dark:shadow-purple-500/20'
        }
      `}>
        <div className="text-center mb-6">
          <Heart className="w-8 h-8 mx-auto mb-3 text-pink-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            ✨ Your Cosmic Identity ✨
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Discover your zodiac magic! 🌙
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              When were you born? 🎂
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className={`
                w-full p-4 rounded-2xl border-2 transition-all duration-300 text-center font-bold
                focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-purple-400
                ${result?.isSpecial 
                  ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500' 
                  : 'border-pink-300 bg-pink-50 dark:bg-gray-700 dark:border-gray-600'
                }
                dark:text-white
              `}
            />
          </div>

          {currentAge !== null && (
            <div className="text-center p-3 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
              <Clock className="inline w-4 h-4 mr-2 text-pink-600 dark:text-pink-400" />
              <span className="text-pink-700 dark:text-pink-300 font-bold">
                You're {currentAge} years old! 🎈
              </span>
            </div>
          )}

          {result && (
            <div className={`
              p-6 rounded-2xl text-center transition-all duration-500 transform
              ${result.isSpecial 
                ? 'bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-800/50 dark:to-orange-800/50 animate-pulse' 
                : 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30'
              }
            `}>
              <div className="text-4xl mb-3">{result.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {result.sign}
                {result.isSpecial && ' ⭐ SPECIAL ⭐'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-bold">
                Born on a {result.dayOfWeek} ✨
              </p>
              {result.isSpecial && (
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-600 dark:to-orange-600">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">
                    🎉 You're extra magical! 🎉
                    <br />
                    {result.sign === 'Scorpio' ? '🦂 Mysterious & Powerful!' : '🏹 Adventurous & Free!'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};