'use client';

interface ColorPaletteProps {
  palette: string[];
  name: string;
}

export default function ColorPalette({ palette, name }: ColorPaletteProps) {
  return (
    <div className="w-full">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-3 text-center">Color Palette</p>
      <div className="flex gap-3 justify-center">
        {palette.map((color, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-2xl shadow-lg palette-swatch"
              style={{
                backgroundColor: color,
                boxShadow: `0 4px 20px ${color}60`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
            <span className="text-white/40 text-xs font-mono">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
