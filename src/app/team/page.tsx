"use client";

import { useRef, useEffect, useState } from "react";
import Header from "../../../components/Header";
import HeroSky from "../../../components/HeroSky";
import Footer from "../../../components/Footer";
import Image from "next/image";

export default function TeamPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const teamMembers = [
    {
      name: "Dr. Sarah Mukamana",
      role: "Clinical Director",
      specialization: "Addiction Medicine",
      image: "/team/director.jpg", // Replace with actual image path
      bio: "Over 15 years of experience in addiction treatment and mental health care.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      name: "Jean-Pierre Habimana",
      role: "Lead Counselor",
      specialization: "Psychotherapy",
      image: "/team/counselor1.jpg",
      bio: "Specialized in cognitive behavioral therapy and family counseling.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Grace Uwase",
      role: "Addiction Specialist",
      specialization: "Substance Abuse Treatment",
      image: "/team/specialist.jpg",
      bio: "Dedicated to helping individuals overcome addiction through evidence-based approaches.",
      gradient: "from-pink-600 to-rose-600"
    },
    {
      name: "Dr. Emmanuel Nkusi",
      role: "Psychiatric Consultant",
      specialization: "Mental Health",
      image: "/team/psychiatrist.jpg",
      bio: "Expert in dual diagnosis treatment and psychiatric medication management.",
      gradient: "from-green-600 to-teal-600"
    },
    {
      name: "Marie Claire Ingabire",
      role: "Art Therapist",
      specialization: "Creative Therapy",
      image: "/team/art-therapist.jpg",
      bio: "Using creative expression to facilitate healing and emotional growth.",
      gradient: "from-orange-600 to-amber-600"
    },
    {
      name: "Patrick Mugisha",
      role: "Recovery Coach",
      specialization: "Peer Support",
      image: "/team/coach.jpg",
      bio: "Personal recovery journey inspires others seeking lasting change.",
      gradient: "from-indigo-600 to-blue-600"
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

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background */}
      <HeroSky />
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 z-10">
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
                className={`text-center transition-all duration-900 ease-out ${
                  isVisible['intro'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['intro'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Expert Care, Compassionate Support
                </h2>
                <p className="text-lg text-white/95 max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Our multidisciplinary team brings together years of expertise in addiction treatment, mental health care, and holistic wellness. Each member is dedicated to providing personalized, evidence-based care that addresses your unique needs and supports your path to recovery.
                </p>
              </div>
            </div>
          </section>

          {/* Team Members Grid */}
          <section
            ref={setRef('team')}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={`group bg-white/10 backdrop-blur-md ring-1 ring-white/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:ring-white/50 ${
                  isVisible['team'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  animation: isVisible['team'] ? `slideInUp 0.6s ease-out ${idx * 0.1}s both` : 'none'
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
                      onError={(e) => {
                        // Fallback to placeholder icon if image fails
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
                  {/* Gradient Overlay on Hover */}
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
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 shadow-2xl">
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