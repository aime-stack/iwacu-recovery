import "./globals.css";
import type { Metadata } from "next";
import ScrollToTop from "@/components/ScrollToTop";
import Providers from "@/components/Providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Iwacu Recovery Centre - Counselling Addiction Services",
  description:
    "Professional addiction counselling and recovery services. Hope. Healing. Renewal. Individual, group, and family counselling sessions available.",
  keywords:
    "addiction recovery, counselling services, mental health, alcohol addiction, drug addiction, rehabilitation, Rwanda",
  authors: [{ name: "Iwacu Recovery Centre" }],
  creator: "Iwacu Recovery Centre",
  publisher: "Iwacu Recovery Centre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.iwacurecoverycentre.com"),
  alternates: {
    canonical: "https://www.iwacurecoverycentre.com",
  },
  openGraph: {
    title: "Iwacu Recovery Centre - Counselling Addiction Services",
    description:
      "Professional addiction counselling and recovery services. Hope. Healing. Renewal.",
    url: "https://www.iwacurecoverycentre.com",
    siteName: "Iwacu Recovery Centre",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Iwacu Recovery Centre Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iwacu Recovery Centre - Counselling Addiction Services",
    description:
      "Professional addiction counselling and recovery services. Hope. Healing. Renewal.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <div id="back-to-top-anchor"></div>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
