// src/components/SponsorSection.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useDonation } from "../contexts/DonationContext";

interface Victim {
  id: number;
  name: string;
  age: number;
  story: string;
  photo: string;
  needs: string;
  amount: number;
  progress: number;
}

export default function SponsorSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openDonationModal } = useDonation();

  // Intersection Observer for animations
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, []);

  // Static data
  const cardBackgrounds = useMemo(
    () => ["bg-blue-900/60", "bg-purple-900/60", "bg-pink-900/60", "bg-green-900/60", "bg-indigo-900/60", "bg-teal-900/60"],
    []
  );

  const victims: Victim[] = useMemo(
    () => [
      {
        id: 1,
        name: "Jean Paul",
        age: 28,
        story:
          "I lost everything to alcohol addiction - my job, family, and home. With your support, I can rebuild my life and help others on their recovery journey.",
        photo: "👨‍💼",
        needs: "Rehabilitation program, counseling sessions, job training",
        amount: 650,
        progress: 65,
      },
      {
        id: 2,
        name: "Marie Claire",
        age: 24,
        story:
          "Drug addiction took away my dreams of becoming a nurse. I'm determined to recover and pursue my passion for helping others heal.",
        photo: "👩‍⚕️",
        needs: "Medical treatment, therapy, education support",
        amount: 650,
        progress: 40,
      },
      {
        id: 3,
        name: "Emmanuel",
        age: 32,
        story:
          "After 10 years of substance abuse, I found hope at Iwacu Recovery Centre. Your sponsorship can help me complete my recovery and start a new chapter.",
        photo: "👨‍🔧",
        needs: "Extended treatment, family counseling, vocational training",
        amount: 650,
        progress: 80,
      },
      {
        id: 4,
        name: "Aline",
        age: 27,
        story:
          "My family and I suffered greatly due to my addiction. I am committed to recovery and want to inspire others to seek help.",
        photo: "👩‍🎓",
        needs: "Family therapy, relapse prevention, education support",
        amount: 650,
        progress: 55,
      },
    ],
    []
  );

  const currentVictim = victims[currentIndex];

  // Navigation callbacks
  const prevVictim = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? victims.length - 1 : prev - 1));
  }, [victims.length]);

  const nextVictim = useCallback(() => {
    setCurrentIndex((prev) => (prev === victims.length - 1 ? 0 : prev + 1));
  }, [victims.length]);

  return (
    <section id="sponsor" ref={sectionRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2
            className={`text-2xl md:text-4xl font-bold tracking-tight text-white mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Give Hope to a Life in Need
          </h2>
          <p
            className={`text-base md:text-lg text-white/90 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            Your support brings light to those in darkness; helping addicted individuals find healing and giving children at Iwacu Recovery Christian School a chance to learn, grow, and dream again.
          </p>
        </div>

        {/* Victim Card Carousel */}
        <div
          className={`relative z-20 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center justify-center gap-4">
            <button
              aria-label="Previous victim"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl transition"
              onClick={prevVictim}
            >
              &#8592;
            </button>

            <div className={`${cardBackgrounds[currentIndex % cardBackgrounds.length]} backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 w-full`}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-8xl mb-4">{currentVictim.photo}</div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                    {currentVictim.name}
                  </h3>
                  <p className="text-white/80 mb-4" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>Age {currentVictim.age}</p>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-white/80 mb-2">
                      <span>Recovery Progress</span>
                      <span>{currentVictim.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${currentVictim.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-4">Their Story</h4>
                  <p className="text-white/90 mb-6 leading-relaxed">{currentVictim.story}</p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-white mb-2">What they need:</h5>
                    <p className="text-white/80 text-sm">{currentVictim.needs}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-white/80 mb-2">Funding Goal</p>
                      <p className="text-2xl font-bold text-white">${currentVictim.amount.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => openDonationModal(currentVictim.name)}
                      className="text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: "#FF6B9D" }}
                    >
                      Sponsor {currentVictim.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              aria-label="Next victim"
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white text-2xl transition"
              onClick={nextVictim}
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div
          className={`flex justify-center mt-8 space-x-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {victims.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View ${victims[index].name}'s story`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-pink-500 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}