import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-pjs'
});

export const metadata = {
  title: "14U Capital",
  icons: {
    icon: '/14u.png', 
  },
  description: "Turn Vision into Velocity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased bg-[#fbf6f3] text-slate-900 selection:bg-brand-pink/30 selection:text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
