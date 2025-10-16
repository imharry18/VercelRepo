import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HomeAbout from "@/components/sections/HomeAbout";
import HomeVerticals from "@/components/sections/HomeVerticals";
import HomeFocus from "@/components/sections/HomeFocus";
import HomePortfolio from "@/components/sections/HomePortfolio";
import HomeCTA from "@/components/sections/HomeCTA";

export const metadata = {
  title: "14U Capital — Backing Founders Building the Future",
  description:
    "14U Capital is a founder-focused advisory firm specializing in fundraising, strategic finance, and growth execution. We partner with startups from Seed to Series A and beyond.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full">
        <Hero />
        <HomeAbout />
        <HomeVerticals />
        <HomeFocus />
        <HomePortfolio />
        <HomeCTA />
      </main>

      <Footer />
    </div>
  );
}
