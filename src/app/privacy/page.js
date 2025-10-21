import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />

      <main className="flex-grow w-full pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate prose-lg text-slate-700 max-w-none">
            <p>At 14U Capital, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your personal and corporate information.</p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Information We Collect</h2>
            <p>We may collect personal details (name, email, phone number) and business information (pitch decks, financials) when you voluntarily submit them through our contact forms or via email.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
            <p>We use the provided information exclusively to evaluate potential partnerships, communicate regarding advisory services, and facilitate deal flow. We do not sell your data to third parties.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Data Protection</h2>
            <p>We implement industry-standard security measures to safeguard your submitted documents and communications. Access to your sensitive business information is restricted to authorized 14U Capital personnel only.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Contact Us</h2>
            <p>If you have any questions or concerns regarding our privacy practices, please contact us at <strong>Hello@14ucapital.in</strong>.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
