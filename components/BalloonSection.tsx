"use client";

export default function BalloonSection() {
  return (
    <div className="hidden lg:block absolute inset-0 pointer-events-none">
      {/* 2D Sun behind everything */}
      <div className="absolute top-[10%] right-[15%] w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-2xl">
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-16 bg-gradient-to-b from-yellow-200 to-transparent origin-top"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                animation: `pulse 3s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle glow behind hands and balloons */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-30">
        <div className="w-full h-full rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* Hands - positioned at bottom center-right */}
      <div className="absolute bottom-0 right-1/4 w-80 h-60">
        <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-xl">
          {/* Left Hand */}
          <g className="animate-float" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <path d="M80 280 Q70 250, 75 220 L85 210 Q90 200, 95 210 L100 230" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M85 210 Q80 180, 85 160 L95 150 Q100 145, 103 155 L100 180" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M95 150 Q92 125, 97 105 L105 95 Q110 90, 113 100 L108 125" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M105 95 Q105 75, 112 58 L120 50 Q125 47, 127 57 L120 80" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M120 50 Q125 35, 135 25 L145 22 Q150 22, 150 32 L143 50" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M75 220 Q65 240, 70 270 Q75 285, 95 290 Q120 293, 140 285 L150 200 Q145 180, 135 170 L120 50 Q115 40, 105 45 L75 220 Z" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
          </g>

          {/* Right Hand */}
          <g className="animate-float" style={{ animationDelay: '1s', animationDuration: '3s' }}>
            <path d="M320 280 Q330 250, 325 220 L315 210 Q310 200, 305 210 L300 230" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M315 210 Q320 180, 315 160 L305 150 Q300 145, 297 155 L300 180" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M305 150 Q308 125, 303 105 L295 95 Q290 90, 287 100 L292 125" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M295 95 Q295 75, 288 58 L280 50 Q275 47, 273 57 L280 80" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M280 50 Q275 35, 265 25 L255 22 Q250 22, 250 32 L257 50" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
            <path d="M325 220 Q335 240, 330 270 Q325 285, 305 290 Q280 293, 260 285 L250 200 Q255 180, 265 170 L280 50 Q285 40, 295 45 L325 220 Z" fill="#F4A89F" stroke="#E89080" strokeWidth="2"/>
          </g>

          {/* String knot - where all strings converge */}
          <circle cx="200" cy="200" r="6" fill="#6B5847"/>
        </svg>
      </div>

      {/* Dove */}
      <div className="absolute top-[15%] right-[8%] animate-float">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="drop-shadow-lg">
          <path d="M12 25 Q16 20, 25 25 Q34 20, 38 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9"/>
          <path d="M25 25 Q28 22, 30 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
        </svg>
      </div>
    </div>
  );
}
