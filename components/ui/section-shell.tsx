import { cn } from "../../lib/utils";

type SectionShellProps = {
  className?: string;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function SectionShell({ className, children, eyebrow, title, subtitle }: SectionShellProps) {
  return (
    <section className={cn("relative mx-auto max-w-6xl px-6 py-16 md:py-20", className)}>
      <div className="pointer-events-none absolute inset-0 blur-3xl">
        <div className="absolute left-20 top-10 h-32 w-32 rounded-full bg-aurora/15" />
        <div className="absolute right-16 top-6 h-40 w-40 rounded-full bg-plasma/12" />
      </div>
      <div className="relative mb-10 max-w-3xl space-y-4">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyanflare">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-plasma to-cyanflare shadow-[0_0_20px_rgba(56,214,255,0.7)]" />
            {eyebrow}
          </div>
        )}
        {title && <h2 className="text-3xl font-semibold tracking-tight text-white drop-shadow-lg md:text-4xl">{title}</h2>}
        {subtitle && <p className="text-base leading-relaxed text-slate-200/85 md:text-lg">{subtitle}</p>}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
