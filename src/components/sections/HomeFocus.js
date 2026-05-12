import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Focus() {
  const focusAreas = [
    {
      title: "Technology",
      subtitle: "Enterprise • Fintech • Sustainability",
      desc: "We back founders building defensible, high-margin technology companies. Our focus lies in robust B2B platforms, financial infrastructure, and climate-tech solutions that demonstrate strong unit economics.",
      color: "from-blue-600 via-indigo-600 to-purple-600",
      bgGlow: "bg-blue-500",
      image: "/sectors/technology.png",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
        </svg>
      )
    },
    {
      title: "Consumer",
      subtitle: "D2C Consumer Brands",
      desc: "We partner with visionary consumer brands that have a clear path to scale. We look for strong channel playbooks, high retention rates, and defensible brand moats in crowded markets.",
      color: "from-brand-pink via-brand-rose to-orange-500",
      bgGlow: "bg-brand-pink",
      image: "/sectors/consumer.png",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    }
  ];

  return (
    <section id="focus" className="relative min-h-[90vh] py-32 overflow-hidden bg-white flex flex-col justify-center">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-24 gap-12">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <span className="w-12 h-[1px] bg-brand-pink" />
                <span className="text-[10px] font-bold text-brand-pink uppercase tracking-[0.4em]">Strategic Thesis</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-[#0B132B] tracking-tight leading-[0.95]">
                Focus <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">Sectors</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl pt-4">
                We deploy capital and strategic advisory strictly in areas where our deep expertise can drive the most outsized value.
              </p>
            </div>
            
            {/* Disclaimer Text - Re-designed for Premium Feel */}
            <div className="md:max-w-[280px] bg-slate-50 p-8 rounded-3xl border border-slate-100 relative group overflow-hidden transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-pink to-purple-600" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover:text-brand-pink transition-colors">Agnostic Opportunities</p>
              <p className="text-slate-600 text-sm leading-relaxed font-medium relative z-10">
                We selectively partner across other sectors where exceptional <span className="text-slate-900">founder-market fit</span> is demonstrated.
              </p>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-pink/5 rounded-full blur-2xl group-hover:bg-brand-pink/10 transition-all" />
            </div>
          </div>
        </ScrollReveal>

        {/* Large Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {focusAreas.map((area, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 0.15}
              className="h-full"
            >
              <TiltCard className="h-full">
                <Card className="relative h-[550px] flex flex-col justify-end bg-slate-900 border-none shadow-2xl group hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 overflow-hidden rounded-[2.5rem]">
                  
                  {/* Full Bleed Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={area.image} 
                      alt={area.title}
                      className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                    />
                    {/* Multi-layered Deep Gradient Overlay - Pushed lower for more image visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/70 to-transparent opacity-100" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
                  </div>

                  {/* Content Area - Pushed to the very bottom */}
                  <div className="relative z-10 p-10 md:p-14 w-full">
                    
                    <div className="space-y-5">
                      {/* Integrated Icon & Subtitle */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500 shadow-xl">
                          {area.icon}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[10px] font-bold text-white/90 uppercase tracking-[0.3em] drop-shadow-md">
                            {area.subtitle}
                          </h4>
                          <div className={`h-1 w-8 bg-gradient-to-r ${area.color} rounded-full`} />
                        </div>
                      </div>

                      {/* Main Title - Impactful but lower */}
                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg leading-tight">
                        {area.title}
                      </h3>
                      
                      {/* Description - Compact and clear */}
                      <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium max-w-md drop-shadow-md">
                        {area.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${area.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />

                </Card>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
