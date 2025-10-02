"use client";
import HeroSky from "../../components/HeroSky";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [whoVisible, setWhoVisible] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
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
          <nav className="relative flex items-center justify-between rounded-xl shadow-sm ring-1 ring-white/20 backdrop-blur overflow-hidden">
            
            {/* Gradient background with balloon colors */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #FF6B9D 0%, #4ECDC4 25%, #FFD93D 50%, #A8E6CF 75%, #B19CD9 100%)',
                opacity: 0.85
              }}
            />
            
            {/* White overlay for softer look */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

            {/* Left: Logo and Brand Name */}
            <div className="relative z-10 flex items-center gap-3 p-3">
              <div className="h-8 w-8 rounded-full bg-white shadow-md" />
              <span className="font-semibold tracking-tight text-slate-800">I wacu Recovery Centre</span>
            </div>

            {/* Center: Animated Slogan */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center gap-2 text-xs italic font-light tracking-wide">
                {sloganWords.map((word, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="inline-block text-slate-800 transition-all duration-500 ease-out"
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

            {/* Right: Menu Links */}
            <ul className="relative z-10 flex gap-6 p-3 text-sm font-medium text-slate-700">
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/50 hover:shadow-md hover:scale-105 inline-block" 
                  href="#home"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/50 hover:shadow-md hover:scale-105 inline-block" 
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  className="relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-slate-900 hover:bg-white/50 hover:shadow-md hover:scale-105 inline-block" 
                  href="#contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
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
        <div className="flex items-center justify-between gap-4">
        <h2
        className={`text-2xl md:text-3xl font-bold tracking-tight text-slate-900 transition-all duration-900 ease-out ${
          whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: whoVisible ? "200ms" : "0ms" }}
      >
        Who We Are
      </h2>
        </div>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
{/* Left column */}
<div
  className={`text-slate-800 text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
    whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`}
  style={{ transitionDelay: whoVisible ? "350ms" : "0ms" }}
>
  <p>
    The Iwacu Recovery Centre is a counseling and treatment center focusing on alcohol and drugs abuse of people with addiction and related mental, psychological, and health problems. Furthermore, IRC helps young and adult people who are directly from rehabilitation centers and lead them on the way to recovery. At Iwacu Recovery Centre, whether someone seeks out the company of other recovering addicts or finds support in personal networks, it is imperative that you share your struggles with other people.
  </p>
  <p>
    Therefore, the IRC is an organization dedicated to the fundamental belief that people with psychosocial problems and their families should recover their dignity, hope, rights and privileges.
  </p>
</div>

          {/* Right column */}
          <div
            className={`transition-all duration-700 delay-200 ${
              whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
        <h2
        className={`text-2xl md:text-3xl font-bold tracking-tight text-slate-900 transition-all duration-900 ease-out ${
          whoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: whoVisible ? "200ms" : "0ms" }}
      >
        What We Do
      </h2>
            <ul className="mt-4 grid gap-3 text-slate-800 text-sm md:text-base">
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
                    transitionDelay: `${250 + idx * 80}ms`,
                  }}
                >
                  <span className="text-blue-600 mt-1">•</span>
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white grid place-items-center shadow-sm">
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 text-white grid place-items-center shadow-sm">
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white grid place-items-center shadow-sm">
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
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white grid place-items-center shadow-sm">
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