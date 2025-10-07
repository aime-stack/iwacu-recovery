"use client";

import { useRef, useEffect, useState } from "react";

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: "🧠",
      title: "General Counseling",
      description: "Our experienced clinicians and therapists provide comprehensive mental health support to help clients overcome and cope with trauma, depression, stress, anxiety, and other related mental illnesses. We offer evidence-based therapeutic approaches tailored to each individual's unique needs and circumstances.",
      details: [
        "Individual therapy sessions with licensed professionals",
        "Evidence-based treatment approaches (CBT, DBT, EMDR)",
        "Trauma-informed care and support",
        "Crisis intervention and stabilization",
        "Mental health assessment and diagnosis",
        "Ongoing monitoring and treatment adjustment"
      ],
      gradient: "from-slate-700 to-black"
    },
    {
      icon: "🚑",
      title: "Emergency Help",
      description: "Our mobile crisis intervention team is available 24/7 to provide immediate support and assistance. When you're in crisis, we're here to help with professional, compassionate care at any time of day or night.",
      details: [
        "24/7 crisis hotline support",
        "Mobile crisis intervention team",
        "Emergency assessment and stabilization",
        "Immediate safety planning",
        "Coordination with emergency services",
        "Follow-up care and support"
      ],
      gradient: "from-red-600 to-red-700",
      phone: "+250 794 580 006"
    },
    {
      icon: "🧩",
      title: "Alcohol & Drugs Addiction Treatment",
      description: "Comprehensive addiction treatment services including individual therapy, group sessions, and family counseling. Our personalized approach combines evidence-based treatments with compassionate care to support your recovery journey.",
      details: [
        "Individual therapy sessions with addiction specialists",
        "Group therapy and peer support programs",
        "Family counseling and education",
        "Medication-assisted treatment (when appropriate)",
        "Relapse prevention planning",
        "Aftercare and ongoing support programs"
      ],
      gradient: "from-brand-primary to-blue-600"
    },
    {
      icon: "🎓",
      title: "Mentorship & Career Development",
      description: "Comprehensive career orientation and mentorship programs designed to support individuals during and after their recovery journey. We help rebuild lives through meaningful employment and personal development opportunities.",
      details: [
        "Career assessment and planning",
        "Skills development and training programs",
        "Job placement assistance",
        "Resume building and interview preparation",
        "Entrepreneurship support and guidance",
        "Ongoing mentorship and career coaching"
      ],
      gradient: "from-brand-secondary to-pink-600"
    },
  ];

  return (
    <section id="services" ref={servicesRef} className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            What Iwacu Recovery Centre Offers
          </h2>
          <p className={`text-lg text-white/90 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Comprehensive, compassionate care tailored to your recovery journey. Professional treatment, support, and guidance every step of the way.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Card Background with Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-90`}></div>
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Card Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon and Title */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex-1 mb-4">
                  <p className="text-white/95 text-sm leading-relaxed text-center" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {service.description}
                  </p>
                </div>

                {/* Emergency Button */}
                {service.phone && (
                  <div className="mb-4">
                    <a 
                      href={`tel:${service.phone}`} 
                      className="block w-full bg-red-600/90 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>📞</span>
                        Emergency: {service.phone}
                      </span>
                    </a>
                  </div>
                )}

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white text-center mb-3" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {service.details.slice(0, 3).map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        <span className="text-green-400 mt-0.5 flex-shrink-0 text-xs">✓</span>
                        <span className="text-xs leading-relaxed">{detail}</span>
                      </li>
                    ))}
                    {service.details.length > 3 && (
                      <li className="text-white/70 text-xs text-center italic">
                        +{service.details.length - 3} more services
                      </li>
                    )}
                  </ul>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-[#57241B] backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-lg inline-block" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Ready to Start Your Recovery Journey?
            </h3>
            <p className="text-white/90 mb-6" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Our comprehensive programs are designed to provide the support, guidance, and care you need to overcome addiction and rebuild your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="bg-white text-blue-600 py-3 px-8 rounded-xl font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Get Started Today
              </a>
              <a 
                href="tel:+250788772489" 
                className="bg-pink-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-pink-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Call Now: +250 788 772 489
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
