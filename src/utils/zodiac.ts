export const getZodiacSign = (month: number, day: number): { sign: string; emoji: string; isSpecial: boolean } => {
  const zodiacSigns = [
    { sign: 'Capricorn', emoji: '♑', dates: [[12, 22], [1, 19]], special: false },
    { sign: 'Aquarius', emoji: '♒', dates: [[1, 20], [2, 18]], special: false },
    { sign: 'Pisces', emoji: '♓', dates: [[2, 19], [3, 20]], special: false },
    { sign: 'Aries', emoji: '♈', dates: [[3, 21], [4, 19]], special: false },
    { sign: 'Taurus', emoji: '♉', dates: [[4, 20], [5, 20]], special: false },
    { sign: 'Gemini', emoji: '♊', dates: [[5, 21], [6, 20]], special: false },
    { sign: 'Cancer', emoji: '♋', dates: [[6, 21], [7, 22]], special: false },
    { sign: 'Leo', emoji: '♌', dates: [[7, 23], [8, 22]], special: false },
    { sign: 'Virgo', emoji: '♍', dates: [[8, 23], [9, 22]], special: false },
    { sign: 'Libra', emoji: '♎', dates: [[9, 23], [10, 22]], special: false },
    { sign: 'Scorpio', emoji: '♏', dates: [[10, 23], [11, 21]], special: true },
    { sign: 'Sagittarius', emoji: '♐', dates: [[11, 22], [12, 21]], special: true },
  ];

  for (const zodiac of zodiacSigns) {
    const [[startMonth, startDay], [endMonth, endDay]] = zodiac.dates;
    
    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return {
        sign: zodiac.sign,
        emoji: zodiac.emoji,
        isSpecial: zodiac.special
      };
    }
  }
  
  return { sign: 'Capricorn', emoji: '♑', isSpecial: false };
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const calculateAgeDifference = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const days = diffDays % 365;
  
  return { years, days };
};