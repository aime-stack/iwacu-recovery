// src/contexts/DonationContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DonationContextType {
  openDonationModal: (sponsorName?: string) => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(
  undefined
);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [, setSponsorName] = useState<string | undefined>();

  const openDonationModal = (name?: string) => {
    setSponsorName(name);
    // Navigate to donate page
    window.location.href = `/donate${name ? `?sponsor=${encodeURIComponent(name)}` : ""}`;
  };

  const closeDonationModal = () => {
    setSponsorName(undefined);
  };

  return (
    <DonationContext.Provider
      value={{ openDonationModal, closeDonationModal }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within DonationProvider");
  }
  return context;
}