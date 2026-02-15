export interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  note?: string;
}

export interface RitualStep {
  id: string;
  ritual: "umrah" | "hajj";
  category: string;
  title: string;
  titleAr: string;
  sequence: number;
  subSequence?: number;
  instructions: string;
  duas: Dua[];
}

export interface HajjDay {
  day: number;
  date: string;
  title: string;
  titleAr: string;
  steps: RitualStep[];
}

export interface PersonalDua {
  id: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  title: string;
  createdAt: number;
}

export interface UserPreferences {
  fontSizeLevel: number; // 0=small, 1=base, 2=large, 3=xl, 4=2xl
  showTransliteration: boolean;
  showTranslation: boolean;
  lastUmrahStep?: string;
  lastHajjDay?: number;
  lastHajjStep?: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  fontSizeLevel: 1,
  showTransliteration: true,
  showTranslation: true,
};

export const FONT_SIZE_CLASSES = [
  "text-arabic-sm",
  "text-arabic-base",
  "text-arabic-lg",
  "text-arabic-xl",
  "text-arabic-2xl",
] as const;

export const FONT_SIZE_LABELS = ["Small", "Medium", "Large", "XL", "2XL"] as const;
