"use client";

import { useState, useEffect, useRef, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { Check, Star, ArrowRight, ArrowLeft, Sparkles, Cpu, Activity, Menu, X, Globe, ArrowUp, Copy, Facebook, Instagram, Linkedin, BarChart3, Folder, Settings } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LightHeroBackground from "@/components/LightHeroBackground";
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
  lightMode?: boolean;
};

function ShowcaseInterface({ showcaseKey, label, color, stats, showcaseLabel, lightMode = false }: ShowcaseInterfaceProps) {
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
  const panelClass = lightMode
    ? "border-[#d8c7aa]/70 bg-white/82 shadow-[0_24px_70px_-36px_rgba(61,43,22,0.62)]"
    : "border-white/10 bg-[#050816]/88 shadow-[0_24px_70px_rgba(0,0,0,0.38)]";
  const smallPanelClass = lightMode
    ? "border-[#d8c7aa]/70 bg-white/82 shadow-[0_18px_44px_-28px_rgba(61,43,22,0.58)]"
    : "border-white/[0.12] bg-[#050711]/95 shadow-2xl";
  const modulePanelClass = lightMode
    ? "border-[#d8c7aa]/60 bg-[#fbf8f1]/78"
    : "border-white/10 bg-black/20";
  const mutedTextClass = lightMode ? "text-[#25304a]/62" : "text-white/45";
  const softTextClass = lightMode ? "text-[#25304a]/72" : "text-white/62";
  const strongTextClass = lightMode ? "text-[#10172d]" : "text-white";

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
        className={`absolute left-[3%] top-[4%] h-[58%] w-[76%] rounded-2xl border p-3 backdrop-blur-md sm:left-[5%] sm:h-[62%] ${panelClass}`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full gap-3">
          <div className={`hidden w-8 shrink-0 flex-col items-center gap-2 rounded-xl py-2 sm:flex ${lightMode ? "bg-[#f1e6d7]/70" : "bg-white/[0.04]"}`}>
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                key={`${showcaseKey}-rail-${item}`}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: item === 1 ? color : lightMode ? "rgba(20,33,67,0.18)" : "rgba(255,255,255,0.16)" }}
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
              <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:inline ${mutedTextClass}`}>
                {showcaseLabel}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-[1.35fr_0.85fr]">
              <div className={`flex min-h-0 flex-col rounded-xl border p-3 ${modulePanelClass}`}>
                <div className={`mb-3 flex items-center justify-between text-[10px] font-semibold uppercase ${lightMode ? "text-[#25304a]/62" : "text-white/50"}`}>
                  <span>Live operations surface</span>
                  <motion.span
                    style={{ color }}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    Streaming
                  </motion.span>
                </div>
                <div className={`relative flex min-h-0 flex-1 items-end gap-1.5 overflow-hidden rounded-lg px-2 pb-2 ${lightMode ? "bg-[#f1e6d7]/45" : "bg-white/[0.03]"}`}>
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
                    <div key={`${showcaseKey}-metric-${stat}`} className={`rounded-lg px-2 py-2 ${lightMode ? "bg-white/68" : "bg-white/[0.04]"}`}>
                      <p className={`truncate text-[9px] uppercase ${lightMode ? "text-[#25304a]/55" : "text-white/40"}`}>{stat}</p>
                      <motion.p
                        className={`mt-1 text-sm font-bold ${strongTextClass}`}
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
                <div className={`relative flex-1 overflow-hidden rounded-xl border p-3 ${lightMode ? "border-[#d8c7aa]/60 bg-white/58" : "border-white/10 bg-white/[0.045]"}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${mutedTextClass}`}>
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
                      className={`absolute grid h-9 w-9 place-items-center rounded-lg border text-[8px] font-semibold ${
                        lightMode
                          ? "border-[#d8c7aa]/70 bg-[#fbf8f1]/95 text-[#25304a]/78"
                          : "border-white/10 bg-[#07101D]/95 text-white/65"
                      }`}
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
                    <div key={`${showcaseKey}-module-${index}`} className={`flex items-end rounded-lg border p-1.5 ${modulePanelClass}`}>
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
        className={`absolute left-[2%] top-[64%] hidden w-[48%] rounded-xl border p-3 sm:block ${smallPanelClass}`}
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`mb-2 flex items-center justify-between text-[10px] font-semibold uppercase ${mutedTextClass}`}>
          <span>Decision log</span>
          <span style={{ color }}>13ms</span>
        </div>
        {["Semantic cache hit", "Budget policy passed", "Worker action queued"].map((item, index) => (
          <motion.div
            key={`${showcaseKey}-log-${item}`}
            className={`mb-1.5 flex items-center gap-2 text-[10px] last:mb-0 ${softTextClass}`}
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
            className={`absolute left-0 right-0 rounded-xl border p-3 backdrop-blur-md ${
              lightMode
                ? "border-[#d8c7aa]/70 bg-white/82 shadow-[0_18px_44px_-28px_rgba(61,43,22,0.58)]"
                : "border-white/[0.12] bg-[#080B18]/92 shadow-2xl"
            }`}
            style={{ top: `${index * 27}%` }}
            animate={{ y: [0, index % 2 === 0 ? -7 : 7, 0], rotate: [0, index % 2 === 0 ? -1 : 1, 0] }}
            transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.13em] ${lightMode ? "text-[#25304a]/62" : "text-white/50"}`}>
                {item} screen
              </p>
              <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            </div>
            <div className="space-y-2">
              {[68, 48, 82].map((width, barIndex) => (
                <div key={`${showcaseKey}-shot-${item}-${barIndex}`} className={`h-1.5 overflow-hidden rounded-full ${lightMode ? "bg-[#d8c7aa]/42" : "bg-white/10"}`}>
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: barIndex === 1 ? lightMode ? "rgba(20,33,67,0.42)" : "rgba(255,255,255,0.62)" : color }}
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
        className={`absolute bottom-[2%] right-[9%] hidden w-[37%] rounded-xl border p-3 sm:block ${
          lightMode
            ? "border-[#d8c7aa]/70 bg-white/82 shadow-[0_18px_44px_-28px_rgba(61,43,22,0.58)]"
            : "border-white/[0.12] bg-[#07101D]/95 shadow-2xl"
        }`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.13em] ${lightMode ? "text-[#25304a]/62" : "text-white/50"}`}>
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
            <div className={`h-1.5 rounded-full ${lightMode ? "bg-[#d8c7aa]/42" : "bg-white/10"}`}>
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
  const [contactName, setContactName] = useState("");
  const [contactEmailAddress, setContactEmailAddress] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitStatus, setContactSubmitStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lightHero = true;

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
  const selectedIndustryLabel =
    contactIndustries.find((option) => option.key === contactIndustry)?.label ?? contactIndustries[0]?.label;
  const selectedGoalLabel =
    contactGoals.find((option) => option.key === contactGoal)?.label ?? contactGoals[0]?.label;
  const selectedScaleLabel =
    contactScales.find((option) => option.key === contactScale)?.label ?? contactScales[0]?.label;
  const projectDiscussionEmail = "marwajawad19@gmail.com";

  const getContactEmailHref = (body: string) =>
    `mailto:${projectDiscussionEmail}?subject=${encodeURIComponent("Initiate Project Discussion")}&body=${encodeURIComponent(body)}`;

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmitStatus("sending");

    const recommendedStart = `${selectedScaleLabel || "Selected scale"} - ${t("contact.configurator.nextStepText")}`;
    const emailBody = [
      "New project discussion request from TRI MINDS website.",
      "",
      `Name: ${contactName.trim() || "Not provided"}`,
      `Email: ${contactEmailAddress.trim() || "Not provided"}`,
      `Industry Focus: ${selectedIndustryLabel || "Not selected"}`,
      `Primary Goal: ${selectedGoalLabel || "Not selected"}`,
      `Scale: ${selectedScaleLabel || "Not selected"}`,
      "",
      "Message:",
      contactMessage.trim() || "Not provided",
      "",
      `Recommended Start: ${recommendedStart}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmailAddress,
          industry: selectedIndustryLabel,
          goal: selectedGoalLabel,
          scale: selectedScaleLabel,
          message: contactMessage,
          recommendedStart,
        }),
      });

      if (response.ok) {
        setContactSubmitStatus("sent");
        setContactName("");
        setContactEmailAddress("");
        setContactMessage("");
        return;
      }
    } catch {
      // Fall back to the visitor's mail app below when direct delivery is unavailable.
    }

    setContactSubmitStatus("fallback");
    window.location.href = getContactEmailHref(emailBody);
  };

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
  const getGlobalThemeStyles = (activeMode: PersonaMode, isLightHero: boolean) => {
    if (isLightHero) {
      return {
        "--theme-primary": "#142143",
        "--theme-secondary": "#b27a4f",
        "--theme-glow": "rgba(20, 33, 67, 0.28)",
        "--theme-gradient": "linear-gradient(to right, #101b39, #213c67)",
        "--theme-glow-border": "rgba(28, 39, 76, 0.24)",
        "--theme-nav-border": "rgba(112, 93, 67, 0.2)",
        background: "#060816",
      } as React.CSSProperties;
    }

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
  const lightHeroInk = lightHero ? "#10172d" : undefined;
  const lightHeroMutedInk = lightHero ? "rgba(37, 48, 74, 0.78)" : undefined;
  const lightHeroSoftInk = lightHero ? "rgba(37, 48, 74, 0.72)" : undefined;
  const lightHeroWarmInk = lightHero ? "#5c4329" : undefined;
  const activeShowcaseThemeColor = lightHero ? "#9A6847" : activeShowcase.color;
  const getContactOptionStyle = (isActive: boolean): CSSProperties => lightHero
    ? {
        background: isActive ? "rgba(255, 255, 255, 0.78)" : "rgba(250, 246, 237, 0.62)",
        borderColor: isActive ? "rgba(154, 104, 71, 0.72)" : "rgba(198, 173, 137, 0.58)",
        boxShadow: isActive ? "0 14px 30px -22px rgba(61,43,22,0.72)" : "none",
        color: isActive ? "#10172d" : "rgba(37,48,74,0.78)",
      }
    : {
        background: isActive ? "rgba(228, 76, 255, 0.24)" : "rgba(255, 255, 255, 0.03)",
        borderColor: isActive ? "rgba(228, 76, 255, 0.7)" : "rgba(255, 255, 255, 0.1)",
        boxShadow: isActive ? "0 0 18px rgba(228, 76, 255, 0.28)" : "none",
        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
      };
  const lightInputClassName = "h-[58px] w-full rounded-[14px] border border-[#c6ad89]/60 bg-[#fbf8f1]/85 px-5 py-4 text-lg leading-none text-[#10172d] outline-none transition-all duration-300 placeholder:text-[#25304a]/45 focus:border-[#9A6847]/75 focus:bg-white/70 focus:ring-2 focus:ring-[#9A6847]/20";
  const lightTextareaClassName = "min-h-[142px] w-full resize-y rounded-[14px] border border-[#c6ad89]/60 bg-[#fbf8f1]/85 px-5 py-4 text-lg leading-relaxed text-[#10172d] outline-none transition-all duration-300 placeholder:text-[#25304a]/45 focus:border-[#9A6847]/75 focus:bg-white/70 focus:ring-2 focus:ring-[#9A6847]/20";
  const lightInputStyle: CSSProperties | undefined = lightHero
    ? {
        backgroundColor: "rgba(251, 248, 241, 0.85)",
        color: "#10172d",
        WebkitTextFillColor: "#10172d",
        caretColor: "#10172d",
      }
    : undefined;
  const primaryCtaStyle = lightHero
    ? {
        background: "linear-gradient(135deg, #101b39, #213c67)",
        boxShadow: "0 18px 38px -24px rgba(61,43,22,0.78)",
        color: "#fff",
      }
    : {
        background: "var(--theme-gradient)",
        boxShadow: "0 0 34px var(--theme-glow-border)",
        color: "#fff",
      };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
        lightHero ? "text-[#10172d]" : "text-white"
      }`}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={getGlobalThemeStyles(mode, lightHero)}
    >
      {/* Logo Intro Video Preloader */}
      {/* <Preloader /> */}
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
            : `top-4 border-b border-white/5 ${
                lightHero 
                  ? "bg-black/40 backdrop-blur-md" 
                  : "bg-black/70 backdrop-blur-md"
              }`
        }`}
      >
        <div
          className={`mx-auto w-full max-w-6xl flex justify-between items-center transition-all duration-500 ${
            scrolled
              ? lightHero
                ? "rounded-full border bg-[#faf6ed]/82 backdrop-blur-xl px-6 py-2.5 shadow-[0_18px_44px_-24px_rgba(61,43,22,0.38)]"
                : "rounded-full border bg-slate-900/40 backdrop-blur-xl px-6 py-2.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),_0_0_20px_rgba(228,76,255,0.15)]"
              : "px-6 py-2.5"
          }`}
          style={{
            borderColor: scrolled ? "var(--theme-nav-border)" : "transparent",
          }}
        >
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div 
              className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-1 group"
              style={{ WebkitTextStroke: "0.4px white" }}
            >
              <span 
                className="bg-clip-text text-transparent transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_var(--theme-glow)]"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #142143, #9A6847)"
                    : mode === "creative"
                    ? "linear-gradient(to right, #E44CFF, #9F56FF)"
                    : mode === "precise"
                    ? "linear-gradient(to right, #4EF0FF, #2EDAA2)"
                    : "linear-gradient(to right, #4EF0FF, #5861F2)"
                }}
              >
                TRI
              </span>
              <span
                className={`transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                  lightHero
                    ? "text-[#10172d] group-hover:from-[#10172d] group-hover:to-[#9A6847]"
                    : "text-white group-hover:from-white group-hover:to-gray-300"
                }`}
              >
                MINDS
              </span>
            </div>
          </Link>
          <div
            className="hidden lg:flex items-center gap-8 text-[16px] font-medium"
          >
            <a
              href="#services"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.solutions")}
            </a>
            <Link
              href="/about-us"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.about")}
            </Link>
            <a
              href="#packages"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#contact"
              className={`transition-all duration-300 ${
                scrolled && lightHero ? "text-[#121a31]/80 hover:text-[#121a31]" : "text-white/90 hover:text-white"
              }`}
            >
              {t("nav.contact")}
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
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
                color: "#fff",
              }}
            >
              {t("nav.cta")}
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-3">
            <button
              className={`p-2 rounded-xl border text-sm transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded-xl border transition-all duration-300 ${
                scrolled && lightHero
                  ? "border-[#c6ad89] bg-white/80 text-[#121a31] hover:bg-white"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60"
              }`}
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
              className={`absolute left-4 right-4 top-full mt-2 rounded-2xl border backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden z-40 ${
                lightHero
                  ? "border-[#c6ad89]/45 bg-[#faf6ed]/92"
                  : "border-[#E44CFF]/20 bg-slate-900/80"
              }`}
            >
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.solutions")}
              </a>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.about")}
              </Link>
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
              >
                {t("nav.pricing")}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-2 border-b transition-colors ${
                  lightHero ? "border-[#c6ad89]/30" : "border-white/5"
                } ${scrolled && lightHero ? "text-[#121a31]/90 hover:text-[#121a31]" : "text-white/90 hover:text-white"}`}
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
                  color: "#fff",
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
        className="relative z-10 flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden min-h-screen pt-32 pb-16"
      >
        {/* Cinematic cosmic background */}
        <LightHeroBackground />

        <div className="max-w-5xl mx-auto relative w-full z-10 flex flex-col items-center justify-center">
          
          {/* Main Column: Text content & Action items */}
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            {/* Glowing badge */}
            <div
              className={`inline-flex items-center gap-2 px-12 py-2.5 backdrop-blur-[2px] text-[10px] md:text-xs font-bold tracking-widest uppercase ${
                lightHero
                  ? "bg-gradient-to-r from-transparent via-white/90 to-transparent text-[#10172d]"
                  : "bg-gradient-to-r from-transparent via-white/15 to-transparent text-white"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  lightHero ? "bg-[#142143]" : "bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF]"
                }`}
              />
              {t("hero.badge.first")} · {t("hero.badge.second")} · {t("hero.badge.third")}
            </div>

            {/* Headline with rotating words */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight w-full ${
                lightHero ? "text-[#10172d]" : "text-white"
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("hero.heading")}{" "}
              <span className="relative inline-block min-w-[140px] sm:min-w-[180px] md:min-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 right-0 bg-clip-text text-transparent select-none whitespace-nowrap"
                    style={{
                      backgroundImage: lightHero
                        ? "linear-gradient(to right, #10172d, #9A6847, #152143)"
                        : mode === "creative"
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
            <p
              className={`text-sm sm:text-base md:text-xl max-w-3xl leading-relaxed font-medium ${
                lightHero ? "text-[#10172d]" : "text-gray-300"
              }`}
              style={{ color: lightHero ? "#10172d" : undefined }}
            >
              {t("hero.subheading")}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full pt-4">
              <a
                href="#contact"
                className="group relative w-full sm:w-auto text-center px-10 py-4 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={{
                  background: "var(--theme-gradient)",
                  boxShadow: `0 0 20px var(--theme-glow-border)`,
                  color: "#fff",
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
                className={`group w-full sm:w-auto text-center px-10 py-4 rounded-full font-semibold text-sm border backdrop-blur-md transition-all duration-300 hover:scale-[1.05] ${
                  lightHero
                    ? "border-[#17213a]/35 bg-white/45 text-[#10172d] hover:border-[#17213a]/60 hover:bg-white/70"
                    : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                }`}
                style={{ color: lightHeroInk }}
              >
                {locale === "ar" ? "تعرف على طريقتنا" : "How It Works"}
              </a>
            </div>

            {/* Performance Stats */}
            <div
              className={`pt-8 mt-6 grid grid-cols-3 gap-6 md:gap-12 border-t w-full max-w-3xl text-center ${
                lightHero ? "border-[#8a6640]/80" : "border-white/10"
              }`}
            >
              {[
                { val: t("hero.stats.clients.value"), label: t("hero.stats.clients.label") },
                { val: t("hero.stats.revenue.value"), label: t("hero.stats.revenue.label") },
                { val: t("hero.stats.loyalty.value"), label: t("hero.stats.loyalty.label") },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={`text-2xl md:text-3xl font-extrabold font-mono ${
                      lightHero ? "text-[#5c4329]" : "text-white"
                    }`}
                    style={{ color: lightHeroWarmInk }}
                  >
                    {stat.val}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs uppercase tracking-wider mt-2 font-semibold ${
                      lightHero ? "text-[#4a3f33]" : "text-gray-400"
                    }`}
                    style={{ color: lightHero ? "#4a3f33" : undefined }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`relative z-10 overflow-hidden py-20 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.78),transparent_32%),radial-gradient(circle_at_76%_38%,rgba(204,174,128,0.16),transparent_36%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_78%,#f7f3ea_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full border border-[#c6ad89]/20" />
            <div className="pointer-events-none absolute -right-24 bottom-28 h-80 w-80 rounded-full border border-[#142143]/10" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("services.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("services.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
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
                accentColor: lightHero ? "#142143" : "#E44CFF",
                accentColor2: lightHero ? "#9A6847" : "#7B4CFF",
              },
              {
                tempId: 1,
                title: t("services.items.analytics.title"),
                description: t("services.items.analytics.description"),
                features: t("services.items.analytics.features"),
                accentColor: lightHero ? "#9A6847" : "#8B56FF",
                accentColor2: lightHero ? "#142143" : "#5861F2",
              },
              {
                tempId: 2,
                title: t("services.items.industry.title"),
                description: t("services.items.industry.description"),
                features: t("services.items.industry.features"),
                accentColor: lightHero ? "#142143" : "#5861F2",
                accentColor2: lightHero ? "#8a6640" : "#5BA8F7",
              },
              {
                tempId: 3,
                title: t("services.items.llm.title"),
                description: t("services.items.llm.description"),
                features: t("services.items.llm.features"),
                accentColor: lightHero ? "#9A6847" : "#5BA8F7",
                accentColor2: lightHero ? "#213c67" : "#4ECFFC",
              },
              {
                tempId: 4,
                title: t("services.items.endToEnd.title"),
                description: t("services.items.endToEnd.description"),
                features: t("services.items.endToEnd.features"),
                accentColor: lightHero ? "#213c67" : "#4ECFFC",
                accentColor2: lightHero ? "#9A6847" : "#4EF0FF",
              },
              {
                tempId: 5,
                title: t("services.items.webMobile.title"),
                description: t("services.items.webMobile.description"),
                features: t("services.items.webMobile.features"),
                accentColor: lightHero ? "#8a6640" : "#4EF0FF",
                accentColor2: lightHero ? "#142143" : "#ACA0FB",
              },
            ]}
            lightMode={lightHero}
          />
        </div>
      </section>

      {/* Who We Serve Section */}
      <section
        id="customers"
        className={`relative z-10 overflow-hidden py-20 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 78% 38%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 78%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 55% 40% at 50% 60%, rgba(228,76,255,0.06) 0%, transparent 75%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[4%] top-16 hidden h-[440px] w-[440px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-4">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("customers.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("customers.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
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
                  color={activeShowcaseThemeColor}
                  stats={activeShowcase.stats}
                  showcaseLabel={t("customers.showcaseLabel")}
                  lightMode={lightHero}
                />
              </AnimatePresence>
              <div
                className={`absolute inset-0 ${
                  lightHero
                    ? "bg-[radial-gradient(circle_at_82%_18%,rgba(154,104,71,0.08),transparent_24%)]"
                    : "bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_24%)]"
                }`}
              />

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
                  style={{ color: activeShowcaseThemeColor }}
                />
                <WrittenText
                  as="h3"
                  text={activeShowcase.title}
                  delay={220}
                  speed={13}
                  className={`text-3xl font-bold leading-tight md:text-4xl ${
                    lightHero ? "text-[#10172d]" : "text-white"
                  }`}
                  style={{ color: lightHeroInk }}
                />
                <WrittenText
                  as="p"
                  text={activeShowcase.body}
                  delay={620}
                  speed={7}
                  className={`mt-5 text-base leading-relaxed md:text-lg ${
                    lightHero ? "text-[#25304a]/78" : "text-gray-300"
                  }`}
                  style={{ color: lightHeroMutedInk }}
                />
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {activeShowcase.stats.map((stat) => (
                    <div
                      key={stat}
                      className={`flex items-center gap-2 text-sm font-semibold ${
                        lightHero ? "text-[#25304a]/82" : "text-white/85"
                      }`}
                      style={{ color: lightHero ? "rgba(37,48,74,0.82)" : undefined }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: activeShowcaseThemeColor }}
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
            {customerShowcases.map(({ key, label, color }) => {
              const pillColor = lightHero ? "#9A6847" : color;
              const isActive = activeShowcaseKey === key;
              return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveShowcaseKey(key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                  lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-white/40"
                }`}
                style={{
                  background: lightHero
                    ? isActive ? "rgba(255,255,255,0.72)" : "rgba(250,246,237,0.62)"
                    : isActive ? `${color}28` : `${color}12`,
                  border: `1px solid ${isActive ? pillColor : `${pillColor}44`}`,
                  color: lightHero ? isActive ? "#10172d" : "#6f604f" : isActive ? "#FFFFFF" : color,
                  boxShadow: lightHero
                    ? isActive ? "0 12px 28px -20px rgba(61,43,22,0.72)" : "0 0 12px rgba(154,104,71,0.12)"
                    : isActive ? `0 0 18px ${color}44` : `0 0 12px ${color}18`,
                }}
              >
                {label}
              </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Integration Process — Roadmap */}
      <section
        id="about"
        className={`relative z-10 overflow-hidden py-20 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 78% 42%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 78%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(78,240,255,0.05) 0%, transparent 70%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[6%] top-28 hidden h-[420px] w-[420px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            {/* Kicker */}
            <p
              className="text-xs font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: lightHero ? "#9A6847" : "#4EF0FF" }}
            >
              Our Methodology
            </p>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("about.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
                {t("about.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
              {t("about.subheading")}
            </p>
          </div>

          {/* Nodes */}
          <RoadmapProcess lightMode={lightHero} />

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.05]"
              style={{
                background: lightHero
                  ? "linear-gradient(135deg, #101b39, #213c67)"
                  : "linear-gradient(135deg, #E44CFF, #5861F2)",
                boxShadow: lightHero
                  ? "0 18px 38px -24px rgba(61,43,22,0.78)"
                  : "0 0 30px rgba(228,76,255,0.35)",
                color: "#fff",
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
        className={`relative z-10 overflow-hidden py-24 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 76% 34%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 76%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(88,97,242,0.06) 0%, transparent 70%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[5%] top-16 hidden h-[440px] w-[440px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("packages.heading")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #5861F2, #4EF0FF)",
                }}
              >
                {t("packages.headingHighlight")}
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                lightHero ? "text-[#25304a]/78" : "text-gray-400"
              }`}
              style={{ color: lightHeroMutedInk }}
            >
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
            ].map((pkg, index) => {
              const isPopular = Boolean(pkg.popular);
              const packageCtaBase = lightHero
                ? {
                    border: "1px solid rgba(154, 104, 71, 0.32)",
                    background: "rgba(255, 255, 255, 0.62)",
                    color: "#10172d",
                    boxShadow: "none",
                  }
                : {
                    border: "1px solid rgba(228, 76, 255, 0.3)",
                    background: "rgba(228, 76, 255, 0.05)",
                    color: "#fff",
                    boxShadow: "none",
                  };
              const packageCtaActive = lightHero
                ? {
                    background: "linear-gradient(135deg, #101b39, #213c67)",
                    boxShadow: "0 18px 38px -24px rgba(61,43,22,0.78)",
                    color: "#fff",
                  }
                : {
                    background: "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: "0 0 25px rgba(228, 76, 255, 0.35)",
                    color: "#fff",
                  };

              return (
              <div
                key={index}
                className="relative p-8 rounded-2xl transition-all duration-500 hover:scale-[1.03] flex flex-col justify-between"
                style={{
                  background: lightHero
                    ? isPopular ? "rgba(255, 255, 255, 0.86)" : "rgba(250, 246, 237, 0.76)"
                    : isPopular ? "rgba(228, 76, 255, 0.08)" : "rgba(24, 27, 53, 0.35)",
                  backdropFilter: "blur(20px)",
                  border: lightHero
                    ? isPopular ? "2px solid rgba(154, 104, 71, 0.45)" : "1px solid rgba(198, 173, 137, 0.58)"
                    : isPopular ? "2px solid rgba(228, 76, 255, 0.45)" : "1px solid rgba(88, 97, 242, 0.2)",
                  boxShadow: lightHero
                    ? isPopular
                      ? "0 24px 58px -34px rgba(61,43,22,0.72), 0 0 0 1px rgba(255,255,255,0.55) inset"
                      : "0 18px 44px -30px rgba(61,43,22,0.58)"
                    : isPopular
                      ? "0 10px 40px rgba(228, 76, 255, 0.15), 0 0 30px rgba(228, 76, 255, 0.1)"
                      : "0 10px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span
                        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                        style={{
                          background: lightHero
                            ? "linear-gradient(135deg, #101b39, #9A6847)"
                            : "linear-gradient(135deg, #E44CFF, #5861F2)",
                          boxShadow: lightHero
                            ? "0 14px 28px -18px rgba(61,43,22,0.78)"
                            : "0 0 15px rgba(228, 76, 255, 0.5)",
                        }}
                      >
                        {pkg.popularText}
                      </span>
                    </div>
                  )}
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {pkg.name}
                  </h3>
                  <div className="mb-5 flex items-baseline">
                    <span
                      className="text-4xl font-extrabold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: lightHero
                          ? "linear-gradient(to right, #10172d, #9A6847)"
                          : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                      }}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        lightHero ? "text-[#6f604f]" : "text-gray-400"
                      }`}
                      style={{ color: lightHero ? "#6f604f" : undefined }}
                    >
                      {pkg.period}
                    </span>
                  </div>
                  <p
                    className={`mb-6 text-sm leading-relaxed ${
                      lightHero ? "text-[#25304a]/72" : "text-gray-400"
                    }`}
                    style={{ color: lightHero ? "rgba(37,48,74,0.72)" : undefined }}
                  >
                    {pkg.description}
                  </p>
                  <ul className="space-y-3.5 mb-8">
                    {Array.isArray(pkg.features) && pkg.features.map((feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className={`flex items-start text-sm ${
                          lightHero ? "text-[#25304a]/82" : "text-gray-300"
                        }`}
                        style={{ color: lightHero ? "rgba(37,48,74,0.82)" : undefined }}
                      >
                        <Check
                          className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0"
                          style={{
                            color: lightHero ? "#9A6847" : "#4EF0FF",
                            filter: lightHero ? "none" : "drop-shadow(0 0 6px rgba(78,240,255,0.6))",
                          }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className="w-full text-center py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={isPopular ? packageCtaActive : packageCtaBase}
                  onMouseEnter={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = packageCtaActive.background;
                      e.currentTarget.style.boxShadow = packageCtaActive.boxShadow;
                      e.currentTarget.style.color = packageCtaActive.color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isPopular) {
                      e.currentTarget.style.background = packageCtaBase.background;
                      e.currentTarget.style.boxShadow = packageCtaBase.boxShadow;
                      e.currentTarget.style.color = packageCtaBase.color;
                    }
                  }}
                >
                  {pkg.cta}
                </a>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="community"
        className={`relative z-10 overflow-hidden py-24 px-6 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.72),transparent_34%),radial-gradient(circle_at_76%_36%,rgba(154,104,71,0.14),transparent_36%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_76%,#f7f3ea_100%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[5%] top-16 hidden h-[460px] w-[460px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Heading - Outside the visual container */}
          <div className="text-center mb-16">
            <p
              className={`text-sm uppercase tracking-[0.35em] mb-4 ${
                lightHero ? "text-[#6f604f]" : "text-gray-300"
              }`}
              style={{ color: lightHero ? "#6f604f" : undefined }}
            >
              {t("community.kicker")}
            </p>
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
                lightHero ? "text-[#10172d]" : ""
              }`}
              style={{ color: lightHeroInk }}
            >
              {t("community.title")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: lightHero
                    ? "linear-gradient(to right, #10172d, #9A6847)"
                    : "linear-gradient(to right, #E44CFF, #4EF0FF)",
                }}
              >
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
                style={{ border: lightHero ? "1px solid rgba(154, 104, 71, 0.20)" : "1px solid rgba(228, 76, 255, 0.15)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1040px] md:h-[1040px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(20, 33, 67, 0.12)" : "1px solid rgba(228, 76, 255, 0.12)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] md:w-[810px] md:h-[810px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(154, 104, 71, 0.16)" : "1px solid rgba(228, 76, 255, 0.11)" }}
              />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[590px] md:h-[590px] rounded-full"
                style={{ border: lightHero ? "1px solid rgba(20, 33, 67, 0.10)" : "1px solid rgba(228, 76, 255, 0.1)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: lightHero
                    ? "radial-gradient(circle at center, rgba(154, 104, 71, 0.12), transparent 55%)"
                    : "radial-gradient(circle at center, rgba(228, 76, 255, 0.08), transparent 55%)",
                }}
              />
              {orbitDots.map((dot, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    opacity: 0.7,
                    background: lightHero ? "#9A6847" : "#FFFFFF",
                    boxShadow: lightHero ? "0 0 12px rgba(154,104,71,0.32)" : "0 0 12px rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>

            <div className="relative h-[1120px] md:h-[1290px]">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                <button
                  className="px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-[1.05]"
                  style={{
                    background: lightHero
                      ? "linear-gradient(135deg, #101b39, #213c67)"
                      : "linear-gradient(135deg, #E44CFF, #5861F2)",
                    boxShadow: lightHero
                      ? "0 18px 38px -24px rgba(61,43,22,0.78)"
                      : "0 0 30px rgba(228, 76, 255, 0.4)",
                    color: "#fff",
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
                      background: lightHero ? "rgba(255, 255, 255, 0.76)" : "rgba(24, 27, 53, 0.8)",
                      backdropFilter: "blur(16px)",
                      border: lightHero ? "1px solid rgba(198, 173, 137, 0.62)" : "1px solid rgba(228, 76, 255, 0.3)",
                      boxShadow: lightHero
                        ? "0 18px 38px -24px rgba(61,43,22,0.72)"
                        : "0 0 20px rgba(228, 76, 255, 0.2)",
                    }}
                  >
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: lightHero ? "2px solid rgba(154, 104, 71, 0.45)" : "2px solid rgba(228, 76, 255, 0.5)" }}
                      />
                      <span
                        className="absolute -right-1 -bottom-1 w-2 h-2 rounded-full"
                        style={{
                          background: lightHero ? "#9A6847" : "#4EF0FF",
                          boxShadow: lightHero ? "0 0 10px rgba(154,104,71,0.45)" : "0 0 10px rgba(78, 240, 255, 0.8)",
                        }}
                      />
                    </div>
                    <div className="leading-tight text-left">
                      <div
                        className={`text-sm font-semibold ${
                          lightHero ? "text-[#10172d]" : "text-white"
                        }`}
                        style={{ color: lightHeroInk }}
                      >
                        {member.name}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{ color: lightHero ? "#9A6847" : "#E44CFF" }}
                      >
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
                      border: lightHero ? "1px solid rgba(198, 173, 137, 0.62)" : "1px solid rgba(228, 76, 255, 0.3)",
                      background: lightHero ? "rgba(255, 255, 255, 0.70)" : "rgba(24, 27, 53, 0.6)",
                      backdropFilter: "blur(12px)",
                      boxShadow: lightHero
                        ? "0 14px 30px -22px rgba(61,43,22,0.72)"
                        : "0 0 20px rgba(228, 76, 255, 0.15)",
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
        className={`relative z-10 overflow-hidden px-6 py-24 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: lightHero
              ? "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.72), transparent 34%), radial-gradient(circle at 76% 38%, rgba(154,104,71,0.14), transparent 36%), linear-gradient(180deg, #f7f3ea 0%, #f5efe3 72%, #f7f3ea 100%)"
              : "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(228,76,255,0.08) 0%, transparent 72%)",
          }}
        />
        {lightHero && (
          <>
            <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
            <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full border border-[#c6ad89]/22" />
            <div className="pointer-events-none absolute right-[6%] top-24 hidden h-[440px] w-[440px] rounded-full border border-[#142143]/10 md:block" />
          </>
        )}

        <div className="relative mx-auto max-w-7xl">
          <form
            className="space-y-10"
            onSubmit={handleContactSubmit}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-8">
                <div>
                  <p
                    className={`mb-4 text-sm font-bold uppercase tracking-[0.22em] ${
                      lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                    }`}
                    style={{ color: lightHero ? "#9A6847" : undefined }}
                  >
                    {t("contact.configurator.kicker")}
                  </p>
                  <h2
                    className={`text-4xl font-semibold leading-tight tracking-tight md:text-5xl ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {t("contact.configurator.title")}
                  </h2>
                </div>

                <div className="space-y-7">
                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.industryLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactIndustries.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactIndustry === option.key}
                          onClick={() => setContactIndustry(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactIndustry === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.goalLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactGoals.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactGoal === option.key}
                          onClick={() => setContactGoal(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactGoal === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`mb-3 text-xl font-semibold ${
                        lightHero ? "text-[#10172d]" : "text-white"
                      }`}
                      style={{ color: lightHeroInk }}
                    >
                      {t("contact.configurator.scaleLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {contactScales.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          aria-pressed={contactScale === option.key}
                          onClick={() => setContactScale(option.key)}
                          className={`min-h-11 rounded-full border px-5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 ${
                            lightHero ? "focus:ring-[#9A6847]/35" : "focus:ring-[#E44CFF]/40"
                          }`}
                          style={getContactOptionStyle(contactScale === option.key)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.nameLabel")}
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(event) => setContactName(event.target.value)}
                      className={lightInputClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.namePlaceholder")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.emailLabel")}
                    </label>
                    <input
                      type="email"
                      value={contactEmailAddress}
                      onChange={(event) => setContactEmailAddress(event.target.value)}
                      className={lightInputClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.emailPlaceholder")}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className={`mb-2 block text-base font-bold ${
                        lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                      }`}
                      style={{ color: lightHero ? "#9A6847" : undefined }}
                    >
                      {t("contact.configurator.messageLabel")}
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(event) => setContactMessage(event.target.value)}
                      className={lightTextareaClassName}
                      style={lightInputStyle}
                      placeholder={t("contact.configurator.messagePlaceholder")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="relative min-h-[560px] overflow-visible py-8 pr-8 sm:pr-12">
                <motion.div
                  className={`absolute right-10 top-16 z-0 h-[500px] w-[calc(100%-3rem)] max-w-xl -rotate-[8deg] rounded-[2rem] border backdrop-blur-md ${
                    lightHero
                      ? "border-[#d8c7aa]/55 bg-white/46 shadow-[0_18px_44px_-30px_rgba(61,43,22,0.45)]"
                      : "border-white/[0.12] bg-[#4EF0FF]/[0.06] shadow-[0_0_35px_rgba(228,76,255,0.10)]"
                  }`}
                  animate={{ y: [0, 10, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className={`absolute right-0 top-0 z-[1] h-[500px] w-[calc(100%-3rem)] max-w-xl rotate-[6deg] rounded-[2rem] border backdrop-blur-md ${
                    lightHero
                      ? "border-[#c6ad89]/58 bg-[#fbf8f1]/62 shadow-[0_18px_44px_-30px_rgba(61,43,22,0.52)]"
                      : "border-[#4EF0FF]/30 bg-white/[0.08] shadow-[0_0_35px_rgba(78,240,255,0.12)]"
                  }`}
                  animate={{ y: [0, -8, 0], rotate: [6, 4, 6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                  className={`relative z-10 ml-auto mr-5 mt-7 min-h-[500px] max-w-xl rounded-[2rem] border p-6 backdrop-blur-2xl md:mr-8 md:p-8 ${
                    lightHero
                      ? "border-[#d8c7aa]/70 bg-white/78 shadow-[0_24px_58px_-34px_rgba(61,43,22,0.72)]"
                      : "border-white/[0.18] bg-white/[0.08] shadow-[0_0_55px_rgba(78,240,255,0.12)]"
                  }`}
                  animate={{
                    y: [0, -6, 0],
                    boxShadow: lightHero
                      ? [
                          "0 24px 58px -34px rgba(61,43,22,0.62)",
                          "0 28px 66px -34px rgba(61,43,22,0.78)",
                          "0 24px 58px -34px rgba(61,43,22,0.62)",
                        ]
                      : [
                          "0 0 45px rgba(78,240,255,0.10)",
                          "0 0 70px rgba(228,76,255,0.16)",
                          "0 0 45px rgba(78,240,255,0.10)",
                        ],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <h3
                    className={`text-3xl font-semibold tracking-tight ${
                      lightHero ? "text-[#10172d]" : "text-white"
                    }`}
                    style={{ color: lightHeroInk }}
                  >
                    {t("contact.configurator.blueprintTitle")}
                  </h3>

                  <div className={`relative mt-12 h-64 overflow-hidden rounded-2xl ${lightHero ? "bg-[#f5efe3]/45" : ""}`}>
                    <svg
                      viewBox="0 0 520 250"
                      className="absolute inset-0 h-full w-full"
                      aria-hidden="true"
                    >
                      {[
                        "M82 54 C120 54 126 88 116 106 C112 118 122 125 126 125",
                        "M82 125 H126",
                        "M82 196 C122 196 126 160 126 137",
                      ].map((path, index) => (
                        <motion.path
                          key={`input-path-${index}`}
                          d={path}
                          stroke={lightHero ? "rgba(154,104,71,0.46)" : "rgba(172,160,251,0.5)"}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="8 10"
                          animate={{ strokeDashoffset: [0, -36] }}
                          transition={{ duration: 3.6 + index * 0.35, repeat: Infinity, ease: "linear" }}
                        />
                      ))}
                      {[
                        "M206 125 H214",
                        "M320 125 C342 125 338 88 360 84",
                        "M320 125 C342 125 338 162 360 166",
                        "M430 84 C452 72 442 25 463 25",
                        "M430 84 C448 82 445 78 463 78",
                        "M430 164 C452 154 442 131 463 131",
                        "M430 176 C448 176 445 184 463 184",
                        "M430 188 C452 202 442 232 463 232",
                      ].map((path, index) => (
                        <motion.path
                          key={`output-path-${index}`}
                          d={path}
                          stroke={lightHero ? "rgba(20,33,67,0.48)" : "rgba(78,240,255,0.58)"}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="10 12"
                          animate={{ strokeDashoffset: [0, -44] }}
                          transition={{ duration: 3.2 + index * 0.3, repeat: Infinity, ease: "linear" }}
                        />
                      ))}
                    </svg>

                    {[
                      { key: "top", className: "left-4 top-5", delay: 0 },
                      { key: "middle", className: "left-4 top-[92px]", delay: 0.18 },
                      { key: "bottom", className: "left-4 bottom-5", delay: 0.36 },
                    ].map((node) => (
                      <motion.div
                        key={`blueprint-input-${node.key}`}
                        className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl border ${node.className} ${
                          lightHero
                            ? "border-[#c6ad89]/26 bg-white/28 shadow-[0_18px_32px_-28px_rgba(61,43,22,0.45)]"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                        animate={{ opacity: [0.52, 0.94, 0.52], y: [0, -3, 0] }}
                        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                      >
                        <span
                          className="h-7 w-7 rounded-full border-[6px]"
                          style={{ borderColor: lightHero ? "rgba(154,104,71,0.72)" : "rgba(228,76,255,0.70)" }}
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      className={`absolute left-[24%] top-1/2 flex h-20 w-20 -translate-y-1/2 flex-col justify-center rounded-2xl border px-5 ${
                        lightHero
                          ? "border-[#10172d]/70 bg-[#fbf8f1]/78 shadow-[0_18px_34px_-26px_rgba(61,43,22,0.5)]"
                          : "border-white/35 bg-white/[0.08]"
                      }`}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {[42, 58, 34].map((width, index) => (
                        <motion.span
                          key={`blueprint-document-line-${index}`}
                          className="mb-2 block h-2 rounded-full last:mb-0"
                          style={{ background: lightHero ? "rgba(20,33,67,0.42)" : "rgba(172,160,251,0.60)" }}
                          animate={{ width: [`${Math.max(20, width - 12)}px`, `${width}px`, `${Math.max(18, width - 5)}px`] }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.22 }}
                        />
                      ))}
                    </motion.div>

                    <motion.div
                      className={`absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border ${
                        lightHero
                          ? "border-[#142143]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(154,104,71,0.18))] shadow-[0_18px_34px_-24px_rgba(61,43,22,0.72)]"
                          : "border-[#4EF0FF]/50 bg-[linear-gradient(135deg,rgba(78,240,255,0.22),rgba(228,76,255,0.22))] shadow-[0_0_35px_rgba(78,240,255,0.22)]"
                      }`}
                      animate={{
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          lightHero ? "0 18px 34px -24px rgba(61,43,22,0.58)" : "0 0 25px rgba(78,240,255,0.18)",
                          lightHero ? "0 24px 44px -24px rgba(61,43,22,0.74)" : "0 0 48px rgba(78,240,255,0.34)",
                          lightHero ? "0 18px 34px -24px rgba(61,43,22,0.58)" : "0 0 25px rgba(78,240,255,0.18)",
                        ],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="relative h-10 w-10">
                        <span className={`absolute left-1 top-3 h-3 w-3 rounded-full border-2 ${lightHero ? "border-[#10172d]/80" : "border-white/80"}`} />
                        <span className={`absolute right-1 top-1 h-3 w-3 rounded-full border-2 ${lightHero ? "border-[#10172d]/80" : "border-white/80"}`} />
                        <span className={`absolute right-1 bottom-1 h-3 w-3 rounded-full border-2 ${lightHero ? "border-[#10172d]/80" : "border-white/80"}`} />
                        <span className={`absolute left-4 top-5 h-px w-5 rotate-[-35deg] ${lightHero ? "bg-[#10172d]/70" : "bg-white/70"}`} />
                        <span className={`absolute left-4 top-5 h-px w-5 rotate-[35deg] ${lightHero ? "bg-[#10172d]/70" : "bg-white/70"}`} />
                      </div>
                    </motion.div>

                    {[
                      { key: "chart", className: "right-[18%] top-[52px]", Icon: BarChart3 },
                      { key: "folder", className: "right-[18%] bottom-[42px]", Icon: Folder },
                    ].map(({ key, className, Icon }, index) => (
                      <motion.div
                        key={`blueprint-output-card-${key}`}
                        className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl border ${className} ${
                          lightHero
                            ? "border-[#10172d]/55 bg-[#fbf8f1]/78 text-[#10172d]/70 shadow-[0_14px_28px_-22px_rgba(61,43,22,0.5)]"
                            : "border-[#4EF0FF]/25 bg-[#4EF0FF]/10 text-white/70"
                        }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3 + index * 0.45, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                    ))}

                    {[
                      { key: "gear-top", className: "right-3 top-1", Icon: Settings, delay: 0 },
                      { key: "gear-mid", className: "right-3 top-[54px]", Icon: Settings, delay: 0.15 },
                      { key: "chip", className: "right-3 top-[107px]", Icon: Cpu, delay: 0.3 },
                      { key: "activity", className: "right-3 top-[160px]", Icon: Activity, delay: 0.45 },
                      { key: "blank", className: "right-3 bottom-0", Icon: null, delay: 0.6 },
                    ].map(({ key, className, Icon, delay }) => (
                      <motion.div
                        key={`blueprint-output-circle-${key}`}
                        className={`absolute flex h-12 w-12 items-center justify-center rounded-full border ${className} ${
                          lightHero
                            ? "border-[#10172d]/42 bg-[#fbf8f1]/44 text-[#10172d]/18"
                            : "border-white/20 bg-white/[0.05] text-white/18"
                        }`}
                        animate={{ opacity: [0.5, 0.9, 0.5], y: [0, -4, 0] }}
                        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
                      >
                        {Icon ? <Icon className="h-7 w-7" /> : null}
                      </motion.div>
                    ))}
                    <svg
                      viewBox="0 0 820 360"
                      className="absolute inset-0 z-20 h-full w-full"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                    >
                      <defs>
                        <marker
                          id="blueprint-reference-arrow"
                          markerWidth="9"
                          markerHeight="9"
                          refX="7"
                          refY="4.5"
                          orient="auto"
                          markerUnits="strokeWidth"
                        >
                          <path
                            d="M0 0 L9 4.5 L0 9 Z"
                            fill={lightHero ? "rgba(154,104,71,0.78)" : "rgba(172,160,251,0.88)"}
                          />
                        </marker>
                        <filter id="blueprint-reference-shadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="rgba(61,43,22,0.20)" />
                        </filter>
                      </defs>

                      <rect
                        x="0"
                        y="0"
                        width="820"
                        height="360"
                        rx="24"
                        fill={lightHero ? "#f5efe3" : "#080b22"}
                      />
                      <rect
                        x="0"
                        y="0"
                        width="820"
                        height="360"
                        rx="24"
                        fill={lightHero ? "url(#blueprint-reference-warm)" : "transparent"}
                      />
                      <defs>
                        <radialGradient id="blueprint-reference-warm" cx="42%" cy="36%" r="78%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.82)" />
                          <stop offset="54%" stopColor="rgba(255,255,255,0.18)" />
                          <stop offset="100%" stopColor="rgba(154,104,71,0.12)" />
                        </radialGradient>
                      </defs>

                      <g opacity="0.24">
                        <path d="M612 -12 V28 Q612 46 630 46 H742" fill="none" stroke={lightHero ? "#d8c7aa" : "rgba(255,255,255,0.24)"} strokeWidth="1.5" />
                        <path d="M674 -10 V32 Q674 54 696 54 H808" fill="none" stroke={lightHero ? "#d8c7aa" : "rgba(255,255,255,0.24)"} strokeWidth="1.5" />
                        <path d="M708 -5 H808" fill="none" stroke={lightHero ? "#d8c7aa" : "rgba(255,255,255,0.18)"} strokeWidth="1.5" />
                      </g>

                      {[
                        "M108 78 C160 78 178 112 170 145 C166 164 188 176 220 176",
                        "M108 176 H220",
                        "M108 278 C160 278 178 234 170 208 C166 190 188 176 220 176",
                      ].map((path, index) => (
                        <motion.path
                          key={`reference-input-flow-${index}`}
                          d={path}
                          fill="none"
                          stroke={lightHero ? "rgba(154,104,71,0.60)" : "rgba(172,160,251,0.62)"}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray="14 18"
                          markerEnd="url(#blueprint-reference-arrow)"
                          animate={{ strokeDashoffset: [0, -64] }}
                          transition={{ duration: 4.4 + index * 0.22, repeat: Infinity, ease: "linear" }}
                        />
                      ))}

                      {[
                        "M316 176 H390",
                        "M510 176 C548 176 540 106 580 106",
                        "M510 176 C548 176 540 256 580 256",
                        "M668 92 C704 78 694 44 716 44",
                        "M668 116 H716",
                        "M668 242 C704 232 694 176 716 176",
                        "M668 256 H716",
                        "M668 270 C704 288 694 316 716 316",
                      ].map((path, index) => (
                        <motion.path
                          key={`reference-output-flow-${index}`}
                          d={path}
                          fill="none"
                          stroke={lightHero ? "rgba(16,23,45,0.48)" : "rgba(78,240,255,0.62)"}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray="14 18"
                          markerEnd={index < 3 ? "url(#blueprint-reference-arrow)" : undefined}
                          animate={{ strokeDashoffset: [0, -64] }}
                          transition={{ duration: 4 + index * 0.12, repeat: Infinity, ease: "linear" }}
                        />
                      ))}

                      {[78, 176, 278].map((cy, index) => (
                        <motion.g
                          key={`reference-input-node-${cy}`}
                          animate={{ opacity: [0.5, 0.88, 0.5] }}
                          transition={{ duration: 3.3, repeat: Infinity, delay: index * 0.2 }}
                        >
                          <rect
                            x="22"
                            y={cy - 43}
                            width="86"
                            height="86"
                            rx="22"
                            fill={lightHero ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.04)"}
                            stroke={lightHero ? "rgba(216,199,170,0.28)" : "rgba(255,255,255,0.12)"}
                          />
                          <circle
                            cx="65"
                            cy={cy}
                            r="18"
                            fill="none"
                            stroke={lightHero ? "rgba(154,104,71,0.76)" : "rgba(228,76,255,0.72)"}
                            strokeWidth="9"
                          />
                        </motion.g>
                      ))}

                      <motion.g
                        filter="url(#blueprint-reference-shadow)"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <rect
                          x="220"
                          y="128"
                          width="96"
                          height="96"
                          rx="24"
                          fill={lightHero ? "rgba(251,248,241,0.84)" : "rgba(255,255,255,0.08)"}
                          stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.38)"}
                          strokeWidth="2.5"
                        />
                        <rect x="248" y="154" width="38" height="8" rx="4" fill={lightHero ? "rgba(16,23,45,0.44)" : "rgba(255,255,255,0.55)"} />
                        <rect x="248" y="174" width="58" height="8" rx="4" fill={lightHero ? "rgba(16,23,45,0.34)" : "rgba(255,255,255,0.45)"} />
                        <rect x="248" y="194" width="40" height="8" rx="4" fill={lightHero ? "rgba(16,23,45,0.36)" : "rgba(255,255,255,0.48)"} />
                      </motion.g>

                      <motion.g
                        filter="url(#blueprint-reference-shadow)"
                        animate={{ scale: [1, 1.04, 1], transformOrigin: "450px 176px" }}
                        transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <rect
                          x="390"
                          y="116"
                          width="120"
                          height="120"
                          rx="26"
                          fill={lightHero ? "rgba(154,104,71,0.16)" : "rgba(78,240,255,0.16)"}
                          stroke={lightHero ? "rgba(255,255,255,0.42)" : "rgba(78,240,255,0.46)"}
                        />
                        <circle cx="431" cy="176" r="11" fill="none" stroke={lightHero ? "rgba(16,23,45,0.88)" : "rgba(255,255,255,0.88)"} strokeWidth="4" />
                        <circle cx="470" cy="153" r="11" fill="none" stroke={lightHero ? "rgba(16,23,45,0.88)" : "rgba(255,255,255,0.88)"} strokeWidth="4" />
                        <circle cx="470" cy="199" r="11" fill="none" stroke={lightHero ? "rgba(16,23,45,0.88)" : "rgba(255,255,255,0.88)"} strokeWidth="4" />
                        <path d="M440 172 L461 158 M440 181 L461 195 M454 164 L446 188" stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.72)"} strokeWidth="3" strokeLinecap="round" />
                      </motion.g>

                      {[
                        { y: 66, kind: "chart" },
                        { y: 216, kind: "folder" },
                      ].map(({ y, kind }, index) => (
                        <motion.g
                          key={`reference-output-card-${kind}`}
                          filter="url(#blueprint-reference-shadow)"
                          animate={{ scale: [1, 1.035, 1], transformOrigin: `624px ${y + 44}px` }}
                          transition={{ duration: 3.2 + index * 0.32, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <rect
                            x="580"
                            y={y}
                            width="88"
                            height="88"
                            rx="22"
                            fill={lightHero ? "rgba(251,248,241,0.78)" : "rgba(255,255,255,0.08)"}
                            stroke={lightHero ? "rgba(16,23,45,0.68)" : "rgba(255,255,255,0.38)"}
                            strokeWidth="2.5"
                          />
                          {kind === "chart" ? (
                            <>
                              <rect x="604" y="112" width="10" height="24" rx="4" fill="none" stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.72)"} strokeWidth="4" />
                              <rect x="622" y="94" width="10" height="42" rx="4" fill="none" stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.72)"} strokeWidth="4" />
                              <rect x="640" y="80" width="10" height="56" rx="4" fill="none" stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.72)"} strokeWidth="4" />
                            </>
                          ) : (
                            <path d="M604 257 H650 V288 H598 V246 H619 L626 257 H650" fill="none" stroke={lightHero ? "rgba(16,23,45,0.72)" : "rgba(255,255,255,0.72)"} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                          )}
                        </motion.g>
                      ))}

                      {[
                        { cy: 44, kind: "gear" },
                        { cy: 116, kind: "gear" },
                        { cy: 176, kind: "chip" },
                        { cy: 256, kind: "spiral" },
                        { cy: 316, kind: "blank" },
                      ].map(({ cy, kind }, index) => (
                        <motion.g
                          key={`reference-output-circle-${kind}-${cy}`}
                          animate={{ opacity: [0.54, 0.9, 0.54] }}
                          transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.16 }}
                        >
                          <circle
                            cx="748"
                            cy={cy}
                            r="32"
                            fill={lightHero ? "rgba(251,248,241,0.44)" : "rgba(255,255,255,0.05)"}
                            stroke={lightHero ? "rgba(16,23,45,0.48)" : "rgba(255,255,255,0.24)"}
                            strokeWidth="2.5"
                          />
                          {kind === "gear" && (
                            <>
                              <circle cx="748" cy={cy} r="11" fill="none" stroke={lightHero ? "rgba(16,23,45,0.13)" : "rgba(255,255,255,0.16)"} strokeWidth="4" />
                              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                <line
                                  key={angle}
                                  x1="748"
                                  y1={cy - 23}
                                  x2="748"
                                  y2={cy - 17}
                                  stroke={lightHero ? "rgba(16,23,45,0.11)" : "rgba(255,255,255,0.14)"}
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  transform={`rotate(${angle} 748 ${cy})`}
                                />
                              ))}
                            </>
                          )}
                          {kind === "chip" && (
                            <>
                              <rect x="736" y={cy - 12} width="24" height="24" rx="3" fill="none" stroke={lightHero ? "rgba(16,23,45,0.16)" : "rgba(255,255,255,0.18)"} strokeWidth="4" />
                              <rect x="742" y={cy - 6} width="12" height="12" rx="2" fill={lightHero ? "rgba(16,23,45,0.08)" : "rgba(255,255,255,0.10)"} />
                            </>
                          )}
                          {kind === "spiral" && (
                            <path
                              d={`M748 ${cy} m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0 M748 ${cy} m-9 0 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0`}
                              fill="none"
                              stroke={lightHero ? "rgba(16,23,45,0.12)" : "rgba(255,255,255,0.14)"}
                              strokeWidth="3"
                              strokeDasharray="2 4"
                            />
                          )}
                        </motion.g>
                      ))}
                    </svg>
                  </div>

                  <div
                    className={`mt-10 text-base leading-relaxed ${
                      lightHero ? "text-[#25304a]/78" : "text-white/72"
                    }`}
                    style={{ color: lightHeroMutedInk }}
                  >
                    <motion.div
                      key={`next-step-${contactScale}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 }}
                      className={`rounded-2xl border px-5 py-4 ${
                        lightHero
                          ? "border-[#d8c7aa]/60 bg-white/62"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs font-bold uppercase tracking-[0.18em] ${
                          lightHero ? "text-[#9A6847]" : "text-[#E44CFF]"
                        }`}
                        style={{ color: lightHero ? "#9A6847" : undefined }}
                      >
                        {t("contact.configurator.nextStepLabel")}
                      </p>
                      <p>
                        <span
                          className={`font-semibold ${
                            lightHero ? "text-[#10172d]" : "text-white"
                          }`}
                          style={{ color: lightHeroInk }}
                        >
                          {selectedScaleLabel}:
                        </span>{" "}
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
                disabled={contactSubmitStatus === "sending"}
                className="group relative inline-flex min-h-16 items-center justify-center gap-3 overflow-hidden rounded-2xl px-10 text-lg font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_45px_var(--theme-glow)] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
                style={primaryCtaStyle}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {contactSubmitStatus === "sending"
                    ? t("contact.configurator.status.sending")
                    : t("contact.configurator.submit")}
                  <ArrowRight className="h-6 w-6 -rotate-45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-[225deg]" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
            {contactSubmitStatus !== "idle" && contactSubmitStatus !== "sending" && (
              <p
                aria-live="polite"
                className={`text-center text-sm font-semibold ${
                  lightHero ? "text-[#25304a]/78" : "text-white/72"
                }`}
                style={{ color: lightHeroMutedInk }}
              >
                {contactSubmitStatus === "sent"
                  ? t("contact.configurator.status.sent")
                  : t("contact.configurator.status.fallback")}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 overflow-hidden px-6 pb-12 pt-20 md:pt-24 ${
          lightHero ? "bg-[#f7f3ea]" : ""
        }`}
      >
        {lightHero && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,255,255,0.68),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(154,104,71,0.12),transparent_34%),linear-gradient(180deg,#f7f3ea_0%,#f5efe3_100%)]" />
            <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />
          </>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: lightHero
              ? "linear-gradient(90deg, transparent, rgba(154,104,71,0.32), rgba(20,33,67,0.20), transparent)"
              : "linear-gradient(90deg, transparent, rgba(228,76,255,0.28), rgba(78,240,255,0.2), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.9fr_0.8fr]">
            <div>
              <p
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.kicker")}
              </p>
              <h2
                className={`max-w-xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl ${
                  lightHero ? "text-[#10172d]" : "text-white"
                }`}
                style={{ color: lightHeroInk }}
              >
                {t("footer.headline")}
              </h2>

              <a
                href="#contact"
                className="group relative mt-10 inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-base font-semibold text-white transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_var(--theme-glow)]"
                style={primaryCtaStyle}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {t("footer.cta")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>

              <div className="mt-12">
                <p
                  className={`mb-4 text-sm font-bold uppercase tracking-[0.18em] ${
                    lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                  }`}
                  style={{ color: lightHero ? "#9A6847" : undefined }}
                >
                  {t("footer.emailLabel")}
                </p>
                <div
                  className={`inline-flex min-h-14 max-w-full items-center gap-3 rounded-full border px-5 backdrop-blur-md ${
                    lightHero
                      ? "border-[#d8c7aa]/60 bg-white/68 text-[#10172d] shadow-[0_14px_30px_-22px_rgba(61,43,22,0.62)]"
                      : "border-white/10 bg-white/[0.06] text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.03)]"
                  }`}
                  style={{ color: lightHeroInk }}
                >
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
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                      lightHero
                        ? "border-[#c6ad89]/55 bg-[#f5efe3]/72 text-[#10172d] hover:bg-white"
                        : "border-white/10 bg-white/[0.04] text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <nav aria-label="Footer quick links" className="lg:pt-2">
              <h3
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-5">
                {footerQuickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/[0.82] hover:text-[#4EF0FF]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer information links" className="lg:pt-2">
              <h3
                className={`mb-6 text-sm font-bold uppercase tracking-[0.18em] ${
                  lightHero ? "text-[#9A6847]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#9A6847" : undefined }}
              >
                {t("footer.information")}
              </h3>
              <ul className="space-y-5">
                {footerInfoLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-lg font-medium transition-colors duration-200 ${
                        lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/[0.82] hover:text-[#4EF0FF]"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={`mt-24 border-t pt-12 ${lightHero ? "border-[#c6ad89]/40" : "border-white/10"}`}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <p
                className={`text-sm font-semibold uppercase tracking-[0.12em] ${
                  lightHero ? "text-[#6f604f]" : "text-[#ACA0FB]"
                }`}
                style={{ color: lightHero ? "#6f604f" : undefined }}
              >
                {t("footer.copyright")}
              </p>

              <div className="flex items-center gap-5">
                {footerSocialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`transition-colors duration-200 ${
                      lightHero ? "text-[#25304a]/78 hover:text-[#9A6847]" : "text-white/88 hover:text-[#4EF0FF]"
                    }`}
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
      <Chatbot activeMode={mode} onModeChange={setMode} lightMode={lightHero} />

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
