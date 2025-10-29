"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Portfolio({ showHeader = true }) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading portfolio:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="portfolio" className="relative min-h-[90vh] py-24 overflow-hidden bg-[#fbf6f3] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-20 space-y-4">
            
            <div className="flex items-center space-x-4 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-brand-pink"></div>
              <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.2em]">Deal Flow</span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-brand-pink"></div>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B132B] tracking-tight">
              Our Portfolio
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mt-4">
              We proudly back category-defining companies led by visionary founders.
            </p>
          </div>
        </ScrollReveal>
        )}

        {/* Portfolio Grid (Dynamic Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {portfolio.map((company, i) => {
            const total = portfolio.length;
            
            // Dynamic Grid Calculation
            let lgClass = "lg:col-span-4"; // Default 3 per row
            if (total === 5) {
              lgClass = i < 2 ? "lg:col-span-6" : "lg:col-span-4";
            } else {
              const itemsInLgRow = Math.floor(i / 3) === Math.floor((total - 1) / 3) ? (total % 3 || 3) : 3;
              if (itemsInLgRow === 1) lgClass = "lg:col-span-6 lg:col-start-4"; // Center single item
              else if (itemsInLgRow === 2) lgClass = "lg:col-span-6";
            }

            let mdClass = "md:col-span-1"; // Default 2 per row
            const itemsInMdRow = Math.floor(i / 2) === Math.floor((total - 1) / 2) ? (total % 2 || 2) : 2;
            if (itemsInMdRow === 1) mdClass = "md:col-span-2"; // Stretch single item on tablet

            const isInvested = company.status.includes('Invested');

            return (
              <ScrollReveal 
                key={i} 
                delay={i * 0.15}
                className={`${mdClass} ${lgClass} h-full`}
              >
                <TiltCard className="h-full">
                  <Card className="relative p-8 md:p-10 flex flex-col h-full bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-2xl hover:border-brand-pink/30 transition-all duration-500 overflow-hidden rounded-3xl">
                    
                    {/* Massive Faint Background Letter */}
                    <div className="absolute -right-8 -top-12 text-[10rem] font-black text-slate-50 opacity-60 pointer-events-none group-hover:text-brand-pink/5 group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700">
                      {company.name.charAt(0)}
                    </div>

                    <div className="relative z-10 flex-grow">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${company.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <span className="font-bold text-white text-lg">
                            {company.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#0B132B] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0B132B] group-hover:to-brand-pink transition-all duration-500 tracking-tight">
                            {company.name}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-1 mb-8">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stage</p>
                        <p className="text-lg font-bold text-slate-800">{company.stage}</p>
                      </div>
                    </div>

                    {/* Status Indicator (Premium Style) */}
                    <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                      <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        <span className="relative flex h-2.5 w-2.5">
                          {/* Pulse Effect for 'Currently Raising' */}
                          {!isInvested && (
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isInvested ? 'bg-emerald-400' : 'bg-brand-pink'}`}></span>
                          )}
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isInvested ? 'bg-emerald-500' : 'bg-brand-pink'}`}></span>
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${isInvested ? 'text-emerald-700' : 'text-brand-pink'}`}>
                          {company.status}
                        </span>
                      </div>
                    </div>

                  </Card>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
