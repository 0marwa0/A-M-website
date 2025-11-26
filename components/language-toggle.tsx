"use client";

import { useLanguage } from "./language-context";
import { cn } from "../lib/utils";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-cyanflare/60 hover:bg-white/10"
      aria-label="Toggle language"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-plasma/20 via-aurora/10 to-cyanflare/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={cn(
          "relative z-10 rounded-full px-2 py-1 transition-all duration-300",
          !isArabic && "bg-gradient-to-r from-plasma to-cyanflare text-white shadow-glow"
        )}
      >
        EN
      </span>
      <span
        className={cn(
          "relative z-10 rounded-full px-2 py-1 transition-all duration-300",
          isArabic && "bg-gradient-to-r from-plasma to-cyanflare text-white shadow-glow"
        )}
      >
        AR
      </span>
    </button>
  );
}
