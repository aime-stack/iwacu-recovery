"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex: number) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex: number) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image Carousel - Shows on mobile, behind content */}
      <div className="absolute inset-0 lg:hidden">
        {carouselImages.map((image, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Animated clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-[15%] left-[10%] w-32 h-16 bg-white/40 rounded-full blur-xl animate-float" />
        <div className="absolute top-[25%] right-[15%] w-40 h-20 bg-white/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-[60%] left-[5%] w-36 h-18 bg-white/25 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] right-[25%] w-28 h-14 bg-white/35 rounded-full blur-xl animate-float" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between min-h-screen gap-8">
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
                📋 Substance Check/Audit
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

          {/* Right side - Image Carousel (Desktop only) */}
          <div className={`hidden lg:block flex-1 max-w-xl transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
              {/* Carousel Images */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Counseling and addiction treatment services - Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 1024px) 0vw, 50vw"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      index === currentImageIndex
                        ? 'bg-white w-8 h-3'
                        : 'bg-white/50 hover:bg-white/80 w-3 h-3'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}