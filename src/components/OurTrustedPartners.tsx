"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { name: "Embassy of Pakistan in Rwanda", logo: "/partners/pakistan-embassy.png" },
  { name: "LiveWell Rwanda", logo: "/partners/livewell.png" },
  { name: "Ubuntu Wellness", logo: "/partners/ubuntu-wellness.png" },
  { name: "Ministry of Health Rwanda", logo: "/partners/moh-rwanda.png" },
  { name: "Rwanda Biomedical Centre", logo: "/partners/rbc.png" },
  { name: "National Rehabilitation Service", logo: "/partners/nrs.png" },
  { name: "Rwanda Forensic Institute", logo: "/partners/forensic.png" },
  { name: "Colgate Rwanda", logo: "/partners/colgate.png" },
  { name: "Shema Clinic", logo: "/partners/shema.png" },
  { name: "SGC Foundation", logo: "/partners/sgc-foundation.png" },
];

export default function OurTrustedPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      </div>

      <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm py-8 rounded-2xl">
        <div className="flex animate-scroll">
          {partners.concat(partners).concat(partners).map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
              style={{ minWidth: "150px", maxWidth: "200px" }}
            >
              <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-24 flex items-center justify-center relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={60}
                  style={{ width: "auto", height: "auto", maxWidth: "150px", maxHeight: "60px" }}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
