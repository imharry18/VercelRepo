"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react"; 
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useUploadThing } from "@/utils/uploadthing";

export default function Contact({ showHeader = true }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    file: null,
  });
  
  const [status, setStatus] = useState("idle"); 
  const fileInputRef = useRef(null);
  const MAX_CHARS = 500;

  const { startUpload } = useUploadThing("pitchDeckUploader");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      let fileUrl = null;

      if (formData.file) {
        const res = await startUpload([formData.file]);
        if (res && res.length > 0) {
          fileUrl = res[0].url;
        }
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
          fileUrl: fileUrl,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", message: "", file: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_CHARS) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section id="contact" className="relative min-h-[90vh] py-24 overflow-hidden bg-white/40 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          
          {/* LEFT SIDE: Info & Branding */}
          <div className="lg:col-span-2 space-y-12 pt-4">
            {showHeader && (
            <ScrollReveal>
              <div>
                <div className="mb-6 flex flex-col items-start">
                  <TextGenerateEffect 
                    words="Raising Capital?" 
                    className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight"
                  />
                  <div className="mt-2">
                    <TextGenerateEffect 
                      words="Let’s Talk." 
                      className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600 pb-1"
                    />
                  </div>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
                  Whether you're exploring a partnership or ready to submit your pitch deck, our team is directly accessible.
                </p>
              </div>
            </ScrollReveal>
            )}

            {/* Section 2: Contact Details */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Direct Lines</h4>
                
                <div className="group">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">General & Partnerships</p>
                  <a href="mailto:Hello@14ucapital.in" className="text-lg font-semibold text-slate-900 group-hover:text-brand-pink transition-colors">
                    Hello@14ucapital.in
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Fundraising Services</p>
                  <a href="mailto:Investments@14ucapital.in" className="text-lg font-semibold text-slate-900 group-hover:text-blue-500 transition-colors">
                    Investments@14ucapital.in
                  </a>
                </div>
              </div>
            </ScrollReveal>


          </div>

          {/* RIGHT SIDE: Interactive Form Card */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <Card className="relative p-8 md:p-12 bg-[#fbf6f3] border border-slate-200 shadow-2xl flex flex-col justify-center">
                  
                  {/* SUCCESS STATE */}
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20 relative z-10">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-pink/20 blur-[50px] rounded-full pointer-events-none" />
                      <motion.div 
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-pink to-purple-600 p-[2px] mb-8 shadow-[0_0_30px_-5px_rgba(183,115,128,0.4)]"
                      >
                        <div className="w-full h-full rounded-full bg-[#fbf6f3] flex items-center justify-center">
                          <motion.svg 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-10 h-10 text-brand-pink"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </motion.svg>
                        </div>
                      </motion.div>
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold text-slate-900 mb-4"
                      >
                        Deck Received
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-600 max-w-xs mx-auto mb-10 leading-relaxed"
                      >
                        Thank you for reaching out. Our investment team has been notified and will review your submission shortly.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Button onClick={() => setStatus("idle")} variant="secondary">
                          Submit Another
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    // FORM INPUT
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all disabled:opacity-50"
                          />
                        </div>
                        
                        {/* Company Input */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Company</label>
                          <input
                            type="text"
                            name="company"
                            required
                            placeholder="Startup Inc."
                            value={formData.company}
                            onChange={handleChange}
                            disabled={status === "loading"}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="founder@startup.com"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all disabled:opacity-50"
                        />
                      </div>

                      {/* File Upload / Pitch Deck */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center space-x-2 ml-1">
                          <label className="text-xs font-bold text-brand-pink uppercase tracking-widest">Attach Pitch Deck</label>
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            id="file-upload"
                            name="file"
                            ref={fileInputRef}
                            accept=".pdf,.ppt,.pptx"
                            onChange={handleFileChange}
                            disabled={status === "loading"}
                            className="hidden"
                          />
                          <div className={`flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-200 rounded-lg transition-all hover:border-brand-pink/50 ${formData.file ? 'ring-1 ring-brand-pink border-brand-pink' : ''} ${status === "loading" ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className={`text-sm truncate mr-4 ${formData.file ? 'text-slate-900 font-medium' : 'text-slate-400 italic'}`}>
                              {formData.file ? formData.file.name : "Optional (PDF or PPTX)"}
                            </span>
                            {formData.file ? (
                              <button type="button" onClick={handleRemoveFile} className="text-slate-400 hover:text-red-500 transition-colors p-1" title="Remove file">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            ) : (
                              <label htmlFor="file-upload" className="cursor-pointer text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1.5 rounded hover:bg-slate-200 transition-colors whitespace-nowrap">
                                Browse Files
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Message Area */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                          <span className="text-[10px] text-slate-400 font-mono">{formData.message.length}/{MAX_CHARS}</span>
                        </div>
                        <textarea
                          name="message"
                          required
                          rows="4"
                          placeholder="Tell us about your round..."
                          value={formData.message}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-300 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all resize-none disabled:opacity-50"
                        ></textarea>
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full py-4 text-lg shadow-xl shadow-brand-pink/20 hover:shadow-brand-pink/40"
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? "Uploading..." : "Submit Your Deck"}
                        </Button>
                        
                        {status === "error" && (
                          <p className="text-center text-red-500 text-sm mt-4 font-medium animate-pulse">
                            There was an error sending your message. Please try again or email us directly.
                          </p>
                        )}
                      </div>
                      
                    </form>
                  )}
                </Card>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
