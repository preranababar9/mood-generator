'use client';

import type { VibePersonality } from '../types/personality';

interface VibeOrbProps {
  vibe: VibePersonality;
}

export default function VibeOrb({ vibe }: VibeOrbProps) {
  const [c1, , c3] = vibe.gradientColors;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full orb-ring-outer"
          style={{
            background: `radial-gradient(circle, ${c1}28 0%, transparent 70%)`,
            transform: 'scale(2.4)',
          }}
        />
        {/* Inner glow ring */}
        <div
          className="absolute inset-0 rounded-full orb-ring-inner"
          style={{
            background: `radial-gradient(circle, ${c1}50 0%, transparent 70%)`,
            transform: 'scale(1.7)',
          }}
        />

        {/* Main orb */}
        <div
          className="relative w-36 h-36 rounded-full orb-float flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${c3}, ${c1})`,
            boxShadow: `0 0 40px ${c1}70, 0 0 80px ${c1}35, 0 0 120px ${c1}15`,
          }}
        >
          <span className="text-5xl select-none">{vibe.emoji}</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Your Vibe</p>
        <h2 className="text-3xl font-bold text-white">{vibe.name}</h2>
        <p className="text-sm font-medium mt-1" style={{ color: vibe.textColor }}>
          {vibe.type}
        </p>
      </div>
    </div>
  );
}
