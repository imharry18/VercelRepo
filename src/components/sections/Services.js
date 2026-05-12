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
      color: "from-brand-pink to-brand-rose",
      image: "/verticals/fundraising.png"
    },
    {
      title: "Collateral Documentation & Valuation",
      items: [
        "Pitch decks",
        "Financial models",
        "Valuation (DCF, VC method, comps)",
        "Investor-ready materials"
      ],
      color: "from-blue-600 to-cyan-500",
      image: "/verticals/documentation.png"
    },
    {
      title: "M&A Advisory",
      items: [
        "Buy-side & sell-side advisory",
        "Strategic partnerships",
        "Exit planning"
      ],
      color: "from-purple-600 to-indigo-600",
      image: "/verticals/ma.png"
    },
    {
      title: "Operations as a Service",
      items: [
        "Strategic execution support",
        "Growth and scaling frameworks",
        "Founder office support"
      ],
      color: "from-indigo-500 to-blue-500",
      image: "/verticals/operations.png"
    }
  ];

  return (
    <section id="services" className="relative min-h-[90vh] py-24 overflow-hidden flex flex-col justify-center bg-[#fbf6f3]">
      
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

            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              We provide highly focused advisory services designed to convert opportunities into definitive outcomes.
            </p>
          </div>
        </ScrollReveal>
        )}

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service, i) => (
            <ScrollReveal 
              key={i} 
              delay={i * 0.1}
              className="relative group h-full"
            >
              <TiltCard className="h-full">
                <Card className="relative min-h-[380px] p-0 flex flex-col h-full group-hover:border-brand-pink/20 transition-all duration-500 shadow-2xl bg-slate-900 border-none overflow-hidden rounded-[2.5rem]">
                  
                  {/* Background Image Area */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    />
                    {/* Deep Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-transparent opacity-100" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-1000`} />
                  </div>

                  {/* Content Area */}
                  <div className="relative z-10 p-10 md:p-12 flex flex-col h-full mt-auto">
                    <div className="mb-6">
                      <div className={`w-12 h-1.5 bg-gradient-to-r ${service.color} rounded-full mb-6 opacity-90`} />
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-lg">
                        {service.title}
                      </h3>
                    </div>

                    <ul className="space-y-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className={`mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                          <span className="text-white/80 text-base font-medium drop-shadow-md">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Large Background Number */}
                  <div className="absolute -right-4 -top-4 text-9xl font-black text-white/5 pointer-events-none group-hover:text-brand-pink/10 transition-colors duration-700 uppercase tracking-tighter">
                    0{i + 1}
                  </div>
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
