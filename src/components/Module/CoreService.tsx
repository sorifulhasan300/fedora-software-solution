"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Code2, Cloud, Palette, Bot, ArrowUpRight } from "lucide-react";

/* ─── Service Data ─────────────────────────────────────────────── */
const services = [
  {
    icon: Code2,
    label: "Engineering",
    title: "Software Development",
    subtitle: "Custom Web & Mobile Apps",
    description:
      "From pixel-perfect frontends to rock-solid backends — we build full-stack products that scale with your business.",
    tags: ["Next.js", "React Native", "Node.js", "TypeScript"],
    accent: "rgba(37,99,235,0.9)",
    glowColor: "rgba(37,99,235,VAR)",
  },
  {
    icon: Cloud,
    label: "Infrastructure",
    title: "Cloud & DevOps",
    subtitle: "Architecture & Automation",
    description:
      "CI/CD pipelines, containerised deployments, and cloud infrastructure engineered for zero-downtime delivery.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    accent: "rgba(99,102,241,0.9)",
    glowColor: "rgba(99,102,241,VAR)",
  },
  {
    icon: Palette,
    label: "Design",
    title: "UI/UX Design",
    subtitle: "Prototyping & Design Systems",
    description:
      "Research-led interfaces that feel intuitive the first time. We prototype fast and polish until it's effortless.",
    tags: ["Figma", "Design Systems", "Prototyping", "Motion"],
    accent: "rgba(139,92,246,0.9)",
    glowColor: "rgba(139,92,246,VAR)",
  },
  {
    icon: Bot,
    label: "Intelligence",
    title: "AI & Automation",
    subtitle: "Solutions & Integrations",
    description:
      "LLM-powered features, intelligent workflows, and data pipelines that turn your product into a competitive edge.",
    tags: ["LLM Integration", "RAG", "Agents", "MLOps"],
    accent: "rgba(6,182,212,0.9)",
    glowColor: "rgba(6,182,212,VAR)",
  },
];

/* ─── Container animation ──────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Single Service Card ──────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = service.icon;

  /* Magnetic tilt effect */
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-60, 60], [4, -4]);
  const rotateY = useTransform(springX, [-60, 60], [-4, 4]);

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    x.set(cx - rect.width / 2);
    y.set(cy - rect.height / 2);
    glowX.set((cx / rect.width) * 100);
    glowY.set((cy / rect.height) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  const glowColor = service.glowColor;

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-card p-7 cursor-default overflow-hidden"
    >
      {/* Radial glow that follows the cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(320px circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor.replace("VAR", "0.10")}, transparent 70%)`,
        }}
      />

      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColor.replace("VAR", "0.45")}`,
        }}
      />

      {/* Outer glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          boxShadow: `0 0 40px 0 ${glowColor.replace("VAR", "0.12")}`,
        }}
      />

      {/* Label pill */}
      <div className="mb-5 flex items-center justify-between">
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
          style={{
            background: glowColor.replace("VAR", "0.12"),
            color: service.accent,
          }}
        >
          {service.label}
        </span>
        <motion.div
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted-foreground group-hover:text-foreground group-hover:border-white/20 transition-all duration-300"
          whileHover={{ rotate: -45 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Icon */}
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110"
        style={{
          background: glowColor.replace("VAR", "0.12"),
          boxShadow: `0 0 0 1px ${glowColor.replace("VAR", "0.2")}`,
        }}
      >
        <Icon
          className="h-7 w-7 transition-all duration-300"
          style={{ color: service.accent }}
        />
      </div>

      {/* Text */}
      <h3 className="mb-0.5 text-[18px] font-bold tracking-tight text-foreground">
        {service.title}
      </h3>
      <p className="mb-3 text-sm font-medium" style={{ color: service.accent }}>
        {service.subtitle}
      </p>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted-foreground group-hover:border-white/[0.12] group-hover:text-foreground/70 transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${glowColor.replace("VAR", "0.6")}, transparent)`,
        }}
      />
    </motion.div>
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
export function CoreServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Section header */}
      <motion.div
        className="mx-auto mb-16 max-w-2xl text-center"
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          What We Do
        </span>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Core <span className="text-primary">Services</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          End-to-end technology solutions — from the first wireframe to
          production deployment and beyond.
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
