"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnimatedTestimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
    /** Optional accent colour per card (defaults to purple). */
    accent?: string;
};

// ─── Core component ───────────────────────────────────────────────────────────

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = true,
}: {
    testimonials: AnimatedTestimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [autoplay, handleNext]);

    const isActive = (index: number) => index === active;

    /** Stable per-index rotation so it doesn't re-randomise on every render. */
    const rotationForIndex = (index: number) => {
        const rotations = [-6, 4, -3, 7, -5, 3, -8, 6];
        return `${rotations[index % rotations.length]}deg`;
    };

    const accent = testimonials[active]?.accent ?? "#7B4CFF";

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
            <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 items-center">

                {/* ── Image stack ─────────────────────────────────────────────────── */}
                <div className="flex items-center justify-center">
                    <div className="relative h-80 w-full max-w-xs">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{ opacity: 0, scale: 0.9, y: 50, rotate: rotationForIndex(index) }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.45,
                                        scale: isActive(index) ? 1 : 0.9,
                                        y: isActive(index) ? 0 : 24,
                                        zIndex: isActive(index)
                                            ? testimonials.length + 1
                                            : testimonials.length - Math.abs(index - active),
                                        rotate: isActive(index) ? "0deg" : rotationForIndex(index),
                                    }}
                                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                                    transition={{ duration: 0.55, ease: "easeInOut" }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    {/* Glow ring behind active image */}
                                    {isActive(index) && (
                                        <div
                                            className="absolute inset-0 rounded-3xl pointer-events-none"
                                            style={{
                                                boxShadow: `0 0 60px ${accent}55, 0 0 20px ${accent}33`,
                                                transition: "box-shadow 0.6s ease",
                                            }}
                                        />
                                    )}
                                    <img
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover"
                                        style={{
                                            border: isActive(index)
                                                ? `2px solid ${accent}99`
                                                : "2px solid rgba(88,97,242,0.15)",
                                            transition: "border-color 0.55s ease",
                                        }}
                                        onError={(e) => {
                                            e.currentTarget.src = `https://placehold.co/500x500/0e1126/7B4CFF?text=${encodeURIComponent(
                                                testimonial.name.charAt(0)
                                            )}`;
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Text & controls ──────────────────────────────────────────────── */}
                <div className="flex flex-col justify-center py-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="flex flex-col gap-4"
                        >
                            {/* Quote mark */}
                            <span
                                className="text-5xl font-black leading-none select-none"
                                style={{
                                    background: `linear-gradient(90deg, ${accent}, #4EF0FF)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                "
                            </span>

                            {/* Quote text */}
                            <p className="text-lg leading-relaxed text-gray-300">
                                {testimonials[active].quote}
                            </p>

                            {/* Divider */}
                            <div
                                className="h-px w-12 rounded-full mt-2"
                                style={{
                                    background: `linear-gradient(90deg, ${accent}, #4EF0FF)`,
                                }}
                            />

                            {/* Name + designation */}
                            <div>
                                <h3
                                    className="text-xl font-bold"
                                    style={{
                                        background: `linear-gradient(90deg, ${accent}, #4EF0FF)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {testimonials[active].name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-0.5">
                                    {testimonials[active].designation}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center gap-4 mt-10">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous"
                            className="group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                                background: "rgba(16,19,42,0.85)",
                                border: "2px solid rgba(88,97,242,0.35)",
                                color: "#ACA0FB",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(88,97,242,0.3)";
                                (e.currentTarget as HTMLElement).style.borderColor = "#7B4CFF";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(16,19,42,0.85)";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(88,97,242,0.35)";
                            }}
                        >
                            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className="rounded-full transition-all duration-300 focus:outline-none"
                                    style={{
                                        width: i === active ? 28 : 8,
                                        height: 8,
                                        background:
                                            i === active
                                                ? `linear-gradient(90deg, ${accent}, #4EF0FF)`
                                                : "rgba(88,97,242,0.3)",
                                        boxShadow: i === active ? `0 0 8px ${accent}99` : "none",
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            aria-label="Next"
                            className="group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                                background: "rgba(16,19,42,0.85)",
                                border: "2px solid rgba(88,97,242,0.35)",
                                color: "#ACA0FB",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(88,97,242,0.3)";
                                (e.currentTarget as HTMLElement).style.borderColor = "#7B4CFF";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "rgba(16,19,42,0.85)";
                                (e.currentTarget as HTMLElement).style.borderColor = "rgba(88,97,242,0.35)";
                            }}
                        >
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
