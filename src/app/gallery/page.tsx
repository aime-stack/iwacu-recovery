"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * FIXED: Dynamically import HeroSky with ssr: false to prevent R3F prerender errors
 * The Gallery component doesn't use R3F, so it can be imported normally
 */

// Import Gallery normally (no R3F hooks)
import Gallery from "@/components/Gallery";

// Dynamically import HeroSky with SSR disabled (uses R3F hooks)
const HeroSky = dynamic(() => import("@/components/HeroSky"), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-200 z-0" />
  )
});

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