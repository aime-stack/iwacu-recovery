"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const router = useRouter();
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaymentConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      alert('Please enter your transaction ID');
      return;
    }

    setIsSubmitting(true);

    // Here you would verify the transaction with your backend
    // For now, we'll simulate a delay
    setTimeout(() => {
      // Store transaction ID in sessionStorage to verify on schedule page
      sessionStorage.setItem('payment_transaction_id', transactionId);
      sessionStorage.setItem('payment_confirmed', 'true');
      
      // Redirect to schedule page
      router.push('/schedule');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-blue-600 p-4">
              <CreditCard className="text-white" size={40} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Consultation Call
            </h1>
            <p className="text-lg text-gray-600">
              To book your consultation call, please make a payment of 
              <span className="font-bold text-blue-600 text-2xl block mt-2">10,000 RWF</span>
            </p>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
              Payment Instructions
            </h2>
            <div className="space-y-4 ml-11">
              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Dial on your phone:</p>
                  <p className="font-mono font-bold text-xl text-gray-900 mt-1">*182*8*1#</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Select <span className="font-semibold">&quot;Pay&quot;</span> option</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Enter Momo Pay Code:</p>
                  <div className="bg-white px-4 py-2 rounded-lg inline-block mt-1">
                    <p className="font-mono font-bold text-2xl text-gray-900">660006</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Enter amount:</p>
                  <p className="font-bold text-xl text-gray-900 mt-1">10,000 RWF</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Confirm payee name:</p>
                  <p className="font-semibold text-gray-900 mt-1">IWACU RECOVERY CENTRE</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="font-bold text-blue-600 mr-3 mt-1">•</span>
                <div>
                  <p className="text-gray-700">Enter your PIN and confirm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction ID Form */}
          <div className="bg-green-50 rounded-xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
              Confirm Your Payment
            </h2>
            <form onSubmit={handlePaymentConfirm} className="ml-11">
              <div className="mb-6">
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Transaction ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., MP240123456789"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-gray-900 text-lg"
                  required
                />
                <p className="text-sm text-gray-600 mt-2 flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  You will receive the Transaction ID via SMS after completing the payment
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !transactionId.trim()}
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:bg-green-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600 text-lg"
              >
                {isSubmitting ? 'Verifying Payment...' : 'Confirm Payment & Continue'}
              </button>
            </form>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Need help?</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+250788772489"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <span className="mr-2">📞</span>
                +250 788 772 489
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a 
                href="mailto:iwacurecovercentre17@gmail.com"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <span className="mr-2">✉️</span>
                iwacurecovercentre17@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}