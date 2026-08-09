"use client";

const binaryRing = "010011010101001101001001010011100100010001010011";
const binaryLines = Array.from({ length: 12 }, (_, index) =>
  `${binaryRing.slice(index)}${binaryRing.slice(0, index)}`
);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_74%_39%,rgba(204,174,128,0.18),transparent_35%),linear-gradient(180deg,#fbf8f0_0%,#f5efe3_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#19223a_0.75px,transparent_0.75px)] [background-size:42px_42px]" />

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

      <div className="absolute left-[-10%] bottom-[-20%] h-[46vw] min-h-[280px] w-[58vw] min-w-[360px] opacity-[0.16]">
        <svg viewBox="0 0 520 360" className="h-full w-full" fill="none">
          {Array.from({ length: 18 }, (_, index) => (
            <path
              key={index}
              d={`M ${index * 14} 352 C ${82 + index * 10} ${248 - index * 5}, ${134 + index * 13} ${
                122 + index * 4
              }, ${370 + index * 5} ${16 + index * 8}`}
              stroke="#21314a"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="absolute right-[5%] top-[13%] hidden h-[560px] w-[560px] md:block">
        <div className="absolute inset-0 rounded-full border border-[#8d7f6b]/10" />
        <div className="absolute inset-[12%] rounded-full border border-[#8d7f6b]/10" />
        <div className="absolute inset-[25%] rounded-full border border-[#8d7f6b]/10" />
        <div className="absolute inset-0 animate-spin text-center text-[10px] font-mono uppercase leading-none tracking-[0.22em] text-[#7b6b56]/20 [animation-duration:70s]">
          {binaryLines.map((line, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 w-[520px] origin-left"
              style={{ transform: `rotate(${index * 15}deg) translateX(-50%)` }}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="absolute left-[51%] top-[49%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f3ea]/70 blur-2xl" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#f7f3ea]" />
    </div>
  );
}
