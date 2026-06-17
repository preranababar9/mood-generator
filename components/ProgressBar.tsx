'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  color: string;
}

export default function ProgressBar({ current, total, color }: ProgressBarProps) {
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto px-6">
      <div className="flex justify-between text-sm text-white/50 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex gap-2 mt-3 justify-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= current ? color : 'rgba(255,255,255,0.15)',
              transform: i === current ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
