'use client';

import { DonationProvider } from '@/contexts/DonationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DonationProvider>
      {children}
    </DonationProvider>
  );
}