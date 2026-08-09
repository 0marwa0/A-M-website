"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PersonaMode } from "./Chatbot";
import { Cpu, Activity } from "lucide-react";

interface InteractiveHUDProps {
  mode: PersonaMode;
  lightMode?: boolean;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function InteractiveHUD({ mode, lightMode = false }: InteractiveHUDProps) {
  const { locale, t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [logs, setLogs] = useState<string[]>([]);
  const [efficiency, setEfficiency] = useState(89);

  // Mode dependent colors
  const getThemeColors = () => {
    if (lightMode) {
      return {
        primary: "rgba(20, 33, 67, 0.78)",
        secondary: "rgba(178, 122, 79, 0.62)",
        primaryHex: "#142143",
        secondaryHex: "#B27A4F",
        glow: "rgba(20, 33, 67, 0.14)",
      };
    }

    switch (mode) {
      case "creative":
        return {
          primary: "rgba(228, 76, 255, 0.85)",
          secondary: "rgba(123, 76, 255, 0.6)",
          primaryHex: "#E44CFF",
          secondaryHex: "#7B4CFF",
          glow: "rgba(228, 76, 255, 0.25)",
        };
      case "precise":
        return {
          primary: "rgba(78, 240, 255, 0.85)",
          secondary: "rgba(16, 185, 129, 0.6)",
          primaryHex: "#4EF0FF",
          secondaryHex: "#10B981",
          glow: "rgba(78, 240, 255, 0.25)",
        };
      case "balanced":
      default:
        return {
          primary: "rgba(78, 240, 255, 0.85)",
          secondary: "rgba(228, 76, 255, 0.6)",
          primaryHex: "#4EF0FF",
          secondaryHex: "#E44CFF",
          glow: "rgba(78, 240, 255, 0.2)",
        };
    }
  };

  const colors = getThemeColors();
  const lightPrimaryText = lightMode ? "rgba(23, 33, 58, 0.78)" : undefined;
  const lightMutedText = lightMode ? "rgba(40, 52, 79, 0.68)" : undefined;
  const lightAccentText = lightMode ? "#9A6847" : undefined;

  // Dynamic log updates
  useEffect(() => {
    const logPool = [
      "[SYS] AI Model initialized successfully.",
      "[SYS] Connection established with neural pipeline.",
      "[LLM] Context optimized: 120k tokens active.",
      "[SYS] Latency stabilized at 14ms.",
      "[AGENT] User request resolved autonomously.",
      "[STATS] Predictive model accuracy: 99.4%.",
      "[SYS] Memory buffer garbage collection complete.",
      "[LLM] Vector space database sync successful.",
      "[SYS] Thread pooling scaled to 16 virtual nodes.",
      "[AGENT] Task pipeline executed in 1.4s.",
    ];

    // Seed initial logs
    setLogs([
      logPool[0],
      logPool[1],
      logPool[2],
    ]);

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const timestamp = new Date().toLocaleTimeString().split(" ")[0];
      setLogs((prev) => [`[${timestamp}] ${randomLog.substring(6)}`, ...prev.slice(0, 4)]);
      
      // Update efficiency score randomly
      setEfficiency((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(85, Math.min(99, next));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Network node animations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width = 400;
    let height = canvas.height = 400;
    const nodes: Node[] = [];
    const nodeCount = 32;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: 1.5 + Math.random() * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodeCount; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.25;
            ctx.strokeStyle = lightMode
              ? `rgba(20, 33, 67, ${alpha})`
              : mode === "creative"
              ? `rgba(228, 76, 255, ${alpha})`
              : mode === "precise"
              ? `rgba(78, 240, 255, ${alpha})`
              : `rgba(88, 97, 242, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      if (mouseRef.current.active) {
        ctx.lineWidth = 0.8;
        for (const node of nodes) {
          const dist = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.45;
            ctx.strokeStyle = colors.primary.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Pull node slightly towards mouse
            node.vx += (mouseRef.current.x - node.x) * 0.0003;
            node.vy += (mouseRef.current.y - node.y) * 0.0003;
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        // Update positions
        node.x += node.vx;
        node.y += node.vy;

        // Friction to prevent infinite acceleration from mouse pull
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = colors.primary;
        ctx.shadowBlur = 4;
        ctx.shadowColor = colors.primaryHex;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mode, lightMode, colors.primary, colors.primaryHex, colors.secondary]);

  // Handle mouse movements
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000, active: false };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background canvas for floating network nodes */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-0 rounded-full pointer-events-none ${
          lightMode ? "opacity-55" : "opacity-80"
        }`}
      />

      {/* Futuristic Holographic Rings */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        {/* Outer Ring */}
        <svg className="w-[92%] h-[92%] animate-spin" style={{ animationDuration: "35s" }} viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke={colors.primaryHex}
            strokeWidth="0.5"
            strokeDasharray="6 14 30 10 2 12"
            className="opacity-25"
          />
        </svg>

        {/* Middle reverse-spinning ring */}
        <svg className="absolute w-[80%] h-[80%] animate-spin-reverse" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke={colors.secondaryHex}
            strokeWidth="1"
            strokeDasharray="40 8 100 12 12 18"
            className="opacity-30"
          />
        </svg>

        {/* Fine HUD crosshair ring */}
        <svg className="absolute w-[62%] h-[62%] opacity-15" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="70" fill="none" stroke={lightMode ? "#142143" : "#FFFFFF"} strokeWidth="0.5" strokeDasharray="1 3" />
          <line x1="100" y1="10" x2="100" y2="25" stroke={lightMode ? "#142143" : "#FFFFFF"} strokeWidth="0.75" />
          <line x1="100" y1="175" x2="100" y2="190" stroke={lightMode ? "#142143" : "#FFFFFF"} strokeWidth="0.75" />
          <line x1="10" y1="100" x2="25" y2="100" stroke={lightMode ? "#142143" : "#FFFFFF"} strokeWidth="0.75" />
          <line x1="175" y1="100" x2="190" y2="100" stroke={lightMode ? "#142143" : "#FFFFFF"} strokeWidth="0.75" />
        </svg>
      </div>

      {/* Central Brand Core logo container */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center w-48 h-48 rounded-full border backdrop-blur-xl group cursor-pointer transition-all duration-500 ${
          lightMode
            ? "border-[#d8c7aa]/70 bg-[#fbf8f1]/82 shadow-[0_24px_70px_-34px_rgba(61,43,22,0.58)] hover:border-[#b99268]/70"
            : "border-white/10 bg-[#060816]/75 shadow-[0_0_50px_rgba(6,8,22,0.9)] hover:border-white/20"
        }`}
      >
        {/* Glowing backdrop aura */}
        <div
          className={`absolute inset-0 rounded-full blur-[30px] transition-all duration-700 pointer-events-none ${
            lightMode ? "opacity-20 group-hover:opacity-35" : "opacity-40 group-hover:opacity-75"
          }`}
          style={{
            background: `radial-gradient(circle, ${colors.primaryHex} 0%, ${colors.secondaryHex} 100%)`,
          }}
        />

        <img
          src="/logo.svg"
          alt="Triminds AI Logo"
          className={`w-28 h-28 object-contain relative z-10 transition-transform duration-500 group-hover:scale-108 ${
            lightMode
              ? "filter drop-shadow-[0_14px_20px_rgba(20,33,67,0.18)]"
              : "filter drop-shadow-[0_0_20px_rgba(255,255,255,0.22)]"
          }`}
        />

        <div
          className={`absolute bottom-5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md text-[9px] uppercase tracking-wider ${
            lightMode
              ? "border-[#d1bd9d]/70 bg-white/65 text-[#17213a]/78"
              : "border-white/10 bg-white/5 text-white/80"
          }`}
          style={{ color: lightPrimaryText }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Core AI</span>
        </div>
      </div>

      {/* Floating Widget 1: System Console log (Top Left) */}
      <div 
        className={`absolute top-[8%] -left-[5%] md:-left-[10%] z-30 w-52 p-3.5 rounded-xl border backdrop-blur-md animate-float pointer-events-auto ${
          lightMode
            ? "border-[#d8c7aa]/70 bg-white/78 shadow-[0_18px_38px_-24px_rgba(61,43,22,0.6)]"
            : "border-white/10 bg-[#070b19]/60 shadow-2xl"
        }`}
        style={{ color: lightMutedText }}
        dir="ltr"
      >
        <div
          className={`flex items-center gap-2 mb-2 border-b pb-1.5 ${
            lightMode ? "border-[#d8c7aa]/55" : "border-white/5"
          }`}
        >
          <Cpu className="w-4 h-4" style={{ color: colors.primaryHex }} />
          <span
            className={`text-[10px] uppercase font-bold tracking-widest ${
              lightMode ? "text-[#17213a]/72" : "text-white/70"
            }`}
            style={{ color: lightPrimaryText }}
          >
            Sys_Console
          </span>
        </div>
        <div
          className={`space-y-1.5 text-[8.5px] font-mono leading-relaxed overflow-hidden max-h-[85px] ${
            lightMode ? "text-[#28344f]/62" : "text-white/50"
          }`}
          style={{ color: lightMutedText }}
        >
          {logs.map((log, index) => (
            <div key={index} className="truncate whitespace-nowrap">
              <span
                className={`${lightMode ? "text-[#9A6847]" : "text-emerald-500"} select-none`}
                style={{ color: lightAccentText }}
              >
                &gt;{" "}
              </span>
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Widget 2: Performance metrics (Bottom Right) */}
      <div 
        className={`absolute bottom-[8%] -right-[5%] md:-right-[10%] z-30 w-44 p-3.5 rounded-xl border backdrop-blur-md animate-float pointer-events-auto ${
          lightMode
            ? "border-[#d8c7aa]/70 bg-white/78 shadow-[0_18px_38px_-24px_rgba(61,43,22,0.6)]"
            : "border-white/10 bg-[#070b19]/60 shadow-2xl"
        }`}
        style={{ animationDelay: "-3s", color: lightMutedText }}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" style={{ color: colors.secondaryHex }} />
            <span
              className={`text-[9px] uppercase font-bold tracking-widest ${
                lightMode ? "text-[#17213a]/72" : "text-white/70"
              }`}
              style={{ color: lightPrimaryText }}
            >
              {locale === "ar" ? "الكفاءة" : "Efficiency"}
            </span>
          </div>
          <span
            className={`text-[9px] font-mono ${lightMode ? "text-[#9A6847]" : "text-emerald-400"}`}
            style={{ color: lightAccentText }}
          >
            Live
          </span>
        </div>

        <div className="flex items-baseline gap-1 mt-1">
          <span
            className={`text-2.5xl font-bold font-mono tracking-tight ${
              lightMode ? "text-[#17213a]" : "text-white"
            }`}
            style={{ color: lightMode ? "#17213a" : undefined }}
          >
            {efficiency}%
          </span>
          <span
            className={`text-[8px] font-mono font-semibold ${lightMode ? "text-[#9A6847]" : "text-emerald-400"}`}
            style={{ color: lightAccentText }}
          >
            +1.8%
          </span>
        </div>

        {/* Dynamic bar charts */}
        <div className="flex items-end gap-1.5 h-9 mt-2 pb-1">
          {[40, 65, 50, 75, 60, 85, 95, 70, 90].map((val, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-sm transition-all duration-500"
              style={{
                height: `${val}%`,
                background: idx % 2 === 0 ? colors.primaryHex : colors.secondaryHex,
                opacity: 0.4 + (idx / 10) * 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
