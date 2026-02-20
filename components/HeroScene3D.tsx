"use client";

import React, { useEffect, useRef, useState } from "react";

interface HeroScene3DProps {
    t: (key: string) => any;
    locale: string;
}

const HeroScene3D: React.FC<HeroScene3DProps> = ({ t, locale }) => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sceneRef.current) return;
            const rect = sceneRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scattered/chaotic file items (left side — "before")
    const scatteredFiles = [
        { label: "invoice_2023.pdf", icon: "📄", x: -8, y: -22, z: 40, rot: -25, delay: 0 },
        { label: "notes.txt", icon: "📝", x: -22, y: -12, z: 20, rot: 18, delay: 0.1 },
        { label: "photo_IMG.jpg", icon: "🖼️", x: -5, y: 2, z: 60, rot: -12, delay: 0.2 },
        { label: "data_export.csv", icon: "📊", x: -30, y: 8, z: 10, rot: 30, delay: 0.3 },
        { label: "meeting_rec.mp4", icon: "🎬", x: -14, y: 16, z: 45, rot: -8, delay: 0.4 },
        { label: "budget_v3.xlsx", icon: "📈", x: -26, y: -28, z: 35, rot: 22, delay: 0.15 },
        { label: "readme.md", icon: "📋", x: -18, y: 22, z: 55, rot: -20, delay: 0.25 },
        { label: "draft_email.eml", icon: "✉️", x: -35, y: -2, z: 30, rot: 15, delay: 0.35 },
        { label: "scan_001.png", icon: "📸", x: -10, y: -35, z: 25, rot: -32, delay: 0.05 },
        { label: "contract.docx", icon: "📃", x: -32, y: 14, z: 50, rot: 10, delay: 0.45 },
    ];

    // Organized/agentic output items (right side — "after")
    const organizedItems = [
        {
            label: t("hero.notifications.first.title"),
            subtitle: t("hero.notifications.first.subtitle"),
            icon: "🤖",
            color: "#E44CFF",
            delay: 0.6,
        },
        {
            label: t("hero.notifications.second.title"),
            subtitle: t("hero.notifications.second.subtitle"),
            icon: "⚡",
            color: "#5861F2",
            delay: 0.75,
        },
        {
            label: t("hero.notifications.third.title"),
            subtitle: t("hero.notifications.third.subtitle"),
            icon: "✅",
            color: "#4EF0FF",
            delay: 0.9,
        },
    ];

    // Particles flowing from left to right
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: i * 0.5,
        duration: 3 + Math.random() * 2,
        y: -30 + Math.random() * 60,
        size: 2 + Math.random() * 3,
    }));

    return (
        <div
            ref={sceneRef}
            className="hero-3d-scene"
            style={{
                perspective: "1200px",
                perspectiveOrigin: "50% 45%",
            }}
        >
            {/* Ambient light effects */}
            <div className="hero-3d-ambient">
                <div className="ambient-orb ambient-orb-1" />
                <div className="ambient-orb ambient-orb-2" />
                <div className="ambient-orb ambient-orb-3" />
            </div>

            {/* 3D Stage */}
            <div
                className="hero-3d-stage"
                style={{
                    transform: `rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 2}deg)`,
                }}
            >
                {/* Flow particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="flow-particle"
                        style={{
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                            top: `calc(50% + ${p.y}px)`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                        }}
                    />
                ))}

                {/* LEFT: Scattered Files (Chaos) */}
                <div className="chaos-zone">
                    <div className="zone-label chaos-label">
                        <span className="zone-dot chaos-dot" />
                        {locale === "ar" ? "بيانات متفرقة" : "Scattered Data"}
                    </div>
                    {scatteredFiles.map((file, idx) => (
                        <div
                            key={idx}
                            className={`scattered-file ${isVisible ? "visible" : ""}`}
                            style={{
                                left: `calc(50% + ${file.x}%)`,
                                top: `calc(50% + ${file.y}%)`,
                                transform: `translateZ(${file.z}px) rotate(${file.rot}deg)`,
                                animationDelay: `${file.delay}s`,
                                transitionDelay: `${file.delay + 0.3}s`,
                            }}
                        >
                            <span className="file-icon">{file.icon}</span>
                            <span className="file-label">{file.label}</span>
                        </div>
                    ))}
                </div>

                {/* CENTER: AI Processing Core */}
                <div className="ai-core-zone">
                    {/* Rotating rings */}
                    <div className="core-ring core-ring-1" />
                    <div className="core-ring core-ring-2" />
                    <div className="core-ring core-ring-3" />

                    {/* Pulsing hexagon grid behind */}
                    <div className="hex-grid">
                        {Array.from({ length: 6 }, (_, i) => (
                            <div
                                key={i}
                                className="hex-dot"
                                style={{
                                    transform: `rotate(${i * 60}deg) translateY(-50px)`,
                                    animationDelay: `${i * 0.2}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Core orb */}
                    <div className="core-orb">
                        <div className="core-orb-inner">
                            <div className="core-logo">
                                <span className="core-logo-tri">TRI</span>
                                <span className="core-logo-minds">MINDS</span>
                            </div>
                            <div className="core-subtitle">
                                {locale === "ar" ? "محرك الذكاء" : "AI Engine"}
                            </div>
                        </div>
                    </div>

                    {/* Arrow indicators */}
                    <div className="flow-arrow flow-arrow-left">
                        <svg width="60" height="24" viewBox="0 0 60 24">
                            <defs>
                                <linearGradient id="arrowGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#E44CFF" stopOpacity="0" />
                                    <stop offset="100%" stopColor="#E44CFF" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                            <path d="M 0 12 L 50 12 L 42 4 M 50 12 L 42 20" stroke="url(#arrowGradLeft)" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <div className="flow-arrow flow-arrow-right">
                        <svg width="60" height="24" viewBox="0 0 60 24">
                            <defs>
                                <linearGradient id="arrowGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#4EF0FF" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#4EF0FF" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M 10 12 L 60 12 L 52 4 M 60 12 L 52 20" stroke="url(#arrowGradRight)" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* RIGHT: Organized Agentic Output */}
                <div className="organized-zone">
                    <div className="zone-label organized-label">
                        <span className="zone-dot organized-dot" />
                        {locale === "ar" ? "بيانات منظمة" : "Organized & Agentic"}
                    </div>
                    {organizedItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`organized-card ${isVisible ? "visible" : ""}`}
                            style={{
                                borderColor: `${item.color}40`,
                                transitionDelay: `${item.delay + 0.3}s`,
                            }}
                        >
                            <div
                                className="organized-icon"
                                style={{ background: `${item.color}25`, borderColor: `${item.color}60` }}
                            >
                                {item.icon}
                            </div>
                            <div className="organized-text" style={{ direction: locale === "ar" ? "rtl" : "ltr" }}>
                                <div className="organized-title">{item.label}</div>
                                <div className="organized-subtitle">{item.subtitle}</div>
                            </div>
                            <div
                                className="organized-status"
                                style={{ background: item.color }}
                            />
                        </div>
                    ))}
                </div>

                {/* Connection beams */}
                <svg className="connection-beams" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="beamLeftGrad" x1="0%" y1="0%" x2="50%" y2="0%">
                            <stop offset="0%" stopColor="#E44CFF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#E44CFF" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="beamRightGrad" x1="50%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4EF0FF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#4EF0FF" stopOpacity="0.1" />
                        </linearGradient>
                        <filter id="beamGlow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Left beams converging */}
                    {[140, 200, 260].map((y, i) => (
                        <path
                            key={`left-${i}`}
                            d={`M 100 ${y} Q 300 ${200} 420 200`}
                            stroke="url(#beamLeftGrad)"
                            strokeWidth="1.5"
                            fill="none"
                            filter="url(#beamGlow)"
                            className="beam-path"
                            style={{ animationDelay: `${i * 0.3}s` }}
                        />
                    ))}
                    {/* Right beams diverging */}
                    {[140, 200, 260].map((y, i) => (
                        <path
                            key={`right-${i}`}
                            d={`M 580 200 Q 700 ${200} 900 ${y}`}
                            stroke="url(#beamRightGrad)"
                            strokeWidth="1.5"
                            fill="none"
                            filter="url(#beamGlow)"
                            className="beam-path"
                            style={{ animationDelay: `${i * 0.3 + 0.5}s` }}
                        />
                    ))}
                </svg>
            </div>

            <style jsx>{`
        .hero-3d-scene {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 500px;
          margin: 0 auto;
          overflow: hidden;
        }

        /* Ambient glow orbs */
        .hero-3d-ambient {
          position: absolute;
          inset: -100px;
          pointer-events: none;
          z-index: 0;
        }
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }
        .ambient-orb-1 {
          width: 300px;
          height: 300px;
          background: #E44CFF;
          left: 5%;
          top: 20%;
          animation: ambientFloat 8s ease-in-out infinite;
        }
        .ambient-orb-2 {
          width: 250px;
          height: 250px;
          background: #5861F2;
          left: 40%;
          top: 30%;
          animation: ambientFloat 10s ease-in-out infinite 2s;
        }
        .ambient-orb-3 {
          width: 280px;
          height: 280px;
          background: #4EF0FF;
          right: 5%;
          top: 15%;
          animation: ambientFloat 9s ease-in-out infinite 4s;
        }
        @keyframes ambientFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -15px) scale(1.05); }
          66% { transform: translate(-8px, 10px) scale(0.95); }
        }

        /* 3D Stage */
        .hero-3d-stage {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
          z-index: 1;
        }

        /* Zone labels */
        .zone-label {
          position: absolute;
          top: 0;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.7;
          z-index: 10;
        }
        .zone-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }
        .chaos-label {
          left: 8%;
          color: #E44CFF;
        }
        .chaos-dot {
          background: #E44CFF;
          box-shadow: 0 0 8px #E44CFF;
        }
        .organized-label {
          right: 2%;
          color: #4EF0FF;
        }
        .organized-dot {
          background: #4EF0FF;
          box-shadow: 0 0 8px #4EF0FF;
        }

        /* ================ LEFT: Scattered Files ================ */
        .chaos-zone {
          position: absolute;
          left: 0;
          top: 0;
          width: 32%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .scattered-file {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(228, 76, 255, 0.06);
          border: 1px solid rgba(228, 76, 255, 0.2);
          border-radius: 8px;
          backdrop-filter: blur(8px);
          white-space: nowrap;
          transform-style: preserve-3d;
          opacity: 0;
          transform: translateZ(80px) rotate(0deg) scale(0.5);
          transition: opacity 0.6s ease-out, transform 0.8s ease-out;
          animation: fileFloat 4s ease-in-out infinite;
        }
        .scattered-file.visible {
          opacity: 1;
        }
        .file-icon {
          font-size: 16px;
        }
        .file-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }

        @keyframes fileFloat {
          0%, 100% { transform: translateZ(var(--z, 40px)) rotate(var(--rot, 0deg)) translateY(0px); }
          50% { transform: translateZ(var(--z, 40px)) rotate(var(--rot, 0deg)) translateY(-8px); }
        }

        /* ================ CENTER: AI Core ================ */
        .ai-core-zone {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
        }

        .core-ring {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          border: 1.5px solid transparent;
        }
        .core-ring-1 {
          border-color: rgba(228, 76, 255, 0.3);
          animation: ringRotate 12s linear infinite;
          inset: -30px;
        }
        .core-ring-2 {
          border-color: rgba(88, 97, 242, 0.3);
          animation: ringRotate 16s linear infinite reverse;
          inset: -50px;
        }
        .core-ring-3 {
          border-color: rgba(78, 240, 255, 0.15);
          animation: ringRotate 20s linear infinite;
          inset: -70px;
          border-style: dashed;
        }

        @keyframes ringRotate {
          from { transform: rotateZ(0deg) rotateX(60deg); }
          to { transform: rotateZ(360deg) rotateX(60deg); }
        }

        .hex-grid {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
        }
        .hex-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(88, 97, 242, 0.5);
          border-radius: 50%;
          left: -3px;
          top: -3px;
          transform-origin: center 50px;
          animation: hexPulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(88, 97, 242, 0.4);
        }
        @keyframes hexPulse {
          0%, 100% { opacity: 0.3; transform: rotate(var(--r, 0deg)) translateY(-50px) scale(1); }
          50% { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(-50px) scale(1.5); }
        }

        .core-orb {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%,
            rgba(88, 97, 242, 0.4) 0%,
            rgba(24, 27, 53, 0.95) 60%
          );
          border: 2px solid rgba(88, 97, 242, 0.5);
          box-shadow:
            0 0 40px rgba(88, 97, 242, 0.3),
            0 0 80px rgba(228, 76, 255, 0.15),
            inset 0 0 30px rgba(88, 97, 242, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: orbPulse 4s ease-in-out infinite;
        }
        @keyframes orbPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(88,97,242,0.3), 0 0 80px rgba(228,76,255,0.15), inset 0 0 30px rgba(88,97,242,0.1); }
          50% { box-shadow: 0 0 60px rgba(88,97,242,0.5), 0 0 120px rgba(228,76,255,0.25), inset 0 0 40px rgba(88,97,242,0.2); }
        }

        .core-orb-inner {
          text-align: center;
        }
        .core-logo {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .core-logo-tri {
          background: linear-gradient(135deg, #4EF0FF, #5861F2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .core-logo-minds {
          color: white;
        }
        .core-subtitle {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* Flow arrows */
        .flow-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.6;
          animation: arrowPulse 2s ease-in-out infinite;
        }
        .flow-arrow-left {
          left: -80px;
        }
        .flow-arrow-right {
          right: -80px;
        }
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }

        /* ================ RIGHT: Organized Output ================ */
        .organized-zone {
          position: absolute;
          right: 0;
          top: 0;
          width: 32%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          padding: 40px 8px 20px 20px;
        }

        .organized-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(16, 20, 40, 0.8);
          border: 1px solid;
          border-radius: 14px;
          backdrop-filter: blur(16px);
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        .organized-card.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .organized-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.02), transparent);
          pointer-events: none;
        }
        .organized-card:hover {
          transform: translateX(4px) scale(1.02);
          transition: transform 0.2s ease-out;
        }

        .organized-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .organized-text {
          flex: 1;
          min-width: 0;
        }
        .organized-title {
          font-size: 13px;
          font-weight: 600;
          color: white;
          margin-bottom: 2px;
        }
        .organized-subtitle {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }
        .organized-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: statusBlink 2s ease-in-out infinite;
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
          50% { opacity: 0.4; box-shadow: none; }
        }

        /* ================ Flow Particles ================ */
        .flow-particle {
          position: absolute;
          left: 15%;
          background: linear-gradient(90deg, #E44CFF, #5861F2, #4EF0FF);
          border-radius: 50%;
          opacity: 0;
          animation: particleFlow 3s ease-in-out infinite;
          z-index: 5;
          box-shadow: 0 0 6px rgba(88, 97, 242, 0.6);
        }
        @keyframes particleFlow {
          0% { left: 15%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { left: 85%; opacity: 0; }
        }

        /* ================ Connection Beams SVG ================ */
        .connection-beams {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .beam-path {
          animation: beamPulse 3s ease-in-out infinite;
        }
        @keyframes beamPulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.7; }
        }

        /* ================ Responsive ================ */
        @media (max-width: 1024px) {
          .hero-3d-scene {
            height: 400px;
          }
          .zone-label {
            font-size: 9px;
          }
          .scattered-file {
            padding: 6px 8px;
          }
          .file-label {
            font-size: 9px;
          }
          .core-orb {
            transform: scale(0.85);
          }
          .organized-card {
            padding: 12px 14px;
          }
          .organized-title {
            font-size: 12px;
          }
        }

        @media (max-width: 768px) {
          .hero-3d-scene {
            height: 520px;
          }
          .hero-3d-stage {
            transform: none !important;
          }
          .chaos-zone {
            width: 100%;
            height: 30%;
            top: 0;
            left: 0;
          }
          .ai-core-zone {
            top: 40%;
            width: 140px;
            height: 140px;
          }
          .organized-zone {
            width: 100%;
            height: 35%;
            bottom: 0;
            top: auto;
            right: 0;
            padding: 10px 16px;
          }
          .zone-label {
            display: none;
          }
          .flow-arrow {
            display: none;
          }
          .connection-beams {
            display: none;
          }
          .scattered-file {
            padding: 4px 8px;
          }
          .file-label {
            font-size: 8px;
          }
        }
      `}</style>
        </div>
    );
};

export default HeroScene3D;
