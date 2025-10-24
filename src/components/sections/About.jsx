import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative min-h-[90vh] py-32 bg-[#fbf6f3] flex flex-col justify-center overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Massive Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-slate-900/[0.05] tracking-tighter leading-none whitespace-nowrap select-none">
          14U
        </div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-pink/5 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-600/5 blur-[150px] rounded-full mix-blend-multiply" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        <ScrollReveal>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-pink/50"></div>
            <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.3em]">The Firm</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-pink/50"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-12 leading-tight">
            We are a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">founder-focused</span> advisory firm.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative inline-block">
            {/* Top Left Quote Mark */}
            <div className="absolute -top-10 -left-10 text-8xl text-slate-300/30 font-serif leading-none select-none">"</div>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-slate-600 leading-relaxed font-light max-w-4xl mx-auto">
              Specializing in <span className="text-slate-900 font-bold">fundraising</span>, <span className="text-slate-900 font-bold">strategic finance</span>, and <span className="text-slate-900 font-bold">growth execution</span>. We work closely with startups from Seed to Series A and beyond to turn vision into velocity.
            </p>
            
            {/* Bottom Right Quote Mark */}
            <div className="absolute -bottom-16 -right-10 text-8xl text-slate-300/30 font-serif leading-none select-none">"</div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
