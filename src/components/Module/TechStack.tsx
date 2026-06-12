"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechItem {
  name: string;
  category: string;
  color: string;
  path: string;
  monochrome: string;
}

const techStack: TechItem[] = [
  {
    name: "Next.js",
    category: "Framework",
    color: "#ffffff",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2L2 19.5h20L12 2zm0 4l6.5 11h-13L12 6z",
  },
  {
    name: "React",
    category: "Library",
    color: "#61DAFB",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-9a9 9 0 0 1 6.36 15.36 7.5 7.5 0 1 0-12.72 0A9 9 0 0 1 12 4.5zm0 16.5a7.5 7.5 0 0 1-6.36-11.64 9 9 0 0 0 12.72 0 7.5 7.5 0 0 1-6.36 11.64z",
  },
  {
    name: "Node.js",
    category: "Runtime",
    color: "#68A063",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5L18.5 8 12 10.5 5.5 8 12 4.5zM5 9.5l6 3.33v6.67l-6-3.33V9.5zm8 9.67v-6.67l6-3.33v6.67l-6 3.33z",
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M3 3h18v18H3V3zm14.5 10.5v-1h-4v1h1.25v5h1.5v-5H17.5zm-6.5 0v-1H9v4h1.25v-2.5h1.5L12 14h2l-1.25-2.5h1.5V10H11v3.5z",
  },
  {
    name: "Python",
    category: "Language",
    color: "#3776AB",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2c-1.5 0-2.75.5-3.75 1.5C7.5 4.75 7.5 6.25 7.5 7.5c0 1.25.25 2.75 1.75 2.75h.75c1.5 0 2.75-1.25 2.75-2.75 0-2.25-1.25-4-3.5-4-.5 0-1 .25-1.25.5-.5.5-.5 1.25-.25 2 1 1.25 1.75 3 1.75 4.75 0 3.25-1.75 5.5-4.75 5.5-2.5 0-4.25-1.25-5-3.5-.25-.75-.25-1.5 0-2.25.5-1.5 1.75-2.25 3.25-2.25H8c2.25 0 4 1.75 4 4 0 2.25-1 4.25-3 4.25-.5 0-1-.25-1.25-.5-.5-.5-.5-1.25-.25-2 1-1.25 1.75-3 1.75-4.75 0-3.25 1.75-5.5 4.75-5.5 2.5 0 4.25 1.25 5 3.5.25.75.25 1.5 0 2.25-.5 1.5-1.75 2.25-3.25 2.25h-.75c-2.25 0-4-1.75-4-4 0-2.25 1-4.25 3-4.25.5 0 1 .25 1.25.5.5.5.5 1.25.25 2-1 1.25-1.75 3-1.75 4.75 0 3.25 1.75 5.5 4.75 5.5 2.5 0 4.25-1.25 5-3.5.25-.75.25-1.5 0-2.25-.5-1.5-1.75-2.25-3.25-2.25z",
  },
  {
    name: "AWS",
    category: "Cloud",
    color: "#FF9900",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M7.5 10c1.5 0 2.5.5 3 1.5.5-1 1.5-1.5 3-1.5 1.5 0 2.5.5 3 1.5-.5 1-1.5 1.5-3 1.5-1 0-2-.25-2.5-.75v2.25c.5.5 1.5.75 2.5.75 2.5 0 4.5-1.5 4.5-4.25 0-3.25-2.75-4-4.75-4-2.25 0-4 .75-5 2.25-.5.75-1 2.25-1 4.25 0 1.5.25 2.75.75 3.5.5-.75 1-2 1-3.5 0-.5-.05-1.1-.15-1.6-.5.4-1.1.65-1.85.65-1.25 0-2.25-.5-3-1.5.5-1.5 1.75-2.5 3.25-2.5zm-3 3.5c0-.75.2-1.4.55-1.9.75.85 1.75 1.4 3 1.4.75 0 1.4-.2 1.9-.55v1.65c-.5.35-1.15.55-1.9.55-1.25 0-2.25-.55-2.9-1.4-.35.5-.55 1.15-.55 1.9v-.65zm.25-7.5c1 0 1.75.4 2.25 1.05.5-.65 1.25-1.05 2.25-1.05s1.75.4 2.25 1.05c.5-.65 1.25-1.05 2.25-1.05 1.75 0 3 1.25 3 3.25h-2c0-.75-.25-1.25-1-1.25-.75 0-1.25.5-1.25 1.25h-3.5c0-.75-.5-1.25-1.25-1.25-.75 0-1 .5-1 1.25h-2c0-2 1.25-3.25 3-3.25zm3.25 6.75c.5 0 .9.4.9.9h-1.8c0-.5.4-.9.9-.9zm-2.5 0c.5 0 .9.4.9.9h-1.8c0-.5.4-.9.9-.9z",
  },
  {
    name: "Tailwind",
    category: "CSS",
    color: "#06B6D4",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76-.17 1.42.08 1.95.55L12 10.5l.55-1.45c.53-.47 1.2-.72 1.95-.55 1.33.33 2.5.17 3.5 1.5-.67-2.67-2.33-4-5-4zm-5 6c-.83 0-1.5.67-1.5 1.5S6.17 15 7 15h10c.83 0 1.5-.67 1.5-1.5S17.83 12 17 12h-10z",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#4169E1",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "#2496ED",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M4.5 11h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM4.5 14h15v-2h-2v-2h2v-2h-2v-2h2V6h-2V4h2V2h-2V0H4.5v2H2v2h2v2H2v2h2v2H2v2h2v2H0v3h15v3h4.5v-3h2v-2h-2v-2h2v-2h-2v-2h2V8h-2V6h2V4h-2V2h-2V0h-3v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v3z",
  },
  {
    name: "Figma",
    category: "Design",
    color: "#F24E1E",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z",
  },
  {
    name: "GitHub",
    category: "Version Control",
    color: "#ffffff",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z",
  },
  {
    name: "MongoDB",
    category: "Database",
    color: "#47A248",
    monochrome: "rgba(255,255,255,0.35)",
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-3 2-3v6zm4 0v-6l2 3-2 3z",
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
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-7 cursor-default"
    >
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          className="h-9 w-9"
          style={{
            fill: tech.monochrome,
            filter: "drop-shadow(0 0 0px transparent)",
            transition: "fill 0.35s ease, filter 0.35s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as SVGElement).style.fill = tech.color;
            (e.currentTarget as SVGElement).style.filter = `drop-shadow(0 0 10px ${tech.color}60)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as SVGElement).style.fill = tech.monochrome;
            (e.currentTarget as SVGElement).style.filter = "drop-shadow(0 0 0px transparent)";
          }}
        >
          <path d={tech.path} />
        </svg>
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
