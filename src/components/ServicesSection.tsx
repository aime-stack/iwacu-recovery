"use client";

import React, { useEffect, useRef, useState } from "react";

type Service = {
  icon: string;
  title: string;
  description: string;
  details: string[];
  gradient: string;
  phone?: string;
};

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (servicesRef.current) observer.observe(servicesRef.current);
    return () => observer.disconnect();
  }, []);

  // Helper to produce a safe tel: href (removes spaces and non-digit chars but keeps a leading +)
  const makeTel = (phone?: string) => {
    if (!phone) return "#";
    const cleaned = phone.replace(/[^\d+]/g, "");
    return `tel:${cleaned}`;
  };

  const services: Service[] = [
    {
      icon: "🧠",
      title: "General Counseling",
      description:
        "Our experienced clinicians and therapists provide comprehensive mental health support to help clients overcome and cope with trauma, depression, stress, anxiety, and other related mental illnesses.",
      details: [
        "Individual therapy sessions with licensed professionals",
        "Evidence-based treatment approaches (CBT, DBT, EMDR)",
        "Trauma-informed care and support",
        "Crisis intervention and stabilization",
        "Mental health assessment and diagnosis",
        "Ongoing monitoring and treatment adjustment",
      ],
      gradient: "from-slate-700 to-black",
    },
    {
      icon: "🧩",
      title: "Alcohol & Drugs Addiction Treatment",
      description:
        "Comprehensive addiction treatment services including individual therapy, group sessions, and family counseling. Our personalized approach combines evidence-based treatments with compassionate care.",
      details: [
        "Individual therapy sessions with addiction specialists",
        "Group therapy and peer support programs",
        "Family counseling and education",
        "Medication-assisted treatment (when appropriate)",
        "Relapse prevention planning",
        "Aftercare and ongoing support programs",
      ],
      gradient: "from-brand-primary to-blue-600",
    },
    {
      icon: "🎓",
      title: "Mentorship & Career Development",
      description:
        "Comprehensive career orientation and mentorship programs designed to support individuals during and after their recovery journey. We help rebuild lives through meaningful employment.",
      details: [
        "Career assessment and planning",
        "Skills development and training programs",
        "Job placement assistance",
        "Resume building and interview preparation",
        "Entrepreneurship support and guidance",
        "Ongoing mentorship and career coaching",
      ],
      gradient: "from-brand-secondary to-pink-600",
    },
    {
      icon: "🚑",
      title: "Emergency Help",
      description:
        "Our mobile crisis intervention team is available 24/7 to provide immediate support and assistance. When you're in crisis, we're here to help with professional, compassionate care.",
      details: [
        "24/7 crisis hotline support",
        "Mobile crisis intervention team",
        "Emergency assessment and stabilization",
        "Immediate safety planning",
        "Coordination with emergency services",
        "Follow-up care and support",
      ],
      gradient: "from-blue-700 to-teal-600",
      phone: "+250 788 772 489",
    },
  ];

  return (
    <section id="services" ref={servicesRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with reduced font sizes */}
        <div className="text-center mb-12">
          <h2
            className={`text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            What Iwacu Recovery Centre Offers
          </h2>
          <p
            className={`text-base md:text-lg text-white/90 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            Comprehensive, compassionate care tailored to your recovery journey. Professional treatment, support, and guidance every step of the way.
          </p>
        </div>

        {/* Cards with reduced sizes */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-black/20" />

              <div className="relative p-5 h-full flex flex-col">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                    {service.title}
                  </h3>
                </div>

                <div className="flex-1 mb-3">
                  <p className="text-white/95 text-xs leading-relaxed text-center" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    {service.description}
                  </p>
                </div>

                {/* Emergency Phone Button (if present) */}
                {service.phone && (
                  <div className="mb-3">
                    <a
                      href={makeTel(service.phone)}
                      aria-label={`Call emergency ${service.phone}`}
                      className="block w-full bg-blue-600/90 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-xl">📞</span>
                        <div className="text-left">
                          <span className="block text-[9px] leading-none text-white/95">
                            Emergency
                          </span>
                          <span className="block text-xs font-semibold text-white">
                            {service.phone}
                          </span>
                        </div>
                      </span>
                    </a>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-white text-center mb-2" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {service.details.slice(0, 3).map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-white/90" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                        <span className="text-green-400 mt-0.5 flex-shrink-0 text-[10px]">✓</span>
                        <span className="text-[11px] leading-relaxed">{detail}</span>
                      </li>
                    ))}

                    {service.details.length > 3 && (
                      <li className="text-white/70 text-[10px] text-center italic">+{service.details.length - 3} more services</li>
                    )}
                  </ul>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}