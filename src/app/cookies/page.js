import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Cookies() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />

      <main className="flex-grow w-full pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">Cookie Policy</h1>
          <p className="text-sm text-slate-500 mb-12 uppercase tracking-widest font-semibold">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate prose-lg text-slate-700 max-w-none">
            <p>This Cookie Policy explains how 14U Capital uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.</p>
            
            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. What are cookies?</h2>
            <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Why do we use cookies?</h2>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. How can I control cookies?</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
