// src/app/donate/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DonationModal from "@/components/DonationModal";
import { Suspense } from "react";

function DonateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const sponsorName = searchParams.get("sponsor") || undefined;

  const handleClose = () => {
    setIsOpen(false);
    // Navigate back after closing
    setTimeout(() => {
      router.push("/");
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <DonationModal
        isOpen={isOpen}
        onClose={handleClose}
        sponsorName={sponsorName}
      />
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-50 flex items-center justify-center">
          <div className="text-slate-600">Loading...</div>
        </div>
      }
    >
      <DonateContent />
    </Suspense>
  );
}