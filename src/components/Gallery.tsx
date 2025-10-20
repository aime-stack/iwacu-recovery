"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * DESIGN CHANGES:
 * 1. Matched the Programs page color scheme: slate-900/70-80 backgrounds with white text
 * 2. Added the same backdrop-blur-md and ring effects for glassmorphism
 * 3. Implemented gradient accents (blue-to-pink, purple) matching Programs page
 * 4. Added intersection observer animations like Programs page
 * 5. Improved spacing and typography to match the Programs page style
 * 6. Enhanced hover effects with scale and shadow transitions
 * 7. Made the lightbox more immersive with better backdrop and animations
 * 8. Fixed image implementation to match Programs page error handling
 * 9. Added human placeholder SVG for missing images
 * 10. Updated filter behavior: "All" shows animated scrolling, specific categories show static grid
 */

// Define your gallery images here
const galleryImages = [
  {
    id: 1,
    src: "/gallery/event1.jpg",
    alt: "Community Gathering",
    category: "Events",
    title: "Annual Recovery Celebration",
    description: "Celebrating milestones and victories in recovery"
  },
  {
    id: 2,
    src: "/gallery/therapy1.jpg",
    alt: "Therapy Session",
    category: "Programs",
    title: "Group Therapy Session",
    description: "Building community through shared healing"
  },
  {
    id: 3,
    src: "/gallery/facility1.jpg",
    alt: "Recovery Centre Building",
    category: "Facilities",
    title: "Main Building",
    description: "A safe haven for transformation"
  },
  {
    id: 4,
    src: "/gallery/activity1.jpg",
    alt: "Wellness Activity",
    category: "Activities",
    title: "Mindfulness Workshop",
    description: "Discovering peace through practice"
  },
  {
    id: 5,
    src: "/gallery/event2.jpg",
    alt: "Graduation Ceremony",
    category: "Events",
    title: "Program Graduation",
    description: "New beginnings and renewed hope"
  },
  {
    id: 6,
    src: "/gallery/therapy2.jpg",
    alt: "Individual Counseling",
    category: "Programs",
    title: "One-on-One Counseling",
    description: "Personalized support for your journey"
  },
  {
    id: 7,
    src: "/gallery/facility2.jpg",
    alt: "Therapy Room",
    category: "Facilities",
    title: "Counseling Room",
    description: "Comfortable spaces for healing conversations"
  },
  {
    id: 8,
    src: "/gallery/activity2.jpg",
    alt: "Art Therapy",
    category: "Activities",
    title: "Creative Expression Session",
    description: "Healing through artistic discovery"
  },
  {
    id: 9,
    src: "/gallery/event3.jpg",
    alt: "Community Event",
    category: "Events",
    title: "Community Outreach",
    description: "Connecting with our community"
  },
  {
    id: 10,
    src: "/gallery/therapy3.jpg",
    alt: "Family Therapy",
    category: "Programs",
    title: "Family Counseling",
    description: "Healing together as a family"
  },
  {
    id: 11,
    src: "/gallery/facility3.jpg",
    alt: "Recreation Area",
    category: "Facilities",
    title: "Wellness Space",
    description: "A place for reflection and growth"
  },
  {
    id: 12,
    src: "/gallery/",
    alt: "Music Therapy",
    category: "Activities",
    title: "Music Therapy Session",
    description: "Finding harmony through music"
  },
];

const categories = [
  { name: "All", icon: "🌟", gradient: "from-purple-600 to-pink-600" },
  { name: "Events", icon: "🎉", gradient: "from-blue-600 to-cyan-600" },
  { name: "Programs", icon: "💬", gradient: "from-purple-600 to-pink-600" },
  { name: "Facilities", icon: "🏢", gradient: "from-green-600 to-teal-600" },
  { name: "Activities", icon: "🎨", gradient: "from-orange-600 to-amber-600" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  // Intersection Observer for animations (matching Programs page)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section - Matching Programs page style */}
      <div className="relative pt-32 md:pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 animate-fadeInUp" 
              style={{ 
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out'
              }}
            >
              Our Gallery
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium animate-fadeInUp" 
              style={{ 
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}
            >
              Capturing moments of hope, healing, and transformation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content with glassmorphism container */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Gallery Container - Matching Programs page card style */}
          <div 
            ref={galleryRef}
            className="rounded-3xl bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-12 md:py-16">
              
              {/* Category Filter - Enhanced with icons and gradients */}
              <div 
                className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-900 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
              >
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.name
                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span style={{ textShadow: selectedCategory === category.name ? '0 1px 3px rgba(0,0,0,0.3)' : 'none' }}>
                        {category.name}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Conditional Gallery Display */}
              {selectedCategory === "All" ? (
                /* Infinite Scrolling Gallery - Only for "All" category */
                <div className="space-y-6 overflow-hidden">
                  {/* Row 1 - Left to Right */}
                  <div className="relative">
                    <div className="flex gap-6 animate-scroll-left">
                      {/* Duplicate images for seamless loop */}
                      {[...filteredImages, ...filteredImages].map((image, idx) => (
                        <div
                          key={`row1-${idx}`}
                          className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 hover:border-white/30 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-[280px] sm:w-[320px] ${
                            isVisible ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ 
                            transitionDelay: isVisible ? `${idx * 50}ms` : "0ms",
                          }}
                          onClick={() => setSelectedImage(image)}
                        >
                          {/* Image Container */}
                          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800';
                                  placeholder.innerHTML = `
                                    <svg class="w-24 h-24 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  `;
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <p className="text-white text-sm font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                Click to view
                              </p>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 bg-gradient-to-br from-slate-900/60 to-gray-900/60">
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                                {image.category}
                              </span>
                            </div>
                            <h3 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300 mb-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              {image.title}
                            </h3>
                            <p className="text-white/70 text-sm line-clamp-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                              {image.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2 - Right to Left (Opposite Direction) */}
                  <div className="relative">
                    <div className="flex gap-6 animate-scroll-right">
                      {[...filteredImages, ...filteredImages].map((image, idx) => (
                        <div
                          key={`row2-${idx}`}
                          className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 hover:border-white/30 transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 w-[280px] sm:w-[320px] ${
                            isVisible ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ 
                            transitionDelay: isVisible ? `${100 + idx * 50}ms` : "0ms",
                          }}
                          onClick={() => setSelectedImage(image)}
                        >
                          {/* Image Container */}
                          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const placeholder = document.createElement('div');
                                  placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800';
                                  placeholder.innerHTML = `
                                    <svg class="w-24 h-24 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                  `;
                                  parent.appendChild(placeholder);
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <p className="text-white text-sm font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                Click to view
                              </p>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 bg-gradient-to-br from-slate-900/60 to-gray-900/60">
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                                {image.category}
                              </span>
                            </div>
                            <h3 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 mb-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                              {image.title}
                            </h3>
                            <p className="text-white/70 text-sm line-clamp-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                              {image.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Static Grid Gallery - For filtered categories */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image, idx) => (
                    <div
                      key={`static-${image.id}`}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 hover:border-white/30 transform hover:scale-105 hover:-translate-y-2 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ 
                        transitionDelay: isVisible ? `${idx * 50}ms` : "0ms",
                      }}
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* Image Container */}
                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800';
                              placeholder.innerHTML = `
                                <svg class="w-24 h-24 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              `;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <p className="text-white text-sm font-medium" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                            Click to view
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-gradient-to-br from-slate-900/60 to-gray-900/60">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                            {image.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300 mb-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          {image.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State with improved styling */}
              {filteredImages.length === 0 && (
                <div className="text-center py-20">
                  <svg className="w-32 h-32 mx-auto mb-6 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    No images found
                  </h3>
                  <p className="text-white/70 text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Try selecting a different category
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal with backdrop blur - FULLY RESPONSIVE */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button - responsive positioning */}
          <button
            className="fixed top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 md:p-3 hover:scale-110 hover:rotate-90 shadow-2xl z-50 touch-manipulation"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Responsive container with proper padding */}
          <div 
            className="w-full max-w-7xl mx-auto px-4 py-20 md:py-8 animate-scaleIn flex flex-col items-center justify-center min-h-full" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container - responsive aspect ratio and sizing */}
            <div className="relative w-full max-w-5xl bg-gradient-to-br from-slate-900 to-gray-900 rounded-lg md:rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              {/* Responsive aspect ratio container */}
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <div className="absolute inset-0 flex items-center justify-center p-2 md:p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-contain"
                      priority
                      quality={90}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900';
                          placeholder.innerHTML = `
                            <svg class="w-24 h-24 md:w-40 md:h-40 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          `;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced metadata display - responsive */}
            <div className="w-full max-w-5xl mt-4 md:mt-6 bg-gradient-to-br from-slate-900/90 to-gray-900/90 backdrop-blur-md rounded-lg md:rounded-2xl p-4 md:p-6 ring-1 ring-white/20 shadow-xl">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
                  {selectedImage.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {selectedImage.title}
              </h3>
              <p className="text-base md:text-lg text-white/80 mb-1 md:mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {selectedImage.description}
              </p>
              <p className="text-sm text-white/60" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {selectedImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom animations matching Programs page */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}