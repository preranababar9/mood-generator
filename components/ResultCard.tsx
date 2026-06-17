'use client';

import type { VibePersonality } from '../types/personality';

interface VibeCardProps {
  vibe: VibePersonality;
  userName: string;
  compatCode: string;
}

export default function VibeCard({ vibe, userName, compatCode }: VibeCardProps) {
  const [c1, c2] = vibe.gradientColors;
  const displayName = userName.trim() || 'You';

  return (
    <div
      id="vibe-card"
      className="relative w-72 rounded-3xl overflow-hidden p-6 text-white select-none"
      style={{
        background: 'linear-gradient(145deg, #111111 0%, #1a1a1a 100%)',
        border: `1px solid ${c1}35`,
        boxShadow: `0 0 60px ${c1}18, 0 20px 60px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, ${c1}, ${c2}, ${vibe.gradientColors[2]})` }}
      />

      {/* App label */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">VibeDNA</p>
          <p className="text-white/50 text-[10px] tracking-widest">What Vibe Are You?</p>
        </div>
        <div
          className="w-9 h-9 rounded-2xl flex items-center justify-center text-xl"
          style={{ background: `linear-gradient(135deg, ${c1}40, ${c2}20)`, border: `1px solid ${c1}30` }}
        >
          {vibe.emoji}
        </div>
      </div>

      {/* Name */}
      <p className="text-3xl font-extrabold text-white tracking-tight mb-1">{displayName}</p>
      <p className="text-white/30 text-xs mb-5">YOUR VIBE IDENTITY</p>

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${c1}40, transparent)` }} />

      {/* Vibe name */}
      <div className="mb-4">
        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5">Vibe</p>
        <p className="font-bold text-xl" style={{ color: vibe.textColor }}>{vibe.name}</p>
        <p className="text-white/40 text-xs">{vibe.type}</p>
      </div>

      {/* Trait meters */}
      <div className="space-y-2 mb-5">
        {[
          ['Dreamer', vibe.traits.dreamer],
          ['Creative', vibe.traits.creative],
          ['Chaos', vibe.traits.chaos],
        ].map(([label, val]) => (
          <div key={label as string} className="flex items-center gap-2">
            <span className="text-white/35 text-[10px] w-14 shrink-0">{label as string}</span>
            <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${val}%`,
                  background: `linear-gradient(90deg, ${c1}, ${vibe.gradientColors[2]})`,
                }}
              />
            </div>
            <span className="text-white/35 text-[10px] w-6 text-right font-mono">{val}%</span>
          </div>
        ))}
      </div>

      {/* If you were */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {[
          ['☕', vibe.associations.drink],
          ['🏙', vibe.associations.city],
          ['🎵', vibe.associations.music],
          ['🌦', vibe.associations.weather],
        ].map(([icon, val]) => (
          <div
            key={val as string}
            className="px-2 py-1.5 rounded-xl"
            style={{ backgroundColor: `${c1}10`, border: `1px solid ${c1}20` }}
          >
            <p className="text-[9px] text-white/30 uppercase tracking-widest">{icon as string}</p>
            <p className="text-white/70 text-[11px] font-medium truncate">{val as string}</p>
          </div>
        ))}
      </div>

      {/* Rarity badge */}
      {vibe.isRare && (
        <div
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-bold"
          style={{ background: `${c1}20`, border: `1px solid ${c1}50`, color: vibe.textColor }}
        >
          ★ {vibe.rarityLabel.toUpperCase()} · {vibe.rarityPct}% of people
        </div>
      )}

      {/* Footer */}
      <div className="flex items-end justify-between pt-3 border-t border-white/8">
        <div>
          <p className="text-white/20 text-[9px] uppercase tracking-widest">Code</p>
          <p className="text-white/40 text-[10px] font-mono">{compatCode}</p>
        </div>
        <p className="text-white/20 text-[9px]">VibeDNA ✦ 2026</p>
      </div>
    </div>
  );
}
