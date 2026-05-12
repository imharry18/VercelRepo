import Link from "next/link";
import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const verticals = [
  {
    num: "01",
    title: "Fundraising & Capital Strategy",
    desc: "End-to-end fundraising support from Seed to Series A — investor targeting, narrative building, and deal execution.",
    color: "from-brand-pink to-brand-rose",
    image: "/verticals/fundraising.png",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Collateral Documentation",
    desc: "Investor-grade pitch decks, financial models, and valuations using DCF, VC method, and comps.",
    color: "from-blue-600 to-cyan-500",
    image: "/verticals/documentation.png",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "M&A Advisory",
    desc: "Buy-side and sell-side advisory, strategic partnerships, and exit planning for founders and investors.",
    color: "from-purple-600 to-indigo-600",
    image: "/verticals/ma.png",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Operations as a Service",
    desc: "Strategic execution support, scaling frameworks, and founder office support for portfolio companies.",
    color: "from-indigo-500 to-blue-500",
    image: "/verticals/operations.png",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
];

export default function HomeVerticals() {
  return (
    <section id="verticals" className="relative py-32 bg-[#fbf6f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-24 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-8 h-[1px] bg-brand-pink" />
              <span className="text-[10px] font-bold text-brand-pink uppercase tracking-[0.4em]">What We Do</span>
              <span className="w-8 h-[1px] bg-brand-pink" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#0B132B] tracking-tight leading-none">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">Verticals</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl font-medium leading-relaxed pt-2">
              Four focused practice areas that cover every dimension of a founder&apos;s growth journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.1} className="h-full">
              <TiltCard className="h-full">
                <div className="relative h-[450px] flex flex-col group rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-slate-200/50">
                  
                  {/* Background Image Area */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={v.image} 
                      alt={v.title}
                      className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    {/* Multi-layered Deep Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/70 to-transparent opacity-100" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-20 transition-opacity duration-1000`} />
                  </div>

                  {/* Content Area - Bottom Aligned */}
                  <div className="relative z-10 mt-auto p-10 md:p-12 space-y-6">
                    
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                          {v.icon}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[10px] font-bold text-white/90 uppercase tracking-[0.3em] drop-shadow-md">
                            {v.num} / Strategic
                          </h4>
                          <div className={`h-1 w-8 bg-gradient-to-r ${v.color} rounded-full opacity-80`} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter drop-shadow-lg leading-tight">
                        {v.title}
                      </h3>
                      <p className="text-base text-white/80 leading-relaxed font-medium drop-shadow-md">
                        {v.desc}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center group/btn cursor-pointer">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-white/40 bg-white/10 backdrop-blur-md group-hover/btn:w-32 group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-500 overflow-hidden shadow-lg relative`}>
                        <span className="absolute left-10 opacity-0 group-hover/btn:opacity-100 whitespace-nowrap text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all duration-500">
                          Learn More
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white group-hover/btn:text-slate-900 group-hover/btn:-translate-x-10 transition-all duration-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center space-x-2 text-sm font-bold text-brand-pink uppercase tracking-widest hover:text-slate-900 transition-colors group"
            >
              <span>Explore All Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
