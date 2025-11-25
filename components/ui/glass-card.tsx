import { cn } from "../../lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "gradient-border relative overflow-hidden rounded-xxlcard border border-white/10 bg-white/5 text-slate-100 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md",
        "inner-glow",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,213,255,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,27,156,0.08),transparent_35%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
