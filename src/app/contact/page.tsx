"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSkyWrapper from "@/components/HeroSkyWrapper";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: ""
      });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };
  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      <HeroSkyWrapper />
      <Header />
      <div className="relative pt-32 md:pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              We are here to help. Reach out for support, information, or to schedule an appointment.
            </p>
          </div>
        </div>
      </div>
      <div className="relative z-10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> 
          <div className="mb-12 bg-gradient-to-r from-red-900/80 to-orange-900/80 backdrop-blur-md rounded-3xl border border-red-400/30 p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">🚨</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  24/7 Emergency Support Available
                </h3>
                <p className="text-white/95 text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  If you or someone you know is experiencing a mental health crisis, call our emergency line now.
                </p>
              </div>
              <a href="tel:+2500788772489" className="flex-shrink-0 bg-white text-red-600 py-4 px-8 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                +250 788 772 489
              </a>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">  
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-md rounded-3xl border border-white/30 p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Our Location
                      </h3>
                      <p className="text-white/95 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        Kigali, Rwanda<br />
                        Kicukiro-Gahanga-Karembure<br />
                        <span className="text-sm text-white/80">Directions provided upon appointment</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-full p-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Phone Numbers
                      </h3>
                      <div className="space-y-2">
                        <p className="text-white/95" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          <a href="tel:+2500788772489" className="hover:text-white transition-colors font-semibold cursor-pointer">
                            +250 788 772 489
                          </a>
                          <span className="block text-sm text-red-300">Emergency Line 24/7</span>
                        </p>
                        <p className="text-white/95" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          <a href="tel:+250788772489" className="hover:text-white transition-colors font-semibold cursor-pointer">
                            +250 788 772 489
                          </a>
                          <span className="block text-sm text-white/80">General Inquiries</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-full p-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Email Address
                      </h3>
                      <p className="text-white/95" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        <a href="mailto:irecoverycentre17@gmail.com" className="hover:text-white transition-colors font-semibold break-all cursor-pointer">
                          irecoverycentre17@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Office Hours
                      </h3>
                      <div className="text-white/95 space-y-1.5 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        <p className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span className="font-semibold">8:00 AM - 6:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Saturday:</span>
                          <span className="font-semibold">9:00 AM - 4:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-semibold text-orange-300">Emergency Only</span>
                        </p>
                        <p className="pt-2 border-t border-white/20 text-red-300 font-bold">
                          Emergency Services: 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://wa.me/250794580006" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-md rounded-2xl border border-green-400/30 p-6 text-center shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    WhatsApp
                  </h3>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Chat with us
                  </p>
                </a>

                <a href="tel:+250794580006" className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md rounded-2xl border border-purple-400/30 p-6 text-center shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Book Visit
                  </h3>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Schedule now
                  </p>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 backdrop-blur-md rounded-3xl border border-white/30 p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Send Us a Message
              </h2>
              
              {submitStatus === "success" && (
                <div className="bg-green-600/90 backdrop-blur-sm text-white p-4 rounded-xl mb-6 border border-green-400/30 font-semibold">
                  Thank you! We will respond within 24 hours.
                </div>
              )}

              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-text"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-text"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-text"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="psychoeducation">Counselling</option>
                      <option value="counseling">Alcoholism</option>
                      <option value="addiction">Narcotics</option>
                      <option value="psychosocial">Other Addictions</option>

                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium cursor-text"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border-2 border-white/30 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-vertical font-medium cursor-text"
                    placeholder="Please share details about your inquiry..."
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] z-[1]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.15) 20%, rgba(184, 170, 133, 0.35) 40%, rgba(139, 115, 85, 0.65) 60%, rgba(101, 67, 33, 0.85) 80%, rgba(101, 67, 33, 0.95) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </main>
  );
}