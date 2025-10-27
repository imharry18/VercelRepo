import Button from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomeCTA() {
  return (
    <section id="cta" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-20 bg-[#0B132B] shadow-2xl group text-center">

            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-pink/20 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_50%,transparent_100%)]" />

            <div className="relative z-10">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-pink to-transparent mx-auto mb-8" />

              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight whitespace-nowrap">
                Raising Capital?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-blue-400">
                  Let&apos;s Talk.
                </span>
              </h2>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto font-light leading-relaxed">
                Whether you&apos;re exploring a partnership or ready to submit your pitch, our team is directly accessible.
              </p>

              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="min-w-[240px] text-lg py-4 bg-white text-slate-900 hover:bg-slate-50 border-none shadow-[0_0_30px_-5px_rgba(183,115,128,0.6)] hover:shadow-[0_0_50px_-5px_rgba(183,115,128,1)] transition-all duration-500"
              >
                Send Pitch Deck
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
