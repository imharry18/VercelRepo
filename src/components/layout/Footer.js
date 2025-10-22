import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#fbf6f3] border-t border-slate-200 py-12 overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-pink to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-brand-pink/10 blur-[120px] rounded-full pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-10">

          {/* Left Column: Brand & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center w-36 h-10 lg:w-44 lg:h-12">
                <Image
                  src="/logo-14u-capital.png"
                  alt="14U Capital Logo"
                  width={400}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Address */}
            <div className="text-slate-600 text-sm leading-relaxed">
              <p className="font-semibold text-slate-900 mb-1">Head Office</p>
              <p>Regus World Trade Center</p>
              <p>Unit 2201A, 22nd Floor</p>
              <p>Brigade Gateway Campus</p>
              <p>Bangalore 560055 | India</p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col space-y-4 text-sm">
              <div>
                <span className="block text-slate-500 mb-1 text-xs uppercase tracking-widest font-semibold">General & Partnerships</span>
                <a href="mailto:Hello@14ucapital.in" className="text-slate-900 font-medium hover:text-brand-pink transition-colors">
                  Hello@14ucapital.in
                </a>
              </div>
              <div>
                <span className="block text-slate-500 mb-1 text-xs uppercase tracking-widest font-semibold">Fundraising Services</span>
                <a href="mailto:Investments@14ucapital.in" className="text-slate-900 font-medium hover:text-brand-pink transition-colors">
                  Investments@14ucapital.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Columns: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Quick Links */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><Link href="/" className="hover:text-brand-pink transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-brand-pink transition-colors">Services</Link></li>
                <li><Link href="/portfolio" className="hover:text-brand-pink transition-colors">Portfolio</Link></li>
                <li><Link href="/team" className="hover:text-brand-pink transition-colors">Team</Link></li>
                <li><Link href="/contact" className="hover:text-brand-pink transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Connect</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li>
                  <a href="mailto:hello@14ucapital.in" className="hover:text-brand-pink transition-colors">
                    Send Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/14u-capital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><Link href="/terms" className="hover:text-brand-pink transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-brand-pink transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-brand-pink transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} 14U Venture LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
