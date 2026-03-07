"use client";

import React, { useEffect, useRef, useCallback } from "react";

const STAR_COUNT = 180;

interface Star {
    x: number;
    y: number;
    r: number;
    baseAlpha: number;
    twinkleSpeed: number;
    twinklePhase: number;
    color: string;
}

interface StarFieldProps {
    /** Solid background colour painted behind the stars */
    bgColor?: string;
}

const StarField: React.FC<StarFieldProps> = ({ bgColor = "#060816" }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const animRef = useRef<number>(0);

    const starColors = [
        "rgba(255,255,255,",
        "rgba(200,210,255,",
        "rgba(180,190,255,",
        "rgba(228,76,255,",
        "rgba(78,240,255,",
    ];

    const pickColor = useCallback(() => {
        const r = Math.random();
        if (r < 0.55) return starColors[0];
        if (r < 0.80) return starColors[1];
        if (r < 0.92) return starColors[2];
        if (r < 0.96) return starColors[3];
        return starColors[4];
    }, []);

    const initStars = useCallback(
        (w: number, h: number) => {
            const stars: Star[] = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: 0.3 + Math.random() * 1.5,
                    baseAlpha: 0.25 + Math.random() * 0.7,
                    twinkleSpeed: 0.3 + Math.random() * 1.2,
                    twinklePhase: Math.random() * Math.PI * 2,
                    color: pickColor(),
                });
            }
            starsRef.current = stars;
        },
        [pickColor]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let w = 0;
        let h = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const rect = canvas.parentElement!.getBoundingClientRect();
            w = rect.width;
            h = rect.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initStars(w, h);
        };

        resize();
        window.addEventListener("resize", resize);

        let t = 0;
        const draw = () => {
            t += 0.008;

            // Paint solid background each frame
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);

            for (const star of starsRef.current) {
                const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase);
                const alpha = star.baseAlpha * (0.5 + 0.5 * twinkle);
                if (alpha < 0.05) continue;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;
                ctx.fill();

                // Soft glow for larger stars
                if (star.r > 1.0 && alpha > 0.4) {
                    const grd = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.r * 3
                    );
                    grd.addColorStop(0, `${star.color}${(alpha * 0.25).toFixed(2)})`);
                    grd.addColorStop(1, `${star.color}0)`);
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = grd;
                    ctx.fill();
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [bgColor, initStars]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                display: "block",
            }}
        />
    );
};

export default StarField;
