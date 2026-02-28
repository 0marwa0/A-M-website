"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const PARTICLE_COUNT = 80;

interface Particle {
    x: number;
    y: number;
    r: number;
    alpha: number;
    dx: number;
    dy: number;
}

function ParticleNoise() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const raf = useRef(0);

    const init = useCallback((w: number, h: number) => {
        const arr: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: 0.4 + Math.random() * 1.2,
                alpha: 0.08 + Math.random() * 0.18,
                dx: (Math.random() - 0.5) * 0.15,
                dy: (Math.random() - 0.5) * 0.15,
            });
        }
        particles.current = arr;
    }, []);

    useEffect(() => {
        const cvs = canvasRef.current;
        if (!cvs) return;
        const ctx = cvs.getContext("2d", { alpha: true });
        if (!ctx) return;

        let w = 0,
            h = 0;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            cvs.width = w * dpr;
            cvs.height = h * dpr;
            cvs.style.width = `${w}px`;
            cvs.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!particles.current.length) init(w, h);
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles.current) {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.fill();
            }
            raf.current = requestAnimationFrame(draw);
        };
        raf.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf.current);
            window.removeEventListener("resize", resize);
        };
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] pointer-events-none"
            aria-hidden="true"
        />
    );
}

const ease = [0.16, 1, 0.3, 1] as const;

interface CinematicHeroProps {
    t: (key: string) => any;
    locale: string;
}

export default function CinematicHero({ t, locale }: CinematicHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [splineReady, setSplineReady] = React.useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001,
    });

    const contentY = useTransform(smoothProgress, [0, 1], [0, -120]);
    const splineScale = useTransform(smoothProgress, [0, 0.4], [1, 1.04]);
    const glowOpacity = useTransform(smoothProgress, [0, 0.3], [0.25, 0.45]);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden"
            dir={locale === "ar" ? "rtl" : "ltr"}
        >
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[#050816]" />

            {/* Particle noise */}
            <ParticleNoise />

            {/* Radial glows */}
            <motion.div
                className="absolute z-[2] pointer-events-none"
                style={{
                    width: "min(900px, 90vw)",
                    height: "min(900px, 90vw)",
                    left: "50%",
                    top: "55%",
                    x: "-50%",
                    y: "-50%",
                    opacity: glowOpacity,
                }}
            >
                <div className="absolute inset-0 rounded-full animate-pulse-glow"
                    style={{
                        background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 65%)",
                    }}
                />
                <div className="absolute inset-0 rounded-full animate-pulse-glow-delayed"
                    style={{
                        background: "radial-gradient(circle, rgba(34,211,238,0.30) 0%, transparent 60%)",
                        transform: "scale(1.15)",
                    }}
                />
                <div className="absolute inset-0 rounded-full animate-pulse-glow"
                    style={{
                        background: "radial-gradient(circle, rgba(228,76,255,0.15) 0%, transparent 55%)",
                        transform: "scale(0.8)",
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl mx-auto px-6 pt-24 pb-0"
                style={{ y: contentY }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#E44CFF] to-[#4EF0FF] animate-pulse" />
                        {t("hero.badge.first")} · {t("hero.badge.second")} ·{" "}
                        {t("hero.badge.third")}
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease, delay: 0.25 }}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-5xl"
                >
                    <span className="text-white">{t("hero.heading")} </span>
                    <span className="bg-gradient-to-r from-[#E44CFF] via-[#5861F2] to-[#4EF0FF] bg-clip-text text-transparent">
                        {t("hero.headingHighlight")}
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.5 }}
                    className="mt-6 text-base md:text-lg lg:text-xl text-white/40 max-w-2xl leading-relaxed font-light"
                >
                    {t("hero.subheading")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.75 }}
                    className="flex flex-col sm:flex-row gap-4 items-center mt-10"
                >
                    <a
                        href="#contact"
                        className="group relative px-10 py-4 bg-gradient-to-r from-[#E44CFF] to-[#5861F2] rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(228,76,255,0.4)]"
                    >
                        <span className="relative z-10">{t("hero.cta1")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5861F2] to-[#E44CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </a>
                    <a
                        href="#services"
                        className="px-10 py-4 border border-white/[0.12] rounded-full font-semibold text-sm tracking-wide text-white/80 hover:border-[#4EF0FF]/40 hover:text-white hover:bg-white/[0.03] transition-all duration-500 backdrop-blur-sm"
                    >
                        {t("hero.cta2")}
                    </a>
                </motion.div>

                {/* Spline 3D Scene */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={splineReady ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.4, ease, delay: 0.2 }}
                    style={{ scale: splineScale }}
                    className="relative w-full mt-8"
                >
                    <div className="relative w-full max-w-[1100px] mx-auto" style={{ height: "clamp(300px, 50vw, 560px)" }}>
                        <iframe
                            src="https://my.spline.design/r4xbot-lgYNdEmt4BLtmHHZkoD0ykzU/"
                            className="w-full h-full border-none rounded-2xl"
                            onLoad={() => setSplineReady(true)}
                            allow="autoplay"
                            title="3D Robot Scene"
                        />

                        {/* Loading state */}
                        {!splineReady && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#5861F2] animate-spin" />
                            </div>
                        )}

                        {/* Bottom vignette — also covers watermark */}
                        <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, #050816 0%, #050816 30%, rgba(0,0,0,0.9) 55%, transparent 100%)' }} />

                        {/* Cover watermark in bottom-right */}
                        <div className="absolute bottom-0 right-0 w-[200px] h-[60px] bg-[#050816] pointer-events-none z-[21] rounded-tl-lg rounded-br-2xl" />
                    </div>

                    <style jsx global>{`
            a[href*="spline.design"],
            div > a[href*="spline"],
            a[href*="spline"] img,
            div[style*="position: absolute"] > a,
            div[style*="bottom"] > a[href*="spline"] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              position: absolute !important;
              clip: rect(0, 0, 0, 0) !important;
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.06); }
            }
            @keyframes pulseGlowDelayed {
              0%, 100% { opacity: 0.7; transform: scale(1.15); }
              50% { opacity: 1; transform: scale(1.22); }
            }
            .animate-pulse-glow {
              animation: pulseGlow 6s ease-in-out infinite;
            }
            .animate-pulse-glow-delayed {
              animation: pulseGlowDelayed 8s ease-in-out infinite 2s;
            }
          `}</style>
                </motion.div>
            </motion.div>
        </section>
    );
}
