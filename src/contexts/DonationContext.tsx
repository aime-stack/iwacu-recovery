'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import for the DonationModal to avoid hydration issues
const DonationModal = dynamic(() => import('@/components/DonationModal'), {
  ssr: false, // This ensures the modal is only rendered on the client side
});

interface DonationContextType {
  isOpen: boolean;
  victimName?: string;
  targetAmount?: number;
  openDonationModal: (victimName?: string, targetAmount?: number) => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [victimName, setVictimName] = useState<string>();
  const [targetAmount, setTargetAmount] = useState<number>();

  const openDonationModal = (name?: string, amount?: number) => {
    setVictimName(name);
    setTargetAmount(amount);
    setIsOpen(true);
  };

  const closeDonationModal = () => {
    setIsOpen(false);
    setVictimName(undefined);
    setTargetAmount(undefined);
  };

  return (
    <DonationContext.Provider value={{
      isOpen,
      victimName,
      targetAmount,
      openDonationModal,
      closeDonationModal,
    }}>
      {children}
      <DonationModal 
        isOpen={isOpen}
        onClose={closeDonationModal}
        victimName={victimName}
        targetAmount={targetAmount}
      />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
}