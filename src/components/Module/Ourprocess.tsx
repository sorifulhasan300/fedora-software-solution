"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Search,
  FileImageIcon,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ─── Why Us Data ──────────────────────────────────────────────── */
const whyUs = [
  { value: "5+", label: "Years shipping products" },
  { value: "40+", label: "Projects delivered" },
  { value: "98%", label: "Client retention rate" },
  { value: "12h", label: "Avg. response time" },
];

const differentiators = [
  "Full-stack ownership — one team, zero handoff chaos",
  "Transparent pricing with fixed-scope contracts",
  "Weekly demos so you always see progress",
  "Post-launch support included as standard",
];

/* ─── Process Steps ────────────────────────────────────────────── */
const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    subtitle: "Understanding before building",
    description:
      "We start by listening. A structured kickoff workshop maps your business goals, user needs, and technical constraints into a clear product brief — so we build the right thing, not just a thing.",
    deliverables: [
      "Product brief",
      "User personas",
      "Tech stack recommendation",
      "Project roadmap",
    ],
    duration: "1 – 2 weeks",
    accent: "#3b82f6",
    glow: "59,130,246",
  },
  {
    number: "02",
    icon: FileImageIcon,
    title: "Prototype",
    subtitle: "High-fidelity before high-cost",
    description:
      "Interactive Figma prototypes let you experience the product before a single line of code is written. We refine until every click feels right — then lock the design system for development.",
    deliverables: [
      "Wireframes",
      "Interactive prototype",
      "Design system",
      "Component library",
    ],
    duration: "2 – 3 weeks",
    accent: "#a78bfa",
    glow: "139,92,246",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    subtitle: "Agile sprints, visible progress",
    description:
      "Two-week sprints with a live staging environment you can access anytime. Every Friday we demo what was built. Code is reviewed, tested, and documented as we go — not bolted on at the end.",
    deliverables: [
      "Production-grade code",
      "CI/CD pipeline",
      "Test coverage",
      "Weekly demos",
    ],
    duration: "6 – 16 weeks",
    accent: "#22d3ee",
    glow: "6,182,212",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    subtitle: "Go live with confidence",
    description:
      "Zero-downtime deployment to your chosen cloud, monitoring configured, and a 90-day support window included. We don't disappear at handover — we make sure it runs in the real world.",
    deliverables: [
      "Cloud deployment",
      "Performance monitoring",
      "90-day support",
      "Documentation",
    ],
    duration: "1 week + 90-day support",
    accent: "#34d399",
    glow: "52,211,153",
  },
];

/* ─── Step Card ────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[0];
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-30% 0px -30% 0px" });

  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      className="relative rounded-2xl border border-white/[0.07] bg-card p-8 overflow-hidden"
    >
      {/* Active indicator glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-700"
        animate={{ opacity: isInView ? 1 : 0 }}
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${step.glow},0.35), 0 0 60px rgba(${step.glow},0.08)`,
        }}
      />

      {/* Top row: number + duration */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Icon box */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500"
            style={{
              background: `rgba(${step.glow},0.12)`,
              boxShadow: `0 0 0 1px rgba(${step.glow},0.2)`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: step.accent }} />
          </div>
          {/* Step number */}
          <span
            className="font-mono text-4xl font-black leading-none opacity-20"
            style={{ color: step.accent }}
          >
            {step.number}
          </span>
        </div>
        {/* Duration pill */}
        <span
          className="rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-widest"
          style={{
            background: `rgba(${step.glow},0.1)`,
            color: step.accent,
            border: `1px solid rgba(${step.glow},0.2)`,
          }}
        >
          {step.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-extrabold tracking-tight text-foreground mb-1">
        {step.title}
      </h3>
      <p className="text-sm font-semibold mb-4" style={{ color: step.accent }}>
        {step.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-6">
        {step.description}
      </p>

      {/* Deliverables */}
      <div className="grid grid-cols-2 gap-2">
        {step.deliverables.map((d) => (
          <div key={d} className="flex items-center gap-2">
            <CheckCircle2
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: step.accent }}
            />
            <span className="text-[12px] font-medium text-muted-foreground">
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px"
        style={{
          background: `linear-gradient(to right, transparent, rgba(${step.glow},0.5), transparent)`,
          opacity: isInView ? 1 : 0,
          transition: "opacity 0.6s",
        }}
      />
    </motion.div>
  );
}

/* ─── Main Export ──────────────────────────────────────────────── */
export function OurProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  /* Track scroll progress across the entire steps column */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  /* Progress line height */
  const lineHeight = useTransform(springProgress, [0.1, 0.9], ["0%", "100%"]);

  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Why <span className="text-primary">Choose Us</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base text-muted-foreground leading-relaxed">
            A repeatable, transparent process that turns vague ideas into
            shipped products — on time, on budget.
          </p>
        </motion.div>

        {/* ── Two-column sticky layout ── */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.15fr]">
          {/* LEFT — Sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-10">
            {/* Why us stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <div className="grid grid-cols-2 gap-3 mb-8">
                {whyUs.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.07] bg-card p-4 flex flex-col gap-1"
                  >
                    <span className="text-2xl font-black tracking-tight text-primary">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Differentiators */}
              <div className="rounded-2xl border border-white/[0.07] bg-card p-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  What makes us different
                </p>
                {differentiators.map((d) => (
                  <div key={d} className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm leading-snug text-foreground/80">
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scroll progress bar (desktop only) */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Process
                </p>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="relative h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary"
                  style={{ width: lineHeight }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {steps.map((s) => (
                  <span
                    key={s.number}
                    className="text-[10px] font-bold text-muted-foreground/50"
                  >
                    {s.number}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Scrolling steps */}
          <div ref={stepsRef} className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                progress={springProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
