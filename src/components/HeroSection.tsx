"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden z-20">
      
      {/* Animated clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-32 h-16 bg-white/40 rounded-full blur-xl animate-float" />
        <div className="absolute top-[25%] right-[15%] w-40 h-20 bg-white/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-[60%] left-[5%] w-36 h-18 bg-white/25 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] right-[25%] w-28 h-14 bg-white/35 rounded-full blur-xl animate-float" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between min-h-screen">
          {/* Left side - Text content */}
          <div className={`flex-1 max-w-2xl pt-20 md:pt-24 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="mb-6">
              <h1 className="font-bold tracking-tight leading-tight text-white mb-4">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2" 
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Counselling
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2" 
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  and Addiction
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl" 
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  Treatment Services
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-white/90 mb-6 font-medium" 
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Hope. Healing. Renewal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/screening" 
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-center cursor-pointer animate-pulse hover:animate-none"
              >
                📋 Substance Check
              </Link>
              <a 
                href="contact" 
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 text-center cursor-pointer"
              >
                Get Help Now
              </a>
              <a 
                href="#about" 
                className="px-8 py-4 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500/50 text-center cursor-pointer"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right side - Balloons and Hands (will be handled by BalloonSection) */}
          <div className="hidden lg:block flex-1 max-w-2xl relative">
            {/* This space is reserved for the balloon section */}
          </div>
        </div>
      </div>
    </section>
  );
}