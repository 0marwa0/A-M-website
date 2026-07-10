"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Facebook, Instagram, Linkedin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import CosmicBackground from "@/components/CosmicBackground";
import Chatbot, { PersonaMode } from "@/components/Chatbot";
import { Component as TypewriterTestimonial } from "@/components/ui/typewriter-testimonial";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { RoadmapProcess } from "@/components/ui/roadmap-process";
import StarField from "@/components/StarField";
import InteractiveHUD from "@/components/InteractiveHUD";
import Preloader from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

const showcaseKeys = ["education", "realEstate", "healthcare", "logistics", "finance"] as const;
type ShowcaseKey = (typeof showcaseKeys)[number];

const showcaseVisuals: Record<ShowcaseKey, { color: string; src: string }> = {
  education: {
    color: "#E44CFF",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  },
  realEstate: {
    color: "#8B56FF",
    src: "https://www.colliers.com/-/media/files/emea/mena/uae/research-reports/2026/whatsapp-image-20260520-at-110001.ashx?bid=690ed16a02a44c18890bdf09f35ba7f7",
  },
  healthcare: {
    color: "#2EDAA2",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
  },
  logistics: {
    color: "#5861F2",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  },
  finance: {
    color: "#4EF0FF",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
};

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [mode, setMode] = useState<PersonaMode>("balanced");
  const [wordIndex, setWordIndex] = useState(0);
  const [activeShowcaseKey, setActiveShowcaseKey] = useState<ShowcaseKey>("finance");

  const rawWords = t("hero.words");
  const words = Array.isArray(rawWords) ? rawWords : ["Business", "Future", "Growth", "Workflows", "Success"];

  const customerShowcases = showcaseKeys.map((key) => {
    const stats = t(`customers.showcases.${key}.stats`);

    return {
      key,
      label: t(`customers.industries.${key}`),
      title: t(`customers.showcases.${key}.title`),
      body: t(`customers.showcases.${key}.body`),
      tag: t(`customers.showcases.${key}.tag`),
      meta: t(`customers.showcases.${key}.meta`),
      stats: Array.isArray(stats) ? stats : [],
      ...showcaseVisuals[key],
    };
  });
  const activeShowcase =
    customerShowcases.find((showcase) => showcase.key === activeShowcaseKey) ?? customerShowcases[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  const communityMembers = [
    {
      name: "Syed Muhammad Haris",
      role: "CEO",
      orbit: 450,
      initialAngle: 0,
      duration: 60,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Malik Murtaza",
      role: "CTO",
      orbit: 450,
      initialAngle: 90,
      duration: 60,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Haseeb Arshad",
      role: "Sales Manager",
      orbit: 450,
      initialAngle: 180,
      duration: 60,
      badgeWidth: "14.5rem",
      image:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Saffuan Mushtaq",
      role: "Developer",
      orbit: 450,
      initialAngle: 270,
      duration: 60,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Sarah Chen",
      role: "Designer",
      orbit: 340,
      initialAngle: 45,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "James Wilson",
      role: "Product Lead",
      orbit: 340,
      initialAngle: 135,
      duration: 50,
      badgeWidth: "14rem",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Emily Parker",
      role: "Marketing",
      orbit: 340,
      initialAngle: 225,
      duration: 50,
      badgeWidth: "13.5rem",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Alex Kumar",
      role: "Engineer",
      orbit: 340,
      initialAngle: 315,
      duration: 50,
      badgeWidth: "13rem",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const floatingAvatars = [
    {
      orbit: 220,
      initialAngle: 0,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 72,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 144,
      duration: 40,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 216,
      duration: 40,
      size: "50px",
      image:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 220,
      initialAngle: 288,
      duration: 40,
      size: "52px",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 30,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 150,
      duration: 70,
      size: "48px",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      orbit: 530,
      initialAngle: 270,
      duration: 70,
      size: "46px",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  const orbitDots = [
    { left: "35%", top: "32%" },
    { left: "62%", top: "28%" },
    { left: "26%", top: "57%" },
    { left: "50%", top: "68%" },
    { left: "72%", top: "70%" },
    { left: "20%", top: "78%" },
    { left: "58%", top: "46%" },
  ];

  // Get active theme colors for global elements
  const getGlobalThemeStyles = (activeMode: PersonaMode) => {
    switch (activeMode) {
      case "creative":
        return {
          "--theme-primary": "#E44CFF",
          "--theme-secondary": "#7B4CFF",
          "--theme-glow": "rgba(228, 76, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #E44CFF, #7B4CFF)",
          "--theme-glow-border": "rgba(228, 76, 255, 0.3)",
          "--theme-nav-border": "rgba(228, 76, 255, 0.2)",
          background: "#060816",
        } as React.CSSProperties;
      case "precise":
        return {
          "--theme-primary": "#4EF0FF",
          "--theme-secondary": "#10B981",
          "--theme-glow": "rgba(78, 240, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #4EF0FF, #10B981)",
          "--theme-glow-border": "rgba(78, 240, 255, 0.3)",
          "--theme-nav-border": "rgba(78, 240, 255, 0.2)",
          background: "#060816",
        } as React.CSSProperties;
      case "balanced":
      default:
        return {
          "--theme-primary": "#E44CFF",
          "--theme-secondary": "#5861F2",
          "--theme-glow": "rgba(228, 76, 255, 0.5)",
          "--theme-gradient": "linear-gradient(to right, #E44CFF, #5861F2)",
          "--theme-glow-border": "rgba(228, 76, 255, 0.3)",
          "--theme-nav-border": "rgba(228, 76, 255, 0.12)",
          background: "#060816",
        } as React.CSSProperties;
    }
  };

  const footerEmail = t("footer.email");
  const footerQuickLinks = [
    { label: t("footer.links.home"), href: "#home" },
    { label: t("footer.links.caseStudies"), href: "#customers" },
    { label: t("footer.links.gallery"), href: "#community" },
    { label: t("footer.links.blogs"), href: "#services" },
    { label: t("footer.links.about"), href: "#about" },
  ];
  const footerInfoLinks = [
    { label: t("footer.links.terms"), href: "#" },
    { label: t("footer.links.privacy"), href: "#" },
    { label: t("footer.links.cookies"), href: "#" },
  ];
  const footerSocialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591438306752", Icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/trimindesai/", Icon: Instagram },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/triminds-ai/", Icon: Linkedin },
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden transition-all duration-1000"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={getGlobalThemeStyles(mode)}
    >
      {/* Logo Intro Video Preloader */}
      <Preloader />
      {/* Persistent star-field background — visible from services section onward */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <StarField bgColor="#060816" />
      </div>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-1000"
        style={{
          background: "rgba(6, 8, 22, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--theme-nav-border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-1">
              <span 
                className="bg-clip-text text-transparent transition-all duration-1000"
                style={{
                  backgroundImage: mode === "creative"
                    ? "linear-gradient(to right, #E44CFF, #9F56FF)"
                    : mode === "precise"
                    ? "linear-gradient(to right, #4EF0FF, #2EDAA2)"
                    : "linear-gradient(to right, #4EF0FF, #5861F2)"
                }}
              >
                TRI
              </span>
              <span className="text-white">MINDS</span>
            </div>
          </Link>
          <div
            style={{ fontSize: "23px" }}
            className="hidden lg:flex items-center gap-8"
          >
            <a
              href="#services"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.solutions")}
            </a>
            <a
              href="#contact"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.contact")}
            </a>
            <Link
              href="/about-us"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.about")}
            </Link>
            <a
              href="#packages"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.pricing")}
            </a>
          </div>
          <div className="flex items-center">
            <button
              className="px-4 py-2 rounded-xl border border-white/30 text-sm text-white/90 hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center px-6 overflow-hidden min-h-screen pt-24 pb-12"
      >
        {/* Cinematic cosmic background */}
        <CosmicBackground mode={mode} />

        <div className="max-w-7xl mx-auto relative w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text content & Action items */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right space-y-6 animate-fade-in order-2 lg:order-1">
            {/* Glowing badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-white/70">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] animate-pulse" />
              {t("hero.badge.first")} · {t("hero.badge.second")} · {t("hero.badge.third")}
            </div>

            {/* Headline with rotating words */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white w-full">
              {t("hero.heading")}{" "}
              <span className="relative inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[220px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 right-0 bg-clip-text text-transparent select-none whitespace-nowrap"
                    style={{
                      backgroundImage: mode === "creative"
                        ? "linear-gradient(to right, #E44CFF, #9F56FF, #7B4CFF)"
                        : mode === "precise"
                        ? "linear-gradient(to right, #4EF0FF, #2EDAA2, #10B981)"
                        : "linear-gradient(to right, #E44CFF, #5861F2, #4EF0FF)"
                    }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Layout Spacer utilizing the longest word to prevent layout shift */}
                <span className="opacity-0 pointer-events-none select-none">
                  {words.reduce((a, b) => a.length > b.length ? a : b, "")}
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
              {t("hero.subheading")}
            </p>



            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto pt-4">
              <a
                href="#services"
                className="group relative w-full sm:w-auto text-center px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: `0 0 20px var(--theme-glow-border)`,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t("hero.cta2")}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#about"
                className="group w-full sm:w-auto text-center px-8 py-3.5 rounded-full font-semibold text-sm border border-white/10 bg-white/5 backdrop-blur-md text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.05]"
              >
                {locale === "ar" ? "تعرف على طريقتنا" : "How It Works"}
              </a>
            </div>

            {/* Performance Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10 w-full text-center lg:text-left rtl:lg:text-right">
              {[
                { val: t("hero.stats.clients.value"), label: t("hero.stats.clients.label") },
                { val: t("hero.stats.revenue.value"), label: t("hero.stats.revenue.label") },
                { val: t("hero.stats.loyalty.value"), label: t("hero.stats.loyalty.label") },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start">
                  <span className="text-xl md:text-2.5xl font-extrabold text-white font-mono">{stat.val}</span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 mt-1.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive HUD Canvas */}
          <div className="lg:col-span-5 w-full flex justify-center order-1 lg:order-2">
            <InteractiveHUD mode={mode} />
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("services.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("services.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("services.subheading")}
            </p>
          </div>

          <StaggerTestimonials
            services={[
              {
                tempId: 0,
                title: t("services.items.automation.title"),
                description: t("services.items.automation.description"),
                features: t("services.items.automation.features"),
                accentColor: "#E44CFF",
                accentColor2: "#7B4CFF",
              },
              {
                tempId: 1,
                title: t("services.items.analytics.title"),
                description: t("services.items.analytics.description"),
                features: t("services.items.analytics.features"),
                accentColor: "#8B56FF",
                accentColor2: "#5861F2",
              },
              {
                tempId: 2,
                title: t("services.items.industry.title"),
                description: t("services.items.industry.description"),
                features: t("services.items.industry.features"),
                accentColor: "#5861F2",
                accentColor2: "#5BA8F7",
              },
              {
                tempId: 3,
                title: t("services.items.llm.title"),
                description: t("services.items.llm.description"),
                features: t("services.items.llm.features"),
                accentColor: "#5BA8F7",
                accentColor2: "#4ECFFC",
              },
              {
                tempId: 4,
                title: t("services.items.endToEnd.title"),
                description: t("services.items.endToEnd.description"),
                features: t("services.items.endToEnd.features"),
                accentColor: "#4ECFFC",
                accentColor2: "#4EF0FF",
              },
              {
                tempId: 5,
                title: t("services.items.webMobile.title"),
                description: t("services.items.webMobile.description"),
                features: t("services.items.webMobile.features"),
                accentColor: "#4EF0FF",
                accentColor2: "#ACA0FB",
              },
            ]}
          />
        </div>
      </section>

      {/* AI Integration Process — Roadmap (after Services) */}
      <section
        id="about"
        className="relative z-10 py-20 px-6"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(78,240,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            {/* Kicker */}
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: "#4EF0FF" }}
            >
              Our Methodology
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("about.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("about.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("about.subheading")}
            </p>
          </div>

          {/* Nodes */}
          <RoadmapProcess />

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                boxShadow: "0 0 30px rgba(228,76,255,0.35)",
              }}
            >
              Start Your Integration
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>



      {/* <section
        id="packages"
        className="relative z-10 py-20"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("packages.heading")}{" "}
            <span className="bg-gradient-to-r from-[#E44CFF] via-[#5861F2] to-[#4EF0FF] bg-clip-text text-transparent">
              {t("packages.headingHighlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            {t("packages.subheading")}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t("packages.starter.name"),
                price: t("packages.starter.price"),
                period: t("packages.starter.period"),
                description: t("packages.starter.description"),
                features: t("packages.starter.features"),
                popular: false,
                cta: t("packages.starter.cta"),
              },
              {
                name: t("packages.professional.name"),
                price: t("packages.professional.price"),
                period: t("packages.professional.period"),
                description: t("packages.professional.description"),
                features: t("packages.professional.features"),
                popular: true,
                popularText: t("packages.professional.popular"),
                cta: t("packages.professional.cta"),
              },
              {
                name: t("packages.enterprise.name"),
                price: t("packages.enterprise.price"),
                period: t("packages.enterprise.period"),
                description: t("packages.enterprise.description"),
                features: t("packages.enterprise.features"),
                popular: false,
                cta: t("packages.enterprise.cta"),
              },
            ].map((pkg, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: pkg.popular
                    ? "rgba(228, 76, 255, 0.1)"
                    : "rgba(24, 27, 53, 0.4)",
                  backdropFilter: "blur(20px)",
                  border: pkg.popular
                    ? "2px solid rgba(228, 76, 255, 0.4)"
                    : "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: pkg.popular
                    ? "0 0 50px rgba(228, 76, 255, 0.3)"
                    : "0 0 20px rgba(88, 97, 242, 0.1)",
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{
                        background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                        boxShadow: "0 0 20px rgba(228, 76, 255, 0.5)",
                      }}
                    >
                      {pkg.popularText}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                    {pkg.price}
                  </span>
                  <span className="text-gray-500">{pkg.period}</span>
                </div>
                <p className="text-gray-300 mb-8">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature: string, featureIndex: number) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                    >
                      <Check className="w-4 h-4 text-[#4EF0FF] mr-3 drop-shadow-[0_0_6px_rgba(78,240,255,0.6)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={
                    pkg.popular
                      ? {
                          background:
                            "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                        }
                      : {
                          border: "1px solid rgba(228, 76, 255, 0.3)",
                          background: "transparent",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #E44CFF, #5861F2)";
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(228, 76, 255, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Who We Serve Section */}
      <section
        id="customers"
        className="relative z-10 py-20 px-6"
      >
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 50% 60%, rgba(228,76,255,0.06) 0%, transparent 75%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("customers.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("customers.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("customers.subheading")}
            </p>
          </div>

          {/* Industry showcase */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-stretch">
            <div
              className="relative min-h-[360px] overflow-hidden rounded-3xl border bg-[#080B18]/80 shadow-[0_0_50px_rgba(78,240,255,0.08)]"
              style={{
                borderColor: `${activeShowcase.color}55`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeShowcase.src}
                  src={activeShowcase.src}
                  alt={activeShowcase.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 0.54, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,24,0.92),rgba(8,11,24,0.58)_48%,rgba(8,11,24,0.82))]" />
              <div
                className="absolute inset-x-0 bottom-0 h-40"
                style={{
                  background: `linear-gradient(0deg, ${activeShowcase.color}24, transparent)`,
                }}
              />

              <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{
                      background: `${activeShowcase.color}18`,
                      border: `1px solid ${activeShowcase.color}44`,
                      color: activeShowcase.color,
                    }}
                  >
                    {activeShowcase.label}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                    {t("customers.showcaseLabel")}
                  </span>
                </div>

                <div className="max-w-md">
                  <div
                    className="mb-5 h-1 w-20 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${activeShowcase.color}, #4EF0FF)`,
                    }}
                  />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
                    {activeShowcase.meta}
                  </p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex min-h-[360px] flex-col justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_45px_rgba(0,0,0,0.22)] backdrop-blur-md md:p-8"
              >
                <p
                  className="mb-4 text-sm font-semibold uppercase tracking-[0.22em]"
                  style={{ color: activeShowcase.color }}
                >
                  {activeShowcase.tag}
                </p>
                <h3 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                  {activeShowcase.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-gray-300 md:text-lg">
                  {activeShowcase.body}
                </p>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {activeShowcase.stats.map((stat) => (
                    <div
                      key={stat}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white/85"
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Industry pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {customerShowcases.map(({ key, label, color }) => (
              <button
                key={key}
                type="button"
                aria-pressed={activeShowcaseKey === key}
                onClick={() => setActiveShowcaseKey(key)}
                className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/40"
                style={{
                  background: activeShowcaseKey === key ? `${color}28` : `${color}12`,
                  border: `1px solid ${activeShowcaseKey === key ? color : `${color}44`}`,
                  color: activeShowcaseKey === key ? "#FFFFFF" : color,
                  boxShadow: activeShowcaseKey === key ? `0 0 18px ${color}44` : `0 0 12px ${color}18`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading - Outside the visual container */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-300 mb-4">
              {t("community.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("community.title")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("community.highlight")}
              </span>
            </h2>
          </div>

          <div
            className="relative overflow-hidden px-6 py-16 md:px-12"
          >
            <div className="absolute inset-0">
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1060px] h-[1060px] md:w-[1200px] md:h-[1200px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.15)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1040px] md:h-[1040px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.12)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] md:w-[810px] md:h-[810px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.11)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[590px] md:h-[590px] rounded-full"
                style={{ border: "1px solid rgba(228, 76, 255, 0.1)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(228, 76, 255, 0.08), transparent 55%)",
                }}
              />
              {orbitDots.map((dot, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>

            <div className="relative h-[1120px] md:h-[1290px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <button
                  className="px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.05]"
                  style={{
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                  }}
                >
                  {t("community.cta")}
                </button>
              </div>

              {communityMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${member.duration}s linear infinite`,
                    animationDelay: `${-(member.initialAngle / 360) * member.duration
                      }s`,
                    width: `${member.orbit * 2}px`,
                    height: `${member.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="flex items-center gap-3 rounded-full px-3 py-2 absolute top-0 left-1/2"
                    style={{
                      width: member.badgeWidth,
                      animation: `counter-rotate ${member.duration}s linear infinite`,
                      animationDelay: `${-(member.initialAngle / 360) * member.duration
                        }s`,
                      transform: "translate(-50%, -50%)",
                      background: "rgba(24, 27, 53, 0.8)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(228, 76, 255, 0.3)",
                      boxShadow: "0 0 20px rgba(228, 76, 255, 0.2)",
                    }}
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: "2px solid rgba(228, 76, 255, 0.5)" }}
                      />
                      <span
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full bg-[#4EF0FF]"
                        style={{
                          boxShadow: "0 0 10px rgba(78, 240, 255, 0.8)",
                        }}
                      />
                    </div>
                    <div className="leading-tight text-left">
                      <div className="text-sm font-semibold text-white">
                        {member.name}
                      </div>
                      <div className="text-[11px] text-[#E44CFF]">
                        {member.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {floatingAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 orbital-item"
                  style={{
                    animation: `orbit ${avatar.duration}s linear infinite`,
                    animationDelay: `${-(avatar.initialAngle / 360) * avatar.duration
                      }s`,
                    width: `${avatar.orbit * 2}px`,
                    height: `${avatar.orbit * 2}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="rounded-full p-1 absolute top-0 left-1/2"
                    style={{
                      animation: `counter-rotate ${avatar.duration}s linear infinite`,
                      animationDelay: `${-(avatar.initialAngle / 360) * avatar.duration
                        }s`,
                      transform: "translate(-50%, -50%)",
                      border: "1px solid rgba(228, 76, 255, 0.3)",
                      background: "rgba(24, 27, 53, 0.6)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 0 20px rgba(228, 76, 255, 0.15)",
                    }}
                  >
                    <img
                      src={avatar.image}
                      alt="Community member"
                      className="rounded-full object-cover"
                      style={{ width: avatar.size, height: avatar.size }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("contact.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("contact.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t("contact.subheading")}
            </p>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(24, 27, 53, 0.4)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(228, 76, 255, 0.2)",
              boxShadow: "0 0 40px rgba(228, 76, 255, 0.15)",
            }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl focus:outline-none transition-all text-white"
                    style={{
                      background: "rgba(10, 15, 42, 0.6)",
                      border: "1px solid rgba(228, 76, 255, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                      e.target.style.boxShadow =
                        "0 0 20px rgba(228, 76, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 rounded-xl focus:outline-none transition-all text-white"
                    style={{
                      background: "rgba(10, 15, 42, 0.6)",
                      border: "1px solid rgba(228, 76, 255, 0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                      e.target.style.boxShadow =
                        "0 0 20px rgba(228, 76, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#E44CFF]">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={6}
                  className="w-full p-4 rounded-xl focus:outline-none transition-all text-white resize-none"
                  style={{
                    background: "rgba(10, 15, 42, 0.6)",
                    border: "1px solid rgba(228, 76, 255, 0.2)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(228, 76, 255, 0.5)";
                    e.target.style.boxShadow =
                      "0 0 20px rgba(228, 76, 255, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(228, 76, 255, 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 30px rgba(228, 76, 255, 0.4)",
                  }}
                >
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-12 pt-20 md:pt-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(228,76,255,0.28), rgba(78,240,255,0.2), transparent)",
          }}
        />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.9fr_0.8fr]">
            <div>
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#ACA0FB]">
                {t("footer.kicker")}
              </p>
              <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                {t("footer.headline")}
              </h2>

              <a
                href="#contact"
                className="group relative mt-10 inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-base font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: "0 0 20px var(--theme-glow-border)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("footer.cta")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <div className="mt-12">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#ACA0FB]">
                  {t("footer.emailLabel")}
                </p>
                <div className="inline-flex min-h-14 max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)] backdrop-blur-md">
                  <a
                    href={`mailto:${footerEmail}`}
                    className="truncate text-sm font-semibold md:text-base"
                  >
                    {footerEmail}
                  </a>
                  <button
                    type="button"
                    aria-label="Copy email address"
                    onClick={() => navigator.clipboard?.writeText(footerEmail)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <nav aria-label="Footer quick links" className="lg:pt-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#ACA0FB]">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-5">
                {footerQuickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-lg font-medium text-white/82 transition-colors duration-200 hover:text-[#4EF0FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer information links" className="lg:pt-2">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-[#ACA0FB]">
                {t("footer.information")}
              </h3>
              <ul className="space-y-5">
                {footerInfoLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-lg font-medium text-white/82 transition-colors duration-200 hover:text-[#4EF0FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-24 border-t border-white/10 pt-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#ACA0FB]">
                {t("footer.copyright")}
              </p>

              <div className="flex items-center gap-5">
                {footerSocialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-white/88 transition-colors duration-200 hover:text-[#4EF0FF]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Chatbot */}
      <Chatbot activeMode={mode} onModeChange={setMode} />
    </div >
  );
}
