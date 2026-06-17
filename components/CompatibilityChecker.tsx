'use client';

import { useState } from 'react';
import type { VibePersonality } from '../types/personality';
import { vibes, getCompatibility } from '../data/personalities';

interface CompatibilityCheckerProps {
  myVibe: VibePersonality;
  myCode: string;
}

function getCompatMessage(pct: number): string {
  if (pct >= 90) return "You'd take over the world together. Terrifyingly in sync.";
  if (pct >= 80) return "You'd survive any road trip and make incredible creative partners.";
  if (pct >= 70) return "Different energies, but that's exactly why it works.";
  if (pct >= 60) return "You'd push each other to grow in ways neither expected.";
  return "Opposites in the most entertaining way. You'd argue about everything and both be right.";
}

function decodeCode(input: string): string | null {
  // Format: VB-XX-NNNN or XX-NNNN
  const clean = input.trim().toUpperCase().replace(/\s/g, '');
  // Try VB-XX-NNNN
  const full = clean.match(/^VB-([A-Z]{2})-\d{4}$/);
  if (full) return full[1];
  // Try XX-NNNN
  const short = clean.match(/^([A-Z]{2})-\d{4}$/);
  if (short) return short[1];
  return null;
}

const VIBE_CODE_MAP: Record<string, string> = Object.fromEntries(
  Object.values(vibes).map((v) => [v.code, v.key])
);

export default function CompatibilityChecker({ myVibe, myCode }: CompatibilityCheckerProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ pct: number; friendVibe: VibePersonality } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function check() {
    const vibeCode = decodeCode(input);
    if (!vibeCode) {
      setError('Invalid code. Try something like VB-MM-4832');
      setResult(null);
      return;
    }
    const friendKey = VIBE_CODE_MAP[vibeCode];
    if (!friendKey) {
      setError('Unknown vibe code.');
      setResult(null);
      return;
    }
    const pct = getCompatibility(myVibe.code, vibeCode);
    setResult({ pct, friendVibe: vibes[friendKey] });
    setError('');
    setInput('');
  }

  function copyCode() {
    navigator.clipboard.writeText(myCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const [c1] = myVibe.gradientColors;

  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{
        background: `${c1}08`,
        border: `1px solid ${c1}20`,
      }}
    >
      <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
        Friend Compatibility
      </p>

      {/* My code */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex-1 px-3 py-2 rounded-xl font-mono text-sm text-center"
          style={{ background: `${c1}15`, border: `1px solid ${c1}30`, color: myVibe.textColor }}
        >
          {myCode}
        </div>
        <button
          onClick={copyCode}
          className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
          style={{
            background: copied ? `${c1}30` : `${c1}15`,
            border: `1px solid ${c1}30`,
            color: myVibe.textColor,
          }}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <p className="text-white/25 text-xs text-center mb-4">
        Share your code with a friend, then enter theirs below
      </p>

      {/* Friend code input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter friend's code…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-white/25 font-mono"
        />
        <button
          onClick={check}
          className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
          style={{ background: myVibe.orbColor, color: '#000' }}
        >
          Check
        </button>
      </div>

      {error && <p className="text-red-400/80 text-xs mt-2 text-center">{error}</p>}

      {/* Compatibility result */}
      {result && (
        <div
          className="mt-4 rounded-xl p-4 text-center"
          style={{ background: `${c1}10`, border: `1px solid ${c1}25` }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl">{myVibe.emoji}</span>
            <div
              className="text-3xl font-extrabold"
              style={{ color: result.pct >= 75 ? myVibe.textColor : 'rgba(255,255,255,0.7)' }}
            >
              {result.pct}%
            </div>
            <span className="text-2xl">{result.friendVibe.emoji}</span>
          </div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
            Compatible
          </p>
          <p className="text-white/50 text-xs leading-relaxed">
            {getCompatMessage(result.pct)}
          </p>
          <p className="text-white/25 text-[10px] mt-2">
            {myVibe.name} × {result.friendVibe.name}
          </p>
        </div>
      )}
    </div>
  );
}
