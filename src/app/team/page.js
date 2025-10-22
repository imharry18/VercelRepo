import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Team from "@/components/sections/Team";

export const metadata = {
  title: "Team — 14U Capital",
  description:
    "Meet the leadership behind 14U Capital. Shashank Umashankar and Depesh Vyas — experienced operators dedicated to backing founders at every stage.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        {/* Page Hero */}
        <section className="relative pt-28 pb-16 bg-[#fbf6f3] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-pink/50" />
              <span className="text-xs font-bold text-brand-pink uppercase tracking-[0.3em]">Leadership</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-pink/50" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0B132B] tracking-tight mb-6">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600">Team.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              We are operators and strategists dedicated to bridging the gap between ambition and capital.
            </p>
          </div>
        </section>

        <Team showHeader={false} />
      </main>
      <Footer />
    </div>
  );
}
