"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import components with error handling
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const HeroSky = dynamic(() => import("@/components/HeroSkyWrapper"), { 
  ssr: false,
  loading: () => (
    <div 
      className="absolute top-0 left-0 h-[100svh] w-full bg-gradient-to-b from-blue-600 via-blue-400 to-blue-300" 
      style={{ position: "fixed", zIndex: 0 }} 
    />
  ),
});

// Custom arrow icons
const ChevronLeft = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function TeamPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Team Members - 5 people with sliding carousel
  const teamMembers = [
    {
      name: "Rev. Dr. Jean Claude MUREKEYIMANA",
      role: "Founder & Recovery Coach",
      image: "/team/jean-claude.jpg",
      bio: "Spiritual leader and recovery coach dedicated to holistic healing and transformation.",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      name: "Mrs. UMULISA Aimée Josiane",
      role: "Founder & Senior Clinical Psychologist",
      image: "/team/umulisa.jpg",
      bio: "Visionary founder with extensive expertise in clinical psychology and mental health care.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Grace Elvine BYIRINGIRO",
      role: "Mental Health Nurse",
      image: "/team/byiringiro.jpg",
      bio: "Compassionate social worker specializing in therapeutic interventions and community support.",
      gradient: "from-pink-600 to-rose-600"
    },
    {
      name: "Dusingizimana Marie Claire",
      role: "Social Worker & Therapist",
      image: "/team/marie-claire.jpg",
      bio: "Dedicated social worker and therapist committed to empowering individuals and families through compassionate care.",
      gradient: "from-rose-600 to-red-600"
    },
    {
      name: "Rukundo Blaise Tresor",
      role: "PR & Media Manager",
      image: "/team/rukundo-blaise.jpg",
      bio: "Creative media strategist and public relations specialist focused on effective storytelling and community engagement.",
      gradient: "from-yellow-600 to-amber-600"
    },
  {
      name: "Ange Michelle",
      role: "Counseling Psychologist",
      image: "/team/ange.jpg",
      bio: "A compassionate counseling psychologist dedicated to supporting mental health, recovery, and personal growth.",
      gradient: "from-yellow-600 to-amber-600"
    },
  ];

  // Counseling Advisory Team - Only 3 members
  const counselingTeam = [
    {
      name: "Dr. Susan Gitau",
      role: "Dr. Susan Gitau ( PhD )",
      specialization: "Counselling Psychology",
      image: "/team/susan-gitau.jpg",
      bio: "Over 10 years of experience in counseling, trauma care, mental health advocacy, and community empowerment.",
      gradient: "from-teal-600 to-cyan-600"
    },
    {
      name: "Silouan Silala Vea",
      role: "Advisory Counselor",
      specialization: "Religious Leadership",
      image: "/team/silouan-silala.jpg",
      bio: "Specialized in cognitive behavioral therapy and family counseling.",
      gradient: "from-indigo-600 to-blue-600"
    },
    {
      name: "Grace Uwase",
      role: "Addiction Specialist",
      specialization: "Substance Abuse Treatment",
      image: "/team/specialist.jpg",
      bio: "Dedicated to helping individuals overcome addiction through evidence-based approaches.",
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        ([entry]) => setIsVisible((prev) => ({ ...prev, [key]: entry.isIntersecting })),
        { threshold: 0.2 }
      );
      
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]!);
      }
    });

    return () => Object.values(observers).forEach((obs) => obs.disconnect());
  }, []);

  // Auto-advance carousel with looping (loops back to first after last)
  useEffect(() => {
    if (isHovering) return; // Don't auto-advance when hovering
  
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        // Loop back to first slide after reaching the last one
        return (prev + 1) % teamMembers.length;
      });
    }, 5000);
  
    return () => clearInterval(timer);
  }, [teamMembers.length, isHovering]);

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background */}
      <HeroSky />
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 md:pt-40 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" 
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              Meet Our Team
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium" 
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
            >
              Dedicated professionals committed to your recovery journey
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Team Introduction */}
          <section
            ref={setRef('intro')}
            className="w-full rounded-3xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`transition-all duration-900 ease-out ${
                  isVisible['intro'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['intro'] ? "200ms" : "0ms" }}
              >
                <div className="mx-auto max-w-5xl">
                  <div className="bg-white/10 backdrop-blur-md ring-1 ring-white/30 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-56 h-56 md:w-64 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-700 to-slate-900">
                        <Image
                          src="/team/sherrie.png"
                          alt="Honorary Chairperson"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 224px, 256px"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-sm font-semibold mb-4">
                          Honorary Chairperson
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                           The Heart of Our Mission and Leadership
                        </h2>
                        <p className="text-lg text-white/95 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          She embodies the heart of leadership and compassion. A loving mother devoted to the well-being of children, she plays a vital role in securing funding and fostering partnerships that sustain the centre’s mission of healing and transformation. Her nurturing spirit, wisdom, and unwavering dedication continue to guide and inspire Iwacu Recovery Centre in its pursuit of hope, recovery, and community well-being.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Members - Sliding Carousel */}
          <section
            ref={setRef('team')}
            className={`transition-all duration-900 ${
              isVisible['team'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
                Team Members
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                Leadership guiding our mission of transformation and healing
              </p>
            </div>

            <div className="relative bg-white/10 backdrop-blur-md ring-1 ring-white/30 rounded-3xl shadow-2xl p-8 md:p-12">
              {/* Carousel Container */}
              <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 px-4">
                      <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          {/* Photo */}
                          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${member.gradient} opacity-20`}></div>
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-700 to-slate-900">
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 256px, 320px"
                                onError={(e) => {
                                  const target = e.currentTarget as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div class="w-full h-full flex items-center justify-center">
                                        <svg class="w-32 h-32 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-center md:text-left">
                            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${member.gradient} text-white text-sm font-semibold mb-4`}>
                              Team Member
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                              {member.name}
                            </h3>
                            <p className="text-xl text-white/90 font-semibold mb-4" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                              {member.role}
                            </p>
                            <p className="text-lg text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              {member.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-slate-700"
                aria-label="Previous member"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-slate-700"
                aria-label="Next member"
              >
                <ChevronRight />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {teamMembers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-blue-400 w-8' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Counseling Advisory Section */}
          <section
            ref={setRef('counseling')}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}>
                Advisory Team
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                Health Practitioners providing comprehensive support
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {counselingTeam.map((member, idx) => (
                <div
                  key={idx}
                  className={`group bg-white/10 backdrop-blur-md ring-1 ring-white/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:ring-white/50 ${
                    isVisible['counseling'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ 
                    transitionDelay: `${idx * 100}ms`,
                    animation: isVisible['counseling'] ? `slideInUp 0.6s ease-out ${idx * 0.1}s both` : 'none'
                  }}
                >
                  {/* Photo Container */}
                  <div className="relative h-64 md:h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <svg class="w-24 h-24 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>

                  {/* Info Container */}
                  <div className="p-6">
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${member.gradient} text-white text-xs font-semibold mb-3`}>
                      {member.specialization}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      {member.name}
                    </h3>
                    
                    <p className="text-white/80 font-medium mb-3" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {member.role}
                    </p>
                    
                    <p className="text-white/90 text-sm leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Join Our Team CTA */}
          <section
            ref={setRef('join')}
            className={`w-full rounded-3xl bg-gradient-to-br from-pink-900/80 to-orange-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl transition-all duration-900 ${
              isVisible['join'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="px-6 py-12 md:py-16">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Join Our Team
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  We are always looking for passionate professionals who share our commitment to transforming lives through compassionate care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="bg-white text-pink-600 py-4 px-10 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    View Opportunities
                  </a>
                  <a 
                    href="mailto:irecoverycentre17@gmail.com" 
                    className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    Send Your CV
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="pb-8">
            <div className="bg-[#57241B] rounded-3xl p-10 shadow-2xl">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Ready to Start Your Recovery?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Our team is here to support you every step of the way with personalized care and professional guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="bg-white text-purple-600 py-4 px-10 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    Contact Us Today
                  </a>
                  <a 
                    href="tel:+250788772489" 
                    className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    Call: +250 788 772 489
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}