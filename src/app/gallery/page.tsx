"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import HeroSkyWrapper from "@/components/HeroSkyWrapper";

/**
 * FIXED: Using HeroSkyWrapper that properly handles Canvas and dynamic import
 * This prevents R3F hooks from being called during SSR
 */

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background using the wrapper */}
      <HeroSkyWrapper />

      {/* Header with fixed positioning */}
      <Header />

      {/* Gallery Content - z-10 to appear above sky */}
      <div className="relative z-10">
        <Gallery />
      </div>

      {/* Footer */}
      <Footer />

      {/* Earth surface transition overlay */}
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