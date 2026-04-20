"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CompanyManagement() {
  const { id } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [newTask, setNewTask] = useState({ title: "", date: "", status: "in-progress" });
  const [newUpdate, setNewUpdate] = useState({ content: "", sender: "Admin" });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [portalKey, setPortalKey] = useState("");

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setCompany(found);
        setLoading(false);
      });
  }, [id]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: authPassword })
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

  const handleSave = async (updatedCompany) => {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio")
        .then(r => r.json());
      
      const newPortfolio = res.map(c => c.id === id ? updatedCompany : c);

      const saveRes = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPortfolio),
      });

      if (saveRes.ok) {
        const sanitized = { ...updatedCompany };
        delete sanitized.password;
        setCompany(sanitized);
        setMessage("✅ Changes saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setMessage("❌ Failed to save.");
    }
    setSaving(false);
  };

  const generatePortalKey = (length = 12) => {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
  };

  const handleGeneratePortalKey = () => {
    const key = generatePortalKey();
    setPortalKey(key);
    setMessage("✅ New portal key generated. Click Save Key to apply.");
  };

  const handleCopyPortalKey = async () => {
    if (!portalKey) return;
    try {
      await navigator.clipboard.writeText(portalKey);
      setMessage("✅ Portal key copied. Click Save Key to apply.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to copy portal key.");
    }
  };

  const handleSavePortalKey = async () => {
    if (!portalKey) {
      setMessage("❌ Enter or generate a key first.");
      return;
    }

    await handleSave({ ...company, password: portalKey });
    setPortalKey("");
  };

  const addTask = () => {
    if (!newTask.title || !newTask.date) return;
    const updated = {
      ...company,
      tasks: [...(company.tasks || []), { ...newTask, id: Date.now().toString() }]
    };
    handleSave(updated);
    setNewTask({ title: "", date: "", status: "in-progress" });
  };

  const addUpdate = () => {
    if (!newUpdate.content) return;
    const updated = {
      ...company,
      updates: [...(company.updates || []), { ...newUpdate, id: Date.now().toString(), timestamp: new Date().toISOString() }]
    };
    handleSave(updated);
    setNewUpdate({ content: "", sender: "Admin" });
  };

  const deleteTask = (taskId) => {
    const updated = {
      ...company,
      tasks: company.tasks.filter(t => t.id !== taskId)
    };
    handleSave(updated);
  };

  const deleteUpdate = (updateId) => {
    const updated = {
      ...company,
      updates: company.updates.filter(u => u.id !== updateId)
    };
    handleSave(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-20">
          <div className="w-full max-w-md p-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 mx-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-brand-pink/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-brand-pink">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-[#0B132B]">Admin Access</h1>
              <p className="text-sm text-slate-500 mt-2">Enter your password to manage {company?.name}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-brand-pink text-center font-bold tracking-[0.3em]"
              />
              {message && <p className="text-center text-xs font-bold text-red-500">{message}</p>}
              <button
                type="submit"
                className="w-full bg-[#0B132B] text-white py-4 rounded-2xl font-bold hover:bg-brand-pink transition-all shadow-lg hover:shadow-brand-pink/30"
              >
                Unlock Management
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
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.push("/admin")} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-[#0B132B]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </button>
            <h1 className="text-3xl font-black text-[#0B132B] tracking-tight">{company.name} Management</h1>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-sm font-bold text-emerald-600">
                {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Timeline Management */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#0B132B] mb-6 flex items-center gap-2">
                    Timeline Milestones
                </h2>
                
                <div className="space-y-4 mb-8">
                    {company.tasks?.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div>
                                <p className="text-sm font-bold text-slate-800">{task.title}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{task.date} • {task.status}</p>
                            </div>
                            <button onClick={() => deleteTask(task.id)} className="text-red-300 hover:text-red-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Add New Milestone</p>
                    <input 
                        type="text" 
                        placeholder="Milestone Title" 
                        value={newTask.title}
                        onChange={e => setNewTask({...newTask, title: e.target.value})}
                        className="w-full bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                            type="date" 
                            value={newTask.date}
                            onChange={e => setNewTask({...newTask, date: e.target.value})}
                            className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                        />
                        <select 
                            value={newTask.status}
                            onChange={e => setNewTask({...newTask, status: e.target.value})}
                            className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                        >
                            <option value="completed">Completed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <button onClick={addTask} className="w-full bg-[#0B132B] text-white py-2 rounded-lg text-sm font-bold hover:bg-brand-pink transition-colors">
                        Add Milestone
                    </button>
                </div>
            </div>

            {/* Updates Management */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-bold text-[#0B132B] mb-6">Communication Log</h2>
                
                <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {company.updates?.map(update => (
                        <div key={update.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                            <p className="text-xs font-bold text-slate-400 mb-1">{update.sender} • {new Date(update.timestamp).toLocaleString()}</p>
                            <p className="text-sm text-slate-700">{update.content}</p>
                            <button onClick={() => deleteUpdate(update.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Post New Update</p>
                    <textarea 
                        rows={3}
                        placeholder="Write an update..." 
                        value={newUpdate.content}
                        onChange={e => setNewUpdate({...newUpdate, content: e.target.value})}
                        className="w-full bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                    />
                    <select 
                        value={newUpdate.sender}
                        onChange={e => setNewUpdate({...newUpdate, sender: e.target.value})}
                        className="w-full bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-brand-pink"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Founder">Founder</option>
                    </select>
                    <button onClick={addUpdate} className="w-full bg-brand-pink text-white py-2 rounded-lg text-sm font-bold hover:bg-rose-500 transition-colors shadow-md">
                        Post Update
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Portal Security</p>
                  <div className="flex flex-col gap-3">
                    <input 
                      type="text" 
                      value={portalKey}
                      onChange={e => setPortalKey(e.target.value)}
                      className="flex-grow bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-mono tracking-widest focus:outline-none focus:border-brand-pink"
                      placeholder="Set a new portal key"
                    />
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={handleGeneratePortalKey}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-brand-pink hover:text-brand-pink transition-colors"
                      >
                        Generate
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyPortalKey}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-brand-pink hover:text-brand-pink transition-colors"
                        disabled={!portalKey}
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={handleSavePortalKey}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-brand-pink text-white hover:bg-rose-500 transition-colors"
                        disabled={saving || !portalKey}
                      >
                        Save Key
                      </button>
                    </div>
                        <div className="pt-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Key Label (optional)</label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              value={company?.keyLabel || ""}
                              onChange={(e) => setCompany({ ...company, keyLabel: e.target.value })}
                              className="flex-grow bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-brand-pink"
                              placeholder="e.g. Spring 2026 key"
                            />
                            <button
                              type="button"
                              onClick={() => handleSave({ ...company })}
                              className="px-3 py-2 rounded-lg text-xs font-bold bg-white border border-slate-200 hover:border-brand-pink hover:text-brand-pink transition-colors"
                              disabled={saving}
                            >
                              Save Label
                            </button>
                          </div>
                        </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Keys are hashed on save and never shown again.
                    </p>
                  </div>
                </div>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
