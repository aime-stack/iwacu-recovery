"use client";

import { useState } from 'react';
import PaymentStatus from './PaymentStatus';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  victimName?: string;
  targetAmount?: number;
}

function DonationModalContent({ isOpen, onClose, victimName, targetAmount }: DonationModalProps) {
  const [donationType, setDonationType] = useState<'local' | 'international'>('local');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('RWF');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = {
    RWF: ['5,000', '10,000', '20,000', '50,000', '100,000'],
    USD: ['10', '25', '50', '100', '200']
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove any spaces or special characters
    const cleanPhone = phone.replace(/\s+/g, '');
    // Check if it's a valid Rwandan phone number (MTN or Airtel)
    const pattern = /^(07[238]\d{7})$/;
    return pattern.test(cleanPhone);
  };

  const validateAmount = (amt: string) => {
    // Remove commas and convert to number
    const numericAmount = parseFloat(amt.replace(/,/g, ''));
    if (isNaN(numericAmount)) return false;
    
    // Validate minimum and maximum amounts
    const min = currency === 'RWF' ? 500 : 1;
    const max = currency === 'RWF' ? 2000000 : 2000;
    return numericAmount >= min && numericAmount <= max;
  };

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate amount
    if (!validateAmount(amount)) {
      const minAmt = currency === 'RWF' ? '500 RWF' : '$1';
      const maxAmt = currency === 'RWF' ? '2,000,000 RWF' : '$2,000';
      setPaymentStatus('error');
      setStatusMessage(`Please enter a valid amount between ${minAmt} and ${maxAmt}`);
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setPaymentStatus('error');
      setStatusMessage('Please enter a valid email address');
      return;
    }

    // Validate name
    if (!name.trim()) {
      setPaymentStatus('error');
      setStatusMessage('Please enter your name');
      return;
    }

    // Validate phone number for local donations
    if (donationType === 'local' && !validatePhoneNumber(phoneNumber)) {
      setPaymentStatus('error');
      setStatusMessage('Please enter a valid Rwandan phone number (e.g., 0781234567)');
      return;
    }

    setPaymentStatus('processing');
    setStatusMessage('Initializing payment...');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount.replace(/,/g, ''),
          currency,
          email,
          name,
          phone_number: phoneNumber,
          victimName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data?.link) {
        // Redirect to Flutterwave checkout page
        window.location.href = data.data.link;
      } else {
        throw new Error('Invalid payment link received');
      }
    } catch (error) {
      setPaymentStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Payment initialization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Make a Donation
              {victimName && ` to Support ${victimName}`}
            </h2>
            {targetAmount && (
              <p className="text-gray-600">
                Target Amount: {currency === 'RWF' ? 'RWF' : '$'}{' '}
                {currency === 'RWF' 
                  ? Number(targetAmount).toLocaleString()
                  : (targetAmount / 1200).toLocaleString()}
              </p>
            )}
          </div>

          {/* Donation Type Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                donationType === 'local'
                  ? 'bg-[#57241B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => {
                setDonationType('local');
                setCurrency('RWF');
              }}
            >
              Local Donation (Rwanda)
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                donationType === 'international'
                  ? 'bg-[#57241B] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => {
                setDonationType('international');
                setCurrency('USD');
              }}
            >
              International Donation
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Select Amount ({currency})
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {predefinedAmounts[currency === 'RWF' ? 'RWF' : 'USD'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`py-2 px-4 rounded-lg border-2 transition-all ${
                      amount === amt
                        ? 'border-[#57241B] bg-[#57241B] text-white'
                        : 'border-gray-200 hover:border-[#57241B] hover:text-[#57241B]'
                    }`}
                    onClick={() => setAmount(amt)}
                  >
                    {currency === 'RWF' ? 'RWF' : '$'} {amt}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:border-[#57241B] focus:outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  {currency}
                </span>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:border-[#57241B] focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:border-[#57241B] focus:outline-none transition-all"
                  required
                />
              </div>

              {donationType === 'local' && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number (Mobile Money)
                  </label>
                  <input
                    type="tel"
                    placeholder="07X XXX XXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl focus:border-[#57241B] focus:outline-none transition-all"
                    required
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!amount || !email || !name || (donationType === 'local' && !phoneNumber) || isProcessing}
                className="flex-1 py-3 px-6 rounded-xl bg-[#57241B] text-white font-semibold hover:bg-[#6d2c21] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Donate Now'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Payment Status */}
      <PaymentStatus
        isVisible={paymentStatus !== null}
        status={paymentStatus || 'processing'}
        message={statusMessage}
        onClose={() => {
          if (paymentStatus === 'success') {
            onClose();
          } else {
            setPaymentStatus(null);
            setStatusMessage('');
          }
        }}
      />
    </div>
  );
}

export default function DonationModal(props: DonationModalProps) {
  return <DonationModalContent {...props} />;
}