import { LucideIcon } from "lucide-react";

interface NodeCardProps {
  label: string;
  icon: LucideIcon;
  side: "left" | "right";
  gradient?: string;
  style?: React.CSSProperties;
}

export function NodeCard({ label, icon: Icon, side, gradient, style }: NodeCardProps) {
  const isLeft = side === "left";

  return (
    <div style={style} className="flex flex-col items-center gap-2">
      {!isLeft && <span className="text-gray-300 text-sm">{label}</span>}

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
          isLeft
            ? "bg-gradient-to-br from-[#0f1720] to-[#0b1117] border border-white/10"
            : `bg-gradient-to-br ${gradient ?? "from-[#00d9ff] to-[#6be8ff]"} shadow-xl`
        }`}
      >
        <Icon
          className={`w-8 h-8 ${isLeft ? "text-gray-300" : "text-[#0b1117]"}`}
          strokeWidth={2}
        />
      </div>

      {isLeft && <span className="text-gray-300 text-sm">{label}</span>}
    </div>
  );
}
