'use client';

import type { VibePersonality } from '../types/personality';

interface RarityBadgeProps {
  vibe: VibePersonality;
}

const RARITY_CONFIG = {
  'Ultra Rare': { icon: '★★★', glow: true },
  'Rare': { icon: '★★', glow: false },
  'Uncommon': { icon: '★', glow: false },
  'Common': { icon: '◆', glow: false },
} as const;

export default function RarityBadge({ vibe }: RarityBadgeProps) {
  const config = RARITY_CONFIG[vibe.rarityLabel];
  const [c1] = vibe.gradientColors;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold"
        style={{
          background: `${c1}15`,
          border: `1px solid ${c1}40`,
          color: vibe.textColor,
          boxShadow: config.glow ? `0 0 20px ${c1}30, 0 0 40px ${c1}15` : 'none',
        }}
      >
        {config.glow && (
          <span
            className="absolute inset-0 rounded-full animate-pulse"
            style={{ background: `${c1}08` }}
          />
        )}
        <span className="relative">{config.icon}</span>
        <span className="relative uppercase tracking-widest text-xs">
          {vibe.rarityLabel}
        </span>
      </div>
      <p className="text-white/35 text-xs text-center">
        Only{' '}
        <span className="font-bold" style={{ color: vibe.textColor }}>
          {vibe.rarityPct}%
        </span>{' '}
        of people get this vibe
      </p>
    </div>
  );
}
