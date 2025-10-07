"use client";

import { useRef, useEffect, useState } from "react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    "Individual counseling sessions.",
    "Group counseling sessions.",
    "Family counseling sessions.",
    "Wellness activities.",
    "Partial inpatient program.",
    "Orientation into IRC Alumni.",
  ];

  return (
    <section id="about" className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={aboutRef}
          className="w-full rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-xl"
        >
          <div className="px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-10 md:gap-8">
              <div
                className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Who We Are
                </h2>
                <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                At Iwacu Recovery Centre, we believe that no life is too broken to be restored and no story too painful to be rewritten. We are a counseling and treatment center devoted to helping individuals overcome alcohol and drug addiction, as well as emotional, psychological, and mental health struggles.
                Our mission is to walk beside each person on their journey to healing; offering compassion, understanding, and practical support every step of the way. 
                <p>
                Whether you are beginning recovery or transitioning from rehabilitation, we provide a safe and welcoming environment where transformation begins.
                We understand that recovery is not just about quitting an addiction; it’s about rediscovering your purpose, rebuilding trust, and renewing your hope. Through counseling, community, and faith, we empower individuals to reclaim their dignity and find strength in connection; with themselves, with others, and with God.
               
                </p>

                </p>
                <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                At Iwacu Recovery Centre, we stand as a family of hope; believing that healing is possible, recovery is real, and every life is worth saving.
                </p>
              </div>

              <div className="hidden md:flex items-stretch justify-center flex-shrink-0">
                <div 
                  className={`w-[2px] relative transition-all duration-900 ease-out ${
                    isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                  }`}
                  style={{ 
                    background: 'linear-gradient(to bottom, #D61A78 0%, #3695D7 50%, #000000 100%)',
                    transitionDelay: isVisible ? "400ms" : "0ms"
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#D61A78' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: '#3695D7' }} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow-sm" />
                </div>
              </div>

              <div
                className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
              >
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  What We Do
                </h3>
                <ul className="grid gap-3">
                  {services.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 transition-all duration-700"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0px)" : "translateY(8px)",
                        transitionDelay: `${550 + idx * 80}ms`,
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                      }}
                    >
                      <span className="mt-1 text-yellow-300">•</span>
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
  );
}
