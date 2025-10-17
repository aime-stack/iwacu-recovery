
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="relative z-10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#57241B] p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Ready to Start Your Recovery Journey?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              Take the first step towards healing. Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl justify-center">
              <a
                href="tel:+250788772489"
                className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 text-center cursor-pointer"
              >
                Call Now
              </a>
              <a
                href="mailto:iwacurecovercentre17@gmail.com"
                className="px-8 py-4 bg-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500/50 text-center cursor-pointer"
              >
                Email Us
              </a>
              <Link
                href="/book-call"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 text-center cursor-pointer"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}