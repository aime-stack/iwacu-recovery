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
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
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
                    e.currentTarget.style.display = "none";
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) nextElement.style.display = "block";
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
              Dedicated to helping individuals and families overcome addiction through compassionate counseling, professional treatment, and comprehensive support services.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-3 mb-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19pes2jqEx/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter (X) */}
              <a
                href="https://x.com/IWACURECOVERY?t=hMEW47cQMA1yZhM8IuZDxA&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Twitter (X)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/iwacurecoverycentre?igsh=MTE4b3ljZTBuamtqcw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.774.128 4.642.385 3.678 1.35 2.713 2.315 2.456 3.447 2.398 4.725 2.34 6.005 2.328 6.414 2.328 12s.012 5.995.07 7.275c.058 1.278.315 2.41 1.28 3.375.965.965 2.097 1.222 3.375 1.28 1.28.058 1.689.07 7.275.07s5.995-.012 7.275-.07c1.278-.058 2.41-.315 3.375-1.28.965-.965 1.222-2.097 1.28-3.375.058-1.28.07-1.689.07-7.275s-.012-5.995-.07-7.275c-.058-1.278-.315-2.41-1.28-3.375-.965-.965-2.097-1.222-3.375-1.28C17.995.012 17.586 0 12 0z" />
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@iwacurecoverytv6599?si=gw23G3wlyJAGT06z"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.99 2.99 0 00-2.113-2.116C19.28 3.5 12 3.5 12 3.5s-7.28 0-9.385.57a2.99 2.99 0 00-2.113 2.116A31.434 31.434 0 000 12a31.434 31.434 0 00.502 5.814 2.99 2.99 0 002.113 2.116C4.72 20.5 12 20.5 12 20.5s7.28 0 9.385-.57a2.99 2.99 0 002.113-2.116A31.434 31.434 0 0024 12a31.434 31.434 0 00-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@iwacu.recovery.ce?_t=ZM-90NQDog63mS&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-primary hover:scale-110 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.198 3.215 9.597 7.776 11.283v-7.98h-2.34v-3.303h2.34v-2.517c0-2.318 1.383-3.596 3.497-3.596.998 0 1.842.074 2.091.107v2.423h-1.434c-1.125 0-1.344.535-1.344 1.32v1.662h2.688l-.35 3.303h-2.338v7.98c4.561-1.686 7.776-6.085 7.776-11.283 0-6.627-5.373-12-12-12z" />
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
                    KK 32 Avenue
                    <br />
                    Kigali, Rwanda
                    <br />
                    <span className="text-xs text-slate-400">Kicukiro-Gahanga-Karembure</span>
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
                    Mon - Fri: 8:00 AM - 6:00 PM
                    <br />
                    Sat: 9:00 AM - 4:00 PM
                    <br />
                    <span className="text-red-300 font-medium text-xs">Emergency: 24/7</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency contact banner */}
        <div
          className={`mt-8 p-4 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-600/30 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-primary/20 rounded-full p-2">
                <div className="text-xl">🚨</div>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">Emergency Support Available 24/7</h3>
                <p className="text-slate-300 text-xs"> Immediate assistance for mental health crises and addiction emergencies </p>
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
        <div
          className={`border-t border-slate-700 mt-8 pt-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
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
