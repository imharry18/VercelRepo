import React from "react";
import Button from "@/components/ui/Button";
import { Cover } from "@/components/ui/cover";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-brand-pink/10 blur-[100px] mix-blend-multiply animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-blue-900/10 blur-[100px] mix-blend-multiply animate-pulse-slow" />
      </div>

      {/* Premium Business Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.3]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Sparkles Particle Data Effect */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_60%,transparent_100%)]">
        <SparklesCore
          id="hero-particles"
          background="transparent"
          minSize={0.6}
          maxSize={1.5}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#b77380"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full">
        
        {/* Decorative Tag */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-brand-pink/60"></div>
          <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.3em]">14U Capital</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-brand-pink/60"></div>
        </div>

        {/* Headline */}
        <div className="mb-6 space-y-2">
          <h1 className="text-6xl md:text-8xl font-extrabold text-[#0B132B] tracking-tight leading-tight">
            BACKING FOUNDERS
          </h1>
          <div className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-[#9B6B9E] to-blue-600 pb-2">
            Building the Future
          </div>
        </div>

        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10 font-medium tracking-wide">
          We partner with ambitious founders from Seed to Series A/B to help them raise capital, scale operations, and unlock strategic growth.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg shadow-[0_0_40px_-10px_rgba(183,115,128,0.8)] hover:shadow-[0_0_60px_-15px_rgba(183,115,128,1)] transition-shadow duration-500">
              Send Pitch Deck
            </Button>
          
          <Button href="#services" variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px] text-lg bg-white/50 backdrop-blur-md border border-slate-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
            Explore Services
          </Button>
        </div>

      </div>
    </section>
  );
}
