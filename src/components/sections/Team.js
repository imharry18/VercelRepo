"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Team({ showHeader = true }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error loading team:", err));
  }, []);

  return (
    <section id="team" className="relative py-24 bg-[#fbf6f3] overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-pink/4 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        {showHeader && (
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-20 space-y-4">
              <div className="flex items-center space-x-4 mb-2">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-brand-pink" />
                <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.2em]">Leadership</span>
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-brand-pink" />
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B132B] tracking-tight">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">Team.</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mt-4">
                Operators and strategists dedicated to bridging the gap between ambition and capital.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => {
            const photoPath = member.photo?.startsWith("http") || member.photo?.startsWith("/") 
              ? member.photo 
              : `/team/${member.photo}`;

            return (
              <ScrollReveal key={i} delay={i * 0.15} className="h-full">
                <div className="group relative h-full flex flex-col bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.10)] transition-all duration-500">

                  {/* ── PHOTO AREA ── */}
                  <div className="relative w-full h-80 overflow-hidden bg-slate-900">

                    {/* Photo */}
                    <Image
                      src={photoPath}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ filter: "brightness(0.88) contrast(1.04)" }}
                    />

                    {/* Bottom gradient — photo fades into name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent z-[2]" />

                    {/* Name & role overlaid on photo */}
                    <div className="absolute bottom-0 left-0 right-0 z-[3] px-7 pb-6">
                      <h3 className="text-[1.4rem] font-bold text-white tracking-tight leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.18em] mt-1">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* ── CONTENT AREA ── */}
                  <div className="flex flex-col flex-grow px-7 py-6 border-t border-slate-100">

                    {/* Bio */}
                    <p className="text-slate-600 leading-relaxed flex-grow text-[14.5px]">
                      {member.bio}
                    </p>

                    {/* LinkedIn Button */}
                    <div className="mt-6 pt-5 border-t border-slate-100/80">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-500 hover:text-[#0A66C2] transition-colors duration-200 group/li"
                      >
                        {/* LinkedIn logo */}
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 group-hover/li:bg-[#0A66C2]/10 transition-colors duration-200">
                          <svg className="w-4 h-4 text-slate-400 group-hover/li:text-[#0A66C2] transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </span>
                        <span>View LinkedIn Profile</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 opacity-0 group-hover/li:opacity-100 group-hover/li:translate-x-0.5 transition-all duration-200">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
