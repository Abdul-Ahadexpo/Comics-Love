import React, { useState } from 'react';
import { Calendar, GraduationCap, Heart, Baby } from 'lucide-react';
import { CompatibilityResult } from '../types';
import { calculateAge } from '../utils/zodiac';

interface MilestoneCheckerProps {
  person1Date: string;
  person2Date: string;
  result: CompatibilityResult;
}

export const MilestoneChecker: React.FC<MilestoneCheckerProps> = ({ person1Date, person2Date, result }) => {
  const [targetYear, setTargetYear] = useState(new Date().getFullYear() + 5);
  const [useCurrentYear, setUseCurrentYear] = useState(false);

  const calculateMilestones = (year: number) => {
    const targetDate = new Date(year, 0, 1);
    const person1Birth = new Date(person1Date);
    const person2Birth = new Date(person2Date);

    const person1Age = year - person1Birth.getFullYear();
    const person2Age = year - person2Birth.getFullYear();

    const getGradeLevel = (age: number) => {
      if (age < 5) return "Pre-K 👶";
      if (age <= 5) return "Kindergarten 🎒";
      if (age <= 11) return `${age - 5}th Grade 📚`;
      if (age === 12) return "6th Grade (Middle School) 🏫";
      if (age === 13) return "7th Grade 📖";
      if (age === 14) return "8th Grade 📝";
      if (age === 15) return "9th Grade (Freshman) 🎓";
      if (age === 16) return "10th Grade (Sophomore) 📋";
      if (age === 17) return "11th Grade (Junior) 📊";
      if (age === 18) return "12th Grade (Senior) 🎉";
      if (age <= 22) return `College Year ${age - 17} 🎓`;
      if (age <= 26) return "Graduate School 📚";
      return "Working Professional 💼";
    };

    const getLifeStage = (age: number) => {
      if (age < 13) return "Childhood 🧸";
      if (age < 18) return "Teenager 🌟";
      if (age < 25) return "Young Adult 🌈";
      if (age < 35) return "Adult 💪";
      return "Mature Adult 🌺";
    };

    return {
      person1: {
        age: person1Age,
        grade: getGradeLevel(person1Age),
        stage: getLifeStage(person1Age)
      },
      person2: {
        age: person2Age,
        grade: getGradeLevel(person2Age),
        stage: getLifeStage(person2Age)
      }
    };
  };

  const currentYear = useCurrentYear ? new Date().getFullYear() : targetYear;
  const milestones = calculateMilestones(currentYear);

  const getCuteMessage = () => {
    const { person1, person2 } = milestones;
    const bothAdults = person1.age >= 18 && person2.age >= 18;
    const bothInCollege = person1.age >= 18 && person1.age <= 22 && person2.age >= 18 && person2.age <= 22;
    
    if (bothAdults && bothInCollege) {
      return `💑 In ${currentYear}, you'll be ${person1.age} and they'll be ${person2.age} — perfect college sweethearts! 📚💕`;
    } else if (bothAdults) {
      return `💑 In ${currentYear}, you'll be ${person1.age} and they'll be ${person2.age} — finally legal for everything! 🎉💍`;
    } else if (person1.age >= 16 && person2.age >= 16) {
      return `🚗 In ${currentYear}, you'll both be driving age! Road trip dates incoming! 🛣️💕`;
    } else {
      return `🌟 In ${currentYear}, you'll be ${person1.age} and they'll be ${person2.age} — growing up together! 💫`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-blue-200/50 dark:shadow-blue-500/20">
      <div className="text-center mb-6">
        <GraduationCap className="w-8 h-8 mx-auto mb-3 text-blue-500 animate-bounce" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          🎯 Milestone Age Checker 🎯
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          See where you'll be in the future! ✨
        </p>
      </div>

      <div className="space-y-6">
        {/* Year Selector */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setUseCurrentYear(true)}
            className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
              useCurrentYear 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Now
          </button>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <input
              type="number"
              value={targetYear}
              onChange={(e) => {
                setTargetYear(parseInt(e.target.value));
                setUseCurrentYear(false);
              }}
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 50}
              className="w-20 p-2 rounded-lg border-2 border-blue-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-700 text-center font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Milestone Results */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            <div className="text-center">
              <div className="text-2xl mb-2">{result.person1.emoji}</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Person 1</h4>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">Age: {milestones.person1.age}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{milestones.person1.grade}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{milestones.person1.stage}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30">
            <div className="text-center">
              <div className="text-2xl mb-2">{result.person2.emoji}</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Person 2</h4>
              <p className="text-lg font-bold text-pink-700 dark:text-pink-300">Age: {milestones.person2.age}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{milestones.person2.grade}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{milestones.person2.stage}</p>
            </div>
          </div>
        </div>

        {/* Cute Message */}
        <div className="text-center p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
          <p className="font-bold text-gray-800 dark:text-white">
            {getCuteMessage()}
          </p>
        </div>

        {/* Special Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.person1.age >= 16 && milestones.person2.age >= 16 && (
            <div className="text-center p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <div className="text-2xl mb-1">🚗</div>
              <p className="text-xs font-bold text-green-700 dark:text-green-300">Both Can Drive!</p>
            </div>
          )}
          
          {milestones.person1.age >= 18 && milestones.person2.age >= 18 && (
            <div className="text-center p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <div className="text-2xl mb-1">🗳️</div>
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300">Both Can Vote!</p>
            </div>
          )}
          
          {milestones.person1.age >= 21 && milestones.person2.age >= 21 && (
            <div className="text-center p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <div className="text-2xl mb-1">🍾</div>
              <p className="text-xs font-bold text-purple-700 dark:text-purple-300">Legal Everything!</p>
            </div>
          )}
          
          {milestones.person1.age >= 25 && milestones.person2.age >= 25 && (
            <div className="text-center p-3 rounded-xl bg-pink-100 dark:bg-pink-900/30">
              <div className="text-2xl mb-1">💍</div>
              <p className="text-xs font-bold text-pink-700 dark:text-pink-300">Marriage Ready!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};