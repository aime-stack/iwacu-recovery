"use client";

import { useState, useEffect } from 'react';
import { X, Mail, Sparkles } from 'lucide-react';

export default function NewsletterBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Check if user has already dismissed the modal
    const hasSeenModal = sessionStorage.getItem('newsletter_modal_dismissed');
    
    if (!hasSeenModal) {
      // Show modal after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletter_modal_dismissed', 'true');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Replace this URL with your actual Mailchimp form action URL
      // You can find this in your Mailchimp embedded form code
      const MAILCHIMP_URL = 'YOUR_MAILCHIMP_FORM_ACTION_URL';
      
      await fetch(MAILCHIMP_URL, {
        method: 'POST',
        body: new URLSearchParams({
          EMAIL: email,
        }),
        mode: 'no-cors', // Mailchimp doesn't support CORS
      });

      // Since we're using no-cors, we can't read the response
      // But we can assume success if no error is thrown
      setSubmitStatus('success');
      setEmail('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - lighter and allows sky to show through */}
      <div 
        className="fixed inset-0 transition-opacity duration-300"
        style={{ 
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none" style={{ zIndex: 10000 }}>
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative pointer-events-auto transform transition-all duration-300 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full p-4" style={{ backgroundColor: '#7E4734' }}>
              <Sparkles className="text-white" size={32} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Stay in the Loop! 📬
            </h2>
            <p className="text-gray-600 text-lg">
              Subscribe to our newsletter and get the latest updates, exclusive content, and special offers delivered straight to your inbox.
            </p>
          </div>

          {/* Form */}
          {submitStatus !== 'success' ? (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                  onFocus={(e) => e.target.style.borderColor = '#7E4734'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:opacity-90"
                style={{ backgroundColor: '#7E4734' }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set! 🎉</h3>
              <p className="text-gray-600">Thank you for subscribing. Check your inbox soon!</p>
            </div>
          )}

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}