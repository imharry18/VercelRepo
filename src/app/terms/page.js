import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />

      <main className="flex-grow w-full pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate prose-lg text-slate-700 max-w-none">
            <p>Welcome to 14U Capital. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these Terms.</p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Acceptance of Terms</h2>
            <p>By engaging with 14U Capital, submitting materials, or utilizing our advisory services, you acknowledge that you have read, understood, and agree to be bound by these terms.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Services Description</h2>
            <p>14U Capital provides strategic finance, fundraising advisory, and operational execution services. We do not act as a broker-dealer or provide regulated financial advice unless explicitly stated in a separate engagement letter.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Confidentiality & Submissions</h2>
            <p>Any pitch decks, financials, or proprietary business information submitted to us via this website will be treated with confidentiality. However, submitting information does not establish a formal advisory relationship until an engagement agreement is signed.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Limitation of Liability</h2>
            <p>14U Capital is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or our advisory services, except as explicitly outlined in a formal engagement contract.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
