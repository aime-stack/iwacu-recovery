"use client";

import { useState, useEffect, useRef } from "react";

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

  // Alternating background colors using company primary colors (blue and pink)
  const cardBackgrounds = [
    "bg-gradient-to-br from-blue-500 to-blue-600", // Blue
    "bg-gradient-to-br from-pink-500 to-pink-600", // Pink
    "bg-gradient-to-br from-blue-600 to-blue-700", // Blue variant
    "bg-gradient-to-br from-pink-600 to-pink-700", // Pink variant
  ];

  const victims: Victim[] = [
    {
      id: 1,
      name: "Jean Paul",
      age: 28,
      story: "I lost everything to alcohol addiction - my job, family, and home. With your support, I can rebuild my life and help others on their recovery journey.",
      photo: "👨‍💼",
      needs: "Rehabilitation program, counseling sessions, job training",
      amount: 500000,
      progress: 65
    },
    {
      id: 2,
      name: "Marie Claire",
      age: 24,
      story: "Drug addiction took away my dreams of becoming a nurse. I'm determined to recover and pursue my passion for helping others heal.",
      photo: "👩‍⚕️",
      needs: "Medical treatment, therapy, education support",
      amount: 750000,
      progress: 40
    },
    {
      id: 3,
      name: "Emmanuel",
      age: 32,
      story: "After 10 years of substance abuse, I found hope at Iwacu Recovery Centre. Your sponsorship can help me complete my recovery and start a new chapter.",
      photo: "👨‍🔧",
      needs: "Extended treatment, family counseling, vocational training",
      amount: 600000,
      progress: 80
    },
    {
      id: 4,
      name: "Grace",
      age: 19,
      story: "I started using drugs to cope with trauma. Now I want to break free and become a counselor to help young people like me.",
      photo: "👩‍🎓",
      needs: "Youth program, trauma therapy, mentorship",
      amount: 400000,
      progress: 25
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % victims.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [victims.length]);

  const currentVictim = victims[currentIndex];

  return (
    <section id="sponsor" ref={sectionRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Sponsor an Addicted Victim
          </h2>
          <p className={`text-lg text-white/90 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Help someone break free from addiction and rebuild their life. Your sponsorship provides hope, healing, and a second chance.
          </p>
        </div>

        {/* Floating victim cards */}
        <div className="relative">
          {/* Background floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {victims.map((victim, index) => (
              <div
                key={victim.id}
                className={`absolute transition-all duration-1000 ${
                  index === currentIndex ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                }`}
                style={{
                  left: `${15 + index * 20}%`,
                  top: `${20 + (index % 2) * 30}%`,
                  animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
                  zIndex: index === currentIndex ? 10 : 1
                }}
              >
                <div className={`w-64 h-80 ${cardBackgrounds[index % cardBackgrounds.length]} backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6`}>
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{victim.photo}</div>
                    <h3 className="text-xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{victim.name}</h3>
                    <p className="text-white/80" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Age {victim.age}</p>
                  </div>
                  
                  <p className="text-sm text-white/90 mb-4 line-clamp-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {victim.story}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-white/80 mb-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      <span>Progress</span>
                      <span>{victim.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${victim.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-white/80 mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Goal: {victim.amount.toLocaleString()} RWF</p>
                    <button className="w-full text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FF6B9D' }}>
                      Sponsor Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main featured victim */}
          <div className={`relative z-20 max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className={`${cardBackgrounds[currentIndex % cardBackgrounds.length]} backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12`}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-8xl mb-4">{currentVictim.photo}</div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{currentVictim.name}</h3>
                  <p className="text-white/80 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Age {currentVictim.age}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-white/80 mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      <span>Recovery Progress</span>
                      <span>{currentVictim.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${currentVictim.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Their Story</h4>
                  <p className="text-white/90 mb-6 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {currentVictim.story}
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="font-semibold text-white mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>What they need:</h5>
                    <p className="text-white/80 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{currentVictim.needs}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-white/80 mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Funding Goal</p>
                      <p className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{currentVictim.amount.toLocaleString()} RWF</p>
                    </div>
                    <button className="text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FF6B9D' }}>
                      Sponsor {currentVictim.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className={`flex justify-center mt-8 space-x-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            {victims.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-primary scale-125' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Every Contribution Makes a Difference
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Your sponsorship provides essential resources for recovery: medical care, counseling, job training, and hope for a brighter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FF6B9D' }}>
                Sponsor Monthly
              </button>
              <button className="text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#FF6B9D' }}>
                One-time Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}