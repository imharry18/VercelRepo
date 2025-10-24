"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo Area */}
        <Link href="/" className="flex items-center space-x-2 md:space-x-4 group">
          <div className="relative flex items-center w-32 h-10 lg:w-40 lg:h-12 group-hover:scale-105 transition-transform duration-500 origin-left">
            <Image
              src="/logo-14u-capital.png"
              alt="14U Capital Logo"
              width={400}
              height={200}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Subtle Divider */}
          <div className="hidden md:block w-px h-7 bg-slate-200" />

          {/* Tagline */}
          <div className="hidden sm:block">
            <div className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-semibold animate-shimmer bg-gradient-to-r from-slate-400 via-slate-800 to-slate-400 bg-[length:200%_100%] bg-clip-text text-transparent">
              Backing Founders
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 transition-colors group ${isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-pink rounded-full transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}

          <Button
            href="/contact"
            size="sm"
            className="shadow-[0_4px_14px_0_rgba(183,115,128,0.39)] hover:shadow-[0_6px_20px_rgba(183,115,128,0.5)] transition-shadow duration-300"
          >
            Contact Us
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-slate-700 hover:text-brand-pink transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-semibold py-2 transition-colors ${pathname === item.href ? "text-brand-pink" : "text-slate-700 hover:text-brand-pink"}`}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" size="sm" className="w-full mt-2" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
