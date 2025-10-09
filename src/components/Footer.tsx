"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      {/* Earth surface transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-slate-800/30 to-slate-800" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0 border-2 border-slate-200 mr-3">
                <Image 
                  src="/logo.png" 
                  alt="Iwacu Recovery Centre Logo" 
                  width={32}
                  height={32}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'block';
                    }
                  }}
                />
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-slate-800 hidden">
                  <circle cx="12" cy="16" r="4" fill="#FF6B9D" />
                  <circle cx="20" cy="16" r="4" fill="#3695D7" />
                  <path d="M16 20 Q18 18, 20 20" stroke="#6B5847" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M12 20 Q14 18, 16 20" stroke="#6B5847" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M14 12 Q16 10, 18 12" stroke="#6B5847" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M10 12 Q12 10, 14 12" stroke="#6B5847" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Iwacu Recovery Centre</h3>
                <p className="text-brand-primary text-sm font-medium">Hope. Healing. Renewal.</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed text-sm max-w-md">
              Dedicated to helping individuals and families overcome addiction through compassionate counseling, 
              professional treatment, and comprehensive support services.
            </p>
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://www.facebook.com/share/19pes2jqEx/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/iwacurecovery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/iwacurecovery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@iwacurecoverytv6599?si=gw23G3wlyJAGT06z" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Youtube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Embedded Map */}
            <div className="rounded-lg overflow-hidden shadow-lg border-2 border-slate-700 max-w-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.488356899784!2d30.060199!3d-1.956389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTcnMjMuMCJTIDMwwrAwMyczNi43IkU!5e0!3m2!1sen!2srw!4v1234567890"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Iwacu Recovery Centre Location - KK 32 Avenue, Kigali"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="bg-slate-700/50 px-3 py-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span className="font-medium">KK 32 Avenue, Kigali, Rwanda</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm">
                  Programs
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#sponsor" className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm">
                Give Hope to a Life in Need
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-brand-primary rounded-full p-1.5 flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    KK 32 Avenue<br />
                    Kigali, Rwanda<br />
                    <span className="text-xs text-slate-400">Kicukiro-Karembure</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-brand-primary rounded-full p-1.5 flex-shrink-0">
                  <span className="text-white text-sm">📞</span>
                </div>
                <div>
                  <a 
                    href="tel:+250788772489" 
                    className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm font-medium"
                  >
                    +250 788 772 489
                  </a>
                  <p className="text-red-300 text-xs">Emergency 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-brand-primary rounded-full p-1.5 flex-shrink-0">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div>
                  <a 
                    href="mailto:irecoverycentre17@gmail.com" 
                    className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-sm"
                  >
                    irecoverycentre17@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-brand-primary rounded-full p-1.5 flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">🕒</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 4:00 PM<br />
                    <span className="text-red-300 font-medium text-xs">Emergency: 24/7</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency contact banner */}
        <div className={`mt-8 p-4 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-600/30 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-primary/20 rounded-full p-2">
                <div className="text-xl">🚨</div>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Emergency Support Available 24/7</h3>
                <p className="text-slate-300 text-xs">
                  Immediate assistance for mental health crises and addiction emergencies
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a 
                href="tel:+250788772489" 
                className="bg-brand-primary text-white px-4 py-2 rounded-lg text-xs font-medium text-center hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md"
              >
                📞 Call: +250 788 772 489
              </a>
              <a 
                href="https://wa.me/250788772489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-medium text-center hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-md"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={`border-t border-slate-700 mt-8 pt-6 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-3 md:mb-0">
              © {currentYear} Iwacu Recovery Centre. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-brand-primary transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-brand-primary transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-slate-400 hover:text-brand-primary transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}