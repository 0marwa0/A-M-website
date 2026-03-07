"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
    {
        num: "01",
        name: "Discovery",
        subtitle: "Step 1 — Understanding Your Needs",
        text: "Initial meetings to understand client needs in detail. We learn about your business goals, pain points, and existing infrastructure to craft the perfect AI strategy.",
        color: "#7B4CFF",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M11 8v3l2 2M21 21l-3.5-3.5" />
            </svg>
        ),
    },
    {
        num: "02",
        name: "Planning",
        subtitle: "Step 2 — Architecture & Roadmap",
        text: "Solution architecture, wireframes and technical planning. We design a detailed roadmap covering system design, data pipelines, and integration checkpoints.",
        color: "#8B56FF",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path strokeLinecap="round" d="M8 2v4M16 2v4M3 10h18M8 14h4M8 17h6" />
            </svg>
        ),
    },
    {
        num: "03",
        name: "Development",
        subtitle: "Step 3 — Building Your Solution",
        text: "Build custom AI solutions tailored to your needs. Our engineers develop, train, and iterate on models and integrations using the latest AI frameworks.",
        color: "#5861F2",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3M12 7l-2 10" />
            </svg>
        ),
    },
    {
        num: "04",
        name: "Testing / QA",
        subtitle: "Step 4 — Quality Assurance",
        text: "Quality assurance before deployment. We rigorously test every component — from model accuracy and edge-cases to performance, security, and reliability at scale.",
        color: "#5BA8F7",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M9 12l2 2 4-4M12 3a9 9 0 100 18A9 9 0 0012 3z" />
            </svg>
        ),
    },
    {
        num: "05",
        name: "Training",
        subtitle: "Step 5 — Onboarding Your Team",
        text: "User onboarding and training sessions. We empower your team with hands-on training, documentation, and guided walkthroughs so everyone can use AI confidently.",
        color: "#4ECFFC",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14v7M5.5 11v5a7 7 0 0013 0v-5" />
            </svg>
        ),
    },
    {
        num: "06",
        name: "Support",
        subtitle: "Step 6 — Continuous Improvement",
        text: "Ongoing support after deployment. Our team provides continuous monitoring, updates, and improvements — ensuring your AI solution evolves alongside your business.",
        color: "#4EF0FF",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" d="M18.364 5.636A9 9 0 105.636 18.364 9 9 0 0018.364 5.636zM12 8v4l3 3" />
            </svg>
        ),
    },
];

// ─── Per-step layout on the road ─────────────────────────────────────────────
// cx/cy = center of the milestone circle on the SVG road
// labelSide: "above" | "below" — which side the label card pops out
// These values were tuned to the winding SVG road path below.
const MILESTONE_POSITIONS = [
    { cx: 110, cy: 290, labelSide: "above" as const },
    { cx: 290, cy: 355, labelSide: "below" as const },
    { cx: 500, cy: 470, labelSide: "above" as const },
    { cx: 700, cy: 345, labelSide: "below" as const },
    { cx: 880, cy: 220, labelSide: "above" as const },
    { cx: 1050, cy: 300, labelSide: "below" as const },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function RoadmapProcess() {
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="relative w-full overflow-x-auto overflow-y-visible select-none">
            {/* ── SVG road ── */}
            <svg
                viewBox="0 0 1160 560"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-auto"
                style={{ minWidth: 700 }}
            >
                <defs>
                    {/* Purple→cyan gradient for road fill */}
                    <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1a1035" />
                        <stop offset="50%" stopColor="#0d1a4a" />
                        <stop offset="100%" stopColor="#051828" />
                    </linearGradient>

                    {/* Glow filter per step */}
                    {STEPS.map((s, i) => (
                        <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    ))}

                    {/* Road edge gradient (dark outer edge) */}
                    <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2a1e5c" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0a0f2e" stopOpacity="0.9" />
                    </linearGradient>
                </defs>

                {/* ── Winding road path – S-curve with shoulder + centerline ── */}
                {/* Road shoulder (wider, darker) */}
                <path
                    d="M 20,340 C 80,340 100,290 160,280 C 220,270 270,330 330,350
             C 390,370 430,430 500,460 C 570,490 620,410 680,370
             C 740,330 790,240 860,210 C 920,185 980,250 1040,280
             C 1080,300 1110,300 1140,300"
                    fill="none"
                    stroke="#16215e"
                    strokeWidth="80"
                    strokeLinecap="round"
                />
                {/* Road body */}
                <path
                    d="M 20,340 C 80,340 100,290 160,280 C 220,270 270,330 330,350
             C 390,370 430,430 500,460 C 570,490 620,410 680,370
             C 740,330 790,240 860,210 C 920,185 980,250 1040,280
             C 1080,300 1110,300 1140,300"
                    fill="none"
                    stroke="#1c2a6e"
                    strokeWidth="58"
                    strokeLinecap="round"
                />
                {/* Road surface sheen */}
                <path
                    d="M 20,340 C 80,340 100,290 160,280 C 220,270 270,330 330,350
             C 390,370 430,430 500,460 C 570,490 620,410 680,370
             C 740,330 790,240 860,210 C 920,185 980,250 1040,280
             C 1080,300 1110,300 1140,300"
                    fill="none"
                    stroke="#232e80"
                    strokeWidth="54"
                    strokeLinecap="round"
                    strokeOpacity="0.6"
                />

                {/* Dashed centerline — white dashes */}
                <path
                    d="M 20,340 C 80,340 100,290 160,280 C 220,270 270,330 330,350
             C 390,370 430,430 500,460 C 570,490 620,410 680,370
             C 740,330 790,240 860,210 C 920,185 980,250 1040,280
             C 1080,300 1110,300 1140,300"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2"
                    strokeDasharray="18 14"
                    strokeLinecap="round"
                />

                {/* ── Connector stems – vertical line from road dot to label ── */}
                {MILESTONE_POSITIONS.map((pos, i) => {
                    const stemLen = 54;
                    const y2 = pos.labelSide === "above" ? pos.cy - stemLen : pos.cy + stemLen;
                    return (
                        <line
                            key={i}
                            x1={pos.cx} y1={pos.cy}
                            x2={pos.cx} y2={y2}
                            stroke={STEPS[i].color}
                            strokeWidth="2"
                            strokeDasharray="4 3"
                            opacity="0.7"
                        />
                    );
                })}

                {/* ── Road milestone dots (small filled circles on the road) ── */}
                {MILESTONE_POSITIONS.map((pos, i) => (
                    <circle
                        key={i}
                        cx={pos.cx}
                        cy={pos.cy}
                        r="9"
                        fill={STEPS[i].color}
                        opacity="0.9"
                        style={{ filter: `drop-shadow(0 0 8px ${STEPS[i].color})` }}
                    />
                ))}

                {/* ── Milestone circles (icon + number ring) – rendered in SVG foreignObject ── */}
                {MILESTONE_POSITIONS.map((pos, i) => {
                    const R = 34;
                    const stemLen = 54;
                    const isAbove = pos.labelSide === "above";
                    const circleY = isAbove ? pos.cy - stemLen - R : pos.cy + stemLen + R;
                    const isHovered = active === i;

                    return (
                        <g key={i}>
                            {/* Outer glow ring */}
                            <circle
                                cx={pos.cx}
                                cy={circleY}
                                r={R + 8}
                                fill="none"
                                stroke={STEPS[i].color}
                                strokeWidth="1.5"
                                opacity={isHovered ? 0.7 : 0.25}
                                style={{ transition: "opacity 0.3s" }}
                            />
                            {/* Main circle */}
                            <circle
                                cx={pos.cx}
                                cy={circleY}
                                r={R}
                                fill={`${STEPS[i].color}22`}
                                stroke={STEPS[i].color}
                                strokeWidth="2.5"
                                style={{
                                    filter: isHovered ? `drop-shadow(0 0 16px ${STEPS[i].color})` : undefined,
                                    cursor: "pointer",
                                    transition: "filter 0.3s",
                                }}
                                onClick={() => setActive(active === i ? null : i)}
                                onMouseEnter={() => setActive(i)}
                                onMouseLeave={() => setActive(null)}
                            />

                            {/* Number badge */}
                            <text
                                x={pos.cx}
                                y={circleY - R / 2 + 5}
                                textAnchor="middle"
                                fontSize="9"
                                fontWeight="700"
                                fill={STEPS[i].color}
                                opacity="0.8"
                            >
                                {STEPS[i].num}
                            </text>

                            {/* Icon area – use foreignObject for React SVG nodes */}
                            <foreignObject
                                x={pos.cx - 16}
                                y={circleY - 10}
                                width="32"
                                height="32"
                                style={{ pointerEvents: "none" }}
                            >
                                <div
                                    style={{ color: STEPS[i].color }}
                                    className="flex items-center justify-center w-8 h-8"
                                >
                                    {STEPS[i].icon}
                                </div>
                            </foreignObject>

                            {/* Step name label */}
                            <text
                                x={pos.cx}
                                y={isAbove ? circleY - R - 12 : circleY + R + 16}
                                textAnchor="middle"
                                fontSize="11"
                                fontWeight="700"
                                fill={STEPS[i].color}
                                style={{ letterSpacing: "0.04em" }}
                            >
                                {STEPS[i].name}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* ── Detail cards – rendered outside SVG so they overflow cleanly ── */}
            <AnimatePresence>
                {active !== null && (
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="mx-auto mt-2 max-w-lg rounded-2xl border px-7 py-6"
                        style={{
                            background: "rgba(10,12,40,0.92)",
                            backdropFilter: "blur(20px)",
                            borderColor: `${STEPS[active].color}44`,
                            boxShadow: `0 0 40px ${STEPS[active].color}22, 0 0 0 1px ${STEPS[active].color}22`,
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${STEPS[active].color}22`,
                                    border: `1.5px solid ${STEPS[active].color}66`,
                                    color: STEPS[active].color,
                                }}
                            >
                                {STEPS[active].icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">{STEPS[active].name}</h3>
                                <p className="text-xs text-gray-400">{STEPS[active].subtitle}</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div
                            className="h-px w-full mb-4 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${STEPS[active].color}44, transparent)` }}
                        />

                        {/* Body */}
                        <p className="text-sm text-gray-300 leading-relaxed">{STEPS[active].text}</p>

                        {/* Close hint */}
                        <p className="text-xs text-gray-500 mt-4">Hover another step to explore</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Default state when nothing hovered */}
            {active === null && (
                <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
                    Hover any milestone to explore the step
                </p>
            )}
        </div>
    );
}
