"use client";

import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSky from "@/components/HeroSky";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ProgramsPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProgramSlide, setCurrentProgramSlide] = useState(0);
  const [isProgramHovered, setIsProgramHovered] = useState(false);
  const [isNewsHovered, setIsNewsHovered] = useState(false);

  const programs = [
    {
      title: "Psychoeducation",
      description: "Psychoeducation is the process of providing individuals or groups with information and support about mental health, helping them understand psychological concepts, symptoms, and coping strategies to improve well-being and manage challenges effectively.",
      icon: "🧠",
      gradient: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-900/60"
    },
    {
      title: "Counseling and Psychotherapy",
      description: "Psychotherapy and counseling are interactions between a therapist and one or more clients. The purpose is to help the client with problems that may have aspects that are related to disorders of thinking, emotional suffering, or problems of behavior.",
      icon: "💬",
      gradient: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-900/60"
    },
    {
      title: "Addiction Counselling & Treatment",
      description: "An addiction counseling and treatment program provides support and therapeutic interventions to help individuals overcome substance use disorders, develop healthier coping strategies, and achieve long-term recovery.",
      icon: "🤝",
      gradient: "from-pink-600 to-rose-600",
      bgColor: "bg-pink-900/60"
    },
    {
      title: "Psychosocial Support",
      description: "Psychosocial support is about helping individuals cope with, and overcome difficult life situations. Good psychosocial support is comprehensive and focuses on protection resilience and coping mechanisms.",
      icon: "🌟",
      gradient: "from-green-600 to-teal-600",
      bgColor: "bg-green-900/60"
    },
    {
      title: "Ergo/Occupation Therapy",
      description: "Ergotherapy also known as occupation therapy is a field of recovery pathway. It tries to achieve the highest possible quality of life for a person with physical or mental issues through meaningful activity.",
      icon: "🎯",
      gradient: "from-indigo-600 to-blue-600",
      bgColor: "bg-indigo-900/60"
    },
    {
      title: "Relaxation",
      description: "Relaxation program is a structured set of techniques designed to reduce stress and promote physical and mental relaxation, often including practices such as deep breathing, meditation, and progressive muscle relaxation.",
      icon: "🧘",
      gradient: "from-teal-600 to-green-600",
      bgColor: "bg-teal-900/60"
    },
    {
      title: "Art Therapy",
      description: "An art therapy program uses creative processes like music, poetry, drawing, painting, or sculpture to help individuals express emotions, improve mental well-being, and address psychological challenges in a therapeutic setting.",
      icon: "🎨",
      gradient: "from-orange-600 to-amber-600",
      bgColor: "bg-orange-900/60"
    }
  ];

  const news = [
    {
      date: "September, 2024",
      title: "Iwacu Recovery Centre Opens Hope for Recovery Christian School in Bugesera",
      description: "Kayenzi Village, Nyamata Sector, Bugesera District – Iwacu Recovery Centre (IRC) has proudly opened the Hope for Recovery Christian School in response to the heartfelt requests of parents from Kayenzi village in Nyamata Sector, Bugesera District.",
      image: "/news1.jpg"
    },
    {
      date: "September, 2024",
      title: "IRC Supports Anti-Drug Clubs and Youth Awareness Initiatives Across Rwanda",
      description: "Kigali, Rwanda – Iwacu Recovery Centre (IRC) is extending its support to Anti-Drugs Clubs in schools across the country as part of its ongoing efforts to raise awareness and prevent drug abuse among young people.",
      image: "/news2.jpg"
    },
    {
      date: "August, 2024",
      title: "Iwacu Recovery Centre Distributes School Kits to 287 Children in Bugesera District",
      description: "Iwacu Recovery Centre has successfully distributed school tool kits to 287 children in Bugesera District, marking the conclusion of the youth camps held during the summer holidays of 2024.",
      image: "/news3.jpg"
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

  // Auto-slide carousel for programs with pause on hover
  useEffect(() => {
    if (isProgramHovered) return;
    
    const interval = setInterval(() => {
      setCurrentProgramSlide((prev) => (prev + 1) % programs.length);
    }, 10000); // 10 seconds delay

    return () => clearInterval(interval);
  }, [programs.length, isProgramHovered]);

  // Auto-slide carousel for news with pause on hover
  useEffect(() => {
    if (isNewsHovered) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 8000); // 8 seconds delay

    return () => clearInterval(interval);
  }, [news.length, isNewsHovered]);

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background that covers entire site */}
      <HeroSky />
      
      <Header />
      
      {/* Hero Section with animations */}
      <div className="relative pt-32 md:pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fadeInUp" 
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              Our Programs
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium animate-fadeInUp" 
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
            >
              We offer different programs to improve your health
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Programs Carousel */}
          <section
            ref={setRef('programs')}
            className="w-full rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`text-center mb-10 transition-all duration-900 ease-out ${
                  isVisible['programs'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['programs'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Our Treatment Programs
                </h2>
                <p className="text-lg text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Comprehensive care tailored to your recovery journey
                </p>
              </div>

              {/* Carousel Container */}
              <div 
                className="relative"
                onMouseEnter={() => setIsProgramHovered(true)}
                onMouseLeave={() => setIsProgramHovered(false)}
              >
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentProgramSlide * 100}%)` }}
                  >
                    {programs.map((program, idx) => (
                      <div
                        key={idx}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div className={`${program.bgColor} backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl`}>
                          <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Icon Section */}
                            <div className="flex-shrink-0">
                              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${program.gradient} flex items-center justify-center text-5xl md:text-6xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6`}>
                                {program.icon}
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 text-center md:text-left">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                {program.title}
                              </h3>
                              
                              <p className="text-white/95 leading-relaxed mb-6 text-base md:text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                {program.description}
                              </p>
                              
                              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <Link
                                  href="/contact"
                                  className={`bg-gradient-to-r ${program.gradient} text-white py-3 px-8 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center transform hover:-translate-y-1`}
                                >
                                  Schedule Appointment
                                </Link>
                                <button className="bg-white/20 backdrop-blur-sm text-white py-3 px-8 rounded-xl font-medium hover:bg-white/30 transition-all duration-300 border border-white/40 hover:border-white/60 transform hover:scale-105">
                                  Learn More
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {programs.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProgramSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentProgramSlide === idx 
                          ? 'w-10 h-3 bg-white' 
                          : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to program ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentProgramSlide((prev) => (prev - 1 + programs.length) % programs.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl active:scale-95"
                  aria-label="Previous program"
                >
                  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentProgramSlide((prev) => (prev + 1) % programs.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl active:scale-95"
                  aria-label="Next program"
                >
                  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Recent News - Single Card with Image Carousel */}
          <section
            ref={setRef('news')}
            className="w-full rounded-3xl bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`text-center mb-10 transition-all duration-900 ease-out ${
                  isVisible['news'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['news'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Keep up with Our Most Recent News
                </h2>
                <p className="text-lg text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  We provide recent activities and events to keep our friends and partners updated
                </p>
              </div>

              {/* Single Card Container */}
              <div 
                className="relative"
                onMouseEnter={() => setIsNewsHovered(true)}
                onMouseLeave={() => setIsNewsHovered(false)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Column - Carousel */}
                    <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-blue-900/30 to-purple-900/30 overflow-hidden">
                      <div 
                        className="flex h-full transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {news.map((item, idx) => (
                          <div key={idx} className="relative w-full h-full flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.style.display = 'flex';
                                  parent.style.alignItems = 'center';
                                  parent.style.justifyContent = 'center';
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'text-6xl';
                                  placeholder.textContent = '📰';
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Column - Static with Fade Transition */}
                    <div className="p-6 md:p-8 flex flex-col justify-center relative">
                      {news.map((item, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-opacity duration-700 ${
                            currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
                        >
                          <div className="mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl px-4 py-2 text-sm font-semibold inline-block transform hover:scale-105 transition-transform duration-300" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              {item.date}
                            </div>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-300" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {item.title}
                          </h3>
                          <p className="text-white/90 text-base leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {news.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === idx 
                          ? 'w-10 h-3 bg-white' 
                          : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to news ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl active:scale-95 z-10"
                  aria-label="Previous news"
                >
                  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % news.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl active:scale-95 z-10"
                  aria-label="Next news"
                >
                  <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="pb-8">
            <div className="bg-[#57241B] rounded-3xl p-10 shadow-2xl overflow-hidden relative group">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-[#57241B] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)', animation: 'pulse 3s ease-in-out infinite' }}>
                  Ready to Begin Your Healing Journey?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto transform transition-all duration-500 group-hover:scale-105" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Our dedicated team of professionals is here to support you with personalized care and evidence-based treatment programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contact" 
                    className="bg-white text-purple-600 py-4 px-10 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center transform hover:-translate-y-1 active:scale-95"
                  >
                    Get Started Today
                  </Link>
                  <a 
                    href="tel:+250788772489" 
                    className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center transform hover:-translate-y-1 active:scale-95"
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

      {/* Custom Keyframe Animations */}
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}