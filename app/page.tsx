'use client';

import { useEffect, useRef, useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { vibes } from '../data/personalities';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import VibeOrb from '../components/PersonalityOrb';
import TraitBars from '../components/ColorDNA';
import VibeCard from '../components/ResultCard';
import PersonalityPassport from '../components/PersonalityPassport';
import RarityBadge from '../components/RarityBadge';
import CompatibilityChecker from '../components/CompatibilityChecker';

async function downloadElementAsImage(elementId: string, filename: string) {
  const { default: html2canvas } = await import('html2canvas');
  const el = document.getElementById(elementId);
  if (!el) return;
  const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/** Floating background particles */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  color: ['#7077A1', '#FF4500', '#2E86AB', '#FF6EB4', '#F7B731', '#9B5DE5', '#22C55E'][i % 7],
  size: 3 + (i % 6) * 2.5,
  left: `${4 + (i * 4.8) % 90}%`,
  duration: `${7 + (i * 1.1) % 9}s`,
  delay: `${(i * 0.6) % 7}s`,
}));

/** Derive a short-code from quiz scores */
function buildCompatCode(vibeCode: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `VB-${vibeCode}-${rand}`;
}

export default function Home() {
  const quiz = useQuiz();
  const [exploding, setExploding] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [compatCode, setCompatCode] = useState('');
  const [activeTab, setActiveTab] = useState<'passport' | 'card' | 'compat'>('passport');
  const prevPhase = useRef(quiz.phase);

  // Trigger color explosion when quiz finishes
  useEffect(() => {
    if (prevPhase.current === 'quiz' && quiz.phase === 'result') {
      setExploding(true);
      setTimeout(() => {
        setExploding(false);
        setShowResult(true);
      }, 800);
    }
    if (quiz.phase === 'landing') {
      setShowResult(false);
      setActiveTab('passport');
    }
    prevPhase.current = quiz.phase;
  }, [quiz.phase]);

  const winnerKey = quiz.phase === 'result' || showResult ? quiz.getWinningVibe() : 'midnightMatcha';
  const vibe = vibes[winnerKey];

  // Generate a stable compat code once on result reveal
  useEffect(() => {
    if (showResult) setCompatCode(buildCompatCode(vibe.code));
  }, [showResult, vibe.code]);

  /* ─────────────────────── LANDING ─────────────────────── */
  if (quiz.phase === 'landing') {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] my-5 overflow-hidden">
        {/* Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: p.left,
              bottom: '-10px',
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: 0.35,
            }}
          />
        ))}

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs mb-8 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            7 Questions · VibeDNA
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-4">
            <span className="text-white">What</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #FF6EB4, #9B5DE5, #7077A1, #2E86AB, #F7B731, #FF6EB4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 100%',
                animation: 'bg-shimmer 4s ease infinite',
                display: 'inline-block',
              }}
            >
              Vibe
            </span>
            <br />
            <span className="text-white">Are You?</span>
          </h1>

          <p className="text-white/40 text-base mb-8 leading-relaxed">
            Discover the main character hiding inside you.
            <br />
            Get your Vibe, Passport, and Compatibility Code.
          </p>

          {/* Name input */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={quiz.userName}
              onChange={(e) => quiz.setUserName(e.target.value)}
              maxLength={20}
              className="px-5 py-3  rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-center text-sm focus:outline-none focus:border-white/30 w-56 transition-all"
            />
          </div>

          {/* CTA */}
          <button
            onClick={quiz.startQuiz}
            className="group px-10 cursor-pointer py-4 rounded-full text-black font-extrabold text-lg bg-white hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start Scan
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>

          {/* Vibe preview dots */}
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {Object.values(vibes).slice(0, 8).map((v) => (
              <span
                key={v.key}
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  borderColor: `${v.orbColor}40`,
                  color: `${v.textColor}90`,
                  backgroundColor: `${v.orbColor}08`,
                }}
              >
                {v.emoji} {v.name}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  /* ─────────────────────── QUIZ ─────────────────────── */
  if (quiz.phase === 'quiz') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] py-12 px-4">
        <div className="w-full max-w-lg mx-auto space-y-10">
          <ProgressBar
            current={quiz.currentQuestion}
            total={quiz.totalQuestions}
            color="#9B5DE5"
          />
          <QuestionCard
            key={quiz.currentQuestion}
            question={quiz.currentQuestionData}
            questionIndex={quiz.currentQuestion}
            selectedOption={quiz.selectedOption}
            onSelect={quiz.selectOption}
          />
        </div>
      </main>
    );
  }

  /* ─────────────────────── EXPLOSION TRANSITION ─────────────────────── */
  if (exploding && !showResult) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div
          className="color-explode w-40 h-40 flex items-center justify-center text-5xl"
          style={{ backgroundColor: vibe.orbColor }}
        >
          {vibe.emoji}
        </div>
      </main>
    );
  }

  /* ─────────────────────── RESULT ─────────────────────── */
  return (
    <main
      className="min-h-screen flex flex-col py-16 px-4 overflow-x-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% -10%, ${vibe.orbColor}28 0%, #0a0a0a 55%)`,
      }}
    >
      <div className="result-enter w-full max-w-2xl mx-auto space-y-10">

        {/* Orb + name */}
        <div className="flex justify-center pt-2">
          <VibeOrb vibe={vibe} />
        </div>

        {/* Tagline */}
        <div
          className="rounded-2xl px-6 py-4 text-center"
          style={{ background: `${vibe.orbColor}08`, border: `1px solid ${vibe.orbColor}20` }}
        >
          <p className="text-white/75 text-sm leading-relaxed italic">"{vibe.tagline}"</p>
        </div>

        {/* Rarity badge */}
        <RarityBadge vibe={vibe} />

        {/* Trait bars */}
        <TraitBars vibe={vibe} />

        {/* If you were... */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 text-center">
            If you were...
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(
              [
                ['☕', 'Drink', vibe.associations.drink],
                ['🏙', 'City', vibe.associations.city],
                ['🎵', 'Music', vibe.associations.music],
                ['🌦', 'Weather', vibe.associations.weather],
                ['💼', 'Job', vibe.associations.job],
                ['📱', 'Aesthetic', vibe.associations.aesthetic],
              ] as [string, string, string][]
            ).map(([icon, label, value]) => (
              <div
                key={label}
                className="px-4 py-3 rounded-2xl border text-center"
                style={{
                  borderColor: `${vibe.orbColor}22`,
                  backgroundColor: `${vibe.orbColor}07`,
                }}
              >
                <p className="text-white/35 text-xs mb-0.5">{icon} {label}</p>
                <p className="text-white font-semibold text-sm leading-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Character habits */}
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 text-center">
            You definitely...
          </p>
          <div className="space-y-2">
            {vibe.characterHabits.map((habit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl trait-chip"
                style={{
                  background: `${vibe.orbColor}08`,
                  border: `1px solid ${vibe.orbColor}18`,
                  animationDelay: `${0.1 + i * 0.07}s`,
                }}
              >
                <span style={{ color: vibe.textColor }} className="text-xs">✦</span>
                <span className="text-white/70 text-sm">{habit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs: Passport | Card | Compat */}
        <div>
          <div className="flex rounded-xl overflow-hidden border border-white/10 mb-5">
            {(
              [
                ['passport', '🪪 Passport'],
                ['card', '🃏 Card'],
                ['compat', '💞 Compatibility'],
              ] as [typeof activeTab, string][]
            ).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2.5 text-xs font-medium transition-all"
                style={{
                  background: activeTab === tab ? `${vibe.orbColor}25` : 'transparent',
                  color: activeTab === tab ? vibe.textColor : 'rgba(255,255,255,0.35)',
                  borderRight: tab !== 'compat' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'passport' && (
            <div className="space-y-4">
              <PersonalityPassport vibe={vibe} userName={quiz.userName} compatCode={compatCode} />
              <div className="flex justify-center">
                <button
                  onClick={() => downloadElementAsImage('vibe-passport', `vibedna-passport-${vibe.code}.png`)}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{ background: `${vibe.orbColor}25`, color: vibe.textColor, border: `1px solid ${vibe.orbColor}40` }}
                >
                  ↓ Download Passport
                </button>
              </div>
            </div>
          )}
          {activeTab === 'card' && (
            <div className="flex flex-col items-center gap-4">
              <VibeCard vibe={vibe} userName={quiz.userName} compatCode={compatCode} />
              <button
                onClick={() => downloadElementAsImage('vibe-card', `vibedna-card-${vibe.code}.png`)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                style={{ background: `${vibe.orbColor}25`, color: vibe.textColor, border: `1px solid ${vibe.orbColor}40` }}
              >
                ↓ Download Card
              </button>
            </div>
          )}
          {activeTab === 'compat' && (
            <CompatibilityChecker myVibe={vibe} myCode={compatCode} />
          )}
        </div>

        {/* Restart */}
        <div className="flex justify-center pb-8">
          <button
            onClick={quiz.restart}
            className="px-8 py-3 rounded-full border border-white/15 text-white/50 text-sm hover:border-white/30 hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            ↺ Take Again
          </button>
        </div>

      </div>
    </main>
  );
}
