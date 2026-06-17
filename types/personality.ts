export type VibeKey =
  | 'midnightMatcha'
  | 'neonRebel'
  | 'oceanPoet'
  | 'cloudWalker'
  | 'pinkChaos'
  | 'velvetDreamer'
  | 'silentThunder'
  | 'goldenNomad'
  | 'timeWalker'
  | 'chaosCEO';

export type VibeScores = Record<VibeKey, number>;

export interface QuizOption {
  emoji: string;
  text: string;
  scores: Partial<VibeScores>;
}

export interface Question {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface VibeTraits {
  dreamer: number;
  introvert: number;
  creative: number;
  chaos: number;
}

export interface VibeAssociations {
  drink: string;
  city: string;
  music: string;
  weather: string;
  job: string;
  aesthetic: string;
}

export type RarityLabel = 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare';

export interface VibePersonality {
  key: VibeKey;
  emoji: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  characterHabits: string[];
  traits: VibeTraits;
  associations: VibeAssociations;
  palette: string[];
  gradientColors: [string, string, string];
  orbColor: string;
  textColor: string;
  /** 0–100: shown as "Only X% of people are this vibe" */
  rarityPct: number;
  rarityLabel: RarityLabel;
  isRare: boolean;
  /** Short 2-char code used in compatibility codes, e.g. "MM" */
  code: string;
  /** Energy / social / chaos meter values 0-100 */
  meters: { energy: number; social: number; chaos: number };
}
