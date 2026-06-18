"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ── Star field on <canvas> — lightweight, GPU-friendly ──
const STAR_COUNT = 350;
const SHOOTING_STAR_INTERVAL = 6000; // ms between shooting stars

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface WaveParticle {
  side: "left" | "right";
  strandIndex: number;
  t: number;
  speed: number;
  size: number;
  alpha: number;
  offsetRadius: number;
  offsetSpeed: number;
  offsetPhase: number;
}

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const waveParticlesRef = useRef<WaveParticle[]>([]);
  const animRef = useRef<number>(0);
  const lastShootingRef = useRef(0);

  // ── Colour palette ──
  const starColors = [
    "rgba(255,255,255,",       // white
    "rgba(200,210,255,",       // cool blue-white
    "rgba(180,190,255,",       // soft blue
    "rgba(228,76,255,",        // brand magenta (rare)
    "rgba(78,240,255,",        // brand cyan (rare)
  ];

  const pickStarColor = useCallback(() => {
    const r = Math.random();
    if (r < 0.55) return starColors[0];
    if (r < 0.8) return starColors[1];
    if (r < 0.92) return starColors[2];
    if (r < 0.96) return starColors[3];
    return starColors[4];
  }, []);

  // ── Initialise stars and wave particles ──
  const initStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.2 + Math.random() * 1.3,
        baseAlpha: 0.15 + Math.random() * 0.75,
        twinkleSpeed: 0.2 + Math.random() * 0.9,
        twinklePhase: Math.random() * Math.PI * 2,
        color: pickStarColor(),
      });
    }
    starsRef.current = stars;

    // Wave Particles
    const waveParticles: WaveParticle[] = [];
    const STRANDS_PER_SIDE = 8;
    const PARTICLES_PER_STRAND = 60;
    const sides: ("left" | "right")[] = ["left", "right"];

    for (const side of sides) {
      for (let strand = 0; strand < STRANDS_PER_SIDE; strand++) {
        for (let i = 0; i < PARTICLES_PER_STRAND; i++) {
          waveParticles.push({
            side,
            strandIndex: strand,
            t: Math.random(),
            speed: 0.0008 + Math.random() * 0.0018,
            size: 0.4 + Math.random() * 1.2,
            alpha: 0.15 + Math.random() * 0.65,
            offsetRadius: 1 + Math.random() * 16,
            offsetSpeed: 0.4 + Math.random() * 1.2,
            offsetPhase: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    waveParticlesRef.current = waveParticles;
  }, [pickStarColor]);

  // ── Create a shooting star ──
  const spawnShootingStar = useCallback((w: number, h: number) => {
    shootingStarsRef.current.push({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.4,
      len: 60 + Math.random() * 100,
      speed: 4 + Math.random() * 4,
      angle: Math.PI / 6 + Math.random() * 0.3,
      alpha: 0,
      life: 0,
      maxLife: 60 + Math.random() * 40,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (starsRef.current.length === 0) initStars(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Mouse tracking ──
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMouse);

    // Helper to calculate Bezier points for a given side, strand, and time
    const getBezierPoints = (side: "left" | "right", strandIndex: number, timeVal: number) => {
      const h0 = h;
      const w0 = w;
      
      const startOffset = strandIndex * 8;
      
      if (side === "left") {
        return {
          P0: { x: -30 - startOffset, y: h0 * 1.05 + startOffset },
          P1: { 
            x: w0 * 0.12 + Math.cos(timeVal * 0.15 + strandIndex) * 40, 
            y: h0 * 0.7 + Math.sin(timeVal * 0.2 + strandIndex) * 50 
          },
          P2: { 
            x: w0 * 0.08 + Math.sin(timeVal * 0.1 + strandIndex) * 50, 
            y: h0 * 0.35 + Math.cos(timeVal * 0.18 + strandIndex) * 45 
          },
          P3: { 
            x: w0 * 0.32 + Math.sin(timeVal * 0.3 + strandIndex) * 30, 
            y: -h0 * 0.1 - strandIndex * 15 
          }
        };
      } else {
        return {
          P0: { x: w0 + 30 + startOffset, y: h0 * 1.05 + startOffset },
          P1: { 
            x: w0 * 0.88 - Math.cos(timeVal * 0.15 + strandIndex) * 40, 
            y: h0 * 0.7 + Math.sin(timeVal * 0.2 + strandIndex) * 50 
          },
          P2: { 
            x: w0 * 0.92 - Math.sin(timeVal * 0.1 + strandIndex) * 50, 
            y: h0 * 0.35 + Math.cos(timeVal * 0.18 + strandIndex) * 45 
          },
          P3: { 
            x: w0 * 0.68 - Math.sin(timeVal * 0.3 + strandIndex) * 30, 
            y: -h0 * 0.1 - strandIndex * 15 
          }
        };
      }
    };

    // ── Render loop ──
    let t = 0;
    const draw = (timestamp: number) => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse interpolation (subtle parallax)
      smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.02;
      smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.02;
      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      const timeVal = t;

      // ── Draw Wave Trails ──
      const STRANDS_PER_SIDE = 8;
      for (const side of (["left", "right"] as const)) {
        for (let strand = 0; strand < STRANDS_PER_SIDE; strand++) {
          const { P0, P1, P2, P3 } = getBezierPoints(side, strand, timeVal);
          
          ctx.beginPath();
          ctx.moveTo(P0.x, P0.y);
          ctx.bezierCurveTo(P1.x, P1.y, P2.x, P2.y, P3.x, P3.y);
          
          const grad = ctx.createLinearGradient(P0.x, P0.y, P3.x, P3.y);
          if (side === "left") {
            grad.addColorStop(0, "rgba(228, 76, 255, 0.04)");   // Purple
            grad.addColorStop(0.5, "rgba(139, 92, 246, 0.06)"); // Violet
            grad.addColorStop(1, "rgba(78, 240, 255, 0.04)");    // Cyan
          } else {
            grad.addColorStop(0, "rgba(78, 240, 255, 0.04)");    // Cyan
            grad.addColorStop(0.5, "rgba(88, 97, 242, 0.06)");   // Electric Blue
            grad.addColorStop(1, "rgba(228, 76, 255, 0.04)");   // Purple
          }
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── Draw Wave Particles ──
      for (const p of waveParticlesRef.current) {
        // Update progress
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.speed = 0.0008 + Math.random() * 0.0018;
        }

        // Get Bezier points
        const { P0, P1, P2, P3 } = getBezierPoints(p.side, p.strandIndex, timeVal);

        // Compute base bezier coordinate
        const u = 1 - p.t;
        const u2 = u * u;
        const u3 = u2 * u;
        const t2 = p.t * p.t;
        const t3 = t2 * p.t;

        const bx = u3 * P0.x + 3 * u2 * p.t * P1.x + 3 * u * t2 * P2.x + t3 * P3.x;
        const by = u3 * P0.y + 3 * u2 * p.t * P1.y + 3 * u * t2 * P2.y + t3 * P3.y;

        // Apply swirling spread offset
        const swirlAngle = p.t * 12 + timeVal * p.offsetSpeed + p.offsetPhase;
        const ox = Math.cos(swirlAngle) * p.offsetRadius;
        const oy = Math.sin(swirlAngle) * p.offsetRadius;

        let px = bx + ox;
        let py = by + oy;

        // Parallax mouse offset (larger particles move more)
        const depth = p.size;
        px += mx * depth * 7;
        py += my * depth * 7;

        // Fade in/out factor
        const fade = Math.sin(p.t * Math.PI);
        const alpha = p.alpha * fade;

        // Particle color selector based on progress (t)
        let colorStr = "";
        if (p.t < 0.25) {
          colorStr = `rgba(228, 76, 255, ${alpha.toFixed(2)})`;   // Purple
        } else if (p.t < 0.5) {
          colorStr = `rgba(139, 92, 246, ${alpha.toFixed(2)})`;  // Violet
        } else if (p.t < 0.75) {
          colorStr = `rgba(88, 97, 242, ${alpha.toFixed(2)})`;   // Electric Blue
        } else {
          colorStr = `rgba(78, 240, 255, ${alpha.toFixed(2)})`;   // Cyan
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = colorStr;
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 0.8 && alpha > 0.35) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
          glowGrad.addColorStop(0, colorStr.replace(`, ${alpha.toFixed(2)})`, `, ${(alpha * 0.25).toFixed(2)})`));
          glowGrad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }
      }

      // ── Draw twinkling stars ──
      for (const star of starsRef.current) {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha * (0.5 + 0.5 * twinkle);
        if (alpha < 0.05) continue;

        // Parallax offset — smaller stars move less
        const depth = star.r / 2;
        const px = star.x + mx * depth * 6;
        const py = star.y + my * depth * 6;

        ctx.beginPath();
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha.toFixed(2)})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.r > 1.0 && alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(px, py, star.r * 3, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(px, py, 0, px, py, star.r * 3);
          grd.addColorStop(0, `${star.color}${(alpha * 0.25).toFixed(2)})`);
          grd.addColorStop(1, `${star.color}0)`);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }

      // ── Shooting stars ──
      if (timestamp - lastShootingRef.current > SHOOTING_STAR_INTERVAL) {
        spawnShootingStar(w, h);
        lastShootingRef.current = timestamp;
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((ss) => {
        ss.life++;
        const progress = ss.life / ss.maxLife;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        // Fade in then out
        if (progress < 0.2) ss.alpha = progress / 0.2;
        else if (progress > 0.7) ss.alpha = (1 - progress) / 0.3;
        else ss.alpha = 1;

        ss.alpha *= 0.6;

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const grd = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grd.addColorStop(0, `rgba(255,255,255,0)`);
        grd.addColorStop(1, `rgba(200,210,255,${ss.alpha.toFixed(2)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        return ss.life < ss.maxLife;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [initStars, spawnShootingStar]);

  return (
    <div className="cosmic-bg" aria-hidden="true">
      {/* Star canvas */}
      <canvas ref={canvasRef} className="cosmic-canvas" />

      {/* Nebula layers — CSS gradients with slow drift */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      {/* Cosmic dust — subtle glow patches */}
      <div className="cosmic-dust dust-1" />
      <div className="cosmic-dust dust-2" />

      {/* Central ambient glow behind headline */}
      <div className="ambient-glow" />

      {/* Radial vignette for text readability */}
      <div className="cosmic-vignette" />

      {/* Bottom fade to blend with page below */}
      <div className="cosmic-bottom-fade" />

      <style jsx>{`
        .cosmic-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: radial-gradient(
            ellipse 120% 100% at 30% 20%,
            #0d1133 0%,
            #080c24 40%,
            #050816 80%,
            #020410 100%
          );
        }

        .cosmic-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        /* ═══════════════ Nebula Clouds ═══════════════ */
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          animation: nebulaFadeIn 3s ease-out forwards;
          will-change: transform, opacity;
        }

        .nebula-1 {
          width: 800px;
          height: 500px;
          left: -5%;
          top: 10%;
          background: radial-gradient(
            ellipse at center,
            rgba(88, 40, 180, 0.18) 0%,
            rgba(60, 20, 140, 0.10) 40%,
            transparent 70%
          );
          animation: nebulaFadeIn 3s ease-out forwards, nebulaDrift1 60s ease-in-out infinite;
          animation-delay: 0s, 0s;
          z-index: 2;
        }

        .nebula-2 {
          width: 700px;
          height: 600px;
          right: -10%;
          top: 5%;
          background: radial-gradient(
            ellipse at center,
            rgba(30, 40, 120, 0.20) 0%,
            rgba(20, 25, 80, 0.12) 45%,
            transparent 70%
          );
          animation: nebulaFadeIn 3.5s ease-out forwards, nebulaDrift2 55s ease-in-out infinite;
          animation-delay: 0.5s, 0.5s;
          z-index: 2;
        }

        .nebula-3 {
          width: 500px;
          height: 400px;
          left: 30%;
          bottom: 5%;
          background: radial-gradient(
            ellipse at center,
            rgba(140, 50, 200, 0.12) 0%,
            rgba(80, 30, 150, 0.06) 50%,
            transparent 70%
          );
          animation: nebulaFadeIn 4s ease-out forwards, nebulaDrift3 65s ease-in-out infinite;
          animation-delay: 1s, 1s;
          z-index: 2;
        }

        @keyframes nebulaFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes nebulaDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(30px, -20px) scale(1.05); }
          50%      { transform: translate(-15px, 15px) scale(0.97); }
          75%      { transform: translate(20px, 10px) scale(1.03); }
        }

        @keyframes nebulaDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30%      { transform: translate(-25px, 20px) scale(1.04); }
          60%      { transform: translate(15px, -10px) scale(0.96); }
          80%      { transform: translate(-10px, -15px) scale(1.02); }
        }

        @keyframes nebulaDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35%      { transform: translate(20px, 25px) scale(1.06); }
          65%      { transform: translate(-20px, -15px) scale(0.94); }
        }

        /* ═══════════════ Cosmic Dust ═══════════════ */
        .cosmic-dust {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 2;
        }

        .dust-1 {
          width: 400px;
          height: 400px;
          top: 30%;
          left: 15%;
          background: radial-gradient(
            circle,
            rgba(228, 76, 255, 0.06) 0%,
            transparent 60%
          );
          animation: dustFloat 40s ease-in-out infinite;
        }

        .dust-2 {
          width: 350px;
          height: 350px;
          bottom: 20%;
          right: 20%;
          background: radial-gradient(
            circle,
            rgba(78, 240, 255, 0.05) 0%,
            transparent 60%
          );
          animation: dustFloat 35s ease-in-out infinite 5s;
        }

        @keyframes dustFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          50%      { transform: translate(15px, -10px); opacity: 1; }
        }

        /* ═══════════════ Central Ambient Glow ═══════════════ */
        .ambient-glow {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(1000px, 90vw);
          height: min(700px, 70vh);
          background: radial-gradient(
            circle,
            rgba(88, 97, 242, 0.12) 0%,
            rgba(228, 76, 255, 0.04) 30%,
            rgba(78, 240, 255, 0.02) 60%,
            transparent 85%
          );
          filter: blur(120px);
          z-index: 2;
          pointer-events: none;
          animation: ambientPulse 15s ease-in-out infinite alternate;
        }

        @keyframes ambientPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.9;
          }
        }

        /* ═══════════════ Readability vignette ═══════════════ */
        .cosmic-vignette {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            radial-gradient(
              ellipse 80% 50% at 50% 35%,
              rgba(8, 12, 36, 0.55) 0%,
              transparent 70%
            );
          pointer-events: none;
        }

        /* ═══════════════ Bottom fade ═══════════════ */
        .cosmic-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 280px;
          z-index: 4;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(6, 8, 22, 0.5) 40%,
            #060816 100%
          );
          pointer-events: none;
        }

        /* ═══════════════ Responsive ═══════════════ */
        @media (max-width: 768px) {
          .nebula-1 { width: 400px; height: 300px; filter: blur(60px); }
          .nebula-2 { width: 350px; height: 300px; filter: blur(60px); }
          .nebula-3 { width: 300px; height: 250px; filter: blur(60px); }
          .cosmic-dust { filter: blur(70px); }
        }
      `}</style>
    </div>
  );
};

export default CosmicBackground;
