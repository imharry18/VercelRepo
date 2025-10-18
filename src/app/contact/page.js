import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export const metadata = {
  title: "Contact — 14U Capital",
  description:
    "Get in touch with 14U Capital. Submit your pitch deck, reach us directly via email, or visit our office in Bangalore.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">

        {/* Page Hero */}
        <section className="relative pt-28 pb-16 bg-[#fbf6f3] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-pink/50" />
              <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.3em]">Get In Touch</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-pink/50" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0B132B] tracking-tight mb-6 whitespace-nowrap">
              Raising Capital?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">
                Let&apos;s Talk.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you&apos;re exploring a partnership or ready to submit your pitch deck, our team is directly accessible.
            </p>
          </div>
        </section>

        <Contact showHeader={false} />

        {/* Contact Info Section (Seamless Light Theme) */}
        <section className="bg-[#fbf6f3] py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">

              {/* Head Office */}
              <div className="flex flex-col md:px-10 first:pl-0 last:pr-0 pt-8 md:pt-0 first:pt-0">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Head Office</h3>
                <p className="text-slate-800 font-medium text-base leading-loose">
                  Regus World Trade Center<br />
                  Unit 2201A, 22nd Floor<br />
                  Brigade Gateway Campus<br />
                  Bangalore 560055 | India
                </p>
              </div>

              {/* General & Partnerships */}
              <div className="flex flex-col md:px-10 first:pl-0 last:pr-0 pt-8 md:pt-0 first:pt-0">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">General & Partnerships</h3>
                <a
                  href="mailto:Hello@14ucapital.in"
                  className="text-slate-900 font-bold text-lg hover:text-brand-pink transition-colors duration-200 block mb-3"
                >
                  Hello@14ucapital.in
                </a>
                <p className="text-slate-600 text-sm leading-relaxed">For general inquiries, partnerships, and media relations.</p>
              </div>

              {/* Fundraising Services */}
              <div className="flex flex-col md:px-10 first:pl-0 last:pr-0 pt-8 md:pt-0 first:pt-0">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                </div>
                <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Fundraising Services</h3>
                <a
                  href="mailto:Investments@14ucapital.in"
                  className="text-slate-900 font-bold text-lg hover:text-brand-pink transition-colors duration-200 block mb-3"
                >
                  Investments@14ucapital.in
                </a>
                <p className="text-slate-600 text-sm leading-relaxed">Submit your pitch deck or reach our investment team directly.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
