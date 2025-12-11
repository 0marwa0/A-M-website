import React from "react";

const FlowCanvas: React.FC = () => {
  const center = { x: 550, y: 250 };

  const leftConnections = [
    {
      d: `M180 80 Q 260 40 ${center.x} ${center.y}`,
      price: "$180",
      pill: { x: 235, y: 72 },
    },
    {
      d: `M180 200 Q 250 150 ${center.x} ${center.y}`,
      price: "$90",
      pill: { x: 215, y: 190 },
    },
    {
      d: `M180 320 Q 250 310 ${center.x} ${center.y - 8}`,
      price: "$250",
      pill: { x: 215, y: 302 },
    },
    {
      d: `M180 440 Q 270 400 ${center.x} ${center.y - 20}`,
      price: "$310",
      pill: { x: 240, y: 404 },
    },
  ];

  const rightConnections = [
    {
      d: `M${center.x} ${center.y} Q 720 120 960 80`,
      price: "$180",
      color: "url(#purplePath)",
      pill: { x: 735, y: 130 },
      stroke: "#7c3aed",
    },
    {
      d: `M${center.x} ${center.y} Q 700 200 960 200`,
      price: "$90",
      color: "url(#greenPath)",
      pill: { x: 715, y: 220 },
      stroke: "#31c77f",
    },
    {
      d: `M${center.x} ${center.y + 10} Q 700 330 960 360`,
      price: "$250",
      color: "url(#orangePath)",
      pill: { x: 715, y: 330 },
      stroke: "#f99a3c",
    },
    {
      d: `M${center.x} ${center.y + 20} Q 720 420 960 500`,
      price: "$310",
      color: "url(#purplePath)",
      pill: { x: 735, y: 420 },
      stroke: "#7c3aed",
    },
  ];

  const leftNodes = [
    { y: 60, label: "Employee", icon: "briefcase" },
    { y: 180, label: "Client", icon: "user" },
    { y: 300, label: "Employer", icon: "case" },
    { y: 420, label: "Groups", icon: "group" },
  ];

  const rightNodes = [
    { y: 50, label: "Docs", color: "url(#purplePath)", icon: "doc" },
    { y: 170, label: "Analytics", color: "url(#greenPath)", icon: "pie" },
    { y: 290, label: "Payroll", color: "url(#orangePath)", icon: "dollar" },
    { y: 410, label: "Collaboration", color: "url(#purplePath)", icon: "chat" },
  ];

  return (
    <div className="flow-wrapper">
      <svg
        width="1100"
        height="500"
        viewBox="0 0 1100 500"
        className="flow-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgRadial" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#151125" />
            <stop offset="70%" stopColor="#0b0a12" />
            <stop offset="100%" stopColor="#08070d" />
          </radialGradient>
          <linearGradient id="purplePath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="greenPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#31c77f" />
            <stop offset="100%" stopColor="#8ae672" />
          </linearGradient>
          <linearGradient id="orangePath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f99a3c" />
            <stop offset="100%" stopColor="#ffbe6a" />
          </linearGradient>
          <linearGradient id="nodeGrey" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f2a35" />
            <stop offset="100%" stopColor="#0f161d" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1100" height="500" fill="url(#bgRadial)" />

        {/* Left dashed connectors */}
        {leftConnections.map((item, idx) => (
          <g key={`ld-${idx}`}>
            <path
              d={item.d}
              fill="none"
              stroke="url(#nodeGrey)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="12 10"
              strokeOpacity="0.7"
              className="flow-dash"
            />
            <g transform={`translate(${item.pill.x} ${item.pill.y})`}>
              <rect
                width="60"
                height="28"
                rx="10"
                fill="#1f2a35"
                stroke="#2e3b49"
                strokeWidth="1"
              />
              <text
                x="30"
                y="18"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#dbe3ef"
              >
                {item.price}
              </text>
            </g>
          </g>
        ))}

        {/* Right solid connectors */}
        {rightConnections.map((item, idx) => (
          <g key={`rd-${idx}`}>
            <path
              d={item.d}
              fill="none"
              stroke={item.color}
              strokeWidth="8"
              strokeLinecap="round"
              className="flow-line"
            />
            <g
              transform={`translate(${item.pill.x} ${item.pill.y})`}
              filter="url(#glow)"
            >
              <rect
                width="70"
                height="32"
                rx="12"
                fill="#0b1117"
                stroke={item.stroke}
                strokeWidth="1.5"
              />
              <text
                x="35"
                y="21"
                textAnchor="middle"
                fontSize="12"
                fontWeight="800"
                fill="#e8f2ff"
              >
                {item.price}
              </text>
            </g>
          </g>
        ))}

        {/* Left nodes */}
        {leftNodes.map((item, idx) => (
          <g key={`ln-${idx}`} transform={`translate(50 ${item.y})`}>
            <rect width="110" height="70" rx="14" fill="url(#nodeGrey)" />
            {item.icon === "briefcase" && (
              <>
                <rect
                  x="32"
                  y="28"
                  width="46"
                  height="26"
                  rx="6"
                  fill="#aeb7c5"
                />
                <rect
                  x="46"
                  y="22"
                  width="18"
                  height="8"
                  rx="2"
                  fill="#c8d1de"
                />
              </>
            )}
            {item.icon === "user" && (
              <>
                <circle cx="55" cy="32" r="12" fill="#c8d1de" />
                <rect
                  x="38"
                  y="46"
                  width="34"
                  height="14"
                  rx="7"
                  fill="#aeb7c5"
                />
              </>
            )}
            {item.icon === "case" && (
              <>
                <rect
                  x="30"
                  y="34"
                  width="50"
                  height="26"
                  rx="6"
                  fill="#c8d1de"
                />
                <rect
                  x="44"
                  y="28"
                  width="22"
                  height="8"
                  rx="2"
                  fill="#dbe3ef"
                />
              </>
            )}
            {item.icon === "group" && (
              <>
                <circle cx="45" cy="32" r="10" fill="#c8d1de" />
                <circle cx="65" cy="32" r="10" fill="#c8d1de" />
                <rect
                  x="35"
                  y="44"
                  width="40"
                  height="12"
                  rx="6"
                  fill="#aeb7c5"
                />
              </>
            )}
            <text x="75" y="24" fill="#e5eaf2" fontSize="14" fontWeight="600">
              {item.label}
            </text>
          </g>
        ))}

        {/* Right nodes */}
        {rightNodes.map((item, idx) => (
          <g key={`rn-${idx}`} transform={`translate(960 ${item.y})`}>
            <rect
              width="110"
              height="70"
              rx="16"
              fill={item.color}
              filter="url(#glow)"
            />
            {item.icon === "doc" && (
              <>
                <rect
                  x="38"
                  y="22"
                  width="34"
                  height="26"
                  rx="5"
                  fill="#f9fbff"
                  opacity="0.9"
                />
                <rect
                  x="44"
                  y="28"
                  width="22"
                  height="4"
                  rx="2"
                  fill="#8b5cf6"
                />
                <rect
                  x="44"
                  y="36"
                  width="16"
                  height="4"
                  rx="2"
                  fill="#8b5cf6"
                />
              </>
            )}
            {item.icon === "pie" && (
              <>
                <circle cx="55" cy="35" r="14" fill="#e8f5e9" />
                <path d="M55 21 A14 14 0 0 1 69 35 L55 35 Z" fill="#6bcf70" />
              </>
            )}
            {item.icon === "dollar" && (
              <>
                <circle cx="55" cy="35" r="16" fill="#fff2e3" />
                <text
                  x="55"
                  y="40"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="800"
                  fill="#f59f3f"
                >
                  $
                </text>
              </>
            )}
            {item.icon === "chat" && (
              <>
                <rect
                  x="38"
                  y="26"
                  width="34"
                  height="22"
                  rx="6"
                  fill="#f9fbff"
                  opacity="0.95"
                />
                <rect
                  x="42"
                  y="32"
                  width="26"
                  height="4"
                  rx="2"
                  fill="#a855f7"
                />
                <rect
                  x="42"
                  y="40"
                  width="18"
                  height="4"
                  rx="2"
                  fill="#a855f7"
                />
              </>
            )}
            <text
              x="55"
              y="62"
              textAnchor="middle"
              fill="#0b1117"
              fontSize="13"
              fontWeight="700"
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Absolute hub overlay to keep perfect center */}
      <div
        className="hub-abs"
        aria-hidden="true"
        style={{ left: `450px`, top: `150px`, zIndex: "999" }}
      >
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="90" fill="#7c3aed" opacity="0.08" />
          <circle cx="110" cy="110" r="66" fill="#7c3aed" opacity="0.14" />
          <circle cx="110" cy="110" r="42" fill="#7c3aed" opacity="0.2" />
          <circle cx="110" cy="110" r="26" fill="#8b5cf6" />
          <text
            x="110"
            y="118"
            textAnchor="middle"
            fill="#f9fbff"
            fontSize="30"
            fontWeight="800"
          >
            Triminds AI
          </text>
        </svg>
      </div>

      <style jsx>{`
        .flow-wrapper {
          position: relative;
          width: 1100px;
          height: 500px;
        }
        .flow-svg {
          border-radius: 20px;
          overflow: hidden;
          display: block;
        }
        .hub-abs {
          position: absolute;
          transform: translate(-50%, -50%);
          filter: drop-shadow(0 0 32px rgba(123, 92, 246, 0.75));
          animation: pulse 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        .flow-line {
          stroke-dasharray: 200 600;
          animation: flow 5s linear infinite;
        }
        .flow-dash {
          stroke-dashoffset: 120;
          animation: dash 4s linear infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.92;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -800;
          }
        }
        @keyframes dash {
          0% {
            stroke-dashoffset: 120;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowCanvas;
