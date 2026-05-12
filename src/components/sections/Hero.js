import React from "react";
import Button from "@/components/ui/Button";
import { Cover } from "@/components/ui/cover";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-20 overflow-hidden bg-[#fbf6f3]">
      {/* Premium Light Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-80 scale-125 object-[40%_center]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 30%, black 100%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 30%, black 100%)'
          }}
        />
        {/* Seamless page-blend gradients for top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf6f3] via-transparent to-[#fbf6f3]" />
      </div>

      {/* Premium Business Grid Layer - Light Version */}
      <div className="absolute inset-0 z-[1] opacity-[0.2]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Sparkles Particle Data Effect - Darker particles for light theme */}
      <div className="absolute inset-0 w-full h-full z-[2] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]">
        <SparklesCore
          id="hero-particles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={25}
          className="w-full h-full"
          particleColor="#b77380"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full">
        
        {/* Decorative Tag */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-brand-pink"></div>
          <span className="text-[10px] font-bold text-brand-pink uppercase tracking-[0.5em]">14U Capital • Strategic Vision</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-brand-pink"></div>
        </div>

        {/* Headline - Dark Theme */}
        <div className="mb-8 space-y-3">
          <h1 className="text-6xl md:text-9xl font-black text-[#0B132B] tracking-tighter leading-[0.85]">
            BACKING <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0B132B] to-[#0B132B]">FOUNDERS</span>
          </h1>
          <div className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-purple-600 to-blue-700 pb-2">
            Building the Future
          </div>
        </div>

        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12 font-medium tracking-wide">
          We partner with ambitious founders from Seed to Series A/B to help them raise capital, scale operations, and unlock strategic growth.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4">
            <Button href="#contact" variant="primary" size="lg" className="w-full sm:w-auto min-w-[240px] text-lg py-5 shadow-[0_20px_50px_-15px_rgba(183,115,128,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(183,115,128,0.6)] transition-all duration-500 rounded-2xl">
              Send Pitch Deck
            </Button>
          
          <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto min-w-[240px] text-lg py-5 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all duration-500 rounded-2xl shadow-sm hover:shadow-md">
            Explore Services
          </Button>
        </div>

      </div>
    </section>
  );
}
