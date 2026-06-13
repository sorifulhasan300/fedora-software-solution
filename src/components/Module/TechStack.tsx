"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiGithub,
  SiMongodb,
} from "react-icons/si";
import { BsAmazon } from "react-icons/bs";

interface TechItem {
  name: string;
  category: string;
  color: string;
  icon: IconType;
}

const techStack: TechItem[] = [
  {
    name: "Next.js",
    category: "Framework",
    color: "#ffffff",
    icon: SiNextdotjs,
  },
  {
    name: "React",
    category: "Library",
    color: "#61DAFB",
    icon: SiReact,
  },
  {
    name: "Node.js",
    category: "Runtime",
    color: "#68A063",
    icon: SiNodedotjs,
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
    icon: SiTypescript,
  },
  {
    name: "Python",
    category: "Language",
    color: "#3776AB",
    icon: SiPython,
  },
  {
    name: "AWS",
    category: "Cloud",
    color: "#FF9900",
    icon: BsAmazon,
  },
  {
    name: "Tailwind",
    category: "CSS",
    color: "#06B6D4",
    icon: SiTailwindcss,
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#4169E1",
    icon: SiPostgresql,
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "#2496ED",
    icon: SiDocker,
  },
  {
    name: "Figma",
    category: "Design",
    color: "#F24E1E",
    icon: SiFigma,
  },
  {
    name: "GitHub",
    category: "Version Control",
    color: "#ffffff",
    icon: SiGithub,
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "#47A248",
    icon: SiMongodb,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function TechBadge({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-7 cursor-default"
    >
      <div className="relative">
        <Icon
          size={36}
          style={{
            color: "rgba(255,255,255,0.35)",
            filter: "drop-shadow(0 0 0px transparent)",
            transition: "color 0.35s ease, filter 0.35s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as SVGElement;
            el.style.color = tech.color;
            el.style.filter = `drop-shadow(0 0 10px ${tech.color}60)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as SVGElement;
            el.style.color = "rgba(255,255,255,0.35)";
            el.style.filter = "drop-shadow(0 0 0px transparent)";
          }}
        />
      </div>

      <div className="text-center">
        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/70 group-hover:text-foreground transition-colors duration-300">
          {tech.name}
        </span>
        <span className="block mt-1 text-[10px] font-medium text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300">
          {tech.category}
        </span>
      </div>
    </motion.div>
  );
}

export function TechStackShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              background: "var(--brand-muted)",
              color: "var(--brand)",
              border: "1px solid var(--border-soft)",
            }}
          >
            Tech Stack
          </span>
          <h2
            className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{ color: "var(--text-base)" }}
          >
            Tools We <span style={{ color: "var(--brand)" }}>Build With</span>
          </h2>
          <p
            className="mt-4 mx-auto max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            We pick the right tool for the job — battle-tested, performant, and built for the long run.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {techStack.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--text-subtle)" }}
          >
            And many more — we adapt to your stack
          </p>
        </motion.div>
      </div>
    </section>
  );
}
