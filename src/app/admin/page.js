"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PRESET_GRADIENTS = [
  "from-brand-pink to-brand-rose",
  "from-purple-600 to-indigo-600",
  "from-blue-600 to-cyan-500",
  "from-indigo-500 to-blue-500",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-slate-700 to-slate-900"
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [portfolio, setPortfolio] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const generatePortalKey = (length = 12) => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  };

  const handleGeneratePortalKey = (index) => {
    const key = generatePortalKey();
    handleUpdatePortfolio(index, "password", key);
    setMessage("✅ New portal key generated. Remember to Publish to save.");
  };

  const handleCopyPortalKey = async (key) => {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      setMessage("✅ Portal key copied. Remember to Publish to save.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to copy portal key.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portRes, teamRes] = await Promise.all([
          fetch("/api/portfolio"),
          fetch("/api/team")
        ]);
        const portData = await portRes.json();
        const teamData = await teamRes.json();
        setPortfolio(portData);
        setTeam(teamData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setMessage("");
      } else {
        setMessage("Incorrect password");
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
    }
  };

  const handleUpdatePortfolio = (index, field, value) => {
    const updated = [...portfolio];
    updated[index][field] = value;
    setPortfolio(updated);
  };

  const handleUpdateTeam = (index, field, value) => {
    const updated = [...team];
    updated[index][field] = value;
    setTeam(updated);
  };

  const handleAddPortfolio = () => {
    const randomGradient = PRESET_GRADIENTS[Math.floor(Math.random() * PRESET_GRADIENTS.length)];
    const newCompany = {
      id: Date.now().toString(),
      name: "New Company",
      stage: "Seed",
      sector: "Tech",
      description: "",
      status: "Currently Raising",
      logo: "",
      color: randomGradient,
    };
    setPortfolio([...portfolio, newCompany]);
  };

  const handleAddTeam = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "New Member",
      role: "Advisor",
      bio: "",
      photo: "/default-avatar.png",
      linkedin: "",
      accent: "bg-slate-500",
      borderAccent: "border-l-slate-500"
    };
    setTeam([...team, newMember]);
  };

  const handleDeletePortfolio = (index) => {
    const updated = portfolio.filter((_, i) => i !== index);
    setPortfolio(updated);
  };

  const handleDeleteTeam = (index) => {
    const updated = team.filter((_, i) => i !== index);
    setTeam(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const endpoint = activeTab === "portfolio" ? "/api/portfolio" : "/api/team";
      const data = activeTab === "portfolio" ? portfolio : team;
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage(`✅ ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} updated successfully!`);
        setTimeout(() => setMessage(""), 3000);
        if (activeTab === "portfolio") {
          setPortfolio((prev) => prev.map((item) => ({ ...item, password: "" })));
        }
      } else {
        setMessage("❌ Failed to save updates.");
      }
    } catch (error) {
      setMessage("❌ Error saving data.");
    }
    setSaving(false);
  };

  const exportJSON = () => {
    const data = activeTab === "portfolio" ? portfolio : team;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${activeTab}_data.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const json = JSON.parse(e.target.result);
        if (activeTab === "portfolio") setPortfolio(json);
        else setTeam(json);
        setMessage("✅ JSON imported successfully! (Click Publish to save)");
      } catch (err) {
        setMessage("❌ Invalid JSON file.");
      }
    };
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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-[#0B132B] tracking-tight">Control Center</h1>
              <p className="text-slate-500 mt-2">Manage your startup deal flow and team members.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                  <button 
                    onClick={() => setActiveTab("portfolio")}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "portfolio" ? "bg-[#0B132B] text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Portfolio
                  </button>
                  <button 
                    onClick={() => setActiveTab("team")}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "team" ? "bg-[#0B132B] text-white shadow-md" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Team
                  </button>
               </div>
               <button
                onClick={handleSave}
                disabled={saving}
                className="bg-brand-pink text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-rose-500 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mb-6">
             <label className="cursor-pointer text-xs font-bold text-slate-500 hover:text-brand-pink flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Import JSON
                <input type="file" onChange={importJSON} className="hidden" accept=".json" />
             </label>
             <button onClick={exportJSON} className="text-xs font-bold text-slate-500 hover:text-brand-pink flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Export JSON
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
              {activeTab === "portfolio" ? (
                <>
                  {portfolio.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 relative group">
                      <button 
                        onClick={() => handleDeletePortfolio(index)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Company Name</label>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleUpdatePortfolio(index, "name", e.target.value)}
                                className="w-full border-b border-slate-200 bg-transparent py-2 text-lg font-bold text-slate-900 focus:outline-none focus:border-brand-pink"
                              />
                            </div>
                            <a 
                              href={`/admin/portfolio/${item.id}`}
                              className="text-xs font-bold text-brand-pink hover:text-rose-600 bg-brand-pink/5 px-4 py-2 rounded-lg border border-brand-pink/10 transition-all flex items-center gap-2"
                            >
                              Manage Portal & Updates
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                            </a>
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Sector</label>
                            <input
                              type="text"
                              value={item.sector || ""}
                              onChange={(e) => handleUpdatePortfolio(index, "sector", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-700 focus:outline-none focus:border-brand-pink"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                           <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Stage</label>
                            <input
                              type="text"
                              value={item.stage}
                              onChange={(e) => handleUpdatePortfolio(index, "stage", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-700 focus:outline-none focus:border-brand-pink"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                            <input
                              type="text"
                              value={item.status}
                              onChange={(e) => handleUpdatePortfolio(index, "status", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-pink text-sm"
                              placeholder="e.g. Invested by 14U"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div>
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Logo Filename (in public/portfolio/)</label>
                          <input
                            type="text"
                            value={item.logo || ""}
                            onChange={(e) => handleUpdatePortfolio(index, "logo", e.target.value)}
                            className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-600 focus:outline-none focus:border-brand-pink"
                            placeholder="e.g. pelican.png"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
                        <textarea
                          value={item.description || ""}
                          onChange={(e) => handleUpdatePortfolio(index, "description", e.target.value)}
                          rows={2}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-pink text-sm"
                          placeholder="Short company description..."
                        />
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Portal Access Key</label>
                        <div className="flex flex-col md:flex-row gap-3">
                          <input
                            type="text"
                            value={item.password || ""}
                            onChange={(e) => handleUpdatePortfolio(index, "password", e.target.value)}
                            className="flex-grow bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-mono tracking-widest focus:outline-none focus:border-brand-pink"
                            placeholder="Set a new key"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleGeneratePortalKey(index)}
                              className="px-3 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-brand-pink hover:text-brand-pink transition-colors"
                            >
                              Generate
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyPortalKey(item.password)}
                              className="px-3 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-brand-pink hover:text-brand-pink transition-colors"
                              disabled={!item.password}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Label (optional)</label>
                          <input
                            type="text"
                            value={item.keyLabel || ""}
                            onChange={(e) => handleUpdatePortfolio(index, "keyLabel", e.target.value)}
                            className="w-full bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-brand-pink"
                            placeholder="e.g. Spring 2026 key"
                          />
                        </div>
                        <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Keys are hashed on publish and never shown again.
                        </p>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddPortfolio}
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-white hover:border-brand-pink hover:text-brand-pink transition-all flex items-center justify-center gap-2"
                  >
                    Add New Company
                  </button>
                </>
              ) : (
                <>
                  {team.map((member, index) => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6 relative group">
                      <button 
                        onClick={() => handleDeleteTeam(index)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleUpdateTeam(index, "name", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-lg font-bold text-slate-900 focus:outline-none focus:border-brand-pink"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Role</label>
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleUpdateTeam(index, "role", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-700 focus:outline-none focus:border-brand-pink"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">LinkedIn URL</label>
                            <input
                              type="text"
                              value={member.linkedin}
                              onChange={(e) => handleUpdateTeam(index, "linkedin", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-700 focus:outline-none focus:border-brand-pink"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Photo Filename (in public/team/)</label>
                            <input
                              type="text"
                              value={member.photo}
                              onChange={(e) => handleUpdateTeam(index, "photo", e.target.value)}
                              className="w-full border-b border-slate-200 bg-transparent py-2 text-sm text-slate-700 focus:outline-none focus:border-brand-pink"
                              placeholder="e.g. shashank.jpeg"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Bio</label>
                        <textarea
                          value={member.bio}
                          onChange={(e) => handleUpdateTeam(index, "bio", e.target.value)}
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-pink text-sm"
                          placeholder="Member biography..."
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddTeam}
                    className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-white hover:border-brand-pink hover:text-brand-pink transition-all flex items-center justify-center gap-2"
                  >
                    Add New Team Member
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
