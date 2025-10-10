"use client";

import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const HeroSky = dynamic(() => import('./HeroSky'), { 
  ssr: false,
  loading: () => null,
});

export default function HeroSkyWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <div className="absolute top-0 left-0 h-[100svh] w-full" style={{ position: "fixed", zIndex: 0 }} />
    );
  }

  return (
    <div className="absolute top-0 left-0 h-[100svh] w-full" style={{ position: "fixed", zIndex: 0 }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <HeroSky />
      </Canvas>
    </div>
  );
}