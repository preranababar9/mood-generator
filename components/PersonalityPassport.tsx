'use client';

import { useEffect, useState } from 'react';
import type { VibePersonality } from '../types/personality';

interface PassportProps {
  vibe: VibePersonality;
  userName: string;
  compatCode: string;
}

function MeterRow({ label, value, color }: { label: string; value: number; color: string }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/40 text-xs w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${value}%` : '0%', backgroundColor: color }}
        />
      </div>
      <span className="text-white/40 text-xs w-8 text-right font-mono shrink-0">{value}%</span>
    </div>
  );
}

export default function PersonalityPassport({ vibe, userName, compatCode }: PassportProps) {
  const [c1, c2] = vibe.gradientColors;
  const displayName = userName.trim() || 'UNKNOWN';
  const issueDate = new Date().toISOString().split('T')[0];

  return (
    <div
      id="vibe-passport"
      className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0e0e0e 0%, #161616 100%)',
        border: `1px solid ${c1}30`,
        boxShadow: `0 0 40px ${c1}12`,
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: `linear-gradient(90deg, ${c1}30, ${c2}15)`, borderBottom: `1px solid ${c1}25` }}
      >
        <div>
          <p className="text-white/60 text-[10px] uppercase tracking-[0.25em]">VibeDNA</p>
          <p className="text-white font-bold text-sm tracking-widest">VIBE PASSPORT</p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: `linear-gradient(135deg, ${c1}40, ${c2}20)` }}
        >
          {vibe.emoji}
        </div>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Identity block */}
        <div className="flex items-start gap-4">
          {/* Photo placeholder */}
          <div
            className="w-16 h-20 rounded-lg shrink-0 flex items-center justify-center text-3xl"
            style={{
              background: `linear-gradient(135deg, ${c1}25, ${c2}12)`,
              border: `1px solid ${c1}30`,
            }}
          >
            {vibe.emoji}
          </div>
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">Name</p>
            <p className="text-white font-bold text-lg leading-none mb-2">{displayName.toUpperCase()}</p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-0.5">Vibe Identity</p>
            <p className="font-semibold text-sm" style={{ color: vibe.textColor }}>{vibe.name}</p>
            <p className="text-white/40 text-xs">{vibe.type}</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, ${c1}30, transparent)` }} />

        {/* Meters */}
        <div className="space-y-3">
          <MeterRow label="Energy Level" value={vibe.meters.energy} color={vibe.orbColor} />
          <MeterRow label="Social Battery" value={vibe.meters.social} color={vibe.orbColor} />
          <MeterRow label="Chaos Level" value={vibe.meters.chaos} color={vibe.orbColor} />
        </div>

        {/* Separator */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, ${c1}30, transparent)` }} />

        {/* Footer meta */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/25 text-[9px] uppercase tracking-widest">Issued</p>
            <p className="text-white/50 text-xs font-mono">{issueDate}</p>
          </div>
          <div className="text-right">
            <p className="text-white/25 text-[9px] uppercase tracking-widest">Code</p>
            <p className="font-mono text-xs" style={{ color: vibe.textColor }}>{compatCode}</p>
          </div>
          {!vibe.isRare && (
            <div className="text-right">
              <p className="text-white/25 text-[9px] uppercase tracking-widest">Rarity</p>
              <p className="text-white/50 text-xs">{vibe.rarityLabel}</p>
            </div>
          )}
          {vibe.isRare && (
            <div
              className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: `${c1}25`, color: vibe.textColor, border: `1px solid ${c1}40` }}
            >
              ★ {vibe.rarityLabel}
            </div>
          )}
        </div>

        {/* Machine-readable line */}
        <div
          className="font-mono text-[8px] text-white/15 tracking-widest border-t border-white/8 pt-3 overflow-hidden"
          style={{ letterSpacing: '0.1em' }}
        >
          VIBEDNA&lt;&lt;{displayName.replace(/ /g, '<').toUpperCase()}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          &lt;{compatCode.replace('-', '')}&lt;&lt;{vibe.code}&lt;&lt;{issueDate.replace(/-/g, '')}
        </div>
      </div>
    </div>
  );
}
