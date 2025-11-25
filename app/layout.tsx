import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space"
});

export const metadata: Metadata = {
  title: "M2A Ai | Futuristic Intelligence Platform",
  description: "Cinematic AI experiences powered by M2A Ai."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} bg-midnight text-slate-100 antialiased`}>
        <div className="relative min-h-screen overflow-hidden">
          <div className="bg-starfield" />
          <div className="pointer-events-none absolute inset-0">
            <div className="soft-spot left-[-8%] top-[-5%]" />
            <div className="soft-spot right-[-12%] top-[15%] bg-gradient-to-br from-plasma/60 via-aurora/40 to-cyanflare/45" />
            <div className="soft-spot left-[18%] bottom-[-10%] bg-gradient-to-tr from-cyanflare/40 via-aurora/40 to-plasma/35" />
          </div>
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
