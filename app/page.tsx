"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { Check, Star, ArrowRight, ArrowLeft, Sparkles, Cpu, Activity, Menu, X, Globe, ArrowUp, Copy, Facebook, Instagram, Linkedin } from "lucide-react";
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
const contactIndustryKeys = ["education", "realEstate", "finance", "logistics"] as const;
type ContactIndustryKey = (typeof contactIndustryKeys)[number];
const contactGoalKeys = ["llmAutomation", "predictiveAnalytics", "b2bIntegration", "aiChatbots"] as const;
type ContactGoalKey = (typeof contactGoalKeys)[number];
const contactScaleKeys = ["initialPilot", "enterpriseDeployment"] as const;
type ContactScaleKey = (typeof contactScaleKeys)[number];
type WrittenTextProps = {
  text: string;
  as?: "p" | "h3";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  speed?: number;
};

function WrittenText({ text, as = "p", className = "", style, delay = 0, speed = 16 }: WrittenTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setIsInView(false);
    setVisibleCount(0);
  }, [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!isInView) return;

    const characters = Array.from(text);
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const writeNext = () => {
      index += 1;
      setVisibleCount(index);

      if (index < characters.length) {
        timeout = setTimeout(writeNext, speed);
      }
    };

    timeout = setTimeout(writeNext, delay);
    return () => clearTimeout(timeout);
  }, [delay, isInView, speed, text]);

  const characters = Array.from(text);
  const visibleText = characters.slice(0, visibleCount).join("");
  const isWriting = isInView && visibleCount < characters.length;
  const sharedClassName = `relative block ${className}`;
  const content = (
    <>
      <span aria-hidden="true" className="invisible whitespace-pre-wrap">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre-wrap">
        {visibleText}
        {isWriting && (
          <span
            className="ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.1em] animate-blink"
            style={{ backgroundColor: "currentColor" }}
          />
        )}
      </span>
    </>
  );

  if (as === "h3") {
    return (
      <h3 ref={(node) => { ref.current = node; }} className={sharedClassName} style={style} aria-label={text}>
        {content}
      </h3>
    );
  }

  return (
    <p ref={(node) => { ref.current = node; }} className={sharedClassName} style={style} aria-label={text}>
      {content}
    </p>
  );
}

type ShowcaseInterfaceProps = {
  showcaseKey: ShowcaseKey;
  label: string;
  color: string;
  stats: string[];
  showcaseLabel: string;
};

function ShowcaseInterface({ showcaseKey, label, color, stats, showcaseLabel }: ShowcaseInterfaceProps) {
  const fallbackStats = stats.length > 0 ? stats : ["Telemetry", "Automation", "Guardrails"];
  const waveform = [36, 58, 44, 72, 63, 86, 48, 78, 54, 91, 68, 74, 47, 82, 61, 88];
  const workflowNodes = [
    { left: "14%", top: "24%", label: "Input" },
    { left: "48%", top: "18%", label: "Cache" },
    { left: "76%", top: "34%", label: "LLM" },
    { left: "34%", top: "62%", label: "Rules" },
    { left: "68%", top: "70%", label: "API" },
  ];
  const screenshotLabels = ["Ops", "Risk", "Spend"];

  return (
    <motion.div
      key={showcaseKey}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 22%, ${color}24, transparent 34%), radial-gradient(circle at 70% 76%, ${color}14, transparent 36%)`,
        }}
      />

      <motion.div
        className="absolute left-[3%] top-[4%] h-[58%] w-[76%] rounded-2xl border border-white/10 bg-[#050816]/88 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-md sm:left-[5%] sm:h-[62%]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full gap-3">
          <div className="hidden w-8 shrink-0 flex-col items-center gap-2 rounded-xl bg-white/[0.04] py-2 sm:flex">
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={`${showcaseKey}-rail-${item}`}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: item === 1 ? color : "rgba(255,255,255,0.16)" }}
              />
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span
                className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{
                  background: `${color}1f`,
                  border: `1px solid ${color}55`,
                  color,
                }}
              >
                {label}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:inline">
                {showcaseLabel}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[1.35fr_0.85fr]">
              <div className="flex min-h-0 flex-col rounded-xl border border-white/10 bg-black/24 p-3">
                <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase text-white/50">
                  <span>Live operations surface</span>
                  <motion.span
                    style={{ color }}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    Streaming
                  </motion.span>
                </div>
                <div className="relative flex min-h-0 flex-1 items-end gap-1.5 overflow-hidden rounded-lg bg-white/[0.03] px-2 pb-2">
                  {waveform.map((height, index) => (
                    <motion.span
                      key={`${showcaseKey}-wave-${index}`}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: `linear-gradient(180deg, ${color}, rgba(255,255,255,0.08))`,
                      }}
                      animate={{ height: [`${Math.max(22, height - 22)}%`, `${height}%`, `${Math.max(18, height - 14)}%`] }}
                      transition={{
                        duration: 2.2 + index * 0.08,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.04,
                      }}
                    />
                  ))}
                  <motion.div
                    className="absolute inset-y-2 w-12 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}20, transparent)` }}
                    animate={{ left: ["-18%", "108%"] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {fallbackStats.slice(0, 3).map((stat, index) => (
                    <div key={`${showcaseKey}-metric-${stat}`} className="rounded-lg bg-white/[0.04] px-2 py-2">
                      <p className="truncate text-[9px] uppercase text-white/40">{stat}</p>
                      <motion.p
                        className="mt-1 text-sm font-bold text-white"
                        animate={{ opacity: [0.66, 1, 0.66] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
                      >
                        {index === 0 ? "3.75k" : index === 1 ? "92%" : "4.05"}
                      </motion.p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden min-h-0 flex-col gap-3 sm:flex">
                <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Workflow map
                  </p>
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 160" aria-hidden="true">
                    <motion.path
                      d="M32 48 C78 22 112 36 154 54 S184 92 150 116 S78 122 58 94"
                      fill="none"
                      stroke={color}
                      strokeWidth="1.4"
                      strokeDasharray="5 6"
                      animate={{ strokeDashoffset: [0, -44] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      opacity="0.68"
                    />
                  </svg>
                  {workflowNodes.map((node, index) => (
                    <motion.div
                      key={`${showcaseKey}-node-${node.label}`}
                      className="absolute grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-[#07101D]/95 text-[8px] font-semibold text-white/65"
                      style={{ left: node.left, top: node.top }}
                      animate={{ scale: [1, 1.08, 1], boxShadow: [`0 0 0 ${color}00`, `0 0 18px ${color}44`, `0 0 0 ${color}00`] }}
                      transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
                    >
                      {node.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid h-20 grid-cols-3 gap-2">
                  {[82, 64, 91].map((height, index) => (
                    <div key={`${showcaseKey}-module-${index}`} className="flex items-end rounded-lg border border-white/10 bg-black/20 p-1.5">
                      <motion.span
                        className="block w-full rounded-md"
                        style={{ background: `${color}${index % 2 === 0 ? "88" : "55"}` }}
                        animate={{ height: [`${Math.max(32, height - 24)}%`, `${height}%`, `${Math.max(28, height - 10)}%`] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[2%] top-[64%] hidden w-[48%] rounded-xl border border-white/[0.12] bg-[#050711]/95 p-3 shadow-2xl sm:block"
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase text-white/45">
          <span>Decision log</span>
          <span style={{ color }}>13ms</span>
        </div>
        {["Semantic cache hit", "Budget policy passed", "Worker action queued"].map((item, index) => (
          <motion.div
            key={`${showcaseKey}-log-${item}`}
            className="mb-1.5 flex items-center gap-2 text-[10px] text-white/62 last:mb-0"
            animate={{ opacity: [0.45, 1, 0.62] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.42 }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            <span className="truncate">{item}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute right-[2%] top-[10%] hidden h-[60%] w-[27%] sm:block">
        {screenshotLabels.map((item, index) => (
          <motion.div
            key={`${showcaseKey}-shot-${item}`}
            className="absolute left-0 right-0 rounded-xl border border-white/[0.12] bg-[#080B18]/92 p-3 shadow-2xl backdrop-blur-md"
            style={{ top: `${index * 27}%` }}
            animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0], rotate: [0, index % 2 === 0 ? -1 : 1, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/50">
                {item} screen
              </p>
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            </div>
            <div className="space-y-2">
              {[68, 48, 82].map((width, barIndex) => (
                <div key={`${showcaseKey}-shot-${item}-${barIndex}`} className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: barIndex === 1 ? "rgba(255,255,255,0.62)" : color }}
                    animate={{ width: [`${Math.max(20, width - 24)}%`, `${width}%`, `${Math.max(18, width - 9)}%`] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: barIndex * 0.22 + index * 0.18 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-[2%] right-[9%] hidden w-[37%] rounded-xl border border-white/[0.12] bg-[#07101D]/95 p-3 shadow-2xl sm:block"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.13em] text-white/50">
          <span>Guardrail cockpit</span>
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: color }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        {[78, 55, 88].map((width, index) => (
          <div key={`${showcaseKey}-guardrail-${index}`} className="mb-2 last:mb-0">
            <div className="h-1.5 rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: color }}
                animate={{ width: [`${Math.max(20, width - 18)}%`, `${width}%`, `${Math.max(18, width - 5)}%`] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.25 }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

const showcaseVisuals: Record<ShowcaseKey, { color: string }> = {
  education: {
    color: "#E44CFF",
  },
  realEstate: {
    color: "#8B56FF",
  },
  healthcare: {
    color: "#2EDAA2",
  },
  logistics: {
    color: "#5861F2",
  },
  finance: {
    color: "#4EF0FF",
  },
};

export default function Home() {
  const { locale, setLocale, t } = useI18n();
  const [mode, setMode] = useState<PersonaMode>("balanced");
  const [wordIndex, setWordIndex] = useState(0);
  const [activeShowcaseKey, setActiveShowcaseKey] = useState<ShowcaseKey>("finance");
  const [contactIndustry, setContactIndustry] = useState<ContactIndustryKey>("education");
  const [contactGoal, setContactGoal] = useState<ContactGoalKey>("llmAutomation");
  const [contactScale, setContactScale] = useState<ContactScaleKey>("initialPilot");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  const contactIndustries = contactIndustryKeys.map((key) => ({
    key,
    label: t(`contact.configurator.industries.${key}`),
  }));
  const contactGoals = contactGoalKeys.map((key) => ({
    key,
    label: t(`contact.configurator.goals.${key}`),
  }));
  const contactScales = contactScaleKeys.map((key) => ({
    key,
    label: t(`contact.configurator.scales.${key}`),
  }));
  const selectedScaleLabel =
    contactScales.find((option) => option.key === contactScale)?.label ?? contactScales[0]?.label;

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-4 px-4 sm:px-6 md:px-8"
            : "top-0 px-6 py-5"
        }`}
      >
        <div
          className={`mx-auto w-full max-w-7xl flex justify-between items-center transition-all duration-500 ${
            scrolled
              ? "rounded-2xl border bg-slate-900/40 backdrop-blur-xl px-6 py-3.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),_0_0_20px_rgba(228,76,255,0.15)]"
              : "border-b border-transparent py-2"
          }`}
          style={{
            borderColor: scrolled ? "var(--theme-nav-border)" : "transparent",
          }}
        >
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-1 group">
              <span 
                className="bg-clip-text text-transparent transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_var(--theme-glow)]"
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
              <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">MINDS</span>
            </div>
          </Link>
          <div
            className="hidden lg:flex items-center gap-8 text-[16px] font-medium"
          >
            <a
              href="#services"
              className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.solutions")}
            </a>
            <Link
              href="/about-us"
              className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.about")}
            </Link>
            <a
              href="#packages"
              className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#E44CFF] hover:to-[#5861F2] transition-all duration-300"
            >
              {t("nav.contact")}
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/20 text-sm text-white/90 hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            >
              <Globe className="w-4 h-4" />
              {locale === "en" ? "العربية" : "English"}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: "var(--theme-gradient)",
                boxShadow: "0 0 15px var(--theme-glow-border)",
              }}
            >
              {t("nav.cta")}
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-3">
            <button
              className="p-2 rounded-xl border border-white/20 text-sm text-white/90 hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-xl border border-white/20 text-white/90 hover:border-[#E44CFF] hover:bg-[#E44CFF]/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-[#E44CFF]/20 bg-slate-900/80 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden z-40"
            >
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg py-2 border-b border-white/5 text-white/90 hover:text-[#E44CFF] transition-colors"
              >
                {t("nav.solutions")}
              </a>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg py-2 border-b border-white/5 text-white/90 hover:text-[#E44CFF] transition-colors"
              >
                {t("nav.about")}
              </Link>
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg py-2 border-b border-white/5 text-white/90 hover:text-[#E44CFF] transition-colors"
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg py-2 border-b border-white/5 text-white/90 hover:text-[#E44CFF] transition-colors"
              >
                {t("nav.contact")}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mt-2"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: "0 0 15px var(--theme-glow-border)",
                }}
              >
                {t("nav.cta")}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
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
              className="relative min-h-[430px] overflow-visible md:min-h-[460px]"
            >
              <AnimatePresence mode="wait">
                <ShowcaseInterface
                  showcaseKey={activeShowcase.key}
                  label={activeShowcase.label}
                  color={activeShowcase.color}
                  stats={activeShowcase.stats}
                  showcaseLabel={t("customers.showcaseLabel")}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_24%)]" />

            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex min-h-[360px] flex-col justify-center py-4 md:pl-6"
              >
                <WrittenText
                  as="p"
                  text={activeShowcase.tag}
                  delay={80}
                  className="mb-4 text-sm font-semibold uppercase tracking-[0.22em]"
                  style={{ color: activeShowcase.color }}
                />
                <WrittenText
                  as="h3"
                  text={activeShowcase.title}
                  delay={220}
                  speed={13}
                  className="text-3xl font-bold leading-tight text-white md:text-4xl"
                />
                <WrittenText
                  as="p"
                  text={activeShowcase.body}
                  delay={620}
                  speed={7}
                  className="mt-5 text-base leading-relaxed text-gray-300 md:text-lg"
                />
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {activeShowcase.stats.map((stat) => (
                    <div
                      key={stat}
                      className="flex items-center gap-2 text-sm font-semibold text-white/85"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: activeShowcase.color }}
                      />
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

      {/* AI Integration Process — Roadmap */}
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

      {/* Packages Section */}
      <section
        id="packages"
        className="relative z-10 py-24 px-6"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(88,97,242,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("packages.heading")}{" "}
              <span className="bg-gradient-to-r from-[#E44CFF] via-[#5861F2] to-[#4EF0FF] bg-clip-text text-transparent">
                {t("packages.headingHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t("packages.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="relative p-8 rounded-2xl transition-all duration-500 hover:scale-[1.03] flex flex-col justify-between"
                style={{
                  background: pkg.popular
                    ? "rgba(228, 76, 255, 0.08)"
                    : "rgba(24, 27, 53, 0.35)",
                  backdropFilter: "blur(20px)",
                  border: pkg.popular
                    ? "2px solid rgba(228, 76, 255, 0.45)"
                    : "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: pkg.popular
                    ? "0 10px 40px rgba(228, 76, 255, 0.15), 0 0 30px rgba(228, 76, 255, 0.1)"
                    : "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{
                          background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: "0 0 15px rgba(228, 76, 255, 0.5)",
                        }}
                      >
                        {pkg.popularText}
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3 text-white">{pkg.name}</h3>
                  <div className="mb-5 flex items-baseline">
                    <span className="text-4xl font-extrabold bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                    <span className="text-gray-400 ml-2 text-sm">{pkg.period}</span>
                  </div>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{pkg.description}</p>
                  <ul className="space-y-3.5 mb-8">
                    {Array.isArray(pkg.features) && pkg.features.map((feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-sm text-gray-300"
                      >
                        <Check className="w-4 h-4 text-[#4EF0FF] mr-2.5 mt-0.5 flex-shrink-0 drop-shadow-[0_0_6px_rgba(78,240,255,0.6)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={
                    pkg.popular
                      ? {
                          background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: "0 0 25px rgba(228, 76, 255, 0.35)",
                          color: "#fff"
                        }
                      : {
                          border: "1px solid rgba(228, 76, 255, 0.3)",
                          background: "rgba(228, 76, 255, 0.05)",
                          color: "#fff"
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #E44CFF, #5861F2)";
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(228, 76, 255, 0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!pkg.popular) {
                      e.currentTarget.style.background = "rgba(228, 76, 255, 0.05)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {pkg.cta}
                </a>
              </div>
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
        className="relative z-10 px-6 py-24"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-[70%] -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(228,76,255,0.08) 0%, transparent 72%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <form
            className="space-y-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#ACA0FB]">
                    {t("contact.configurator.kicker")}
                  </p>
                  <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                    {t("contact.configurator.title")}
                  </h2>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {t("contact.configurator.industryLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactIndustries.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactIndustry === option.key}
                          onClick={() => setContactIndustry(option.key)}
                          className="min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#E44CFF]/40"
                          style={{
                            background:
                              contactIndustry === option.key
                                ? "rgba(228, 76, 255, 0.24)"
                                : "rgba(255, 255, 255, 0.03)",
                            borderColor:
                              contactIndustry === option.key
                                ? "rgba(228, 76, 255, 0.7)"
                                : "rgba(255, 255, 255, 0.1)",
                            boxShadow:
                              contactIndustry === option.key
                                ? "0 0 18px rgba(228, 76, 255, 0.28)"
                                : "none",
                            color: contactIndustry === option.key ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {t("contact.configurator.goalLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactGoals.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactGoal === option.key}
                          onClick={() => setContactGoal(option.key)}
                          className="min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#E44CFF]/40"
                          style={{
                            background:
                              contactGoal === option.key
                                ? "rgba(228, 76, 255, 0.24)"
                                : "rgba(255, 255, 255, 0.03)",
                            borderColor:
                              contactGoal === option.key
                                ? "rgba(228, 76, 255, 0.7)"
                                : "rgba(255, 255, 255, 0.1)",
                            boxShadow:
                              contactGoal === option.key
                                ? "0 0 18px rgba(228, 76, 255, 0.28)"
                                : "none",
                            color: contactGoal === option.key ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {t("contact.configurator.scaleLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactScales.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactScale === option.key}
                          onClick={() => setContactScale(option.key)}
                          className="min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#E44CFF]/40"
                          style={{
                            background:
                              contactScale === option.key
                                ? "rgba(228, 76, 255, 0.24)"
                                : "rgba(255, 255, 255, 0.03)",
                            borderColor:
                              contactScale === option.key
                                ? "rgba(228, 76, 255, 0.7)"
                                : "rgba(255, 255, 255, 0.1)",
                            boxShadow:
                              contactScale === option.key
                                ? "0 0 18px rgba(228, 76, 255, 0.28)"
                                : "none",
                            color: contactScale === option.key ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-base font-bold text-[#E44CFF]">
                      {t("contact.configurator.nameLabel")}
                    </label>
                    <input
                      type="text"
                      className="h-[58px] w-full rounded-[14px] border border-[#8B56FF]/30 bg-[#080B22]/75 px-5 py-4 text-lg leading-none text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#E44CFF]/75 focus:ring-2 focus:ring-[#E44CFF]/25"
                      placeholder={t("contact.configurator.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-base font-bold text-[#E44CFF]">
                      {t("contact.configurator.emailLabel")}
                    </label>
                    <input
                      type="email"
                      className="h-[58px] w-full rounded-[14px] border border-[#8B56FF]/30 bg-[#080B22]/75 px-5 py-4 text-lg leading-none text-white outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#E44CFF]/75 focus:ring-2 focus:ring-[#E44CFF]/25"
                      placeholder={t("contact.configurator.emailPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              <div className="relative min-h-[560px] overflow-visible py-8 pr-8 sm:pr-12">
                <motion.div
                  className="absolute right-10 top-16 z-0 h-[500px] w-[calc(100%-3rem)] max-w-xl -rotate-[8deg] rounded-[2rem] border border-white/[0.12] bg-[#4EF0FF]/[0.06] shadow-[0_0_35px_rgba(228,76,255,0.10)] backdrop-blur-md"
                  animate={{ y: [0, 10, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute right-0 top-0 z-[1] h-[500px] w-[calc(100%-3rem)] max-w-xl rotate-[6deg] rounded-[2rem] border border-[#4EF0FF]/30 bg-white/[0.08] shadow-[0_0_35px_rgba(78,240,255,0.12)] backdrop-blur-md"
                  animate={{ y: [0, -8, 0], rotate: [6, 4, 6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className="relative z-10 ml-auto mr-5 mt-7 min-h-[500px] max-w-xl rounded-[2rem] border border-white/[0.18] bg-white/[0.08] p-6 shadow-[0_0_55px_rgba(78,240,255,0.12)] backdrop-blur-2xl md:mr-8 md:p-8"
                  animate={{
                    y: [0, -6, 0],
                    boxShadow: [
                      "0 0 45px rgba(78,240,255,0.10)",
                      "0 0 70px rgba(228,76,255,0.16)",
                      "0 0 45px rgba(78,240,255,0.10)",
                    ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <h3 className="text-3xl font-semibold tracking-tight text-white">
                    {t("contact.configurator.blueprintTitle")}
                  </h3>

                  <div className="relative mt-12 h-64 overflow-hidden rounded-2xl">
                    <svg
                      viewBox="0 0 520 250"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      {[
                        "M100 55 H210 Q230 55 230 78 V112",
                        "M100 120 H230",
                        "M100 185 H210 Q230 185 230 162 V138",
                      ].map((path, index) => (
                        <motion.path
                          key={`input-path-${index}`}
                          d={path}
                          stroke="rgba(172,160,251,0.5)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8 10"
                          animate={{ strokeDashoffset: [0, -36] }}
                          transition={{ duration: 3.6 + index * 0.35, repeat: Infinity, ease: "linear" }}
                        />
                      ))}
                      {[
                        "M300 125 H395 Q420 125 420 90 V58 H475",
                        "M300 125 H475",
                        "M300 125 H395 Q420 125 420 160 V198 H475",
                      ].map((path, index) => (
                        <motion.path
                          key={`output-path-${index}`}
                          d={path}
                          stroke="rgba(78,240,255,0.58)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="10 12"
                          animate={{ strokeDashoffset: [0, -44] }}
                          transition={{ duration: 3.2 + index * 0.3, repeat: Infinity, ease: "linear" }}
                        />
                      ))}
                    </svg>

                    <motion.div
                      className="absolute left-8 top-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#E44CFF]/30 bg-[#E44CFF]/15 shadow-[0_0_20px_rgba(228,76,255,0.22)]"
                      animate={{ scale: [1, 1.06, 1], y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="h-6 w-6 rounded-full border-4 border-[#E44CFF]/70" />
                    </motion.div>
                    <motion.div
                      className="absolute left-4 top-[98px] h-16 w-20 rounded-xl border border-[#ACA0FB]/25 bg-[#5861F2]/15 p-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {[40, 48, 32].map((width, index) => (
                        <motion.span
                          key={`blueprint-left-line-${index}`}
                          className="mb-2 block h-1.5 rounded-full bg-[#ACA0FB]/60 last:mb-0"
                          animate={{ width: [`${Math.max(20, width - 14)}px`, `${width}px`, `${Math.max(18, width - 5)}px`] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.22 }}
                        />
                      ))}
                    </motion.div>
                    <motion.div
                      className="absolute left-8 bottom-5 flex h-14 w-14 items-center justify-center rounded-xl border border-[#ACA0FB]/25 bg-[#5861F2]/15"
                      animate={{ scale: [1, 1.05, 1], y: [0, 4, 0] }}
                      transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="h-7 w-7 rounded-full border-2 border-[#ACA0FB]/55" />
                    </motion.div>

                    <motion.div
                      className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#4EF0FF]/50 bg-[linear-gradient(135deg,rgba(78,240,255,0.22),rgba(228,76,255,0.22))] shadow-[0_0_35px_rgba(78,240,255,0.22)]"
                      animate={{
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 25px rgba(78,240,255,0.18)",
                          "0 0 48px rgba(78,240,255,0.34)",
                          "0 0 25px rgba(78,240,255,0.18)",
                        ],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="relative h-10 w-10">
                        <span className="absolute left-1 top-3 h-3 w-3 rounded-full border-2 border-white/80" />
                        <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white/80" />
                        <span className="absolute right-1 bottom-1 h-3 w-3 rounded-full border-2 border-white/80" />
                        <span className="absolute left-4 top-5 h-px w-5 rotate-[-35deg] bg-white/70" />
                        <span className="absolute left-4 top-5 h-px w-5 rotate-[35deg] bg-white/70" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute right-4 top-3 h-16 w-16 rounded-xl border border-white/15 bg-white/[0.08]"
                      animate={{ opacity: [0.5, 0.95, 0.5], y: [0, -5, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute right-4 top-[100px] flex h-16 w-16 items-center justify-center rounded-xl border border-[#4EF0FF]/25 bg-[#4EF0FF]/10"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="h-7 w-7 rounded-full border-2 border-[#4EF0FF]/60" />
                    </motion.div>
                    <motion.div
                      className="absolute bottom-3 right-4 h-16 w-16 rounded-xl border border-white/15 bg-white/[0.08]"
                      animate={{ opacity: [0.45, 0.9, 0.45], y: [0, 5, 0] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="mt-10 text-base leading-relaxed text-white/72">
                    <motion.div
                      key={`next-step-${contactScale}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
                    >
                      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#E44CFF]">
                        {t("contact.configurator.nextStepLabel")}
                      </p>
                      <p>
                        <span className="font-semibold text-white">{selectedScaleLabel}:</span>{" "}
                        {t("contact.configurator.nextStepText")}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative inline-flex min-h-16 items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 text-lg font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_45px_var(--theme-glow)]"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: "0 0 34px var(--theme-glow-border)",
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t("contact.configurator.submit")}
                  <ArrowRight className="h-6 w-6 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-[225deg]" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </form>
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
                      className="text-lg font-medium text-white/[0.82] transition-colors duration-200 hover:text-[#4EF0FF]"
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
                      className="text-lg font-medium text-white/[0.82] transition-colors duration-200 hover:text-[#4EF0FF]"
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

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 left-8 md:left-10 z-40 w-[52px] h-[52px] rounded-full flex items-center justify-center border border-white/10 bg-slate-950/65 backdrop-blur-md text-white hover:text-[#4EF0FF] transition-all shadow-xl hover:scale-105"
            style={{
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px var(--theme-glow-border)",
            }}
            aria-label="Scroll to top"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 52 52">
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--theme-primary)" />
                  <stop offset="100%" stopColor="var(--theme-secondary, #4EF0FF)" />
                </linearGradient>
              </defs>
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="26"
                cy="26"
                r="22"
                stroke="url(#progress-gradient)"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (scrollProgress / 100) * 138.2}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
                className="transition-all duration-100"
              />
            </svg>
            <ArrowUp className="w-5 h-5 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
}
