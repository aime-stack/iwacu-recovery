"use client";
import HeroSky from "../../components/HeroSky";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [whoVisible, setWhoVisible] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Animate words appearing one by one with slower timing
    const timeouts = [
      setTimeout(() => setVisibleWords([0]), 500),
      setTimeout(() => setVisibleWords([0, 1]), 1200),
      setTimeout(() => setVisibleWords([0, 1, 2]), 1900),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);
  
  const whoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = whoRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setWhoVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const sloganWords = [
    { text: "Counselling", delay: 0 },
    { text: "Addiction", delay: 400 },
    { text: "Services", delay: 800 }
  ];

  return (
    <main className="relative min-h-[100svh] text-slate-800 bg-gradient-to-b from-blue-600 via-blue-500 to-blue-300">
      <HeroSky />
      {/* Hero content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <header className="pointer-events-auto mx-auto mt-6 w-full max-w-6xl px-6">
          <nav className="relative flex items-center justify-between rounded-xl shadow-lg ring-1 ring-white/30 backdrop-blur-md overflow-visible">
            
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-xl" />
            
            {/* Subtle gradient overlay */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
              }}
            />

            {/* Left: Logo and Brand Name */}
            <div className="relative z-10 flex items-center gap-3 p-3">
              <div className="h-10 w-10 rounded-full bg-white shadow-md overflow-hidden flex items-center justify-center flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Iwacu Recovery Centre Logo" 
                  className="h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-blue-600 font-bold text-lg">I</span>';
                    }
                  }}
                />
              </div>
              <span className="font-semibold tracking-tight text-sm sm:text-base">
                <span style={{ color: '#000000' }}>Iwacu </span>
                <span style={{ color: '#D61A78' }}>Recovery </span>
                <span style={{ color: '#3695D7' }}>Centre</span>
              </span>
            </div>

            {/* Center: Animated Slogan - Hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 text-xs italic font-light tracking-wide">
                {sloganWords.map((word, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="inline-block text-slate-900 transition-all duration-500 ease-out"
                      style={{
                        opacity: visibleWords.includes(index) ? 1 : 0,
                        transform: visibleWords.includes(index) 
                          ? 'scale(1) translateY(0)' 
                          : 'scale(0.5) translateY(10px)',
                      }}
                    >
                      {word.text}
                    </span>
                    {index < sloganWords.length - 1 && (
                      <span 
                        className="text-slate-700 transition-opacity duration-500"
                        style={{
                          opacity: visibleWords.includes(index) ? 1 : 0,
                        }}
                      >
                        •
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Desktop Menu Links */}
            <ul className="hidden md:flex relative z-10 gap-6 p-3 text-sm font-medium text-slate-800">
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/60 hover:shadow-md hover:scale-105 inline-block" 
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/60 hover:shadow-md hover:scale-105 inline-block" 
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/60 hover:shadow-md hover:scale-105 inline-block" 
                  href="#contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-10 p-3 text-slate-800 hover:text-slate-900 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full right-0 mt-2 w-48 rounded-xl shadow-lg ring-1 ring-white/30 backdrop-blur-md overflow-hidden z-50">
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />
                <ul className="relative z-10 py-2">
                  <li>
                    <a 
                      className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white/60 hover:text-slate-900 transition-colors" 
                      href="#home"
                      onClick={handleNavClick}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white/60 hover:text-slate-900 transition-colors" 
                      href="#about"
                      onClick={handleNavClick}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-white/60 hover:text-slate-900 transition-colors" 
                      href="#contact"
                      onClick={handleNavClick}
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </nav>
        </header>

        {/* Decorative halo behind hero for a subtle futuristic feel */}
        <div aria-hidden className="left-1/2 top-1/3 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-[--brand-soft] opacity-30 blur-3xl" />
        
      </div>
      {/* Spacer to account for absolute hero overlay */}
      <div className="h-[100svh]" />

      {/* Who We Are — full-width card */}
      <section id="who-we-are" className="relative z-10">
        <div className="mx-auto max-w-[100vw]">
          <div
            ref={whoRef}
            className="w-full rounded-none md:rounded-3xl bg-gradient-to-br from-white/65 to-slate-100/60 ring-1 ring-white/40 backdrop-blur shadow-lg"
          >
            <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
              <div className="mt-6 flex flex-col md:flex-row gap-10 md:gap-8">
                {/* Left column */}
                <div
                  className={`flex-1 text-slate-800 text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: whoVisible ? "350ms" : "0ms" }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
                    Who We Are
                  </h2>
                  <p>
                    The Iwacu Recovery Centre is a counseling and treatment center focusing on alcohol and drugs abuse of people with addiction and related mental, psychological, and health problems. Furthermore, IRC helps young and adult people who are directly from rehabilitation centers and lead them on the way to recovery. At Iwacu Recovery Centre, whether someone seeks out the company of other recovering addicts or finds support in personal networks, it is imperative that you share your struggles with other people.
                  </p>
                  <p>
                    Therefore, the IRC is an organization dedicated to the fundamental belief that people with psychosocial problems and their families should recover their dignity, hope, rights and privileges.
                  </p>
                </div>

                {/* Decorative separator */}
                <div className="hidden md:flex items-stretch justify-center flex-shrink-0">
                  <div 
                    className={`w-[2px] relative transition-all duration-900 ease-out ${
                      whoVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                    style={{ 
                      background: 'linear-gradient(to bottom, #D61A78 0%, #3695D7 50%, #000000 100%)',
                      transitionDelay: whoVisible ? "400ms" : "0ms"
                    }}
                  >
                    {/* Decorative circles along the line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#D61A78' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: '#3695D7' }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow-sm" />
                  </div>
                </div>

                {/* Right column */}
                <div
                  className={`flex-1 text-slate-800 text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: whoVisible ? "500ms" : "0ms" }}
                >
                  <h3
                    className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4"
                  >
                    What We Do
                  </h3>
                  <ul className="grid gap-3">
                    {[
                      "Individual counseling sessions.",
                      "Group counseling sessions.",
                      "Family counseling sessions.",
                      "Wellness activities.",
                      "Partial inpatient program.",
                      "Orientation into IRC Alumni.",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 transition-all duration-700"
                        style={{
                          opacity: whoVisible ? 1 : 0,
                          transform: whoVisible ? "translateY(0px)" : "translateY(8px)",
                          transitionDelay: `${550 + idx * 80}ms`,
                        }}
                      >
                        <span className="mt-1" style={{ color: '#3695D7' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-center">
            What Iwacu Recovery Centre Offers
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Compassionate, professional care tailored to your needs
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* General Counseling */}
            <div className="group rounded-2xl border border-white/40 bg-white/50 shadow-md backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-700 to-black text-white grid place-items-center shadow-sm">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">General Counseling</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Our clinicians and therapists help you overcome and cope with trauma, depression,
                  stress, anxiety, and other related mental health challenges.
                </p>
              </div>
            </div>

            {/* Emergency Help */}
            <div className="group rounded-2xl border border-white/40 bg-white/50 shadow-md backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl text-white grid place-items-center shadow-sm" style={{ background: 'linear-gradient(to bottom right, #D61A78, #A01560)' }}>
                  <span className="text-xl">🚑</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Emergency Help</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Our mobile team is available at any time. Reach us on{' '}
                  <a href="tel:+250794580006" className="font-semibold text-slate-900 underline underline-offset-2">
                    +250 794 580 006
                  </a>.
                </p>
              </div>
            </div>

            {/* Alcohol & Drugs Addiction Treatment */}
            <div className="group rounded-2xl border border-white/40 bg-white/50 shadow-md backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl text-white grid place-items-center shadow-sm" style={{ background: 'linear-gradient(to bottom right, #3695D7, #2570A8)' }}>
                  <span className="text-xl">🧩</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Alcohol & Drugs Addiction Treatment</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Meet with a personal therapist via phone for simple, effective support. One-on-one
                  therapy is also encouraged when needed.
                </p>
              </div>
            </div>

            {/* Mentorship */}
            <div className="group rounded-2xl border border-white/40 bg-white/50 shadow-md backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-6">
                <div className="h-12 w-12 rounded-xl text-white grid place-items-center shadow-sm" style={{ background: 'linear-gradient(to bottom right, #D61A78, #3695D7)' }}>
                  <span className="text-xl">🎓</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Mentorship</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  Career orientation and mentorship during and after your recovery journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Book Appointment */}
      <section id="book-appointment" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 ring-1 ring-white/40 shadow-xl">
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(1200px 300px at 10% -10%, rgba(255,255,255,0.5), rgba(255,255,255,0))' }} />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to start your recovery?</h2>
                <p className="mt-2 text-blue-50">Book an appointment with our team today. Confidential and compassionate support.</p>
              </div>
              <div className="flex items-center gap-3">
                <a href="tel:+250794580006" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">Call Now</a>
                <a href="https://wa.me/250794580006" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-100 text-emerald-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">WhatsApp</a>
                <a href="mailto:info@iwacurecovery.rw?subject=Appointment%20Request" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 text-white ring-1 ring-white/40 font-semibold shadow-md hover:bg-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300">Email Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom fade: sky to earth surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh] z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.25) 25%, rgba(184, 170, 133, 0.45) 55%, rgba(184, 170, 133, 0.85) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </main>
  );
}