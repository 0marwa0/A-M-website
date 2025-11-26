import { ArrowRight, Cpu, ShieldHalf, Sparkle, Sparkles, Workflow } from "lucide-react";
import { GlassCard } from "../components/ui/glass-card";
import { NeonButton } from "../components/ui/neon-button";
import { SectionShell } from "../components/ui/section-shell";
import { Particles } from "../components/particles";

const features = [
  {
    title: "Cinematic Intelligence",
    description: "Multimodal agents orchestrated with cinematic precision for realtime decisioning.",
    icon: Sparkles
  },
  {
    title: "Neon Security Mesh",
    description: "Layered trust, privacy, and encryption built for mission critical AI workloads.",
    icon: ShieldHalf
  },
  {
    title: "Adaptive Pipelines",
    description: "Continuously learning flows with self-healing feedback loops and human-in-the-loop controls.",
    icon: Workflow
  }
];

const stacks = [
  {
    title: "Neural Fabric",
    body: "Composable micro-agents stitched with memory, context routing, and live reasoning.",
    tag: "Core Layer"
  },
  {
    title: "Sentient Interface",
    body: "Voice, chat, and spatial canvases with responsive neon cues and adaptive storytelling.",
    tag: "Experience"
  },
  {
    title: "Observability",
    body: "Signals, traces, and AI-specific SLOs surfaced in a lucid, cinematic command center.",
    tag: "Insights"
  }
];

export default function Page() {
  return (
    <div className="relative overflow-hidden">
      <Particles />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-aurora/15 via-transparent to-plasma/10" />
      <div className="relative isolate">
        <header className="relative mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-20 pt-24 md:pt-28 lg:flex-row lg:items-center">
          <div className="absolute inset-x-0 top-8 mx-auto h-72 w-[88%] rounded-full bg-gradient-to-r from-plasma/10 via-aurora/15 to-cyanflare/10 blur-3xl" />
          <div className="relative z-10 flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyanflare backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-plasma to-cyanflare shadow-[0_0_18px_rgba(56,214,255,0.9)]" />
              M2A Ai
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">Futuristic Intelligence Platform</p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_10px_55px_rgba(111,66,255,0.35)] md:text-6xl">
                Neon-grade agents for <span className="text-transparent bg-gradient-to-r from-plasma via-aurora to-cyanflare bg-clip-text">M2A Ai</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-200/85">
                Build cinematic AI experiences with adaptive agents, glassy surfaces, and luminous control. Precision routing,
                observability, and secured pipelines — all in one nebula.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <NeonButton>
                Start Experimenting <ArrowRight className="h-4 w-4" />
              </NeonButton>
              <button className="group relative inline-flex items-center gap-2 rounded-xxlcard border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyanflare/50 hover:bg-white/10">
                <span className="absolute inset-0 rounded-xxlcard bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 blur transition-opacity duration-300 group-hover:opacity-80" />
                Watch Demo <Sparkle className="h-4 w-4 text-cyanflare" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/80 md:max-w-xl md:grid-cols-4">
              {["Realtime Ops", "Neural Fabric", "Glass UI", "Secure by design"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center shadow-inner backdrop-blur-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex-1">
            <GlassCard className="relative border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-plasma/30 blur-3xl" />
              <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-cyanflare/25 blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-black/30 p-6 shadow-inner">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
                  <span>Neural Flightpath</span>
                  <span className="text-cyanflare">Live</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { label: "Signal Density", value: "98.6%", hue: "from-cyanflare/80 to-aurora/70" },
                    { label: "Stability", value: "99.95%", hue: "from-aurora/80 to-plasma/70" },
                    { label: "Latency", value: "23 ms", hue: "from-plasma/80 to-cyanflare/70" }
                  ].map((metric) => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/65">
                        <span>{metric.label}</span>
                        <span className="font-semibold text-white">{metric.value}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/5 shadow-inner">
                        <div className={`h-full w-[88%] bg-gradient-to-r ${metric.hue} shadow-[0_0_25px_rgba(255,255,255,0.45)]`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-white/80">
                  {["Adaptive Memory", "Vision+LLM", "Governed Flows"].map((chip) => (
                    <div key={chip} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                      {chip}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </header>

        <SectionShell
          eyebrow="Capabilities"
          title="Built for luminous AI teams"
          subtitle="A cinematic system of neon-lit agents, hardened security, and adaptive controls to craft the future of intelligence."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <GlassCard key={feature.title} className="group relative p-6">
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-aurora/20 blur-3xl transition-all duration-500 group-hover:scale-110" />
                <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-plasma/16 blur-3xl transition-all duration-500 group-hover:scale-125" />
                <div className="relative space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyanflare shadow-inner">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-cyanflare">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          eyebrow="Experience"
          title="Glassmorphic command surface"
          subtitle="Layered gradients, glass surfaces, and soft neon glows guide focus while keeping the interface cinematic."
        >
          <GlassCard className="relative overflow-hidden border-white/15 bg-white/5 p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  Cinematic UI
                </div>
                <h3 className="text-3xl font-semibold text-white">Illuminated interactions</h3>
                <p className="text-base leading-relaxed text-white/75">
                  From hero to handoff, every element carries neon gradients, soft glows, and motion that respects cognition.
                  Cards float, particles shimmer, and glass layers hold depth without distraction.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  {["Soft neon glows", "Glassmorphism", "Adaptive spacing", "Smooth fades"].map((pill) => (
                    <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-aurora/25 blur-3xl" />
                <div className="absolute -right-4 -top-10 h-32 w-32 rounded-full bg-plasma/20 blur-3xl" />
                <div className="relative rounded-xxlcard border border-white/10 bg-black/50 p-6 shadow-inner">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>Orchestration</span>
                    <span className="text-cyanflare">Realtime</span>
                  </div>
                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner">
                      <div className="flex items-center gap-3 text-white/80">
                        <Sparkles className="h-5 w-5 text-plasma" />
                        <div>
                          <p className="text-sm font-semibold text-white">Generative Mesh</p>
                          <p className="text-xs text-white/60">Context routing across modalities</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-gradient-to-r from-plasma to-cyanflare px-3 py-1 text-[11px] font-semibold uppercase text-white">
                        Active
                      </span>
                    </div>
                    {stacks.map((stack) => (
                      <div key={stack.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-aurora/40 via-plasma/30 to-cyanflare/30 p-[1px]">
                              <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-black/50">
                                <Cpu className="h-5 w-5 text-cyanflare" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{stack.title}</p>
                              <p className="text-xs text-white/60">{stack.body}</p>
                            </div>
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.16em] text-plasma">{stack.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </SectionShell>

        <SectionShell
          eyebrow="Stacks"
          title="Trusted by teams engineering tomorrow"
          subtitle="Security-first primitives, neon visuals, and kinetic motion craft an experience that feels alive."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {["Latency-aware agents", "Observability console", "Compliance ready"].map((line) => (
              <div
                key={line}
                className="rounded-xxlcard border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-6 py-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-plasma/50 via-aurora/50 to-cyanflare/40 shadow-glow" />
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{line}</div>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-plasma via-aurora to-cyanflare shadow-[0_0_25px_rgba(61,213,255,0.65)]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xxlcard border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Join the shift</p>
              <h3 className="text-2xl font-semibold text-white">Deploy M2A Ai with neon clarity</h3>
            </div>
            <NeonButton className="px-5 py-3 text-xs uppercase tracking-[0.25em]">
              Launch Studio <ArrowRight className="h-4 w-4" />
            </NeonButton>
          </div>
        </SectionShell>
      </div>
    </div>
  );
}
