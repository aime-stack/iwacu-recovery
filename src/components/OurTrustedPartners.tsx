"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Partner {
  name: string;
  logo: string;
  website: string;
}

const partners: Partner[] = [
  { 
    name: "Embassy of Pakistan in Rwanda", 
    logo: "/partners/pakistan-embassy.png",
    website: "https://www.mofa.gov.pk/rwanda/"
  },
  { 
    name: "LiveWell Rwanda", 
    logo: "/partners/livewell.png",
    website: "https://livewellrwanda.org/"
  },
  { 
    name: "Ubuntu Wellness", 
    logo: "/partners/ubuntu-wellness.png",
    website: "https://ubuntuwellness.rw/"
  },
  { 
    name: "Ministry of Health Rwanda", 
    logo: "/partners/moh-rwanda.png",
    website: "https://www.moh.gov.rw/"
  },
  { 
    name: "Rwanda Biomedical Centre", 
    logo: "/partners/rbc.png",
    website: "https://www.rbc.gov.rw/"
  },
  { 
    name: "National Rehabilitation Service", 
    logo: "/partners/nrs.png",
    website: "https://nrs.gov.rw/"
  },
  { 
    name: "Rwanda Forensic Institute", 
    logo: "/partners/forensic.png",
    website: "https://rfi.gov.rw/"
  },
  { 
    name: "Colgate Rwanda", 
    logo: "/partners/colgate.png",
    website: "https://www.colgate.com/"
  },
  { 
    name: "Shema Clinic", 
    logo: "/partners/shema.png",
    website: "https://shemaclinic.rw/"
  },
  { 
    name: "SGC Foundation", 
    logo: "/partners/sgc-foundation.png",
    website: "https://sgcfoundation.org/"
  },
  { 
    name: "Baho Family Organisation", 
    logo: "/partners/baho-family.png",
    website: "https://bahofamily.org/"
  },
  { 
    name: "Good People International", 
    logo: "/partners/good-people-international.png",
    website: "https://goodpeopleinternational.org/"
  },
];

export default function OurTrustedPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Touch state for swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
    }
  };

  // Create enough duplicates for seamless infinite scroll (desktop only)
  const duplicatedPartners = [...partners, ...partners];

  // Calculate visible partners for mobile (show 3 at a time)
  const getVisiblePartners = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % partners.length;
      visible.push({ ...partners[index], displayIndex: i });
    }
    return visible;
  };

  return (
    <div
      ref={sectionRef}
      className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="text-center mb-8">
        <h3
          className="text-2xl md:text-3xl font-bold text-white mb-2"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
        >
          Our Trusted Partners
        </h3>
        <p className="text-white/80" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          Working together to transform lives
        </p>
        <p className="text-sm text-white/60 mt-2 md:hidden" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
          👆 Swipe to see more partners
        </p>
      </div>

      {/* Desktop View - Infinite Auto-Scroll */}
      <div className="hidden md:block relative overflow-hidden bg-white/5 backdrop-blur-sm py-8 rounded-2xl">
        <div className="flex animate-scroll-seamless">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-6 md:mx-8 flex items-center justify-center"
              style={{ width: "180px" }}
            >
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 w-full h-24 flex items-center justify-center relative hover:scale-105 transform"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={60}
                  style={{ width: "auto", height: "auto", maxWidth: "150px", maxHeight: "60px" }}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-center"><p class="text-xs font-semibold text-gray-700">${partner.name}</p></div>`;
                    }
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-xs font-semibold text-blue-600">Visit Website</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View - Swipeable Carousel */}
      <div 
        className="md:hidden relative bg-white/5 backdrop-blur-sm py-8 px-4 rounded-2xl overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex gap-4 justify-center items-center">
          {getVisiblePartners().map((partner, idx) => (
            <div
              key={`${partner.name}-mobile-${idx}`}
              className={`flex-shrink-0 transition-all duration-500 ${
                idx === 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
              }`}
              style={{ width: idx === 1 ? "140px" : "100px" }}
            >
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-3 shadow-lg active:shadow-xl transition-all duration-300 w-full flex items-center justify-center relative active:scale-95"
                style={{ height: idx === 1 ? "100px" : "80px" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={50}
                  style={{ 
                    width: "auto", 
                    height: "auto", 
                    maxWidth: idx === 1 ? "120px" : "80px", 
                    maxHeight: idx === 1 ? "50px" : "40px" 
                  }}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-center"><p class="text-xs font-semibold text-gray-700">${partner.name}</p></div>`;
                    }
                  }}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Partner name display */}
        <div className="text-center mt-4">
          <p className="text-sm font-semibold text-white/90" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
            {partners[(currentIndex + 1) % partners.length].name}
          </p>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx 
                  ? 'w-8 h-2.5 bg-white' 
                  : 'w-2.5 h-2.5 bg-white/40'
              }`}
              aria-label={`Go to partner ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-seamless {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-seamless {
          animation: scroll-seamless 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll-seamless:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}