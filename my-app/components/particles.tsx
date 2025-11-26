"use client";

import { useEffect, useRef } from "react";

const particles = [
  { top: 12, left: 22, size: 8, delay: "0s" },
  { top: 28, left: 68, size: 10, delay: "1.2s" },
  { top: 60, left: 18, size: 7, delay: "2.6s" },
  { top: 70, left: 54, size: 9, delay: "0.8s" },
  { top: 46, left: 82, size: 11, delay: "1.8s" },
  { top: 18, left: 82, size: 6, delay: "2.2s" },
  { top: 35, left: 12, size: 7, delay: "1s" },
  { top: 78, left: 72, size: 8, delay: "2.8s" }
];

export function Particles() {
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const viewport = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const setInitial = () => {
      viewport.current = { w: window.innerWidth, h: window.innerHeight };
      pointer.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };
    setInitial();

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onResize = () => {
      viewport.current = { w: window.innerWidth, h: window.innerHeight };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      const { w, h } = viewport.current;
      const repelRadius = 160;
      const repelForce = 24;

      particles.forEach((p, idx) => {
        const node = particleRefs.current[idx];
        if (!node) return;

        const baseX = (p.left / 100) * w;
        const baseY = (p.top / 100) * h;

        const dx = baseX - pointer.current.x;
        const dy = baseY - pointer.current.y;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = dist < repelRadius ? (1 - dist / repelRadius) * repelForce : 0;

        const offsetX = (dx / dist) * influence;
        const offsetY = (dy / dist) * influence;

        node.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
      style={{ transform: "translate3d(var(--particle-x, 0px), var(--particle-y, 0px), 0)" }}
    >
      {particles.map((particle, idx) => (
        <span
          key={idx}
          ref={(el) => (particleRefs.current[idx] = el)}
          className="absolute rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.5)] will-change-transform"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.85,
            animation: `float 9s ease-in-out infinite`,
            animationDelay: particle.delay
          }}
        />
      ))}
    </div>
  );
}
