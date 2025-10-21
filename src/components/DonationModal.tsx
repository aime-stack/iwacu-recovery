// src/components/DonationModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsorName?: string;
}

type DonationType = "one-time" | "recurring";
type Frequency = "monthly" | "quarterly" | "yearly";

export default function DonationModal({
  isOpen,
  onClose,
  sponsorName,
}: DonationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [donationType, setDonationType] = useState<DonationType>("one-time");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = donationType === "recurring" ? "/api/donate/recurring" : "/api/donate";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          sponsorName,
          ...(donationType === "recurring" && { frequency }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initiation failed");
      }

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const suggestedAmounts = donationType === "recurring" 
    ? [10, 25, 50, 100] 
    : [20, 50, 100, 250];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
          {sponsorName && (
            <p className="text-white/90 text-sm">
              Supporting {sponsorName}&apos;s recovery journey
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Donation Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Donation Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDonationType("one-time")}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  donationType === "one-time"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                One-Time
              </button>
              <button
                type="button"
                onClick={() => setDonationType("recurring")}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  donationType === "recurring"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                💝 Monthly
              </button>
            </div>
          </div>

          {/* Frequency Selection (for recurring) */}
          {donationType === "recurring" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Payment Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["monthly", "quarterly", "yearly"] as Frequency[]).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setFrequency(freq)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      frequency === freq
                        ? "bg-pink-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Amounts */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              {donationType === "recurring" ? "Monthly Amount (USD)" : "Amount (USD)"}
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    formData.amount === amount.toString()
                      ? "bg-pink-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              id="amount"
              type="number"
              required
              min="1"
              step="0.01"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="Enter custom amount"
              autoComplete="off"
            />
            {donationType === "recurring" && formData.amount && (
              <p className="text-xs text-slate-500 mt-2">
                You&apos;ll be charged ${formData.amount} {frequency}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white text-slate-900 placeholder:text-slate-400"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
              autoComplete="email"
            />
          </div>

          {/* Recurring Donation Benefits */}
          {donationType === "recurring" && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <span>💜</span> Monthly Giving Benefits
              </h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>✓ Sustainable support for recovery programs</li>
                <li>✓ Cancel or modify anytime</li>
                <li>✓ Regular impact updates</li>
                <li>✓ Tax receipts for all donations</li>
              </ul>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : donationType === "recurring" ? "Start Monthly Giving" : "Donate Now"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center text-xs text-slate-500">
          Your donation is secure and processed through Flutterwave
        </div>
      </div>
    </div>
  );
}