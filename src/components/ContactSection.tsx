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
    <section id="contact" ref={contactRef} className="relative z-10 py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ backgroundColor: '#7E4734' }}>
          
          {/* Subtle overlay gradient for depth */}
          <div className="absolute inset-0 opacity-10" style={{ 
            background: 'radial-gradient(1200px 400px at 20% 0%, rgba(255,255,255,0.4), transparent), linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' 
          }} />
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5" style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }} />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Ready to start your recovery?
              </h2>
              <p className="text-white/95 text-lg leading-relaxed">
                Book an appointment with our team today. Confidential and compassionate support.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <a 
                href="tel:+250794580006" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#7E4734] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                📞 Call Now
              </a>
              <a 
                href="https://wa.me/250794580006" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-emerald-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
              >
                💬 WhatsApp
              </a>
              <a 
                href="mailto:info@iwacurecovery.rw?subject=Appointment%20Request" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white ring-1 ring-white/40 font-semibold shadow-lg hover:bg-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
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