'use client';

import type { Question } from '../types/personality';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

export default function QuestionCard({
  question,
  questionIndex,
  selectedOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <div key={questionIndex} className="question-card w-full max-w-lg mx-auto px-4">
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-3">
          Question {questionIndex + 1}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-white/40 text-base mt-2">{question.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const isDimmed = selectedOption !== null && selectedOption !== i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={selectedOption !== null}
              className="option-card group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer disabled:cursor-default"
              style={{
                backgroundColor: isSelected ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                borderColor: isSelected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)',
                opacity: isDimmed ? 0.35 : 1,
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <span className="text-3xl shrink-0 transition-transform duration-200 group-hover:scale-110">
                {option.emoji}
              </span>
              <span className="text-white font-medium text-base">{option.text}</span>
              {isSelected && (
                <span className="ml-auto text-white/70 text-lg">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
