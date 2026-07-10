"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Target, 
  Eye, 
  Flame, 
  Users, 
  Network,
  Award,
  Milestone,
  ShieldCheck,
  Zap,
  Globe,
  Compass
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import CosmicBackground from "@/components/CosmicBackground";
import Chatbot, { PersonaMode } from "@/components/Chatbot";
import StarField from "@/components/StarField";
import Preloader from "@/components/Preloader";
import NeuralNetworkVisual from "@/components/NeuralNetworkVisual";
import { motion } from "framer-motion";

export default function AboutUs() {
  const { locale, setLocale, t } = useI18n();
  const [mode, setMode] = useState<PersonaMode>("balanced");
  const [activeMilestone, setActiveMilestone] = useState(0);

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

  const milestones = [
    {
      year: "2023",
      titleKey: "milestone.launch.title",
      descKey: "milestone.launch.desc",
      icon: <Zap className="w-5 h-5 text-[#4EF0FF]" />,
      defaultTitle: "Neural Core Launch",
      defaultDesc: "Triminds AI is established with a commitment to orchestrate intelligent business automation workflows.",
    },
    {
      year: "2024",
      titleKey: "milestone.agents.title",
      descKey: "milestone.agents.desc",
      icon: <Network className="w-5 h-5 text-[#E44CFF]" />,
      defaultTitle: "Multi-Agent Frameworks",
      defaultDesc: "Developed custom agent-based architectures that execute complex decisions with minimal human overhead.",
    },
    {
      year: "2025",
      titleKey: "milestone.scale.title",
      descKey: "milestone.scale.desc",
      icon: <Globe className="w-5 h-5 text-[#5861F2]" />,
      defaultTitle: "International Scaling",
      defaultDesc: "Expanded operations to worldwide clients, helping automate portfolios and driving millions in revenue.",
    },
    {
      year: "2026",
      titleKey: "milestone.autonomous.title",
      descKey: "milestone.autonomous.desc",
      icon: <Cpu className="w-5 h-5 text-[#10B981]" />,
      defaultTitle: "Next-Gen Autonomous Systems",
      defaultDesc: "Integrating real-time generative feedback loops, giving systems the power of self-guided refinement.",
    },
  ];

  const teamMembers = [
    {
      name: "Syed Muhammad Haris",
      roleKey: "ceo",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Malik Murtaza",
      roleKey: "cto",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Haseeb Arshad",
      roleKey: "sales",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Saffuan Mushtaq",
      roleKey: "dev",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Sarah Chen",
      roleKey: "designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "James Wilson",
      roleKey: "product",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Emily Parker",
      roleKey: "marketing",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
    {
      name: "Alex Kumar",
      roleKey: "engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80&crop=faces",
    },
  ];

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden transition-all duration-1000 select-none"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={getGlobalThemeStyles(mode)}
    >
      {/* Preloader */}
      <Preloader />

      {/* Persistent star-field background */}
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

      {/* Cybernetic grid overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dynamic light orb overlay */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none z-0 opacity-40 transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)"
        }}
      />

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
            <Link
              href="/#services"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.solutions")}
            </Link>
            <Link
              href="/#contact"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.contact")}
            </Link>
            <Link
              href="/about-us"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#E44CFF] to-[#5861F2] font-semibold transition-all duration-300 filter drop-shadow-[0_0_8px_var(--theme-glow-border)]"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/#packages"
              className="text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.pricing")}
            </Link>
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
        className="relative z-10 flex flex-col items-center justify-center px-6 min-h-[70vh] pt-36 pb-20 overflow-hidden"
      >
        <CosmicBackground mode={mode} />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-white/70 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <Sparkles className="w-4 h-4 text-[#4EF0FF] animate-pulse" />
            {locale === "en" ? "Bridging Core Intelligences" : "دمج العقول الذكية"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white tracking-tight"
          >
            {t("aboutPage.title")}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
          >
            {t("aboutPage.subtitle")}
          </motion.p>
        </div>

        {/* Futuristic Interactive Key Stat Cards below Hero */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full px-6 mt-16">
          {[
            { value: "50M+", label: locale === "en" ? "Revenue Handled" : "حجم الإيرادات المدارة", icon: <Award className="text-[#E44CFF] w-5 h-5" /> },
            { value: "98%", label: locale === "en" ? "Client Satisfaction" : "معدل رضا العملاء", icon: <ShieldCheck className="text-[#4EF0FF] w-5 h-5" /> },
            { value: "100%", label: locale === "en" ? "Loyalty Rate" : "معدل ولاء العملاء", icon: <Users className="text-[#5861F2] w-5 h-5" /> },
            { value: "24/7", label: locale === "en" ? "Monitoring SLA" : "مراقبة الأنظمة الذكية", icon: <Cpu className="text-[#10B981] w-5 h-5" /> }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              className="p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:translate-y-[-5px] transition-transform duration-300 border border-white/5 backdrop-blur-lg"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                {stat.icon}
              </div>
              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Narrative Card with cyber-corners */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-3xl p-8 md:p-12 overflow-hidden border border-white/10"
          style={{
            background: "rgba(10, 15, 42, 0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Cybernetic decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E44CFF]/40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4EF0FF]/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4EF0FF]/40 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E44CFF]/40 pointer-events-none" />

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#E44CFF]" />
              <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E44CFF]">
                {locale === "en" ? "Who We Are" : "من نحن"}
              </h2>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {locale === "en" ? "Bridging Human Ingenuity & Systems Intelligence" : "دمج العبقرية البشرية وذكاء الأنظمة"}
            </h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              {t("aboutPage.intro")}
            </p>
          </div>
          
          <div className="lg:col-span-5 flex justify-center relative">
            <NeuralNetworkVisual mode={mode} />
          </div>
        </motion.div>
      </section>

      {/* Purpose, Mission & Vision Section */}
      <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        {/* Soft backdrop radial glows */}
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#4EF0FF]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-[#E44CFF]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Heading and intro */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-[#4EF0FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4EF0FF] animate-pulse" />
              {locale === "en" ? "Company Core" : "جوهر الشركة"}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              {locale === "en" ? (
                <>
                  Our Dual <br />
                  <span className="bg-gradient-to-r from-[#4EF0FF] to-[#E44CFF] bg-clip-text text-transparent">
                    Driving Forces
                  </span>
                </>
              ) : (
                <>
                  قوتنا <br />
                  <span className="bg-gradient-to-r from-[#4EF0FF] to-[#E44CFF] bg-clip-text text-transparent">
                    المحركة للنجاح
                  </span>
                </>
              )}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {locale === "en" 
                ? "At Triminds AI, our vision guides where we are heading, while our mission shapes the precision of how we build and deliver value every single day."
                : "في تراي مايندز للذكاء الاصطناعي، ترسم رؤيتنا المسار الذي نمضي فيه، بينما تصوغ مهمتنا دقة الطريقة التي نبني ونقدم بها القيمة كل يوم."}
            </p>
          </div>

          {/* Right Column: Mission & Vision Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Mission Card - Horizontal Row style */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-white/[0.02] to-white/[0.01] hover:border-[#4EF0FF]/30 hover:shadow-[0_20px_50px_rgba(78,240,255,0.08)] transition-all duration-500 relative group overflow-hidden flex flex-col md:flex-row gap-6 items-start cursor-default"
              style={{ backdropFilter: "blur(20px)" }}
            >
              {/* Inner ambient light streak */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#4EF0FF] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon / Number badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#4EF0FF]/5 border border-[#4EF0FF]/25 flex items-center justify-center text-[#4EF0FF] group-hover:bg-[#4EF0FF]/15 group-hover:scale-105 transition-all duration-500 shadow-[0_0_15px_rgba(78,240,255,0.05)]">
                <Target className="w-8 h-8" />
              </div>
              
              <div className="space-y-2 flex-grow w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-[#4EF0FF] transition-colors duration-300">
                    {t("aboutPage.missionTitle")}
                  </h3>
                  <span className="text-xs font-mono text-[#4EF0FF]/40 group-hover:text-[#4EF0FF]/80 transition-colors">01 / CORE</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
                  {t("aboutPage.missionDesc")}
                </p>
              </div>
            </motion.div>

            {/* Vision Card - Horizontal Row style */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-white/[0.02] to-white/[0.01] hover:border-[#E44CFF]/30 hover:shadow-[0_20px_50px_rgba(228,76,255,0.08)] transition-all duration-500 relative group overflow-hidden flex flex-col md:flex-row gap-6 items-start cursor-default"
              style={{ backdropFilter: "blur(20px)" }}
            >
              {/* Inner ambient light streak */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-[#E44CFF] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon / Number badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#E44CFF]/5 border border-[#E44CFF]/25 flex items-center justify-center text-[#E44CFF] group-hover:bg-[#E44CFF]/15 group-hover:scale-105 transition-all duration-500 shadow-[0_0_15px_rgba(228,76,255,0.05)]">
                <Eye className="w-8 h-8" />
              </div>
              
              <div className="space-y-2 flex-grow w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-[#E44CFF] transition-colors duration-300">
                    {t("aboutPage.visionTitle")}
                  </h3>
                  <span className="text-xs font-mono text-[#E44CFF]/40 group-hover:text-[#E44CFF]/80 transition-colors">02 / CORE</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
                  {t("aboutPage.visionDesc")}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Timeline Section ("Our Journey") */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-white/70">
            <Milestone className="w-4 h-4 text-[#4EF0FF]" />
            {locale === "en" ? "Evolution Timeline" : "خط النمو والتطور"}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {locale === "en" ? "How We Evolved" : "كيف تطورنا"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] mx-auto rounded-full" />
        </div>

        <div className="relative mt-12">
          {/* Vertical central bar */}
          <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E44CFF]/30 via-[#4EF0FF]/30 to-[#5861F2]/10 transform translate-x-[-50%] hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Visual node on vertical bar */}
                <div className="absolute left-[50%] top-[24px] transform translate-x-[-50%] z-20 hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-[#0a0f2c] border-2 border-white/20 flex items-center justify-center group shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-[#4EF0FF] transition-colors duration-300">
                    {milestone.icon}
                  </div>
                </div>

                {/* Timeline content card */}
                <div className="w-full md:w-[45%] p-6 md:p-8 rounded-3xl border border-white/5 shadow-lg space-y-3 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                     style={{
                       background: "rgba(16, 19, 44, 0.45)",
                       backdropFilter: "blur(12px)"
                     }}
                >
                  {/* Glowing background stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#E44CFF] to-[#4EF0FF]" />
                  
                  <span className="text-3xl font-extrabold text-[#4EF0FF]/80 tracking-wide">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {t(milestone.titleKey) !== milestone.titleKey ? t(milestone.titleKey) : milestone.defaultTitle}
                  </h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                    {t(milestone.descKey) !== milestone.descKey ? t(milestone.descKey) : milestone.defaultDesc}
                  </p>
                </div>

                {/* Empty block for layout spacer */}
                <div className="w-full md:w-[45%] hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-white/70">
            <Compass className="w-4 h-4 text-[#E44CFF]" />
            {locale === "en" ? "Organizational Ethics" : "القيم والأخلاقيات"}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {t("aboutPage.valuesTitle")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              key: "innovation",
              icon: <Flame className="w-7 h-7 text-[#E44CFF]" />,
              glowColor: "rgba(228, 76, 255, 0.15)",
              borderColor: "rgba(228, 76, 255, 0.2)",
              gradient: "from-[#E44CFF]/10 to-[#7B4CFF]/5",
            },
            {
              key: "precision",
              icon: <Cpu className="w-7 h-7 text-[#4EF0FF]" />,
              glowColor: "rgba(78, 240, 255, 0.15)",
              borderColor: "rgba(78, 240, 255, 0.2)",
              gradient: "from-[#4EF0FF]/10 to-[#10B981]/5",
            },
            {
              key: "collaboration",
              icon: <Users className="w-7 h-7 text-[#5861F2]" />,
              glowColor: "rgba(88, 97, 242, 0.15)",
              borderColor: "rgba(88, 97, 242, 0.2)",
              gradient: "from-[#5861F2]/10 to-[#4EF0FF]/5",
            },
          ].map((val, idx) => (
            <motion.div
              key={val.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl flex flex-col space-y-4 hover:scale-[1.05] hover:translate-y-[-5px] transition-all duration-300 border cursor-default relative overflow-hidden group shadow-lg"
              style={{
                background: "rgba(10, 15, 42, 0.6)",
                borderColor: val.borderColor,
                boxShadow: `0 8px 30px ${val.glowColor}`,
              }}
            >
              {/* Internal glow patch */}
              <div className={`absolute inset-0 bg-gradient-to-br ${val.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                {val.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                {t(`aboutPage.values.${val.key}.title`)}
              </h3>
              
              <p className="text-gray-400 text-sm font-light leading-relaxed relative z-10">
                {t(`aboutPage.values.${val.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section with Scan Line Effect */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] md:text-xs tracking-widest uppercase text-white/70">
            <Users className="w-4 h-4 text-[#4EF0FF]" />
            {locale === "en" ? "Specialist Network" : "فريق الاختصاصيين"}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight animate-fade-in">
            {t("aboutPage.teamTitle")}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light text-sm md:text-base">
            {t("aboutPage.teamSubtitle")}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              className="group relative rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.03] border border-white/5 overflow-hidden shadow-md"
              style={{
                background: "rgba(16, 19, 44, 0.45)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Scanline Animation Effect */}
              <div className="absolute top-[-100%] left-0 w-full h-[5px] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[scanline_2s_ease-in-out_infinite] pointer-events-none z-10" />

              {/* Card hover border glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                   style={{
                     border: "1px solid var(--theme-primary)",
                     boxShadow: "0 0 20px var(--theme-glow-border)",
                   }} 
              />
              
              <div className="relative w-24 h-24 mb-5 rounded-full p-[3px] bg-gradient-to-tr from-[#E44CFF]/40 to-[#4EF0FF]/40 group-hover:from-[#E44CFF] group-hover:to-[#4EF0FF] transition-all duration-500 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#4EF0FF] transition-colors duration-300">
                {member.name}
              </h3>
              
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                {t(`aboutPage.roles.${member.roleKey}`)}
              </p>

              {/* Holographic grid backing on card hover */}
              <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                   style={{
                     backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                     backgroundSize: "10px 10px",
                   }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="relative z-10 py-16 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 flex flex-col items-center space-y-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(228, 76, 255, 0.04), rgba(78, 240, 255, 0.04))",
            border: "1px solid rgba(228, 76, 255, 0.15)",
            boxShadow: "0 0 30px rgba(78, 240, 255, 0.05)",
          }}
        >
          {/* Subtle cosmic circle glow */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-[#E44CFF]/10 to-[#4EF0FF]/10 blur-[80px] top-[-50px] left-[50%] translate-x-[-50%] pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight relative z-10">
            {locale === "en" ? "Ready to scale your intelligence?" : "جاهز لترقية مستوى ذكاء أعمالك؟"}
          </h2>
          <p className="text-gray-300 text-base max-w-xl mx-auto font-light leading-relaxed relative z-10">
            {locale === "en" 
              ? "Let's explore how our state-of-the-art AI automation processes can elevate your brand and efficiency."
              : "دعنا نستكشف كيف يمكن لأتمتة الذكاء الاصطناعي الحديثة أن ترفع من كفاءة علامتك التجارية."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2 relative z-10">
            <Link
              href="/#contact"
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                boxShadow: "0 0 25px rgba(228,76,255,0.3)",
              }}
            >
              {locale === "en" ? "Contact Our Experts" : "اتصل بخبرائنا"}
            </Link>
            
            <Link
              href="/"
              className="px-8 py-3.5 rounded-full text-sm font-semibold border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.05] inline-flex items-center gap-2 justify-center"
            >
              {locale === "en" ? "Back to Home" : "العودة للرئيسية"}
              {locale === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-6"
        style={{
          borderTop: "1px solid rgba(228, 76, 255, 0.2)",
        }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
            {t("footer.company")}
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-light text-sm md:text-base">
            {t("footer.description")}
          </p>
          <div
            className="pt-6"
            style={{
              borderTop: "1px solid rgba(228, 76, 255, 0.2)",
            }}
          >
            <p className="text-gray-400 text-xs md:text-sm">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <Chatbot activeMode={mode} onModeChange={setMode} />

      {/* Scanline animation styles */}
      <style jsx global>{`
        @keyframes scanline {
          0% {
            top: -100%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  );
}
