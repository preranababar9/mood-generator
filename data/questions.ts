import type { Question } from '../types/personality';

export const questions: Question[] = [
  {
    id: 1,
    question: 'You accidentally become invisible for one day.',
    subtitle: 'What do you do?',
    options: [
      { emoji: '🗺', text: 'Explore secret places', scores: { midnightMatcha: 2, timeWalker: 1 } },
      { emoji: '👻', text: 'Scare my friends', scores: { neonRebel: 2, chaosCEO: 1 } },
      { emoji: '😴', text: 'Sleep, obviously', scores: { oceanPoet: 2, pinkChaos: 1 } },
      { emoji: '👁', text: 'Silently observe people', scores: { silentThunder: 2, timeWalker: 1 } },
    ],
  },
  {
    id: 2,
    question: 'Your life suddenly becomes a movie.',
    subtitle: 'Which soundtrack starts playing?',
    options: [
      { emoji: '🎼', text: 'Dramatic orchestra', scores: { velvetDreamer: 2, timeWalker: 1 } },
      { emoji: '🎸', text: 'Melancholic indie', scores: { oceanPoet: 2, midnightMatcha: 1 } },
      { emoji: '🎤', text: 'Banger pop anthem', scores: { pinkChaos: 2, goldenNomad: 1 } },
      { emoji: '🎷', text: 'Cool jazz', scores: { silentThunder: 2, cloudWalker: 1 } },
    ],
  },
  {
    id: 3,
    question: "You discover a mysterious door that wasn't there yesterday.",
    subtitle: 'You...',
    options: [
      { emoji: '🚪', text: 'Open it immediately', scores: { neonRebel: 2, chaosCEO: 1 } },
      { emoji: '🔍', text: 'Research it for weeks first', scores: { cloudWalker: 2, silentThunder: 1 } },
      { emoji: '🚶', text: 'Walk past it, not my problem', scores: { pinkChaos: 2, goldenNomad: 1 } },
      { emoji: '👥', text: 'Gather friends before opening', scores: { goldenNomad: 2, pinkChaos: 1 } },
    ],
  },
  {
    id: 4,
    question: "It's 2 AM and you can't sleep.",
    subtitle: 'What are you actually doing?',
    options: [
      { emoji: '📱', text: 'Scrolling philosophy content', scores: { cloudWalker: 2, timeWalker: 1 } },
      { emoji: '✍️', text: 'Manifesting my dream life', scores: { midnightMatcha: 2, velvetDreamer: 1 } },
      { emoji: '💬', text: 'Texting random people', scores: { pinkChaos: 2, chaosCEO: 1 } },
      { emoji: '🌙', text: 'Staring at the ceiling thinking', scores: { oceanPoet: 2, midnightMatcha: 1 } },
    ],
  },
  {
    id: 5,
    question: 'The best Friday night ever looks like...',
    options: [
      { emoji: '🌃', text: 'Exploring the city alone at night', scores: { midnightMatcha: 2, velvetDreamer: 1 } },
      { emoji: '🎉', text: 'House party, everyone invited', scores: { pinkChaos: 2, neonRebel: 1 } },
      { emoji: '🎬', text: 'Movie marathon with comfort food', scores: { oceanPoet: 2, silentThunder: 1 } },
      { emoji: '🚗', text: 'Spontaneous road trip with 20 min notice', scores: { goldenNomad: 2, neonRebel: 1 } },
    ],
  },
  {
    id: 6,
    question: 'You wake up with a random superpower.',
    subtitle: 'You immediately...',
    options: [
      { emoji: '🌀', text: 'Travel through alternate dimensions', scores: { timeWalker: 3, cloudWalker: 1 } },
      { emoji: '🎭', text: 'Use it to prank everyone', scores: { neonRebel: 2, pinkChaos: 1 } },
      { emoji: '💚', text: 'Heal people and fix problems', scores: { oceanPoet: 2, goldenNomad: 1 } },
      { emoji: '⚡', text: 'Build the most powerful thing ever', scores: { chaosCEO: 3, neonRebel: 1 } },
    ],
  },
  {
    id: 7,
    question: "Your room's energy is best described as...",
    options: [
      { emoji: '🕯', text: 'Dark, moody, candles everywhere', scores: { velvetDreamer: 2, midnightMatcha: 1 } },
      { emoji: '🏠', text: 'Perfectly minimalist, intentional', scores: { silentThunder: 2, cloudWalker: 1 } },
      { emoji: '🎨', text: 'Absolute beautiful chaos', scores: { pinkChaos: 2, neonRebel: 1 } },
      { emoji: '🌿', text: 'Plants, sunlight, cozy vibes', scores: { goldenNomad: 2, oceanPoet: 1 } },
    ],
  },
];
