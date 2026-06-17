'use client';

import { useState, useCallback } from 'react';
import type { VibeScores, VibeKey } from '../types/personality';
import { questions } from '../data/questions';

const ALL_VIBE_KEYS: VibeKey[] = [
  'midnightMatcha', 'neonRebel', 'oceanPoet', 'cloudWalker', 'pinkChaos',
  'velvetDreamer', 'silentThunder', 'goldenNomad', 'timeWalker', 'chaosCEO',
];

const INITIAL_SCORES: VibeScores = Object.fromEntries(
  ALL_VIBE_KEYS.map((k) => [k, 0]),
) as VibeScores;

export type QuizPhase = 'landing' | 'quiz' | 'result';

export function useQuiz() {
  const [phase, setPhase] = useState<QuizPhase>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<VibeScores>({ ...INITIAL_SCORES });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userName, setUserName] = useState('');

  const startQuiz = useCallback(() => {
    setPhase('quiz');
    setCurrentQuestion(0);
    setScores({ ...INITIAL_SCORES });
    setSelectedOption(null);
  }, []);

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(optionIndex);

      const option = questions[currentQuestion].options[optionIndex];
      const next = { ...scores };
      for (const [vibe, pts] of Object.entries(option.scores)) {
        next[vibe as VibeKey] = (next[vibe as VibeKey] ?? 0) + (pts ?? 0);
      }
      setScores(next);

      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((q) => q + 1);
          setSelectedOption(null);
        } else {
          setPhase('result');
        }
      }, 700);
    },
    [currentQuestion, scores, selectedOption],
  );

  /** Rare vibes override the normal winner if their score hits threshold */
  const getWinningVibe = useCallback((): VibeKey => {
    if (scores.timeWalker >= 5) return 'timeWalker';
    if (scores.chaosCEO >= 5) return 'chaosCEO';
    return (Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]) as VibeKey;
  }, [scores]);

  const restart = useCallback(() => {
    setPhase('landing');
    setCurrentQuestion(0);
    setScores({ ...INITIAL_SCORES });
    setSelectedOption(null);
  }, []);

  return {
    phase,
    currentQuestion,
    scores,
    selectedOption,
    userName,
    setUserName,
    totalQuestions: questions.length,
    currentQuestionData: questions[currentQuestion],
    startQuiz,
    selectOption,
    getWinningVibe,
    restart,
  };
}
