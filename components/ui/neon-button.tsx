import * as React from "react";
import { cn } from "../../lib/utils";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glow?: boolean;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, glow = true, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "magnetic relative inline-flex items-center justify-center overflow-hidden rounded-xxlcard px-6 py-3 text-sm font-semibold tracking-wide uppercase text-white transition-all duration-300",
        "bg-gradient-to-r from-plasma via-aurora to-cyanflare shadow-glow",
        "hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(111,66,255,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora",
        glow && "animate-pulse-glow",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 opacity-60 blur-2xl" />
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(61,213,255,0.4),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(255,27,156,0.35),transparent_40%)]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
);

NeonButton.displayName = "NeonButton";

export { NeonButton };
