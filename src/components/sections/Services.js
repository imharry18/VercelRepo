import Card from "@/components/ui/Card";
import TiltCard from "@/components/ui/TiltCard";
import Button from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Services({ showHeader = true }) {
  const services = [
    {
      title: "Fundraising & Capital Strategy",
      items: [
        "End-to-end support from Seed to Series A",
        "Investor targeting & outreach",
        "Narrative building & positioning",
        "Deal execution support"
      ],
      color: "from-brand-pink to-brand-rose"
    },
    {
      title: "Collateral Documentation & Valuation",
      items: [
        "Pitch decks",
        "Financial models",
        "Valuation (DCF, VC method, comps)",
        "Investor-ready materials"
      ],
      color: "from-blue-600 to-cyan-500"
    },
    {
      title: "M&A Advisory",
      items: [
        "Buy-side & sell-side advisory",
        "Strategic partnerships",
        "Exit planning"
      ],
      color: "from-purple-600 to-indigo-600"
    },
    {
      title: "Operations as a Service",
      items: [
        "Strategic execution support",
        "Growth and scaling frameworks",
        "Founder office support"
      ],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section id="services" className="relative min-h-[90vh] py-24 overflow-hidden flex flex-col justify-center">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[25rem] h-[25rem] bg-brand-pink/3 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-blue-900/3 blur-[120px] rounded-full mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
        <ScrollReveal>
          <div className="mb-20 text-center">

            
            <div className="flex flex-col items-center justify-center mb-6 space-y-2">
              <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B132B] tracking-tight">
                How We Work
              </h2>
              <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brand-pink pb-2">
                With Founders.
              </div>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              We provide highly focused advisory services designed to convert opportunities into definitive outcomes.
            </p>
          </div>
        </ScrollReveal>
        )}

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 0.1}
              className="relative group h-full"
            >
              <TiltCard className="h-full">
                <div 
                  className={`
                    absolute inset-0 
                    bg-gradient-to-br ${service.color} 
                    blur-[60px] 
                    opacity-0 group-hover:opacity-10 
                    transition-opacity duration-700 
                    -z-10
                  `} 
                />

                <Card className="relative p-10 flex flex-col h-full group-hover:border-brand-pink/20 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl bg-white border-slate-100 overflow-hidden">
                  
                  {/* Large Background Number */}
                  <div className="absolute -right-4 -bottom-4 text-9xl font-black text-slate-50 opacity-50 pointer-events-none group-hover:text-brand-pink/5 transition-colors duration-500">
                    0{i + 1}
                  </div>

                  <div className="mb-8 border-b border-slate-100 pb-6 relative z-10">
                    <div className={`w-10 h-1 bg-gradient-to-r ${service.color} rounded-full mb-6 opacity-80`} />
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#0B132B] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#0B132B] group-hover:to-brand-pink transition-all duration-500 tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-pink mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Massive Impact CTA Card */}
        <ScrollReveal delay={0.3}>
          <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 max-w-4xl mx-auto bg-[#0B132B] shadow-2xl group">
            
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-pink/20 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              {/* Decorative Line */}
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-pink to-transparent mb-8"></div>
              
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-blue-400">Work With Us?</span>
              </h3>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
                Whether you need to accelerate your growth or secure your next major funding round, let's discuss how our strategic execution can turn your vision into velocity.
              </p>
              
              <Button href="/contact" variant="primary" size="lg" className="min-w-[240px] text-lg py-4 shadow-[0_0_30px_-5px_rgba(183,115,128,0.6)] hover:shadow-[0_0_50px_-5px_rgba(183,115,128,1)] transition-all duration-500 bg-white text-slate-900 hover:bg-slate-50 border-none">
                Start the Conversation
              </Button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
