export const calculateCompatibility = (sign1: string, sign2: string, day1: string, day2: string, date1: Date, date2: Date): number => {
  // Base compatibility scores for zodiac signs (more realistic ranges)
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    // Fire signs (Aries, Leo, Sagittarius)
    'Aries': { 
      'Leo': 85, 'Sagittarius': 80, 'Gemini': 75, 'Aquarius': 70, 'Libra': 65,
      'Aries': 60, 'Scorpio': 55, 'Cancer': 50, 'Capricorn': 45, 'Virgo': 40, 'Taurus': 35, 'Pisces': 30
    },
    'Leo': { 
      'Aries': 85, 'Sagittarius': 80, 'Gemini': 75, 'Libra': 70, 'Aquarius': 65,
      'Leo': 60, 'Scorpio': 55, 'Cancer': 50, 'Pisces': 45, 'Virgo': 40, 'Taurus': 35, 'Capricorn': 30
    },
    'Sagittarius': { 
      'Aries': 80, 'Leo': 80, 'Aquarius': 75, 'Libra': 70, 'Gemini': 65,
      'Sagittarius': 95, 'Scorpio': 60, 'Cancer': 50, 'Virgo': 45, 'Taurus': 40, 'Capricorn': 35, 'Pisces': 30
    },
    
    // Earth signs (Taurus, Virgo, Capricorn)
    'Taurus': { 
      'Virgo': 85, 'Capricorn': 80, 'Cancer': 75, 'Pisces': 70, 'Scorpio': 65,
      'Taurus': 60, 'Leo': 50, 'Aquarius': 45, 'Sagittarius': 40, 'Aries': 35, 'Gemini': 30, 'Libra': 25
    },
    'Virgo': { 
      'Taurus': 85, 'Capricorn': 80, 'Cancer': 75, 'Scorpio': 70, 'Pisces': 65,
      'Virgo': 60, 'Gemini': 55, 'Libra': 50, 'Aquarius': 45, 'Leo': 40, 'Sagittarius': 35, 'Aries': 30
    },
    'Capricorn': { 
      'Taurus': 80, 'Virgo': 80, 'Scorpio': 75, 'Pisces': 70, 'Cancer': 65,
      'Capricorn': 60, 'Libra': 55, 'Aquarius': 50, 'Gemini': 45, 'Sagittarius': 40, 'Leo': 35, 'Aries': 30
    },
    
    // Air signs (Gemini, Libra, Aquarius)
    'Gemini': { 
      'Libra': 85, 'Aquarius': 80, 'Aries': 75, 'Leo': 70, 'Sagittarius': 65,
      'Gemini': 60, 'Virgo': 55, 'Scorpio': 50, 'Capricorn': 45, 'Taurus': 40, 'Cancer': 35, 'Pisces': 30
    },
    'Libra': { 
      'Gemini': 85, 'Aquarius': 80, 'Leo': 75, 'Sagittarius': 70, 'Aries': 65,
      'Libra': 60, 'Cancer': 55, 'Scorpio': 50, 'Pisces': 45, 'Capricorn': 40, 'Virgo': 35, 'Taurus': 30
    },
    'Aquarius': { 
      'Gemini': 80, 'Libra': 80, 'Sagittarius': 75, 'Aries': 70, 'Leo': 65,
      'Aquarius': 60, 'Scorpio': 55, 'Cancer': 50, 'Pisces': 45, 'Taurus': 40, 'Virgo': 35, 'Capricorn': 30
    },
    
    // Water signs (Cancer, Scorpio, Pisces)
    'Cancer': { 
      'Scorpio': 85, 'Pisces': 80, 'Taurus': 75, 'Virgo': 70, 'Capricorn': 65,
      'Cancer': 60, 'Libra': 55, 'Gemini': 50, 'Leo': 45, 'Sagittarius': 40, 'Aries': 35, 'Aquarius': 30
    },
    'Scorpio': { 
      'Cancer': 85, 'Pisces': 80, 'Virgo': 75, 'Capricorn': 70, 'Taurus': 65,
      'Scorpio': 95, 'Sagittarius': 60, 'Libra': 55, 'Aquarius': 50, 'Gemini': 45, 'Leo': 40, 'Aries': 35
    },
    'Pisces': { 
      'Cancer': 80, 'Scorpio': 80, 'Taurus': 75, 'Capricorn': 70, 'Virgo': 65,
      'Pisces': 60, 'Sagittarius': 55, 'Gemini': 50, 'Libra': 45, 'Aries': 40, 'Leo': 35, 'Aquarius': 30
    }
  };

  // Special override for Abdul Ahad/Nazim (2007-11-29) and Charu (2010-11-18)
  const date1Str = date1.toISOString().split('T')[0];
  const date2Str = date2.toISOString().split('T')[0];
  
  if ((date1Str === '2007-11-29' && date2Str === '2010-11-18') || 
      (date1Str === '2010-11-18' && date2Str === '2007-11-29')) {
    return 999; // Special infinite value
  }

  let baseScore = compatibilityMatrix[sign1]?.[sign2] || 45;
  
  // Bonus for same day of week (cosmic connection)
  if (day1 === day2) {
    baseScore += 8;
  }
  
  // Age difference factor
  const ageDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
  if (ageDiff > 10) {
    // Reduce compatibility for large age gaps unless zodiac is very strong
    if (baseScore < 75) {
      baseScore -= Math.min(15, ageDiff - 10);
    } else {
      baseScore -= Math.min(8, ageDiff - 10);
    }
  } else if (ageDiff <= 3) {
    // Small boost for close ages
    baseScore += 5;
  }
  
  // Add random variance of ±5% to avoid fixed numbers
  const variance = (Math.random() - 0.5) * 10; // -5 to +5
  baseScore += variance;
  
  // Ensure score stays within reasonable bounds
  return Math.max(15, Math.min(95, Math.round(baseScore)));
};

export const getCompatibilityMessage = (score: number, sign1: string, sign2: string): { message: string; emoji: string } => {
  // Special message for infinite compatibility
  if (score === 999) {
    return { 
      message: "💫 Soulmates unlocked: Your bond transcends time itself!", 
      emoji: "❤️" 
    };
  }
  
  if (score >= 85) {
    const messages = [
      "🌟 The universe ships you two!",
      "💖 Destiny-locked!",
      "✨ Written in the stars forever!"
    ];
    return { 
      message: messages[Math.floor(Math.random() * messages.length)], 
      emoji: "💕" 
    };
  } else if (score >= 75) {
    const messages = [
      "🌟 The universe ships you two!",
      "💖 Destiny-locked!",
      "🎯 Perfect cosmic alignment!"
    ];
    return { 
      message: messages[Math.floor(Math.random() * messages.length)], 
      emoji: "✨" 
    };
  } else if (score >= 60) {
    const messages = [
      "💫 Sweet cosmic vibes!",
      "🌙 Beautiful connection brewing!",
      "💝 Love is in the air!"
    ];
    return { 
      message: messages[Math.floor(Math.random() * messages.length)], 
      emoji: "💖" 
    };
  } else if (score >= 50) {
    const messages = [
      "🌈 Adventure awaits you two!",
      "🎭 Opposites attract energy!",
      "🌸 Cute chaos combo!"
    ];
    return { 
      message: messages[Math.floor(Math.random() * messages.length)], 
      emoji: "🔥" 
    };
  } else {
    const messages = [
      "🤔 Might need some stardust…",
      "💔 Opposites attract? Maybe…",
      "🌙 Love finds mysterious ways!"
    ];
    return { 
      message: messages[Math.floor(Math.random() * messages.length)], 
      emoji: "💫" 
    };
  }
};

export const getCompatibilityBreakdown = (sign1: string, sign2: string, day1: string, day2: string, date1: Date, date2: Date): string[] => {
  const breakdown: string[] = [];
  
  // Special case first
  const date1Str = date1.toISOString().split('T')[0];
  const date2Str = date2.toISOString().split('T')[0];
  
  if ((date1Str === '2007-11-29' && date2Str === '2010-11-18') || 
      (date1Str === '2010-11-18' && date2Str === '2007-11-29')) {
    return ["❤️ Infinite soulmate energy!", "💫 Transcends all logic!", "✨ Pure cosmic magic!"];
  }
  
  // Zodiac compatibility
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'Aries': { 'Leo': 85, 'Sagittarius': 80, 'Gemini': 75, 'Aquarius': 70 },
    'Taurus': { 'Virgo': 85, 'Capricorn': 80, 'Cancer': 75, 'Pisces': 70 },
    'Gemini': { 'Libra': 85, 'Aquarius': 80, 'Aries': 75, 'Leo': 70 },
    'Cancer': { 'Scorpio': 85, 'Pisces': 80, 'Taurus': 75, 'Virgo': 70 },
    'Leo': { 'Aries': 85, 'Sagittarius': 80, 'Gemini': 75, 'Libra': 70 },
    'Virgo': { 'Taurus': 85, 'Capricorn': 80, 'Cancer': 75, 'Scorpio': 70 },
    'Libra': { 'Gemini': 85, 'Aquarius': 80, 'Leo': 75, 'Sagittarius': 70 },
    'Scorpio': { 'Cancer': 85, 'Pisces': 80, 'Virgo': 75, 'Capricorn': 70 },
    'Sagittarius': { 'Aries': 80, 'Leo': 80, 'Aquarius': 75, 'Libra': 70 },
    'Capricorn': { 'Taurus': 80, 'Virgo': 80, 'Scorpio': 75, 'Pisces': 70 },
    'Aquarius': { 'Gemini': 80, 'Libra': 80, 'Sagittarius': 75, 'Aries': 70 },
    'Pisces': { 'Cancer': 80, 'Scorpio': 80, 'Taurus': 75, 'Capricorn': 70 }
  };
  
  const zodiacScore = compatibilityMatrix[sign1]?.[sign2] || 45;
  if (zodiacScore >= 80) {
    breakdown.push("+35% for perfect zodiac match 💫");
  } else if (zodiacScore >= 70) {
    breakdown.push("+25% for great zodiac harmony ✨");
  } else if (zodiacScore >= 60) {
    breakdown.push("+15% for decent zodiac vibes 🌙");
  } else if (zodiacScore >= 50) {
    breakdown.push("+5% for neutral zodiac energy ⚖️");
  } else {
    breakdown.push("-10% for clashing elements 🔥🌊");
  }
  
  // Same day bonus
  if (day1 === day2) {
    breakdown.push("+8% for cosmic day connection 📅");
  }
  
  // Age difference
  const ageDiff = Math.abs(date1.getFullYear() - date2.getFullYear());
  if (ageDiff <= 3) {
    breakdown.push("+5% for close ages 👶👧");
  } else if (ageDiff > 10) {
    breakdown.push(`-${Math.min(15, ageDiff - 10)}% for age gap 📊`);
  }
  
  // Special signs bonus
  if (sign1 === 'Scorpio' || sign2 === 'Scorpio') {
    breakdown.push("+5% for Scorpio magic 🦂");
  }
  if (sign1 === 'Sagittarius' || sign2 === 'Sagittarius') {
    breakdown.push("+5% for Sagittarius adventure 🏹");
  }
  
  return breakdown;
};
