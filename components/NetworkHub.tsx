import {
  Code,
  FileText,
  User,
  Briefcase,
  Users,
  PieChart,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { NodeCard } from "./NodeCard";

const brandStart = "#00c2e0";
const brandEnd = "#6be8ff";

export default function NetworkHub() {
  const leftNodes = [
    { id: "employee", label: "Employee", icon: FileText, price: 180, top: "5%" },
    { id: "client", label: "Client", icon: User, price: 90, top: "30%" },
    { id: "employer", label: "Employer", icon: Briefcase, price: 250, top: "55%" },
    { id: "groups", label: "Groups", icon: Users, price: 310, top: "80%" },
  ];

  const rightNodes = [
    { id: "docs", label: "Docs", icon: FileText, price: 180, bg: `from-[${brandStart}] to-[${brandEnd}]`, top: "5%" },
    { id: "analytics", label: "Analytics", icon: PieChart, price: 90, bg: "from-lime-500 to-lime-400", top: "30%" },
    { id: "payroll", label: "Payroll", icon: DollarSign, price: 250, bg: "from-amber-400 to-amber-300", top: "55%" },
    { id: "collaboration", label: "Collaboration", icon: MessageSquare, price: 310, bg: `from-[${brandStart}] to-[${brandEnd}]`, top: "80%" },
  ];

  return (
    <div className="relative w-full max-w-6xl h-[600px]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="grad-brand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: brandStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: brandEnd, stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-lime" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: brandStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#84cc16", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: brandStart, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="grad-grey" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#1f2a35", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#172029", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Left connections */}
        <path d="M 200 80 Q 260 50 450 250" stroke="url(#grad-grey)" strokeWidth="3" fill="none" strokeDasharray="10,10" opacity="0.6" strokeLinecap="round" />
        <path d="M 200 200 Q 250 170 450 250" stroke="url(#grad-grey)" strokeWidth="3" fill="none" strokeDasharray="10,10" opacity="0.6" strokeLinecap="round" />
        <path d="M 200 360 Q 250 350 450 260" stroke="url(#grad-grey)" strokeWidth="3" fill="none" strokeDasharray="10,10" opacity="0.6" strokeLinecap="round" />
        <path d="M 200 500 Q 270 470 450 280" stroke="url(#grad-grey)" strokeWidth="3" fill="none" strokeDasharray="10,10" opacity="0.6" strokeLinecap="round" />

        {/* Right connections */}
        <path d="M 550 250 Q 670 120 900 80" stroke="url(#grad-brand)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 550 250 Q 660 210 900 200" stroke="url(#grad-lime)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 550 260 Q 660 330 900 360" stroke="url(#grad-amber)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 550 270 Q 670 420 900 500" stroke="url(#grad-brand)" strokeWidth="5" fill="none" strokeLinecap="round" />

        {/* Price tags left */}
        {[
          { x: 250, y: 110, text: "$180" },
          { x: 230, y: 210, text: "$90" },
          { x: 230, y: 340, text: "$250" },
          { x: 260, y: 445, text: "$310" },
        ].map((tag, idx) => (
          <g key={`lp-${idx}`}>
            <rect x={tag.x} y={tag.y} width="55" height="28" rx="6" fill="#0f1720" stroke="#2e3b49" strokeWidth="1" />
            <text x={tag.x + 28} y={tag.y + 18} fill="#d5deea" fontSize="12" fontWeight="700" textAnchor="middle">
              {tag.text}
            </text>
          </g>
        ))}

        {/* Price tags right */}
        {[
          { x: 690, y: 110, text: "$180", stroke: brandStart },
          { x: 710, y: 210, text: "$90", stroke: "#84cc16" },
          { x: 710, y: 340, text: "$250", stroke: "#f97316" },
          { x: 690, y: 445, text: "$310", stroke: brandStart },
        ].map((tag, idx) => (
          <g key={`rp-${idx}`}>
            <rect x={tag.x} y={tag.y} width="60" height="28" rx="6" fill="#0b1117" stroke={tag.stroke} strokeWidth="1.5" />
            <text x={tag.x + 30} y={tag.y + 18} fill="#e8f2ff" fontSize="12" fontWeight="800" textAnchor="middle">
              {tag.text}
            </text>
          </g>
        ))}

        {/* Center hub */}
        <g transform="translate(600 250)">
          <circle r="160" fill="url(#grad-brand)" opacity="0.08" />
          <circle r="110" fill="url(#grad-brand)" opacity="0.12" />
          <circle r="70" fill="url(#grad-brand)" opacity="0.2" />
          <circle r="50" fill="url(#grad-brand)" />
          <circle r="30" fill="url(#grad-brand)" opacity="0.3" />
          <text textAnchor="middle" fill="#0b1117" fontSize="26" fontWeight="800" dy="8">
            <tspan>⇆</tspan>
          </text>
        </g>
      </svg>

      {/* Left nodes */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around" style={{ width: "180px" }}>
        {leftNodes.map((node) => (
          <NodeCard
            key={node.id}
            label={node.label}
            icon={node.icon}
            side="left"
            style={{ position: "absolute", top: node.top }}
          />
        ))}
      </div>

      {/* Right nodes */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around" style={{ width: "180px" }}>
        {rightNodes.map((node) => (
          <NodeCard
            key={node.id}
            label={node.label}
            icon={node.icon}
            side="right"
            gradient={node.bg}
            style={{ position: "absolute", top: node.top }}
          />
        ))}
      </div>
    </div>
  );
}
