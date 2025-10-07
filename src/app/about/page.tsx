"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSky from "@/components/HeroSky";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [currentSlide, setCurrentSlide] = useState(0);

  const activities = [
    {
      date: "19, May 2025",
      title: "IWACU RECOVERY CENTRE, HIGH COMMISSION OF PAKISTAN SIGN PARTNERSHIP AGREEMENT",
      description: "Kigali, May 19, 2025– IWACU RECOVERY CENTRE (IRC) and THE HIGH COMMISSION OF PAKISTAN have signed a partnership agreement aimed at fostering collaboration in areas such as trade, sports, culture, psychosocial support, public health education, and community recovery initiatives."
    },
    {
      date: "10 May 2025",
      title: "Shoes donation to children",
      description: "In a recent community outreach effort, IWACU RECOVERY CENTRE coordinated a successful shoe donation activity targeting vulnerable children from parents affected by drug addiction. Vulnerable children receive daily care from \"Hope for Recovery Christian School\", located in Nyamata Sector, Bugesera District, Eastern Rwanda."
    },
    {
      date: "August, 2024",
      title: "Iwacu Recovery Centre Distributes School Kits to 287 Children in Bugesera District",
      description: "Iwacu Recovery Centre has successfully distributed school tool kits to 287 children in Bugesera District, marking the conclusion of the youth camps held during the summer holidays of 2024."
    }
  ];

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        ([entry]) => setIsVisible((prev) => ({ ...prev, [key]: entry.isIntersecting })),
        { threshold: 0.2 }
      );
      
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]!);
      }
    });

    return () => Object.values(observers).forEach((obs) => obs.disconnect());
  }, []);

  // Auto-slide carousel for activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activities.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [activities.length]);

  const setRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background that covers entire site */}
      <HeroSky />
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              About Iwacu Recovery Centre
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Dedicated to helping individuals and families affected by alcohol and drug addiction through comprehensive recovery programs and education.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Our Background & Description */}
          <section
            ref={setRef('background')}
            className="w-full rounded-3xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl"
          >
            <div className="px-6 py-12 md:py-16">
              <div className="flex flex-col md:flex-row gap-10 md:gap-8">
                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    isVisible['background'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['background'] ? "350ms" : "0ms" }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Our Background
                  </h2>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    The devastating impact of alcohol and other drugs abuse has been widely documented. Globally, all types of alcohol and drugs abuse among children, youths and adults pose serious public health risks and increasing social problems that contribute to the destruction of individuals, families and communities.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    In Rwanda, alcohol and drug addiction in most cases affects the youth. The government of Rwanda has set up strategies to fight against drug abuse including inventing and supporting rehabilitation centers. These centers also offer vocational skills to former drug users, involving civil societies in the matter, as well as decentralizing mental health services.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    After rehab, the best thing an individual can do to overcome alcohol addiction is to find support for ongoing recovery. As part of a community of individuals concerned about mental health and addiction-related issues, we are aware of the contrast between incidence of mental illness and inadequate provision of addiction recovery services.
                  </p>
                </div>

                <div className="hidden md:flex items-stretch justify-center flex-shrink-0">
                  <div 
                    className={`w-[2px] relative transition-all duration-900 ease-out ${
                      isVisible['background'] ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                    style={{ 
                      background: 'linear-gradient(to bottom, #D61A78 0%, #3695D7 50%, #000000 100%)',
                      transitionDelay: isVisible['background'] ? "400ms" : "0ms"
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#D61A78' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: '#3695D7' }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow-sm" />
                  </div>
                </div>
                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    isVisible['background'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['background'] ? "500ms" : "0ms" }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Our Description
                  </h3>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    The Iwacu Recovery Centre is a counseling and treatment center focusing on alcohol and drug abuse for people with addiction and related mental, psychological, and health problems. Furthermore, IRC helps young and adult people who are directly from rehabilitation centers and leads them on the way to recovery.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    At Iwacu Recovery Centre, whether someone seeks out the company of other recovering addicts or finds support in personal networks, it is imperative that you share your struggles with other people.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    The establishment of IRC also originated from the fact that addiction is a family disease whereby an individual suffering from addiction puts family members under a great deal of stress, disrupting routines and causing unsettling or even frightening experiences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services & Vision/Mission */}
          <section
            ref={setRef('services')}
            className="w-full rounded-3xl bg-gradient-to-br from-pink-900/80 to-red-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl"
          >
            <div className="px-6 py-12 md:py-16">
              <div className="flex flex-col md:flex-row gap-10 md:gap-8">
                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    isVisible['services'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['services'] ? "350ms" : "0ms" }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Our Services
                  </h2>
                  <ul className="grid gap-3">
                    {[
                      "Individual counseling sessions",
                      "Group counseling sessions",
                      "Family counseling sessions",
                      "Wellness activities",
                      "Partial inpatient program",
                      "Orientation into IRC Alumni"
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 transition-all duration-700"
                        style={{
                          opacity: isVisible['services'] ? 1 : 0,
                          transform: isVisible['services'] ? "translateY(0px)" : "translateY(8px)",
                          transitionDelay: `${400 + idx * 80}ms`,
                          textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                        }}
                      >
                        <span className="mt-1 text-yellow-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex items-stretch justify-center flex-shrink-0">
                  <div 
                    className={`w-[2px] relative transition-all duration-900 ease-out ${
                      isVisible['services'] ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                    style={{ 
                      background: 'linear-gradient(to bottom, #D61A78 0%, #3695D7 50%, #000000 100%)',
                      transitionDelay: isVisible['services'] ? "400ms" : "0ms"
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#D61A78' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: '#3695D7' }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow-sm" />
                  </div>
                </div>

                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-6 transition-all duration-900 ease-out ${
                    isVisible['services'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['services'] ? "500ms" : "0ms" }}
                >
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      Our Vision
                    </h3>
                    <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      IRC&apos;s vision is to restore people&apos;s dignity and healing through the circle of their family, friends and community.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                      Our Mission
                    </h3>
                    <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      IRC&apos;s mission is to help alcohol and drug addicts return to normal life by helping them reunite with their families and communities, regaining confidence in society, re-engaging in income generating activities, and helping them avoid what could lead to relapse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hope for Recovery Christian School */}
          <section
            ref={setRef('school')}
            className="w-full rounded-3xl bg-gradient-to-br from-green-900/80 to-teal-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`text-center mb-8 transition-all duration-900 ease-out ${
                  isVisible['school'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['school'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Hope for Recovery Christian School (HRCS)
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-10 md:gap-8">
                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    isVisible['school'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['school'] ? "350ms" : "0ms" }}
                >
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Hope for Recovery Christian School was founded in response to the urgent need for educational access among children from vulnerable families. During the holiday season 2023-2024, we successfully supported 287 children, highlighting the demand for our services.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    As we began the 2024-2025 school year, we took the necessary step to open an early childhood program, enrolling 50 vulnerable children in the school and another 70 children in the community.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    However, our school faces significant challenges in maintaining its operations. Many of our students come from families that struggle financially, making it difficult for them to afford basic education. This places a considerable burden on us to ensure that we can provide quality education and nutritious meals to support the children&apos;s overall development.
                  </p>
                </div>

                <div className="hidden md:flex items-stretch justify-center flex-shrink-0">
                  <div 
                    className={`w-[2px] relative transition-all duration-900 ease-out ${
                      isVisible['school'] ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                    style={{ 
                      background: 'linear-gradient(to bottom, #D61A78 0%, #3695D7 50%, #000000 100%)',
                      transitionDelay: isVisible['school'] ? "400ms" : "0ms"
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: '#D61A78' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: '#3695D7' }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black shadow-sm" />
                  </div>
                </div>

                <div
                  className={`flex-1 text-white text-sm md:text-base leading-relaxed space-y-4 transition-all duration-900 ease-out ${
                    isVisible['school'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['school'] ? "500ms" : "0ms" }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Our Approach
                  </h3>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    At our Recovery Centre, we have always focused on supporting parents with different issues related to alcohol or drugs through counseling and therapies aimed at fostering recovery. This time, however, we have also put our emphasis on prevention by providing crucial education for their children.
                  </p>
                  <p style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Guided by our school motto, <span className="font-semibold">&quot;Rise, Succeed, and Transform&quot;</span>, we believe that educating young minds about the dangers of alcoholism and drug use will empower them to develop a positive mindset. By addressing these issues early on, we aim to cultivate resilience and awareness, paving the way for a brighter, healthier future for the next generation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Support Our Mission */}
          <section
            ref={setRef('support')}
            className="w-full rounded-3xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`text-center mb-8 transition-all duration-900 ease-out ${
                  isVisible['support'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['support'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Support Our Mission
                </h2>
                <p className="text-lg text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  We are seeking support in various areas to enhance our functionality and meet the needs of our children. Your contribution can make a significant difference.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-900 ease-out ${
                    isVisible['support'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['support'] ? "350ms" : "0ms" }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <span className="text-3xl">📚</span>
                    Educational Support
                  </h3>
                  <ul className="space-y-2 text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> School supplies and uniforms</li>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> Classroom materials</li>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> Nutritional meals program</li>
                  </ul>
                </div>

                <div
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-900 ease-out ${
                    isVisible['support'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: isVisible['support'] ? "450ms" : "0ms" }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    <span className="text-3xl">💚</span>
                    Recovery Programs
                  </h3>
                  <ul className="space-y-2 text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> Counseling services</li>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> Family support programs</li>
                    <li className="flex gap-2"><span className="text-yellow-300">•</span> Vocational training initiatives</li>
                  </ul>
                </div>
              </div>

              <div
                className={`grid md:grid-cols-3 gap-6 transition-all duration-900 ease-out ${
                  isVisible['support'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['support'] ? "550ms" : "0ms" }}
              >
                <div className="bg-gradient-to-br from-pink-500/30 to-blue-500/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Partnership
                  </h4>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Collaborate with us to create sustainable solutions for addiction recovery and education.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Donations
                  </h4>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Financial contributions help us maintain and expand our programs.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h4 className="text-xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Volunteering
                  </h4>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Share your time and skills to support our mission.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities - Carousel */}
          <section
            ref={setRef('activities')}
            className="w-full rounded-3xl bg-gradient-to-br from-orange-900/80 to-amber-900/80 backdrop-blur-md ring-1 ring-white/30 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-12 md:py-16">
              <div
                className={`text-center mb-10 transition-all duration-900 ease-out ${
                  isVisible['activities'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: isVisible['activities'] ? "200ms" : "0ms" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Our Recent Activities
                </h2>
                <p className="text-lg text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Stay updated with our latest events and community impact
                </p>
              </div>

              {/* Carousel Container */}
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {activities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-xl px-4 py-2 text-sm font-semibold inline-block" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                {activity.date}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {activity.title}
                              </h3>
                              <p className="text-white/90 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-6">
                  {activities.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentSlide === idx 
                          ? 'w-8 h-3 bg-white' 
                          : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + activities.length) % activities.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % activities.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="pb-8">
            <div className="bg-[#57241B] rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-4 text-center" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-white/90 text-lg mb-6 text-center max-w-2xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Our compassionate team is here to support you every step of the way. Contact us today to learn more about our services and how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 py-3 px-8 rounded-xl font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                >
                  Contact Us Today
                </Link>
                <a 
                  href="tel:+250788772489" 
                  className="bg-pink-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-pink-700 hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                >
                  Call: +250 788 772 489
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Earth surface transition overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.15) 20%, rgba(184, 170, 133, 0.35) 40%, rgba(139, 115, 85, 0.65) 60%, rgba(101, 67, 33, 0.85) 80%, rgba(101, 67, 33, 0.95) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </main>
  );
}