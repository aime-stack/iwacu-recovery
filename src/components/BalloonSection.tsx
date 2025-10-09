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
