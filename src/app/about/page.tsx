import Header from "../../../components/Header";
import HeroSky from "../../../components/HeroSky";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-slate-800 overflow-hidden">
      {/* Sky background that covers entire site */}
      <HeroSky />
      
      {/* Gradient overlay for about page */}
      <div className="fixed inset-0 bg-gradient-to-br from-brand-primary/20 via-recovery-hope/10 to-brand-secondary/20 pointer-events-none z-0"></div>
      
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              About Iwacu Recovery Centre
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Hope. Healing. Renewal. Our mission is to provide compassionate, professional care for those seeking recovery from addiction and mental health challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Our Story */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Our Story
              </h2>
              <div className="space-y-4 text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                <p>
                  The Iwacu Recovery Centre was founded with a deep commitment to helping individuals and families overcome the challenges of addiction and mental health issues. Our name &ldquo;Iwacu&rdquo; means &ldquo;our home&rdquo; in Kinyarwanda, reflecting our belief that recovery happens best in a supportive, family-like environment.
                </p>
                <p>
                  Since our establishment, we have been dedicated to providing comprehensive, evidence-based treatment services that address not just the symptoms of addiction, but the underlying causes and contributing factors. We understand that recovery is a journey that requires patience, compassion, and professional expertise.
                </p>
                <p>
                  Our center has grown from a small counseling practice to a comprehensive recovery facility that serves the community with a full range of services, from emergency crisis intervention to long-term aftercare and career development programs.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Mission
                  </h3>
                  <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    To provide compassionate, professional, and evidence-based treatment services that help individuals and families recover from addiction and mental health challenges, restoring dignity, hope, and the ability to lead fulfilling lives.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Vision
                  </h3>
                  <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    To be Rwanda&apos;s leading recovery center, creating a community where every person affected by addiction and mental health challenges has access to quality care, support, and the opportunity to rebuild their lives with dignity and purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Our Core Values
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "🤝",
                  title: "Compassion",
                  description: "We approach every individual with empathy, understanding, and genuine care for their wellbeing and recovery journey."
                },
                {
                  icon: "🎯",
                  title: "Excellence",
                  description: "We maintain the highest standards of professional care, using evidence-based practices and continuous improvement."
                },
                {
                  icon: "🔒",
                  title: "Confidentiality",
                  description: "We protect the privacy and dignity of all our clients, ensuring a safe and secure environment for healing."
                },
                {
                  icon: "🌱",
                  title: "Growth",
                  description: "We believe in the potential for change and growth in every person, supporting their journey toward a better future."
                },
                {
                  icon: "👥",
                  title: "Community",
                  description: "We foster a supportive community environment where individuals can heal together and support one another."
                },
                {
                  icon: "⚖️",
                  title: "Integrity",
                  description: "We conduct ourselves with honesty, transparency, and ethical principles in all our interactions and services."
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {value.title}
                  </h3>
                  <p className="text-white/90 text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Team */}
          <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Our Professional Team
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  role: "Licensed Therapists",
                  description: "Our team of licensed mental health professionals includes clinical psychologists, licensed clinical social workers, and certified addiction counselors with extensive experience in treating addiction and mental health disorders."
                },
                {
                  role: "Medical Professionals",
                  description: "We work closely with psychiatrists and medical doctors who specialize in addiction medicine and mental health, ensuring comprehensive care that addresses both physical and psychological aspects of recovery."
                },
                {
                  role: "Peer Support Specialists",
                  description: "Individuals who have successfully navigated their own recovery journey and are trained to provide support, guidance, and hope to others beginning their recovery process."
                },
                {
                  role: "Case Managers",
                  description: "Dedicated professionals who coordinate care, connect clients with resources, and ensure that each individual receives the comprehensive support they need throughout their recovery journey."
                },
                {
                  role: "Career Counselors",
                  description: "Specialists who help individuals rebuild their professional lives through career assessment, skills development, job placement assistance, and ongoing mentorship programs."
                },
                {
                  role: "Crisis Intervention Team",
                  description: "24/7 emergency response team trained in crisis intervention, safety planning, and immediate support for individuals experiencing mental health or addiction-related crises."
                }
              ].map((team, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {team.role}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                    {team.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                Ready to Start Your Recovery Journey?
              </h2>
              <p className="text-white/90 text-lg mb-6" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                Our compassionate team is here to support you every step of the way. Contact us today to learn more about our services and how we can help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 py-3 px-8 rounded-xl font-semibold hover:bg-blue-50 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Contact Us Today
                </Link>
                <a 
                  href="tel:+250788772489" 
                  className="bg-pink-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-pink-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Call: +250 788 772 489
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}