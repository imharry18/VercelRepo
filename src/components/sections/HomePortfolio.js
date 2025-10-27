"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

export default function HomePortfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error("Error loading portfolio:", err));
  }, []);

  return (
    <section id="portfolio-preview" className="relative py-24 bg-[#fbf6f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <div className="flex items-center space-x-4 mb-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-brand-pink" />
              <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.2em]">Deal Flow</span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-brand-pink" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B132B] tracking-tight">Portfolio Preview</h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto font-medium leading-relaxed">
              We back category-defining companies led by visionary founders.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
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

            const isInvested = company.status === "Invested by 14U";
            
            return (
              <ScrollReveal key={i} delay={i * 0.1} className={`${mdClass} ${lgClass} h-full`}>
                <TiltCard className="h-full">
                  <Card className="relative p-7 md:p-8 flex flex-col h-full bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-2xl hover:border-brand-pink/30 transition-all duration-500 overflow-hidden rounded-2xl">

                    <div className="absolute -right-6 -top-10 text-[8rem] font-black text-slate-50 opacity-60 pointer-events-none group-hover:text-brand-pink/5 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-700">
                      {company.name.charAt(0)}
                    </div>

                    <div className="relative z-10 flex-grow">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${company.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <span className="font-bold text-white text-sm">{company.name.charAt(0)}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0B132B] tracking-tight">{company.name}</h3>
                      </div>

                      <div className="space-y-1 mb-6">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stage</p>
                        <p className="text-base font-bold text-slate-800">{company.stage}</p>
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                      <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <span className="relative flex h-2 w-2">
                          {!isInvested && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75" />
                          )}
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${isInvested ? 'bg-emerald-500' : 'bg-brand-pink'}`} />
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

        <ScrollReveal delay={0.4}>
          <div className="text-center">
            <Button href="/portfolio" variant="secondary" size="lg" className="min-w-[220px] bg-white border border-slate-200 hover:bg-white hover:border-brand-pink/30 transition-all">
              View Full Portfolio →
            </Button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
