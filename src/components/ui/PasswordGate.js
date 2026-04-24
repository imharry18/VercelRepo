"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PasswordGate({ companyId, companyName, onVerified }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/portfolio/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: companyId, password: input })
      });
      const data = await res.json();

      if (data.success) {
        onVerified();
      } else {
        setError("Incorrect password. Please contact 14U Capital for access.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100 text-center">
          <div className="w-20 h-20 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-pink">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B132B] mb-2">{companyName} Portal</h1>
          <p className="text-slate-500 mb-8 text-sm">Please enter your company access code to view updates and tasks.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-4 text-center text-lg tracking-widest focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#0B132B] text-white font-bold py-4 rounded-xl hover:bg-brand-pink transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Enter Portal"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
