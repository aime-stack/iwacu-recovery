import "../../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery Centre",
  description: "Hope. Healing. Renewal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-transparent">{children}</body>
    </html>
  );
}
