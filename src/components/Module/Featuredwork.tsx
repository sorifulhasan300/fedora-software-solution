"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Project Data ─────────────────────────────────────────────── */
const projects = [
  {
    id: "01",
    category: "AI · SaaS Platform",
    title: "NexaHire",
    tagline: "AI-Powered Recruitment Intelligence",
    description:
      "A full-stack hiring platform that uses LLMs to screen CVs, rank candidates, and auto-generate interview questions — cutting time-to-hire by 60% for a 200-person HR team.",
    outcomes: [
      { label: "Faster Hiring", value: "60%" },
      { label: "CV Processed / day", value: "2.4k" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    stack: ["Next.js", "Python", "OpenAI", "PostgreSQL", "AWS"],
    image: "/projects/nexahire.png", // replace with real path or <Image />
    imageAlt: "NexaHire dashboard mockup",
    accentColor: "#3b82f6",
    glowRgb: "59,130,246",
    flip: false,
  },
  {
    id: "02",
    category: "FinTech · Mobile App",
    title: "PocketLedger",
    tagline: "Real-Time Personal Finance, Reimagined",
    description:
      "A cross-platform React Native app for automated expense tracking, smart budgeting, and AI-driven savings recommendations — onboarded 15k users in its first month.",
    outcomes: [
      { label: "Users (Month 1)", value: "15k" },
      { label: "Avg. Session", value: "8 min" },
      { label: "App Store Rating", value: "4.9★" },
    ],
    stack: ["React Native", "Expo", "Node.js", "Stripe", "Plaid"],
    image: "/projects/pocketledger.png",
    imageAlt: "PocketLedger mobile app mockup",
    accentColor: "#22d3ee",
    glowRgb: "6,182,212",
    flip: true,
  },
];

/* ─── Stat Counter Card ────────────────────────────────────────── */
function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
      <span
        className="text-xl font-extrabold tracking-tight"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

/* ─── Image Panel with parallax + zoom ────────────────────────── */
function ImagePanel({
  project,
  containerRef,
}: {
  project: (typeof projects)[0];
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1.0, 1.08],
  );
  const rawY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 24 });
  const y = useSpring(rawY, { stiffness: 80, damping: 24 });

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] aspect-[4/3] bg-card">
      {/* Placeholder gradient — replace with real <Image /> */}
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(${project.glowRgb},0.25) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 70%, rgba(${project.glowRgb},0.12) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
            `,
          }}
        />
        {/* Browser chrome mockup */}
        <div className="absolute inset-4 rounded-xl border border-white/10 bg-[#0b1221]/80 overflow-hidden">
          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/[0.06] bg-white/[0.03]">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            <div className="ml-3 flex-1 h-5 rounded-md bg-white/[0.05] border border-white/[0.06]" />
          </div>
          {/* Fake UI content */}
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-16 rounded-lg"
                  style={{
                    background: `rgba(${project.glowRgb},0.08)`,
                    border: `1px solid rgba(${project.glowRgb},0.15)`,
                  }}
                />
              ))}
            </div>
            <div className="h-24 rounded-lg bg-white/[0.04] border border-white/[0.06]" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 rounded-lg bg-white/[0.03] border border-white/[0.05]" />
              <div
                className="h-12 rounded-lg"
                style={{
                  background: `rgba(${project.glowRgb},0.12)`,
                  border: `1px solid rgba(${project.glowRgb},0.2)`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outer glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: `inset 0 0 80px rgba(${project.glowRgb},0.06)` }}
      />
    </div>
  );
}

/* ─── Single Project Row ───────────────────────────────────────── */
function ProjectRow({ project }: { project: (typeof projects)[0] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, x: project.flip ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: project.flip ? -40 : 40, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
    },
  };

  const textCol = (
    <motion.div
      key="text"
      variants={textVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex flex-col justify-center gap-6"
    >
      {/* Project number + category */}
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-xs font-bold tracking-widest"
          style={{ color: project.accentColor }}
        >
          {project.id}
        </span>
        <div
          className="h-px w-8 opacity-30"
          style={{ background: project.accentColor }}
        />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h3>
        <p
          className="mt-2 text-base font-medium"
          style={{ color: project.accentColor }}
        >
          {project.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
        {project.description}
      </p>

      {/* Outcomes */}
      <div className="grid grid-cols-3 gap-3">
        {project.outcomes.map((o) => (
          <StatCard key={o.label} {...o} accent={project.accentColor} />
        ))}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11.5px] font-medium text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        <Button
          className="group rounded-full px-6 font-semibold text-sm text-primary-foreground transition-all duration-300"
          style={{
            background: project.accentColor,
            boxShadow: `0 4px 24px rgba(${project.glowRgb},0.35)`,
          }}
        >
          Read Case Study
          <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
        </Button>
        <Button
          variant="ghost"
          className="group rounded-full px-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Live Preview
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );

  const imageCol = (
    <motion.div
      key="image"
      variants={imageVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <ImagePanel
        project={project}
        containerRef={rowRef as React.RefObject<HTMLDivElement>}
      />
    </motion.div>
  );

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center"
    >
      {project.flip ? [imageCol, textCol] : [textCol, imageCol]}
    </div>
  );
}

/* ─── Section Header ───────────────────────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Main Export ──────────────────────────────────────────────── */
export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute left-0 bottom-1/4 h-[400px] w-[400px] -translate-x-1/3 rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Section header */}
      <motion.div
        className="mx-auto mb-20 max-w-2xl text-center"
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Our Work
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          A handful of the products we&apos;ve taken from zero to production — and
          the results they delivered.
        </p>
      </motion.div>

      {/* Projects */}
      <div className="mx-auto max-w-6xl space-y-28">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
