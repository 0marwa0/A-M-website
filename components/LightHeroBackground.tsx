"use client";


const sparkles = [
  { left: "5%", top: "29%", size: "3px", opacity: 0.42 },
  { left: "9%", top: "13%", size: "2px", opacity: 0.34 },
  { left: "23%", top: "19%", size: "2px", opacity: 0.28 },
  { left: "37%", top: "30%", size: "4px", opacity: 0.25 },
  { left: "52%", top: "15%", size: "2px", opacity: 0.26 },
  { left: "67%", top: "17%", size: "3px", opacity: 0.3 },
  { left: "83%", top: "25%", size: "4px", opacity: 0.28 },
  { left: "92%", top: "18%", size: "2px", opacity: 0.3 },
  { left: "15%", top: "63%", size: "2px", opacity: 0.22 },
  { left: "88%", top: "78%", size: "3px", opacity: 0.2 },
];

export default function LightHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#f7f3ea]" aria-hidden="true">
      {/* Local Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-80 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.2),transparent_40%),linear-gradient(180deg,rgba(251,248,240,0.2)_0%,rgba(245,239,227,0.2)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px] pointer-events-none" />

      {sparkles.map((sparkle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[#17213a]"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            height: sparkle.size,
            width: sparkle.size,
            opacity: sparkle.opacity,
          }}
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#f7f3ea]" />
    </div>
  );
}
