"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
    {
        num: "01",
        key: "discovery",
        name: "Discovery",
        desc: "Deep dive into your business needs & AI potential.",
        accentColor: "#E44CFF",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        num: "02",
        key: "planning",
        name: "Planning",
        desc: "Crafting your custom strategic AI roadmap.",
        accentColor: "#A855F7",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        num: "03",
        key: "development",
        name: "Development",
        desc: "Engineering high-performance custom AI models.",
        accentColor: "#5861F2",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        num: "04",
        key: "testing",
        name: "Testing / QA",
        desc: "Rigorous validation for safety, speed & accuracy.",
        accentColor: "#5BA8F7",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        num: "05",
        key: "training",
        name: "Training",
        desc: "Empowering your team to lead with AI confidently.",
        accentColor: "#4ECFFC",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        num: "06",
        key: "support",
        name: "Support",
        desc: "Continuous monitoring & 24/7 optimization.",
        accentColor: "#4EF0FF",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
type RoadmapProcessProps = {
    lightMode?: boolean;
};

const LIGHT_ACCENTS = ["#142143", "#9A6847", "#213c67", "#8a6640", "#142143", "#9A6847"];

export function RoadmapProcess({ lightMode = false }: RoadmapProcessProps) {
    const { t } = useI18n();

    return (
        <div className={`relative w-full ${lightMode ? "roadmap-light-rm" : ""}`}>
            {/* Animated connecting line — only meaningful once all 6 nodes share a single row */}
            <div className="hidden lg:block" style={{ position: "relative", height: "2px", marginBottom: "0" }}>
                <div
                    style={{
                        position: "absolute",
                        top: "calc(50% + 88px)", // vertically centered with the node circles
                        left: "8.33%",           // aligns with first node center
                        right: "8.33%",          // aligns with last node center
                        height: "2px",
                        background: lightMode ? "rgba(20,33,67,0.14)" : "rgba(255,255,255,0.08)",
                        overflow: "hidden",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "100%",
                            height: "100%",
                            background: lightMode
                                ? "linear-gradient(90deg, transparent, #142143, #9A6847, #213c67, transparent)"
                                : "linear-gradient(90deg, transparent, #E44CFF, #5861F2, #4EF0FF, transparent)",
                            animation: "dataFlow 4s linear infinite",
                        }}
                    />
                </div>
            </div>

            {/* Nodes grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 lg:gap-x-0 relative z-10">
                {STEPS.map((step, i) => {
                    const accentColor = lightMode ? LIGHT_ACCENTS[i] : step.accentColor;
                    const stepTitleKey = `about.steps.${step.key}.title`;
                    const stepDescKey = `about.steps.${step.key}.desc`;
                    const stepName = t(stepTitleKey) !== stepTitleKey ? t(stepTitleKey) : step.name;
                    const stepDesc = t(stepDescKey) !== stepDescKey ? t(stepDescKey) : step.desc;

                    return (
                    <div
                        key={step.num}
                        className="node-container-rm group relative flex flex-col items-center cursor-default"
                        style={{
                            animation: `fadeInUpRM 0.7s ease forwards`,
                            animationDelay: `${i * 0.1 + 0.1}s`,
                            opacity: 0,
                        }}
                    >
                        {/* Glassmorphic circle */}
                        <div
                            className="glass-node-rm w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-5"
                            style={{
                                color: accentColor,
                                willChange: "transform, box-shadow, border-color",
                            }}
                        >
                            {step.icon}
                        </div>

                        {/* Text */}
                        <div className="text-center px-2">
                            <span
                                className="block font-mono text-xs mb-1"
                                style={{ color: accentColor }}
                            >
                                {step.num}
                            </span>
                            <h3 className={`text-sm sm:text-base font-semibold tracking-tight ${lightMode ? "text-[#10172d]" : "text-white"}`}>
                                {stepName}
                            </h3>
                            {/* Always visible on mobile/tablet (stacked); collapses to hover-expand on lg+ (single row) */}
                            <p className={`node-desc-rm text-xs leading-snug ${lightMode ? "text-[#25304a]/72" : "text-slate-400"}`}>
                                {stepDesc}
                            </p>
                        </div>

                        {/* Hover glow behind the circle */}
                        <div
                            className="node-glow-rm"
                            style={{ background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)` }}
                        />
                    </div>
                    );
                })}
            </div>

            {/* Scoped keyframes + hover styles via a <style> tag */}
            <style>{`
        @keyframes fadeInUpRM {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes dataFlow {
          0%   { left: -100%; }
          100% { left:  100%; }
        }

        /* Glass node base */
        .glass-node-rm {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.05);
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
                      box-shadow 0.45s cubic-bezier(0.23, 1, 0.32, 1),
                      border-color 0.45s ease;
          position: relative;
          z-index: 2;
        }

        /* Node hover — lift + glow */
        .node-container-rm:hover .glass-node-rm {
          transform: scale(1.15) translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 22px rgba(99,102,241,0.35);
          border-color: rgba(255,255,255,0.38);
        }

        .roadmap-light-rm .glass-node-rm {
          background: rgba(255, 255, 255, 0.70);
          border-color: rgba(216, 199, 170, 0.72);
          box-shadow: 0 18px 42px -28px rgba(61,43,22,0.75), inset 0 0 0 1px rgba(255,255,255,0.55);
        }

        .roadmap-light-rm .node-container-rm:hover .glass-node-rm {
          box-shadow: 0 24px 54px -30px rgba(61,43,22,0.85), 0 0 22px rgba(154,104,71,0.18);
          border-color: rgba(154,104,71,0.54);
        }

        /* Description: visible by default on mobile/tablet (stacked layout) */
        .node-desc-rm {
          margin-top: 0.4rem;
          transition: max-height 0.4s ease, opacity 0.4s ease, margin-top 0.3s ease;
        }

        /* On lg+ (single-row layout) collapse the description and expand only on hover */
        @media (min-width: 1024px) {
          .node-desc-rm {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            margin-top: 0;
          }

          .node-container-rm:hover .node-desc-rm {
            max-height: 60px;
            opacity: 1;
            margin-top: 0.4rem;
          }
        }

        /* Background glow blob */
        .node-glow-rm {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          border-radius: 50%;
          filter: blur(28px);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
          pointer-events: none;
        }

        .node-container-rm:hover .node-glow-rm {
          opacity: 1;
        }
      `}</style>
        </div>
    );
}
