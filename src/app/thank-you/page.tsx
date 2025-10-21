// src/app/thank-you/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const status = searchParams.get("status");
  const amount = searchParams.get("amount");
  const txRef = searchParams.get("tx_ref");
  const type = searchParams.get("type");
  const frequency = searchParams.get("frequency");
  
  const isSubscription = type === "subscription";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRedirecting(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: isSubscription ? "💝" : "🎉",
          title: isSubscription ? "Monthly Donation Activated!" : "Thank You for Your Donation!",
          message: isSubscription 
            ? `Your ${frequency || "monthly"} donation has been set up successfully. You're now making a lasting impact at Iwacu Recovery Centre!`
            : "Your generous contribution will help transform lives at Iwacu Recovery Centre.",
          bgGradient: "from-green-50 via-emerald-50 to-teal-50",
          cardBg: "bg-green-500",
          textColor: "text-green-800",
        };
      case "failed":
        return {
          icon: "❌",
          title: isSubscription ? "Subscription Setup Failed" : "Payment Failed",
          message: isSubscription
            ? "Unfortunately, we couldn't set up your recurring donation. Please try again."
            : "Unfortunately, your payment could not be processed. Please try again.",
          bgGradient: "from-red-50 via-pink-50 to-rose-50",
          cardBg: "bg-red-500",
          textColor: "text-red-800",
        };
      case "cancelled":
        return {
          icon: "⚠️",
          title: isSubscription ? "Subscription Cancelled" : "Payment Cancelled",
          message: isSubscription
            ? "Your recurring donation setup was cancelled. If this was a mistake, please try again."
            : "Your payment was cancelled. If this was a mistake, please try again.",
          bgGradient: "from-yellow-50 via-amber-50 to-orange-50",
          cardBg: "bg-yellow-500",
          textColor: "text-yellow-800",
        };
      default:
        return {
          icon: "ℹ️",
          title: "Payment Status Unknown",
          message: "We couldn't determine your payment status. Please contact support.",
          bgGradient: "from-slate-50 via-gray-50 to-zinc-50",
          cardBg: "bg-slate-500",
          textColor: "text-slate-800",
        };
    }
  };

  const config = getStatusConfig();

  if (isRedirecting) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} flex items-center justify-center p-4`}>
        <div className="text-center">
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} flex items-center justify-center p-4`}>
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`${config.cardBg} p-8 text-white text-center`}>
            <div className="text-6xl mb-4">{config.icon}</div>
            <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
            {status === "success" && amount && (
              <p className="text-xl opacity-90">
                {isSubscription 
                  ? `${frequency?.charAt(0).toUpperCase()}${frequency?.slice(1)} Amount: $${amount}` 
                  : `Amount: $${amount}`}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <p className={`text-lg ${config.textColor} text-center mb-8`}>
              {config.message}
            </p>

            {status === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-green-800 mb-3">
                  {isSubscription ? "What happens with your recurring donation?" : "What happens next?"}
                </h3>
                <ul className="space-y-2 text-green-700">
                  {isSubscription ? (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>You&apos;ll be charged ${amount} {frequency || "monthly"}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Automatic payments will continue until you cancel</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>You can modify or cancel anytime</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Regular impact updates sent to your email</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Tax receipts provided for all donations</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>You&apos;ll receive a confirmation email shortly</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>Your donation will directly support recovery programs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">✓</span>
                        <span>We&apos;ll keep you updated on the impact of your contribution</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {txRef && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  <strong>Transaction Reference:</strong> {txRef}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Return Home
              </Link>
              {status !== "success" && (
                <Link
                  href="/donate"
                  className="flex-1 py-3 px-6 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold text-center hover:bg-pink-50 transition-all duration-300"
                >
                  Try Again
                </Link>
              )}
            </div>

            {/* Auto-redirect notice */}
            <p className="text-center text-sm text-slate-500 mt-6">
              {countdown > 0 ? (
                <>Redirecting to homepage in {countdown} seconds...</>
              ) : (
                <>Redirecting now...</>
              )}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {status === "success" && (
          <div className="mt-6 text-center">
            {!isSubscription ? (
              <>
                <p className="text-slate-600 mb-4">
                  Want to make an even bigger impact?
                </p>
                <Link
                  href="/donate"
                  className="inline-block text-pink-600 hover:text-pink-700 font-medium underline"
                >
                  Set up a monthly donation
                </Link>
              </>
            ) : (
              <>
                <p className="text-slate-600 mb-4">
                  Thank you for your ongoing commitment to recovery and healing!
                </p>
                <p className="text-sm text-slate-500">
                  Need to manage your subscription? Contact us at{" "}
                  <a 
                    href="mailto:irecoverycentre17@gmail.com"
                    className="text-pink-600 hover:text-pink-700 font-medium underline"
                  >
                    irecoverycentre17@gmail.com
                  </a>
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}