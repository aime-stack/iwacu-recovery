"use client";

import Header from "@/components/Header";
import HeroSky from "@/components/HeroSky";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

/**
 * DESIGN CHANGES:
 * 1. Added HeroSky background component for consistency with Programs page
 * 2. Included Header and Footer for full page layout
 * 3. Added proper z-index layering (Sky: 0, Content: 10)
 * 4. Added earth surface transition overlay at bottom (matching Programs)
 * 5. Structured layout to match Programs page exactly
 */

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background that covers entire site - matching Programs page */}
      <HeroSky />
      
      {/* Header with fixed positioning */}
      <Header />
      
      {/* Gallery Content - z-10 to appear above sky */}
      <div className="relative z-10">
        <Gallery />
      </div>

      {/* Footer */}
      <Footer />

      {/* Earth surface transition overlay - matching Programs page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.15) 20%, rgba(184, 170, 133, 0.35) 40%, rgba(139, 115, 85, 0.65) 60%, rgba(101, 67, 33, 0.85) 80%, rgba(101, 67, 33, 0.95) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </main>
  );
}