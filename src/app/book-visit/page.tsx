"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSkyWrapper from "@/components/HeroSkyWrapper";
import Footer from "@/components/Footer";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  reasonForVisit: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function BookVisitPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    reasonForVisit: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please select a preferred date";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Please select a preferred time";
    }

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Please tell us the reason for your visit";
    } else if (formData.reasonForVisit.trim().length < 10) {
      newErrors.reasonForVisit = "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - Replace with your actual backend endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        reasonForVisit: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
  };

  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      <HeroSkyWrapper />
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 md:pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Book Your Visit
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Take the first step on your journey to recovery. Schedule a visit with our compassionate team.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Information Card */}
          <div className="mb-8 bg-gradient-to-r from-blue-900/80 to-teal-900/80 backdrop-blur-md rounded-3xl border border-blue-400/30 p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-5xl">📅</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                  What to Expect
                </h3>
                <p className="text-white/95 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Our team will contact you within 24 hours to confirm your appointment and answer any questions you may have about your visit.
                </p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 backdrop-blur-md rounded-3xl border border-white/30 p-8 md:p-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Schedule Your Appointment
            </h2>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="bg-green-600/90 backdrop-blur-sm text-white p-5 rounded-xl mb-8 border border-green-400/30 font-semibold flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-bold mb-1">Booking Request Received!</p>
                  <p className="text-sm text-white/90">Thank you for scheduling a visit. We&apos;ll be in touch within 24 hours to confirm your appointment.</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                    errors.fullName ? 'border-red-400' : 'border-white/30'
                  } text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium transition-all duration-300 cursor-text`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-2 text-red-200 text-sm font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid gap-6 md:grid-cols-2">
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
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                      errors.email ? 'border-red-400' : 'border-white/30'
                    } text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium transition-all duration-300 cursor-text`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-red-200 text-sm font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                      errors.phone ? 'border-red-400' : 'border-white/30'
                    } text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium transition-all duration-300 cursor-text`}
                    placeholder="+250 XXX XXX XXX"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-red-200 text-sm font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="preferredDate" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                      errors.preferredDate ? 'border-red-400' : 'border-white/30'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium transition-all duration-300 cursor-pointer`}
                  />
                  {errors.preferredDate && (
                    <p className="mt-2 text-red-200 text-sm font-medium">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    Preferred Time *
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                      errors.preferredTime ? 'border-red-400' : 'border-white/30'
                    } text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-medium transition-all duration-300 cursor-pointer`}
                  >
                    <option value="">Select a time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-2 text-red-200 text-sm font-medium">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label htmlFor="reasonForVisit" className="block text-white font-bold mb-2 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  Reason for Visit *
                </label>
                <textarea
                  id="reasonForVisit"
                  name="reasonForVisit"
                  value={formData.reasonForVisit}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl bg-white/90 border-2 ${
                    errors.reasonForVisit ? 'border-red-400' : 'border-white/30'
                  } text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-vertical font-medium transition-all duration-300 cursor-text`}
                  placeholder="Please share what brings you to us today. This helps us prepare for your visit and ensure we can best support your needs..."
                />
                {errors.reasonForVisit && (
                  <p className="mt-2 text-red-200 text-sm font-medium">{errors.reasonForVisit}</p>
                )}
                <p className="mt-2 text-white/70 text-xs" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  All information shared is confidential and will be handled with care.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Schedule My Visit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-gradient-to-br from-green-900/80 to-teal-900/80 backdrop-blur-md rounded-3xl border border-green-400/30 p-6 md:p-8 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-3 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Need Immediate Support?
                </h3>
                <p className="text-white/95 mb-4 leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  If you&apos;re experiencing a crisis or need urgent assistance, please call our 24/7 emergency helpline:
                </p>
                <a 
                  href="tel:+250788772489" 
                  className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +250 788 772 489
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Bottom Gradient Overlay */}
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