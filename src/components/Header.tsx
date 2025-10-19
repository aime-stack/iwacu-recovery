"use client";

import { useState } from "react";
import { useDonation } from "../contexts/DonationContext";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { openDonationModal } = useDonation();

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
    { name: "Programs", href: "/programs" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "School", href: "https://school.iwacurecovery.com", external: true },
    { name: "Blogs", href: "#blogs", hasDropdown: true },
    { name: "Contact Us", href: "/contact" },
  ];

  const blogCategories = [
    { 
      name: "Recovery Stories", 
      href: "/blog/recovery-stories", 
      color: "pink",
      icon: "💝"
    },
    { 
      name: "Mental Health", 
      href: "/blog/mental-health", 
      color: "purple",
      icon: "🧠"
    },
    { 
      name: "Education", 
      href: "/blog/education", 
      color: "blue",
      icon: "📚"
    },
    { 
      name: "Wellness Tips", 
      href: "/blog/wellness", 
      color: "green",
      icon: "🌱"
    },
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
                <span>Kigali-Kicukiro-Gahanga-Karembure, KK 32 Avenue</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary">📞</span>
                <a
                  href="tel:+250788772489"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  +250 788 772 489
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-brand-primary">📧</span>
                <a
                  href="mailto:irecoverycentre17@gmail.com"
                  className="hover:text-white transition-colors cursor-pointer"
                >
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
                  e.currentTarget.style.display = "none";
                  const nextElement = e.currentTarget.nextElementSibling;
                  if (nextElement instanceof HTMLElement) {
                    nextElement.style.display = "block";
                  }
                }}
              />
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-slate-800 hidden"
              >
                <circle cx="12" cy="16" r="4" fill="#FF6B9D" />
                <circle cx="20" cy="16" r="4" fill="#3695D7" />
                <path
                  d="M16 20 Q18 18, 20 20"
                  stroke="#6B5847"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M12 20 Q14 18, 16 20"
                  stroke="#6B5847"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M14 12 Q16 10, 18 12"
                  stroke="#6B5847"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M10 12 Q12 10, 14 12"
                  stroke="#6B5847"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
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
                    className="relative text-slate-700 hover:text-brand-primary font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-lg px-4 py-2 group block w-full cursor-pointer"
                    href={item.href}
                    {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {item.name}
                      {item.external && (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                      {item.hasDropdown && (
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-pink-50/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out w-full scale-95 group-hover:scale-100"></div>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                  </a>

                  {/* Dropdown for Blogs - Only Categories */}
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border border-slate-100">
                      <div className="py-2">
                        {blogCategories.map((category, index) => (
                          <div key={category.name}>
                            {index > 0 && <div className="border-t border-slate-100 my-1"></div>}
                            <a
                              href={category.href}
                              className={`block px-4 py-3 hover:bg-${category.color}-50 transition-colors cursor-pointer group/item`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{category.icon}</span>
                                <div className="flex-1">
                                  <div className={`text-slate-700 group-hover/item:text-${category.color}-600 font-medium transition-colors`}>
                                    {category.name}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    View all articles
                                  </div>
                                </div>
                                <svg 
                                  className={`w-4 h-4 text-slate-400 group-hover/item:text-${category.color}-600 group-hover/item:translate-x-1 transition-all`}
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Donate Button */}
            <button
              onClick={() => openDonationModal()}
              className="px-4 py-2 bg-pink-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 cursor-pointer"
            >
              💝 Donate
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-800 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 mt-1 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all duration-300 mt-1 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Now with max-height and scrolling */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-md max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Contact Info */}
            <div className="px-4 py-3 border-b border-slate-200 bg-slate-800/90 sticky top-0 z-10">
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📍</span>
                  <span className="text-xs">Rwanda-Kigali-Kicukiro-Gahanga-Karembure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📞</span>
                  <a
                    href="tel:+250788772489"
                    className="hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    +250 788 772 489
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-brand-primary">📧</span>
                  <a
                    href="mailto:irecoverycentre17@gmail.com"
                    className="hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    irecoverycentre17@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Donate Button - Sticky */}
            <div className="px-4 py-3 border-b border-slate-200 bg-white/95 sticky top-[120px] z-10">
              <button
                className="block w-full bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 cursor-pointer"
                onClick={() => {
                  handleNavClick();
                  openDonationModal();
                }}
              >
                💝 Donate Now
              </button>
            </div>

            {/* Mobile Navigation Links - Scrollable Content */}
            <ul className="py-4 space-y-2 pb-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-2 text-slate-800 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md cursor-pointer"
                        onClick={handleDropdownToggle}
                      >
                        <span className="font-medium">{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Mobile Dropdown for Blogs - Only Categories */}
                      {mobileDropdownOpen && (
                        <ul className="ml-2 mt-2 space-y-1 border-l-2 border-slate-200 pl-2">
                          {blogCategories.map((category) => (
                            <li key={category.name}>
                              <a
                                href={category.href}
                                className="flex items-center space-x-3 px-3 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors duration-200 cursor-pointer"
                                onClick={handleNavClick}
                              >
                                <span className="text-xl">{category.icon}</span>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{category.name}</div>
                                  <div className="text-xs text-slate-500">View all articles</div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex items-center justify-between px-4 py-2 text-slate-800 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:rounded-md cursor-pointer"
                      onClick={handleNavClick}
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.external && (
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Scroll Indicator at bottom */}
            <div className="text-center py-3 text-xs text-slate-400 border-t border-slate-200">
              Scroll for more options ↓
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}