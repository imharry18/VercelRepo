"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AdminPage() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Add Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load portfolio", err);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded password for the custom CMS
    if (password === "14UAdmin2026") {
      setIsAuthenticated(true);
    } else {
      setMessage("Incorrect password");
    }
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...portfolio];
    updated[index][field] = value;
    setPortfolio(updated);
  };

  const handleAdd = () => {
    const newCompany = {
      id: Date.now().toString(),
      name: "New Company",
      stage: "Seed",
      status: "Currently Raising",
      color: "from-slate-500 to-slate-400",
    };
    setPortfolio([...portfolio, newCompany]);
  };

  const handleDelete = (index) => {
    const updated = portfolio.filter((_, i) => i !== index);
    setPortfolio(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio),
      });

      if (res.ok) {
        setMessage("✅ Portfolio updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Failed to save updates.");
      }
    } catch (error) {
      setMessage("❌ Error saving data.");
    }
    setSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
            <h1 className="text-2xl font-bold text-[#0B132B] mb-6 text-center">14U CMS Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                  placeholder="Enter admin password"
                />
              </div>
              {message && <p className="text-red-500 text-sm">{message}</p>}
              <button type="submit" className="w-full bg-[#0B132B] text-white font-semibold py-3 rounded-lg hover:bg-brand-pink transition-colors mt-2">
                Login
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />
      
      <main className="flex-grow w-full pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-[#0B132B] tracking-tight">Portfolio CMS</h1>
              <p className="text-slate-500 mt-2">Manage your startup deal flow here.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-brand-pink text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-rose-500 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Publish Changes"}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-bold ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading database...</div>
          ) : (
            <div className="space-y-6">
              {portfolio.map((item, index) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 relative group">
                  
                  <button 
                    onClick={() => handleDelete(index)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                    title="Delete this entry"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Company Name</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdate(index, "name", e.target.value)}
                          className="w-full border-b border-slate-200 bg-transparent py-2 text-lg font-bold text-slate-900 focus:outline-none focus:border-brand-pink"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Gradient Colors (Tailwind)</label>
                        <input
                          type="text"
                          value={item.color}
                          onChange={(e) => handleUpdate(index, "color", e.target.value)}
                          className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-600 focus:outline-none focus:border-brand-pink font-mono"
                          placeholder="e.g. from-brand-pink to-brand-rose"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Stage</label>
                        <input
                          type="text"
                          value={item.stage}
                          onChange={(e) => handleUpdate(index, "stage", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-pink text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdate(index, "status", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-pink text-sm"
                        >
                          <option value="Invested by 14U">Invested by 14U</option>
                          <option value="Currently Raising">Currently Raising</option>
                          <option value="Exited">Exited</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAdd}
                className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-white hover:border-brand-pink hover:text-brand-pink transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Company
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
