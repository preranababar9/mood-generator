'use client';

import { useEffect, useState } from 'react';
import type { VibePersonality } from '../types/personality';

interface TraitBarsProps {
  vibe: VibePersonality;
}

const TRAIT_LABELS: Record<string, string> = {
  dreamer: 'Dreamer',
  introvert: 'Introvert',
  creative: 'Creative',
  chaos: 'Chaos',
};

export default function TraitBars({ vibe }: TraitBarsProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const traits = Object.entries(vibe.traits) as [string, number][];

  return (
    <div className="w-full">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
        Trait Breakdown
      </p>
      <div className="space-y-4">
        {traits.map(([key, value], i) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-white/50 text-xs w-20 text-right shrink-0">
              {TRAIT_LABELS[key] ?? key}
            </span>
            <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${value}%` : '0%',
                  background: `linear-gradient(90deg, ${vibe.gradientColors[0]}, ${vibe.gradientColors[2]})`,
                  transitionDelay: `${i * 120}ms`,
                  boxShadow: `0 0 6px ${vibe.orbColor}60`,
                }}
              />
            </div>
            <span className="text-white/50 text-xs w-8 shrink-0 font-mono">
              {value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
