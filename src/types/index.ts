export interface ZodiacResult {
  sign: string;
  dayOfWeek: string;
  age: number;
  emoji: string;
  isSpecial: boolean;
}

export interface CompatibilityResult {
  person1: ZodiacResult;
  person2: ZodiacResult;
  ageDifference: {
    years: number;
    days: number;
  };
  compatibilityScore: number;
  message: string;
  emoji: string;
}

export interface UserData {
  birthDate: string;
  zodiacResult?: ZodiacResult;
  timestamp: number;
}

export interface MatchData {
  person1Date: string;
  person2Date: string;
  compatibilityResult?: CompatibilityResult;
  timestamp: number;
}