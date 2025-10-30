
"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDonation } from "@/contexts/DonationContext";

export default function HopeRecoverySchool() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [currentProgramSlide, setCurrentProgramSlide] = useState(0);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const { openDonationModal } = useDonation();
  const [isProgramHovered, setIsProgramHovered] = useState(false);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Hero carousel images
// Update the heroImages array to use local images
const heroImages = useMemo(() => [
  { url: "/school/school_1.jpg", alt: "Children learning together" },
  { url: "/school/school_2.jpg", alt: "Happy students in classroom" },
  { url: "/school/school_3.jpg", alt: "Children reading and studying" },
  { url: "/school/school_4.jpg", alt: "Joyful learning environment" }
], []);

  // Programs data
  const programs = useMemo(() => [
    {
      title: "Foundational Learning",
      description: "Building strong literacy, numeracy, and creative expression skills through engaging, play-based activities. We nurture curiosity and love for learning in every child.",
      icon: "📚",
      gradient: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-900/60",
      highlights: ["Early Literacy", "Numeracy Skills", "Creative Arts", "Language Development"]
    },
    {
      title: "Life Skills Education",
      description: "Developing confidence, empathy, and healthy habits that prepare children for life's challenges. We focus on emotional intelligence and social skills.",
      icon: "🌈",
      gradient: "from-green-600 to-teal-600",
      bgColor: "bg-green-900/60",
      highlights: ["Confidence Building", "Empathy Training", "Health & Hygiene", "Problem Solving"]
    },
    {
      title: "Faith Formation",
      description: "Nurturing spiritual growth through daily devotions, prayer, and Christ-centered moral guidance. We build character rooted in Christian values.",
      icon: "🙏",
      gradient: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-900/60",
      highlights: ["Daily Devotions", "Prayer & Worship", "Moral Guidance", "Character Building"]
    },
    {
      title: "Nutrition & Care",
      description: "Providing nutritious meals and emotional support to ensure every child is healthy, safe, and ready to learn. We care for the whole child.",
      icon: "🍎",
      gradient: "from-orange-600 to-amber-600",
      bgColor: "bg-orange-900/60",
      highlights: ["Nutritious Meals", "Health Monitoring", "Emotional Support", "Safe Environment"]
    }
  ], []);

  // Gallery images
  const galleryItems = useMemo(() => [
    { image: "👨‍👩‍👧‍👦", caption: "Children learning together in class", alt: "Classroom learning" },
    { image: "🎨", caption: "Creative arts and expression activities", alt: "Art activities" },
    { image: "🍽️", caption: "Sharing nutritious meals together", alt: "Mealtime" },
    { image: "⚽", caption: "Physical activities and outdoor play", alt: "Outdoor play" },
    { image: "📖", caption: "Story time and literacy development", alt: "Reading time" },
    { image: "🙏", caption: "Daily prayer and spiritual growth", alt: "Prayer time" }
  ], []);

  // Core values
  const values = useMemo(() => [
    {
      icon: "🤝",
      title: "Respect",
      description: "We honor every child's dignity and treat each family with compassion and understanding.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "💎",
      title: "Integrity",
      description: "We uphold honesty and transparency in all our actions, building trust within our community.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌟",
      title: "Kindness",
      description: "We lead with love, creating a nurturing environment where every child feels valued and safe.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Community",
      description: "We believe in the power of togetherness, building strong bonds between families, staff, and supporters.",
      color: "from-orange-500 to-amber-500"
    }
  ], []);

  // Touch handlers for programs
  const [programTouchStart, setProgramTouchStart] = useState<number | null>(null);
  const [programTouchEnd, setProgramTouchEnd] = useState<number | null>(null);
  
  const onProgramTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setProgramTouchEnd(null);
    setProgramTouchStart(e.targetTouches[0].clientX);
  };

  const onProgramTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setProgramTouchEnd(e.targetTouches[0].clientX);
  };

  const onProgramTouchEnd = () => {
    if (!programTouchStart || !programTouchEnd) return;
    const distance = programTouchStart - programTouchEnd;
    if (distance > 50) {
      setCurrentProgramSlide((prev) => (prev + 1) % programs.length);
    }
    if (distance < -50) {
      setCurrentProgramSlide((prev) => (prev - 1 + programs.length) % programs.length);
    }
  };

  // Intersection observer
  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => setIsVisible((prev) => ({ ...prev, [key]: entry.isIntersecting })),
          { threshold: 0.2 }
        );
        observers[key].observe(sectionRefs.current[key]!);
      }
    });
    return () => Object.values(observers).forEach((obs) => obs.disconnect());
  }, []);

  // Auto-slide for programs
  useEffect(() => {
    if (isProgramHovered) return;
    const interval = setInterval(() => {
      setCurrentProgramSlide((prev) => (prev + 1) % programs.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [programs.length, isProgramHovered]);

  // Auto-slide for gallery
  useEffect(() => {
    if (isGalleryHovered) return;
    const interval = setInterval(() => {
      setCurrentGallerySlide((prev) => (prev + 1) % galleryItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryItems.length, isGalleryHovered]);

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky Background */}
      <div 
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{
          background: "linear-gradient(to bottom, #4A90E2 0%, #5BA3F5 20%, #87CEEB 40%, #B0D8F0 60%, #E0F2FE 100%)"
        }}
      />

      {/* Header - FIXED: Logo now clearly visible without circle */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - IMPROVED: Removed circle, better visibility */}
            <div className="flex items-center space-x-3">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/irc.png"
                  alt="IRC Logo"
                  fill
                  className="object-contain"
                  sizes="56px"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Hope for Recovery
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Christian School
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {['home', 'about', 'values', 'programs', 'impact', 'involve', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="px-4 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300 capitalize font-medium"
                >
                  {section === 'involve' ? 'Get Involved' : section}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2 bg-white rounded-b-2xl border-t border-gray-200">
              {['home', 'about', 'values', 'programs', 'impact', 'involve', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-3 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all capitalize font-medium"
                >
                  {section === 'involve' ? 'Get Involved' : section}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - FIXED: Gallery now visible on mobile */}
      <section ref={setRef('home')} className="relative pt-32 md:pt-40 pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left animate-fadeInUp order-2 lg:order-1">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              >
                Where Little Hearts<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                  Rise, Succeed & Transform
                </span>
              </h1>
              <p 
                className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto lg:mx-0 font-medium mb-8"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                Nurturing vulnerable children through faith, education, and compassion in Rwanda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('involve')}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                >
                  Support Our Mission
                </button>
                <button
                  onClick={() => scrollToSection('programs')}
                  className="bg-white/20 backdrop-blur-sm text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 border-2 border-white/40 hover:border-white/60 transform hover:scale-105"
                >
                  Learn About Programs
                </button>
              </div>
            </div>

            {/* Right Column - Image Carousel - NOW VISIBLE ON MOBILE */}
            <div className="relative animate-fadeInUp order-1 lg:order-2">
              <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30">
                {/* Carousel Images */}
                <div className="relative h-full">
                  {heroImages.map((image, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        currentHeroSlide === idx ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                  ))}
                </div>

                {/* Carousel indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentHeroSlide === idx 
                          ? 'w-10 h-3 bg-white' 
                          : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Decorative icon overlay */}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* About Section */}
          <section
            ref={setRef('about')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  A Community Built on Faith, Hope & Love
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Our Mission</h3>
                  <ul className="text-white/90 space-y-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    <li>• Provide life-changing knowledge and skills</li>
                    <li>• Deliver transformative educational experiences</li>
                    <li>• Foster holistic well-being for every child</li>
                    <li>• Integrate Christian values in learning</li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Our Vision</h3>
                  <p className="text-white/90 text-lg leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Building a resilient and positive community where every child, regardless of background, has access to quality education and the opportunity to thrive.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600/30 to-amber-600/30 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30">
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Who We Are
                </h3>
                <p className="text-white/95 text-lg leading-relaxed text-center max-w-4xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Hope for Recovery Christian School is a faith-based Early Childhood Development center dedicated to transforming the lives of children from vulnerable families. We combine quality education with Christian values, nutritious care, and emotional support to give every child the foundation they deserve. Since our founding, we&apos;ve touched hundreds of young lives, witnessing the transformative power of love, patience, and dedicated teaching.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section
            ref={setRef('values')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Founded on Timeless Values
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:scale-105 transform"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {value.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Programs Carousel */}
          <section
            ref={setRef('programs')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-12 md:py-16">
              <div className={`text-center mb-10 transition-all duration-900 ${isVisible['programs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Transformative Programs for Thriving Children
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4"></div>
                <p className="text-lg text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Our integrated approach addresses every aspect of a child&apos;s development—intellectual, emotional, social, physical, and spiritual.
                </p>
                <p className="text-sm text-white/70 mt-2 md:hidden" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  👆 Swipe to explore programs
                </p>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsProgramHovered(true)}
                onMouseLeave={() => setIsProgramHovered(false)}
                onTouchStart={onProgramTouchStart}
                onTouchMove={onProgramTouchMove}
                onTouchEnd={onProgramTouchEnd}
              >
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentProgramSlide * 100}%)` }}
                  >
                    {programs.map((program, idx) => (
                      <div key={idx} className="w-full flex-shrink-0 px-2 md:px-8">
                        <div className={`${program.bgColor} backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-white/30 shadow-2xl`}>
                          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            <div className="flex-shrink-0">
                              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${program.gradient} flex items-center justify-center text-5xl md:text-6xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6`}>
                                {program.icon}
                              </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                {program.title}
                              </h3>
                              <p className="text-white/95 leading-relaxed mb-4 text-base md:text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                {program.description}
                              </p>
                              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                                {program.highlights.map((highlight, hIdx) => (
                                  <span
                                    key={hIdx}
                                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white border border-white/30"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={() => scrollToSection('contact')}
                                className={`bg-gradient-to-r ${program.gradient} text-white py-3 px-8 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1`}
                              >
                                Learn More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                  {programs.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProgramSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentProgramSlide === idx ? 'w-10 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to program ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentProgramSlide((prev) => (prev - 1 + programs.length) % programs.length)}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentProgramSlide((prev) => (prev + 1) % programs.length)}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section
            ref={setRef('impact')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['impact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Our Growing Impact
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { number: "500+", label: "Children Educated", icon: "👨‍👩‍👧‍👦", color: "from-blue-600 to-cyan-600" },
                  { number: "100+", label: "Families Supported", icon: "❤️", color: "from-purple-600 to-pink-600" },
                  { number: "15", label: "Dedicated Teachers", icon: "👨‍🏫", color: "from-green-600 to-teal-600" },
                  { number: "95%", label: "Success Rate", icon: "🎓", color: "from-orange-600 to-amber-600" }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mb-4 mx-auto shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      {stat.number}
                    </div>
                    <div className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-600/30 to-teal-600/30 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
                <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Success Story: Sarah&apos;s Journey
                </h3>
                <p className="text-white/95 text-lg leading-relaxed italic text-center max-w-4xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  &quot;When Sarah joined us at age 4, she was shy and withdrawn, struggling with trauma. Today, at age 8, she&apos;s a confident reader who loves to share stories and help younger children. Her mother says, &apos;Hope for Recovery didn&apos;t just educate my daughter—they gave her back her childhood.&apos;&quot;
                </p>
              </div>
            </div>
          </section>

          {/* Get Involved Section */}
          <section
            ref={setRef('involve')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['involve'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Be Part of Something Beautiful
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full mb-4"></div>
                <p className="text-lg text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Your support creates ripples of hope that extend far beyond our classrooms. Every contribution makes a lasting difference.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "💝",
                    title: "Donate",
                    description: "Provide meals, supplies, and scholarships for children in need",
                    gradient: "from-pink-600 to-rose-600",
                    amounts: ["$20/month: Daily meals", "$30/month: School supplies", "$50/month: Full sponsorship"]
                  },
                  {
                    icon: "🙌",
                    title: "Volunteer",
                    description: "Share your time and talents to enrich our children&apos; learning experience",
                    gradient: "from-blue-600 to-cyan-600",
                    amounts: ["Teaching support", "Special skills sharing", "Event coordination"]
                  },
                  {
                    icon: "🤝",
                    title: "Partner",
                    description: "Become a long-term partner or corporate sponsor for sustainable impact",
                    gradient: "from-purple-600 to-pink-600",
                    amounts: ["Facility sponsorship", "Program funding", "In-kind donations"]
                  }
                ].map((option, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl transform hover:scale-105"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {option.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                      {option.title}
                    </h3>
                    <p className="text-white/90 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      {option.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {option.amounts.map((amount, aIdx) => (
                        <li key={aIdx} className="text-white/80 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                          • {amount}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openDonationModal()}
                      className={`w-full bg-gradient-to-r ${option.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1`}
                    >
                      Get Started
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section
            ref={setRef('gallery')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Moments of Joy & Learning
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setIsGalleryHovered(true)}
                onMouseLeave={() => setIsGalleryHovered(false)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 h-80">
                  <div className="relative h-full">
                    <div
                      className="flex h-full transition-transform duration-1000 ease-in-out"
                      style={{ transform: `translateX(-${currentGallerySlide * 100}%)` }}
                    >
                      {galleryItems.map((item, idx) => (
                        <div key={idx} className="w-full h-full flex-shrink-0 flex flex-col items-center justify-center p-8">
                          <div className="text-8xl mb-6">{item.image}</div>
                          <p className="text-white text-xl font-medium text-center" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {item.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-6">
                  {galleryItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentGallerySlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentGallerySlide === idx ? 'w-10 h-3 bg-white' : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            ref={setRef('contact')}
            className="rounded-3xl bg-gradient-to-br from-slate-900/70 to-gray-900/70 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden p-8 md:p-12"
          >
            <div className={`transition-all duration-900 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Get in Touch
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mb-4"></div>
                <p className="text-lg text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  We&apos;d love to hear from you. Reach out to learn more or schedule a visit!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-white mb-2 font-medium">Full Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Email Address *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">I&apos;m interested in *</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-pointer">
                        <option value="">Select an option</option>
                        <option value="enroll">Enrolling a child</option>
                        <option value="volunteer">Volunteering</option>
                        <option value="donate">Making a donation</option>
                        <option value="partner">Partnership opportunities</option>
                        <option value="general">General inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-medium">Message *</label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all h-32 resize-none"
                        placeholder="Tell us how we can help..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                        <p className="text-white/90">
                          Hope for Recovery Christian School<br />
                          Bugesera, Rwanda<br />
                          <span className="text-sm text-white/70"></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center text-2xl flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                        <p className="text-white/90">
                          Phone: <a href="tel:+250788897969" className="hover:underline">+250 788 897 969</a><br />
                          WhatsApp: <a href="https://wa.me/250788897969" className="hover:underline">+250 788 897 969</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl flex-shrink-0">
                        ✉️
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                        <p className="text-white/90">
                          iwacurecoverycentre17@gmail.com<br />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-2xl flex-shrink-0">
                        🕐
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Office Hours</h3>
                        <p className="text-white/90">
                          Monday - Friday: 7:30 AM - 4:00 PM<br />
                          Saturday: By appointment<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="pb-8">
            <div className="bg-gradient-to-r from-orange-700 to-amber-700 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Ready to Make a Difference?
                </h2>
                <p className="text-white/95 text-lg mb-8 max-w-2xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Join us in transforming young lives through education, faith, and compassion. Every child deserves the opportunity to rise, succeed, and transform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => openDonationModal()}
                    className="bg-white text-orange-600 py-4 px-10 rounded-xl font-bold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                  >
                    Support a Child Today
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-white/10 hover:shadow-xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-1"
                  >
                    Schedule a Visit
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
<div className="flex items-center space-x-3">
  <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg relative">
    <Image
      src="/irc.png"
      alt="IRC Logo"
      fill
      className="object-cover"
      sizes="48px"
      priority
    />
  </div>
  <div>
    <h1
      className="text-lg sm:text-xl font-bold text-white"
      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
    >
      Hope for Recovery
    </h1>
    <p
      className="text-xs text-white/90"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
    >
      Christian School
    </p>
  </div>
</div>
              <p className="text-white/80 text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Rise, Succeed & Transform
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['about', 'programs', 'impact', 'involve'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className="block text-white/80 hover:text-white transition-colors capitalize"
                  >
                    {link === 'involve' ? 'Get Involved' : link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-white/80 text-sm">
                <p>Bugesera, Rwanda</p>
                <p>+250 788 897 969</p>
                <p>iwacurecovery17@gmail.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <div className="flex gap-3">
                {['📘', '📷', '🐦'].map((icon, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/70 text-sm">
            <p>© 2025 Hope for Recovery Christian School. All rights reserved.</p>
            <p className="mt-2">Developed by <span>Aime-Stack</span></p>
          </div>
        </div>
      </footer>

      {/* Earth surface transition overlay */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 h-[60vh] z-[1]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.15) 20%, rgba(184, 170, 133, 0.35) 40%, rgba(139, 115, 85, 0.65) 60%, rgba(101, 67, 33, 0.85) 80%, rgba(101, 67, 33, 0.95) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Animations */}
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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
}