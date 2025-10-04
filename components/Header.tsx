"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Blogs", href: "#blogs", hasDropdown: true },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sky-200/30 backdrop-blur-md border-b border-sky-300/20">
      {/* Top bar with contact info - hidden on mobile */}
      <div className="hidden md:block bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary">📍</span>
                <span>Kigali, Rwanda - Near Kigali Convention Centre</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary">📞</span>
                <a href="tel:+250788772489" className="hover:text-white transition-colors">
                  +250 788 772 489
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary">📧</span>
                <a href="mailto:irecoverycentre17@gmail.com" className="hover:text-white transition-colors">
                  irecoverycentre17@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0 border-2 border-slate-200">
              <Image 
                src="/logo.png" 
                alt="Iwacu Recovery Centre Logo" 
                width={40}
                height={40}
                className="object-contain"
                onError={(e) => {
                  // Fallback to SVG if image fails to load
                  e.currentTarget.style.display = 'none';
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextElement) {
                    nextElement.style.display = 'block';
                  }
                }}
              />
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-slate-800 hidden">
                {/* Two human figures holding hands */}
                <circle cx="12" cy="16" r="4" fill="#FF6B9D" />
                <circle cx="20" cy="16" r="4" fill="#3695D7" />
                <path d="M16 20 Q18 18, 20 20" stroke="#6B5847" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M12 20 Q14 18, 16 20" stroke="#6B5847" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M14 12 Q16 10, 18 12" stroke="#6B5847" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M10 12 Q12 10, 14 12" stroke="#6B5847" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-base sm:text-lg text-slate-800">
              <span className="text-slate-900">Iwacu </span>
              <span className="text-pink-500">Recovery </span>
              <span className="text-blue-500">Centre</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Navigation Links */}
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <a 
                    className="relative text-slate-800 hover:text-brand-primary font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-lg px-4 py-2 rounded-lg group"
                    href={item.href}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {item.name}
                      {item.hasDropdown && (
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </a>
                  
                  {/* Dropdown for Blogs */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-2">
                        <a href="#blog-recovery" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors">
                          Recovery Stories
                        </a>
                        <a href="#blog-mental-health" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors">
                          Mental Health
                        </a>
                        <a href="#blog-addiction" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors">
                          Addiction Treatment
                        </a>
                        <a href="#blog-wellness" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors">
                          Wellness Tips
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Donate Button */}
            <a 
              href="#sponsor" 
              className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              💝 Donate
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span 
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current transition-all duration-300 mt-1 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current transition-all duration-300 mt-1 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-md">
            {/* Mobile Contact Info */}
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-800/90">
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📍</span>
                  <span>Kigali, Rwanda - Near Kigali Convention Centre</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📞</span>
                  <a href="tel:+250788772489" className="hover:text-white transition-colors">
                    +250 788 772 489
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📧</span>
                  <a href="mailto:irecoverycentre17@gmail.com" className="hover:text-white transition-colors">
                    irecoverycentre17@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Mobile Donate Button */}
            <div className="px-4 py-3 border-b border-slate-200">
              <a 
                href="#sponsor" 
                className="block w-full bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                onClick={handleNavClick}
              >
                💝 Donate Now
              </a>
            </div>
            
            {/* Mobile Navigation Links */}
            <ul className="py-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.hasDropdown ? (
                    <button
                      className="w-full flex items-center justify-between px-4 py-2 text-slate-800 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md"
                      onClick={handleDropdownToggle}
                    >
                      <span>{item.name}</span>
                      <svg className={`w-4 h-4 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a 
                      className="block px-4 py-2 text-slate-800 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md"
                      href={item.href}
                      onClick={handleNavClick}
                    >
                      {item.name}
                    </a>
                  )}
                  
                  {/* Mobile Dropdown for Blogs */}
                  {item.hasDropdown && mobileDropdownOpen && (
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>
                        <a href="#blog-recovery" className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" onClick={handleNavClick}>
                          Recovery Stories
                        </a>
                      </li>
                      <li>
                        <a href="#blog-mental-health" className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" onClick={handleNavClick}>
                          Mental Health
                        </a>
                      </li>
                      <li>
                        <a href="#blog-addiction" className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" onClick={handleNavClick}>
                          Addiction Treatment
                        </a>
                      </li>
                      <li>
                        <a href="#blog-wellness" className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" onClick={handleNavClick}>
                          Wellness Tips
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}