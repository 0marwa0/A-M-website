"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowUp,
  Cpu,
  Eye,
  Globe,
  Menu,
  Network,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Chatbot, { PersonaMode } from "@/components/Chatbot";
import { useI18n } from "@/lib/i18n";

type Milestone = {
  year: string;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  defaultDesc: string;
  icon: React.ReactNode;
};

export default function AboutUs() {
  const { locale, setLocale, t } = useI18n();
  const [mode, setMode] = useState<PersonaMode>("balanced");
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isArabic = locale === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageStyle = {
    "--theme-primary": "#142143",
    "--theme-secondary": "#b27a4f",
    "--theme-glow": "rgba(20, 33, 67, 0.28)",
    "--theme-gradient": "linear-gradient(135deg, #101b39 0%, #213c67 100%)",
    "--theme-glow-border": "rgba(28, 39, 76, 0.24)",
    "--theme-nav-border": "rgba(112, 93, 67, 0.2)",
  } as CSSProperties;

  const milestones: Milestone[] = [
    {
      year: "2023",
      titleKey: "milestone.launch.title",
      descKey: "milestone.launch.desc",
      defaultTitle: "Neural Core Launch",
      defaultDesc:
        "Established with a commitment to orchestrate intelligent business automation workflows.",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      year: "2024",
      titleKey: "milestone.agents.title",
      descKey: "milestone.agents.desc",
      defaultTitle: "Multi-Agent Frameworks",
      defaultDesc:
        "Developed custom agent-based architectures that execute complex decisions with minimal human overhead.",
      icon: <Network className="h-5 w-5" />,
    },
    {
      year: "2025",
      titleKey: "milestone.scale.title",
      descKey: "milestone.scale.desc",
      defaultTitle: "International Scaling",
      defaultDesc:
        "Expanded operations to global clients, helping teams automate portfolios and scale high-value workflows.",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      year: "2026",
      titleKey: "milestone.autonomous.title",
      descKey: "milestone.autonomous.desc",
      defaultTitle: "Next-Gen Autonomous Systems",
      defaultDesc:
        "Integrating real-time generative feedback loops so deployed systems can continuously refine their own outputs.",
      icon: <Cpu className="h-5 w-5" />,
    },
  ];

  const activeMilestoneData = milestones[activeMilestone] ?? milestones[0];
  const progressWidth = `${(activeMilestone / Math.max(milestones.length - 1, 1)) * 100}%`;
  const activeMilestoneTitle =
    t(activeMilestoneData.titleKey) !== activeMilestoneData.titleKey
      ? t(activeMilestoneData.titleKey)
      : activeMilestoneData.defaultTitle;
  const activeMilestoneDesc =
    t(activeMilestoneData.descKey) !== activeMilestoneData.descKey
      ? t(activeMilestoneData.descKey)
      : activeMilestoneData.defaultDesc;

  const navLinkClass =
    "text-[#25304a]/78 transition-colors duration-300 hover:text-[#9A6847]";
  const cardClass = "rounded-[28px] border border-[#d8cbb8] bg-[#fffdf8]";

  return (
    <div
      className="min-h-screen overflow-hidden bg-[#f7f3ea] text-[#10172d]"
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      style={pageStyle}
    >
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "top-4 px-4 sm:px-6 md:px-8" : "top-0 px-6 py-5"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-2xl border border-[#d8cbb8] bg-[#faf6ed]/86 px-6 py-3.5 shadow-[0_18px_44px_-28px_rgba(61,43,22,0.55)] backdrop-blur-xl"
              : "border-b border-transparent py-2"
          }`}
        >
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <div className="flex items-center gap-1 text-2xl font-bold tracking-tight sm:text-3xl">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--theme-gradient)" }}
              >
                TRI
              </span>
              <span className="text-[#10172d]">MINDS</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-[16px] font-medium lg:flex">
            <Link href="/#services" className={navLinkClass}>
              {t("nav.solutions")}
            </Link>
            <Link href="/about-us" className="font-semibold text-[#9A6847]">
              {t("nav.about")}
            </Link>
            <Link href="/#packages" className={navLinkClass}>
              {t("nav.pricing")}
            </Link>
            <Link href="/#contact" className={navLinkClass}>
              {t("nav.contact")}
            </Link>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              className="flex items-center gap-1.5 rounded-xl border border-[#d8cbb8] bg-[#fbf8f1]/72 px-4 py-2 text-sm text-[#25304a] transition-all duration-300 hover:border-[#9A6847]/40 hover:text-[#9A6847]"
              onClick={() => setLocale(isArabic ? "en" : "ar")}
            >
              <Globe className="h-4 w-4" />
              {isArabic ? "English" : "العربية"}
            </button>
            <Link
              href="/#contact"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04]"
              style={{
                background: "var(--theme-gradient)",
                boxShadow: "0 14px 28px -18px rgba(61, 43, 22, 0.75)",
              }}
            >
              {t("nav.cta")}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="rounded-xl border border-[#d8cbb8] bg-[#fbf8f1]/72 p-2 text-[#25304a] transition-all duration-300 hover:border-[#9A6847]/40 hover:text-[#9A6847]"
              onClick={() => setLocale(isArabic ? "en" : "ar")}
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
            </button>
            <button
              className="rounded-xl border border-[#d8cbb8] bg-[#fbf8f1]/72 p-2 text-[#25304a] transition-all duration-300 hover:border-[#9A6847]/40 hover:text-[#9A6847]"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute left-4 right-4 top-full z-40 mt-2 flex flex-col gap-4 rounded-2xl border border-[#d8cbb8] bg-[#faf6ed]/94 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {[
                { href: "/#services", label: t("nav.solutions") },
                { href: "/about-us", label: t("nav.about"), active: true },
                { href: "/#packages", label: t("nav.pricing") },
                { href: "/#contact", label: t("nav.contact") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-[#d8cbb8] py-2 text-lg transition-colors ${
                    item.active ? "font-semibold text-[#9A6847]" : "text-[#25304a]/88 hover:text-[#9A6847]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white"
                style={{ background: "var(--theme-gradient)" }}
              >
                {t("nav.cta")}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 mx-auto w-full max-w-[1540px] px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <section className={`${cardClass} min-h-[460px] px-8 py-10 shadow-[0_20px_70px_-58px_rgba(61,43,22,0.45)] sm:px-12 lg:px-14`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-[#6f604f]">
              <span className="h-px w-7 bg-[#9A6847]" />
              {isArabic ? "من نحن" : "Who We Are"}
            </div>
            <div className="inline-flex w-fit items-center rounded-full border border-[#d8cbb8] px-4 py-1.5 font-mono text-xs font-semibold text-[#6f604f]">
              AI <span className="px-2 text-[#b69c77]">.</span> Systems{" "}
              <span className="px-2 text-[#b69c77]">.</span> Intelligence
            </div>
          </div>

          <div className="grid gap-10 pt-16 lg:grid-cols-[1fr_0.58fr] lg:items-end">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl font-serif text-[2rem] font-black leading-[1.08] tracking-normal sm:text-[2.7rem] md:text-5xl lg:text-6xl xl:text-[4.8rem]"
            >
              {isArabic ? (
                <>
                  نصل بين
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, #10172d, #9A6847, #152143)" }}
                  >
                    الابتكار البشري
                  </span>
                  <br />
                  وذكاء الأنظمة
                </>
              ) : (
                <>
                  Bridging
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(to right, #10172d, #9A6847, #152143)" }}
                  >
                    Human Ingenuity
                  </span>
                  <br />
                  &amp; Systems
                  <br />
                  Intelligence
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-[470px] pb-4 text-lg font-semibold leading-relaxed text-[#25304a] lg:justify-self-end"
            >
              {t("aboutPage.intro")}
            </motion.p>
          </div>
        </section>

        <section className="grid gap-4 py-4 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative min-h-[220px] overflow-hidden rounded-[28px] p-8 text-white lg:min-h-[240px]"
            style={{
              background: "var(--theme-gradient)",
              boxShadow: "0 24px 50px -32px rgba(61,43,22,0.72)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.28em] text-white/58">
                01 / Mission
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18">
                <span className="h-2.5 w-2.5 rounded-full border-2 border-white/55" />
              </span>
            </div>
            <h2 className="mt-12 font-serif text-3xl font-black">{t("aboutPage.missionTitle")}</h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/72">
              {t("aboutPage.missionDesc")}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className={`${cardClass} min-h-[220px] p-8 lg:min-h-[240px]`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold uppercase tracking-[0.28em] text-[#6f604f]">
                02 / Vision
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8cbb8] bg-[#fbf8f1]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#9A6847] shadow-[0_0_14px_rgba(154,104,71,0.55)]" />
              </span>
            </div>
            <h2 className="mt-12 font-serif text-3xl font-black">{t("aboutPage.visionTitle")}</h2>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-[#25304a]">
              {t("aboutPage.visionDesc")}
            </p>
          </motion.article>
        </section>

        <section className={`${cardClass} px-8 py-10 sm:px-12`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.26em] text-[#6f604f]">
                <span className="h-px w-7 bg-[#9A6847]" />
                {isArabic ? "خط التطور" : "Evolution Timeline"}
              </div>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-normal sm:text-5xl">
                {isArabic ? "كيف تطورنا" : "How We Evolved"}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {milestones.map((milestone, index) => {
                const isActive = activeMilestone === index;

                return (
                  <button
                    key={milestone.year}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveMilestone(index)}
                    className={`min-h-11 rounded-full border px-6 text-sm font-extrabold transition-all duration-300 ${
                      isActive
                        ? "border-transparent text-white shadow-[0_16px_34px_-24px_rgba(61,43,22,0.95)]"
                        : "border-[#d8cbb8] bg-[#fbf8f1] text-[#6f604f] hover:border-[#9A6847]/35 hover:text-[#9A6847]"
                    }`}
                    style={isActive ? { background: "#142143" } : undefined}
                  >
                    {milestone.year}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mt-12 px-1 pb-8">
            <div className="absolute left-4 right-4 top-4 h-px bg-[#d8cbb8]" />
            <div
              className="absolute top-4 h-px bg-gradient-to-r from-[#142143] to-[#9A6847] transition-all duration-500"
              style={{
                left: isArabic ? undefined : "1rem",
                right: isArabic ? "1rem" : undefined,
                width: progressWidth,
              }}
            />
            <div className="relative grid grid-cols-4">
              {milestones.map((milestone, index) => {
                const isActive = activeMilestone === index;

                return (
                  <button
                    key={milestone.year}
                    type="button"
                    onClick={() => setActiveMilestone(index)}
                    className={`group flex flex-col gap-3 ${
                      index === 0
                        ? "items-start"
                        : index === milestones.length - 1
                        ? "items-end"
                        : "items-center"
                    }`}
                    aria-label={`${isArabic ? "عرض عام" : "Show year"} ${milestone.year}`}
                  >
                    <span
                      className={`h-8 w-8 rounded-full border-[3px] transition-all duration-300 ${
                        isActive
                          ? "border-[#142143] bg-[#142143] shadow-[0_0_0_6px_rgba(20,33,67,0.08)]"
                          : "border-[#d8cbb8] bg-white group-hover:border-[#9A6847]/40"
                      }`}
                    />
                    <span
                      className={`font-mono text-sm font-bold ${
                        isActive ? "text-[#142143]" : "text-[#6f604f]"
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestoneData.year}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28 }}
              className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center"
            >
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl font-black text-white"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: "0 18px 34px -24px rgba(61,43,22,0.72)",
                }}
              >
                {activeMilestoneData.year.slice(-2)}
              </div>
              <div className="max-w-3xl">
                <div className="mb-2 flex items-center gap-2 text-[#9A6847]">
                  {activeMilestoneData.icon}
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.24em]">
                    {activeMilestoneData.year}
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-black tracking-normal">
                  {activeMilestoneTitle}
                </h3>
                <p className="mt-4 text-lg font-semibold leading-relaxed text-[#25304a]">
                  {activeMilestoneDesc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="grid gap-4 py-4 lg:grid-cols-3">
          {[
            {
              title: t("aboutPage.values.innovation.title"),
              desc: t("aboutPage.values.innovation.desc"),
              icon: <Sparkles className="h-5 w-5" />,
            },
            {
              title: t("aboutPage.values.precision.title"),
              desc: t("aboutPage.values.precision.desc"),
              icon: <Target className="h-5 w-5" />,
            },
            {
              title: t("aboutPage.values.collaboration.title"),
              desc: t("aboutPage.values.collaboration.desc"),
              icon: <Eye className="h-5 w-5" />,
            },
          ].map((value, index) => (
            <article key={index} className={`${cardClass} p-8`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f3ea] text-[#9A6847]">
                {value.icon}
              </div>
              <h3 className="mt-7 font-serif text-2xl font-black">{value.title}</h3>
              <p className="mt-4 font-semibold leading-relaxed text-[#25304a]">{value.desc}</p>
            </article>
          ))}
        </section>

        <section className={`${cardClass} mb-4 flex flex-col items-start justify-between gap-6 px-8 py-10 sm:px-12 lg:flex-row lg:items-center`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.26em] text-[#6f604f]">
              {isArabic ? "ابدأ الآن" : "Build With Us"}
            </div>
            <h2 className="mt-4 font-serif text-4xl font-black">
              {isArabic ? "جاهز لترقية ذكاء أعمالك؟" : "Ready to scale your intelligence?"}
            </h2>
          </div>
          <Link
            href="/#contact"
            className="inline-flex min-h-14 items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_18px_38px_-22px_rgba(61,43,22,0.85)]"
            style={{
              background: "var(--theme-gradient)",
              boxShadow: "0 18px 38px -24px rgba(61,43,22,0.78)",
            }}
          >
            {isArabic ? "تواصل مع الخبراء" : "Contact Our Experts"}
          </Link>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#d8cbb8] px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <div
            className="bg-clip-text text-2xl font-bold text-transparent"
            style={{ backgroundImage: "var(--theme-gradient)" }}
          >
            {t("footer.company")}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-[#25304a]">
            {t("footer.description")}
          </p>
          <p className="mt-8 text-xs text-[#6f604f]">{t("footer.copyright")}</p>
        </div>
      </footer>

      <Chatbot activeMode={mode} onModeChange={setMode} lightMode />

      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 left-8 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#d8cbb8] bg-[#fffdf8]/82 text-[#25304a] shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:text-[#9A6847] md:left-10"
            aria-label="Scroll to top"
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 52 52">
              <defs>
                <linearGradient id="about-progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#142143" />
                  <stop offset="100%" stopColor="#9A6847" />
                </linearGradient>
              </defs>
              <circle cx="26" cy="26" r="22" stroke="#d8cbb8" strokeWidth="3.5" fill="transparent" />
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="url(#about-progress-gradient)"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (scrollProgress / 100) * 138.2}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
                className="transition-all duration-100"
              />
            </svg>
            <ArrowUp className="relative z-10 h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
