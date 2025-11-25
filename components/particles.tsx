const particles = [
  { top: "12%", left: "22%", size: 8, delay: "0s" },
  { top: "28%", left: "68%", size: 10, delay: "1.2s" },
  { top: "60%", left: "18%", size: 7, delay: "2.6s" },
  { top: "70%", left: "54%", size: 9, delay: "0.8s" },
  { top: "46%", left: "82%", size: 11, delay: "1.8s" },
  { top: "18%", left: "82%", size: 6, delay: "2.2s" }
];

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white/70 shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          style={{
            top: particle.top,
            left: particle.left,
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
