"use client";

import { useState } from "react";
import Header from "../../../components/Header";
import HeroSky from "../../../components/HeroSky";
import Footer from "../../../components/Footer";

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
    
    // Simulate form submission
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
    }, 2000);
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background that covers entire site */}
      <HeroSky />
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              We&apos;re here to help. Reach out to us for support, information, or to schedule an appointment. Your journey to recovery starts with a single step.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary rounded-full p-3 flex-shrink-0">
                      <span className="text-white text-xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Address
                      </h3>
                      <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        Kigali, Rwanda<br />
                        Near Kigali Convention Centre<br />
                        <span className="text-sm text-white/70">We provide directions upon appointment confirmation</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary rounded-full p-3 flex-shrink-0">
                      <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Phone Numbers
                      </h3>
                      <div className="space-y-2">
                        <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          <a href="tel:+250794580006" className="hover:text-white transition-colors">
                            +250 794 580 006
                          </a>
                          <span className="text-sm text-red-300 ml-2">(Emergency 24/7)</span>
                        </p>
                        <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          <a href="tel:+250788123456" className="hover:text-white transition-colors">
                            +250 788 123 456
                          </a>
                          <span className="text-sm text-white/70 ml-2">(General inquiries)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary rounded-full p-3 flex-shrink-0">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Email
                      </h3>
                      <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        <a href="mailto:info@iwacurecovery.rw" className="hover:text-white transition-colors">
                          info@iwacurecovery.rw
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-primary rounded-full p-3 flex-shrink-0">
                      <span className="text-white text-xl">🕒</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Hours of Operation
                      </h3>
                      <div className="text-white/90 space-y-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Emergency services only</p>
                        <p className="text-red-300 font-semibold">Emergency: 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl mb-4">🚨</div>
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Emergency Support
                  </h3>
                  <p className="text-red-100 mb-6" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    If you or someone you know is in immediate danger or experiencing a mental health crisis, please call our emergency line immediately.
                  </p>
                  <a 
                    href="tel:+250794580006" 
                    className="inline-flex items-center gap-2 bg-white text-red-600 py-4 px-8 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <span>📞</span>
                    Call Emergency: +250 794 580 006
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Send us a Message
              </h2>
              
              {submitStatus === "success" && (
                <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
                  Thank you for your message! We&apos;ll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      style={{ color: 'white' }}
                    >
                      <option value="" style={{ color: '#1e293b', backgroundColor: 'white' }}>Select a service</option>
                      <option value="general-counseling" style={{ color: '#1e293b', backgroundColor: 'white' }}>General Counseling</option>
                      <option value="emergency-help" style={{ color: '#1e293b', backgroundColor: 'white' }}>Emergency Help</option>
                      <option value="addiction-treatment" style={{ color: '#1e293b', backgroundColor: 'white' }}>Alcohol & Drugs Addiction Treatment</option>
                      <option value="mentorship" style={{ color: '#1e293b', backgroundColor: 'white' }}>Mentorship & Career Development</option>
                      <option value="other" style={{ color: '#1e293b', backgroundColor: 'white' }}>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-vertical"
                    placeholder="Please provide details about your inquiry or how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center shadow-xl">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                WhatsApp
              </h3>
              <p className="text-white/90 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Chat with us on WhatsApp for quick responses
              </p>
              <a 
                href="https://wa.me/250794580006" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                <span>💬</span>
                Start Chat
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center shadow-xl">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Schedule Appointment
              </h3>
              <p className="text-white/90 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Book a consultation with our team
              </p>
              <a 
                href="tel:+250794580006" 
                className="inline-flex items-center gap-2 bg-brand-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>📅</span>
                Call to Book
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center shadow-xl">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                Visit Our Center
              </h3>
              <p className="text-white/90 mb-4" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Come see us in person for a tour
              </p>
              <a 
                href="tel:+250794580006" 
                className="inline-flex items-center gap-2 bg-brand-secondary text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                <span>🏥</span>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}