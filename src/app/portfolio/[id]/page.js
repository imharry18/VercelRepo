"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PasswordGate from "@/components/ui/PasswordGate";
import Image from "next/image";

export default function StartupPortal() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const updatesEndRef = useRef(null);

  const scrollToBottom = () => {
    updatesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setCompany(found);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (isVerified && company?.updates) {
      scrollToBottom();
    }
  }, [isVerified, company?.updates]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#fbf6f3] text-slate-400">Loading Startup Data...</div>;
  if (!company) return <div className="min-h-screen flex items-center justify-center bg-[#fbf6f3] text-slate-400">Company Not Found</div>;

  if (!isVerified) {
    return (
      <PasswordGate 
        companyId={company.id}
        companyName={company.name} 
        onVerified={() => setIsVerified(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f3]">
      <Navbar />
      
      <main className="flex-grow w-full pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Dashboard Header */}
          <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center shadow-xl overflow-hidden`}>
                {company.logo ? (
                  <Image src={company.logo.startsWith("http") || company.logo.startsWith("/") ? company.logo : `/portfolio/${company.logo}`} alt={company.name} width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-black text-white">{company.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-black text-[#0B132B] tracking-tight uppercase">{company.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{company.sector}</span>
                  <span className="text-xs font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/5 px-3 py-1 rounded-full border border-brand-pink/10">{company.stage}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-8 text-center border-l border-slate-100 pl-8 hidden md:flex">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-black text-slate-800">{company.status}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Portal Access</p>
                    <p className="text-sm font-black text-emerald-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Verified
                    </p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Timeline / Task List (Left 40%) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#0B132B] flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-pink">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.75c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 1.927-.184" />
                  </svg>
                  Operational Timeline
                </h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{company.tasks?.length || 0} Milestones</span>
              </div>

              <div className="space-y-4">
                {(company.tasks && company.tasks.length > 0) ? company.tasks.map((task, idx) => (
                  <div key={task.id} className="relative pl-8 pb-4 group">
                    {/* Vertical Line */}
                    {idx !== company.tasks.length - 1 && (
                      <div className="absolute left-[11px] top-6 w-[2px] h-full bg-slate-200 group-hover:bg-brand-pink/30 transition-colors" />
                    )}
                    
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${task.status === 'completed' ? 'bg-emerald-500' : task.status === 'in-progress' ? 'bg-brand-pink animate-pulse' : 'bg-slate-300'}`}>
                        {task.status === 'completed' && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
                      <p className="text-xs font-bold text-slate-400 mb-1">{new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <h3 className="text-sm font-bold text-slate-800">{task.title}</h3>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-sm font-medium">
                    No milestones recorded yet.
                  </div>
                )}
              </div>
            </div>

            {/* Updates Box (Right 60%) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0B132B] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-pink">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                  Startup Update Log
                </h2>
              </div>

              <div className="bg-white rounded-3xl p-8 min-h-[500px] shadow-sm border border-slate-100 relative overflow-hidden flex flex-col">
                <div className="relative z-10 flex-grow space-y-8 overflow-y-auto max-h-[600px] pr-4 custom-scrollbar">
                  {(company.updates && company.updates.length > 0) ? company.updates.map((update, idx) => {
                    const date = new Date(update.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                    
                    return (
                      <div key={update.id} className="relative pl-6 border-l-2 border-slate-100 group">
                        {/* Status Pulse */}
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand-pink ring-4 ring-white" />
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-brand-pink uppercase tracking-[0.2em]">{update.sender} UPDATE</span>
                            <span className="text-[10px] font-bold text-slate-400">{date} • {new Date(update.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          
                          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-50 group-hover:bg-white group-hover:border-slate-200 group-hover:shadow-md transition-all duration-300">
                             <p className="text-sm leading-relaxed text-slate-700 font-medium">{update.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500/30">
                        <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l4 4v10a2 2 0 0 1-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 3v5h5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11h8" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 15h5" /></svg>
                        <p className="font-bold uppercase tracking-[0.2em] text-xs">No official updates posted</p>
                    </div>
                  )}
                  <div ref={updatesEndRef} />
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
