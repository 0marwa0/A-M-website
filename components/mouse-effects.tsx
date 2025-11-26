"use client";

import { useEffect, useMemo, useRef } from "react";

type Shape = {
  size: number;
  blur: string;
  opacity: string;
  gradient: string;
  depth: number;
  initial: { x: string; y: string };
};

const TRAIL_COUNT = 12;

export function MouseEffects() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const distortionRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magnetics = useRef<Element[]>([]);

  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const glowSmooth = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 })));

  const shapes = useMemo<Shape[]>(
    () => [
      {
        size: 260,
        blur: "blur-[80px]",
        opacity: "opacity-50",
        gradient: "from-plasma/35 via-aurora/20 to-cyanflare/30",
        depth: 10,
        initial: { x: "10%", y: "18%" }
      },
      {
        size: 180,
        blur: "blur-[60px]",
        opacity: "opacity-60",
        gradient: "from-aurora/30 via-cyanflare/20 to-plasma/20",
        depth: 14,
        initial: { x: "72%", y: "26%" }
      },
      {
        size: 220,
        blur: "blur-[70px]",
        opacity: "opacity-45",
        gradient: "from-cyanflare/25 via-aurora/20 to-plasma/18",
        depth: 18,
        initial: { x: "38%", y: "70%" }
      },
      {
        size: 140,
        blur: "blur-[50px]",
        opacity: "opacity-55",
        gradient: "from-plasma/28 via-aurora/18 to-cyanflare/18",
        depth: 8,
        initial: { x: "85%", y: "60%" }
      }
    ],
    []
  );

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      target.current = { x: nx * 2, y: ny * 2 };
      cursor.current = { x: event.clientX, y: event.clientY };

      const ripple = rippleRef.current;
      if (ripple) {
        ripple.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(1.1)`;
        ripple.style.opacity = "0.35";
        ripple.style.transition = "transform 360ms ease, opacity 600ms ease";
        window.clearTimeout((ripple as any)._timeout);
        (ripple as any)._timeout = window.setTimeout(() => {
          ripple.style.opacity = "0";
        }, 260);
      }

      const distortion = distortionRef.current;
      if (distortion) {
        distortion.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(1.08)`;
        distortion.style.opacity = "0.32";
        distortion.style.transition = "transform 420ms ease, opacity 720ms ease";
        window.clearTimeout((distortion as any)._timeout);
        (distortion as any)._timeout = window.setTimeout(() => {
          distortion.style.opacity = "0";
        }, 360);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".magnetic"));
    magnetics.current = els;

    const handleMagneticMove = (el: Element) => (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const maxShift = 6;
      const nx = (x / rect.width) * maxShift;
      const ny = (y / rect.height) * maxShift;
      (el as HTMLElement).style.setProperty("translate", `${nx}px ${ny}px`);
    };

    const handleMagneticLeave = (el: Element) => () => {
      (el as HTMLElement).style.setProperty("translate", "0px 0px");
    };

    const cleanups = els.map((el) => {
      const move = handleMagneticMove(el);
      const leave = handleMagneticLeave(el);
      el.addEventListener("pointermove", move, { passive: true });
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (target.current.y - smooth.current.y) * 0.08;

      glowSmooth.current.x += (cursor.current.x - glowSmooth.current.x) * 0.12;
      glowSmooth.current.y += (cursor.current.y - glowSmooth.current.y) * 0.12;

      const parallaxX = smooth.current.x * 36;
      const parallaxY = smooth.current.y * 36;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowSmooth.current.x}px, ${glowSmooth.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (waveRef.current) {
        waveRef.current.style.transform = `translate3d(${parallaxX * 0.25}px, ${parallaxY * 0.25}px, 0) scale(1.05)`;
      }

      if (shapesRef.current.length) {
        shapesRef.current.forEach((shape, idx) => {
          if (!shape) return;
          const depth = shapes[idx]?.depth ?? 12;
          shape.style.transform = `translate3d(${parallaxX / depth}px, ${parallaxY / depth}px, 0)`;
        });
      }

      if (trailRefs.current.length) {
        const positions = trailPositions.current;
        positions[0].x += (cursor.current.x - positions[0].x) * 0.22;
        positions[0].y += (cursor.current.y - positions[0].y) * 0.22;
        for (let i = 1; i < positions.length; i++) {
          positions[i].x += (positions[i - 1].x - positions[i].x) * 0.4;
          positions[i].y += (positions[i - 1].y - positions[i].y) * 0.4;
        }
        positions.forEach((pos, idx) => {
          const node = trailRefs.current[idx];
          if (!node) return;
          node.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
          node.style.opacity = `${Math.max(0, 0.55 - idx * 0.04)}`;
        });
      }

      const root = document.documentElement;
      root.style.setProperty("--parallax-x", `${parallaxX}px`);
      root.style.setProperty("--parallax-y", `${parallaxY}px`);
      root.style.setProperty("--particle-x", `${parallaxX * 0.6}px`);
      root.style.setProperty("--particle-y", `${parallaxY * 0.6}px`);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [shapes]);

  return (
    <>
      <div
        ref={parallaxRef}
        className="pointer-events-none fixed inset-[-12%] z-0 will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(111,66,255,0.25),transparent_45%),radial-gradient(circle_at_75%_30%,rgba(255,27,156,0.22),transparent_50%),radial-gradient(circle_at_40%_70%,rgba(61,213,255,0.25),transparent_50%)] blur-3xl" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0">
        {shapes.map((shape, idx) => (
          <div
            key={idx}
            ref={(el) => (shapesRef.current[idx] = el)}
            className={`absolute ${shape.blur} ${shape.opacity} will-change-transform`}
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              top: shape.initial.y,
              left: shape.initial.x,
              backgroundImage: `linear-gradient(120deg, var(--shape-${idx}-from, transparent), var(--shape-${idx}-to, transparent))`
            }}
          >
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${shape.gradient} mix-blend-screen`}
              style={{ filter: "drop-shadow(0 0 45px rgba(111,66,255,0.25))" }}
            />
          </div>
        ))}
      </div>

      <div
        ref={waveRef}
        className="pointer-events-none fixed inset-[-20%] z-0 opacity-50 blur-[70px] transition-transform duration-500 will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_50%,rgba(61,213,255,0.18),transparent),radial-gradient(35%_35%_at_30%_20%,rgba(255,27,156,0.18),transparent)] mix-blend-screen" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none fixed z-40 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(61,213,255,0.38),rgba(255,27,156,0.2),transparent_60%)] opacity-55 blur-3xl transition-transform duration-200 will-change-transform mix-blend-screen"
        aria-hidden
      />

      <div
        ref={distortionRef}
        className="pointer-events-none fixed z-20 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(61,213,255,0.16),transparent_60%)] opacity-0 blur-[60px] mix-blend-screen will-change-transform"
        aria-hidden
      />

      <div
        ref={rippleRef}
        className="pointer-events-none fixed z-30 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(61,213,255,0.18),transparent_60%)] opacity-0 blur-3xl mix-blend-screen will-change-transform"
        aria-hidden
      />

      <div className="pointer-events-none fixed inset-0 z-30">
        {Array.from({ length: TRAIL_COUNT }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => (trailRefs.current[idx] = el)}
            className="absolute h-10 w-10 rounded-full opacity-0 transition-opacity duration-200 will-change-transform mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(61,213,255,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,27,156,0.35), transparent 50%)",
              filter: "blur(10px)"
            }}
            aria-hidden
          />
        ))}
      </div>
    </>
  );
}
