"use client";

import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// Dynamically import HeroSky with no SSR
const HeroSky = dynamic(() => import("./HeroSky"), {
  ssr: false,
  loading: () => (
    <div 
      className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-200" 
      style={{ zIndex: 0 }}
    />
  ),
});

export default function HeroSkyWrapper() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 8], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <HeroSky />
        </Suspense>
      </Canvas>
    </div>
  );
}