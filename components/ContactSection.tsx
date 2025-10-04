"use client";

import { useRef, useEffect, useState } from "react";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={contactRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(1200px 300px at 10% -10%, rgba(255,255,255,0.3), rgba(255,255,255,0))' }} />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Ready to start your recovery?
              </h2>
              <p className="text-white/90 text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Book an appointment with our team today. Confidential and compassionate support.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <a 
                href="tel:+250794580006" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                📞 Call Now
              </a>
              <a 
                href="https://wa.me/250794580006" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-100 text-emerald-900 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              >
                💬 WhatsApp
              </a>
              <a 
                href="mailto:info@iwacurecovery.rw?subject=Appointment%20Request" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 text-white ring-1 ring-white/40 font-semibold shadow-md hover:bg-white/20 hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
