"use client";

import React, { useEffect, useRef } from "react";
import { PersonaMode } from "./Chatbot";

interface NeuralNetworkVisualProps {
  mode: PersonaMode;
}

interface Particle3D {
  theta: number; // angle around Y axis
  phi: number;   // angle relative to Z axis
  r: number;     // radius of sphere
  speed: number; // orbital rotation speed
  size: number;  // particle dot size
  twinklePhase: number; // phase for twinkling shimmer
  twinkleSpeed: number; // speed of twinkling shimmer
}

export default function NeuralNetworkVisual({ mode }: NeuralNetworkVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle3D[]>([]);

  // Colors based on current theme mode
  const getThemeColors = () => {
    switch (mode) {
      case "creative":
        return {
          centerGlow: "rgba(228, 76, 255, 0.35)",
          centerSolid: "#E44CFF",
          lines: "rgba(228, 76, 255, 0.2)",
        };
      case "precise":
        return {
          centerGlow: "rgba(78, 240, 255, 0.35)",
          centerSolid: "#4EF0FF",
          lines: "rgba(78, 240, 255, 0.2)",
        };
      case "balanced":
      default:
        return {
          centerGlow: "rgba(78, 240, 255, 0.25)",
          centerSolid: "#4EF0FF",
          lines: "rgba(90, 100, 240, 0.2)",
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load the logo image
    const logoImg = new Image();
    logoImg.src = "/logo.svg";

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      
      const size = Math.min(rect.width, 320);
      width = size;
      height = size;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize 130 particles distributed in a 3D sphere (extremely small and twinkling)
    const count = 130;
    const particles: Particle3D[] = [];
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i / count));
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      particles.push({
        theta: theta,
        phi: phi,
        r: 95 + Math.random() * 45, // orbit range
        speed: 0.0005 + Math.random() * 0.001, // slow speed
        size: 0.3 + Math.random() * 0.6, // extremely tiny (0.3px to 0.9px base size)
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
      });
    }
    particlesRef.current = particles;

    let frameCount = 0;
    const perspective = 250;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      const themeColors = getThemeColors();
      const centerX = width / 2;
      const centerY = height / 2;

      // Slower auto-rotation of the particle sphere
      const rotateY = frameCount * 0.0012;
      const rotateX = frameCount * 0.0004;

      // 1. Draw outer HUD ring in background
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(frameCount * 0.0004); // slow rotate
      ctx.strokeStyle = themeColors.lines;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 2. Draw outer glowing aura centered directly behind the logo
      const glowRadius = 180 + Math.sin(frameCount * 0.03) * 8;
      const centerGlowGrad = ctx.createRadialGradient(
        centerX, centerY, 95,
        centerX, centerY, glowRadius
      );
      centerGlowGrad.addColorStop(0, themeColors.centerGlow);
      centerGlowGrad.addColorStop(1, "transparent");

      ctx.fillStyle = centerGlowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Project 3D particles and sort them by depth (z)
      interface ProjectedParticle {
        x: number;
        y: number;
        z: number;
        scale: number;
        size: number;
        twinkleSpeed: number;
        twinklePhase: number;
      }

      const projectedBehind: ProjectedParticle[] = [];
      const projectedInFront: ProjectedParticle[] = [];

      particlesRef.current.forEach((p) => {
        // Orbit update
        p.theta += p.speed;

        // Spherical to Cartesian coordinates
        let x = p.r * Math.sin(p.phi) * Math.cos(p.theta);
        let y = p.r * Math.sin(p.phi) * Math.sin(p.theta);
        let z = p.r * Math.cos(p.phi);

        // Apply 3D Rotations
        // Y Rotation
        let cosY = Math.cos(rotateY);
        let sinY = Math.sin(rotateY);
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // X Rotation
        let cosX = Math.cos(rotateX);
        let sinX = Math.sin(rotateX);
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // 3D Perspective Projection
        const scale = perspective / (perspective + z2);
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        const proj = {
          x: screenX,
          y: screenY,
          z: z2,
          scale: scale,
          size: p.size * scale,
          twinkleSpeed: p.twinkleSpeed,
          twinklePhase: p.twinklePhase,
        };

        if (z2 > 0) {
          projectedBehind.push(proj);
        } else {
          projectedInFront.push(proj);
        }
      });

      // Draw background particles (behind the logo) - Pure White Glimmers
      projectedBehind.forEach((p) => {
        const twinkle = 0.25 + 0.75 * Math.sin(frameCount * p.twinkleSpeed + p.twinklePhase);
        const baseOpacity = Math.max(0.12, Math.min(0.65, (perspective - p.z) / (perspective * 2.2)));
        const opacity = baseOpacity * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Logo Image (Enlarged to 190px and drawn directly over background particles)
      if (logoImg.complete && logoImg.naturalWidth !== 0) {
        const logoSize = 190 + Math.sin(frameCount * 0.02) * 4; // Clean pulsing size (no mouse tilt)

        ctx.drawImage(
          logoImg,
          centerX - logoSize / 2,
          centerY - logoSize / 2,
          logoSize,
          logoSize
        );
      } else {
        // Fallback to white core if logo hasn't loaded yet
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw foreground particles (in front of the logo) - Pure White Glimmers
      projectedInFront.forEach((p) => {
        const twinkle = 0.25 + 0.75 * Math.sin(frameCount * p.twinkleSpeed + p.twinklePhase);
        const baseOpacity = Math.min(0.85, (perspective - p.z) / (perspective * 1.6));
        const opacity = baseOpacity * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Draw Holographic Laser scanning line sweeps across the large logo (slower)
      const scanY = centerY + Math.sin(frameCount * 0.005) * 110;
      ctx.save();
      const scanGrad = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, themeColors.centerSolid + "33"); // light scan glow
      scanGrad.addColorStop(1, "transparent");
      
      ctx.fillStyle = scanGrad;
      ctx.fillRect(centerX - 120, scanY - 6, 240, 12);
      
      ctx.strokeStyle = themeColors.centerSolid + "88";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 120, scanY);
      ctx.lineTo(centerX + 120, scanY);
      ctx.stroke();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mode]);

  return (
    <div className="relative w-full max-w-[320px] aspect-square rounded-2xl flex items-center justify-center bg-gradient-to-b from-[#181b35]/40 to-[#0c0f2a]/60 border border-white/5 shadow-2xl overflow-hidden group">
      {/* HUD scan overlay lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-40" />
      
      {/* Glowing boundary corner lines */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 pointer-events-none" />
      
      <canvas ref={canvasRef} className="block relative z-10" />
    </div>
  );
}
