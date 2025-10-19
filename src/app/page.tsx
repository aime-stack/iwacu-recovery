import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HeroSkyWrapper from "@/components/HeroSkyWrapper"; // use wrapper
import BalloonSection from "@/components/BalloonSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import SponsorSection from "@/components/SponsorSection";
import Footer from "@/components/Footer";
import NewsletterBanner from '@/components/NewsletterBanner';
import OurTrustedPartners from '@/components/OurTrustedPartners';
import CallToAction from "@/components/CallToAction";

export default function Page() {
  return (
    <>
      <NewsletterBanner />

      <main className="relative min-h-screen text-slate-800 overflow-hidden">
        <HeroSkyWrapper /> {/* use the wrapper here */}
        <Header />

        <div className="relative">
          <HeroSection />
          <BalloonSection />
        </div>

        <div className="relative z-10">
          <AboutSection />
          <ServicesSection />

          <OurTrustedPartners />
          <SponsorSection />
          <CallToAction />
        </div>

        <Footer />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(121, 149, 120, 0.15) 20%, rgba(184, 170, 133, 0.35) 40%, rgba(139, 115, 85, 0.65) 60%, rgba(101, 67, 33, 0.85) 80%, rgba(101, 67, 33, 0.95) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </main>
    </>
  );
}