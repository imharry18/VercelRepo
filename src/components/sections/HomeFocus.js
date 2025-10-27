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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B132B] tracking-tight mb-6">
                Focus Sectors
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                We deploy capital and strategic advisory strictly in areas where our deep expertise can drive the most outsized value.
              </p>
            </div>
            
            {/* Disclaimer Text - Integrated Elegantly */}
            <div className="md:max-w-xs border-l-2 border-brand-pink pl-6 py-1">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Agnostic Opportunities</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                We selectively partner across other sectors where exceptional founder-market fit is demonstrated.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Large Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {focusAreas.map((area, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 0.15}
              className="h-full"
            >
              <TiltCard className="h-full">
                <Card className="relative p-10 md:p-14 h-full flex flex-col justify-between bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute -right-20 -top-20 w-64 h-64 ${area.bgGlow} rounded-full mix-blend-multiply filter blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                  <div>
                    {/* Header: Icon & Subtitle */}
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 border border-slate-100 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl transition-all duration-500">
                        {area.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sector</div>
                        <h4 className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${area.color}`}>
                          {area.subtitle}
                        </h4>
                      </div>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-500 transition-all duration-500">
                      {area.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className={`mt-12 h-1 w-0 group-hover:w-full bg-gradient-to-r ${area.color} rounded-full transition-all duration-700 ease-out`} />

                </Card>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
