"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "ar";

type LanguageContextShape = {
  language: Language;
  isRTL: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextShape | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.body.dataset.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isRTL: language === "ar",
      toggleLanguage: () => setLanguage((prev) => (prev === "en" ? "ar" : "en"))
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
