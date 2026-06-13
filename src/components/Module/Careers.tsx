"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  Zap,
  Globe,
  Heart,
  TrendingUp,
  Shield,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ───────────────────────────────────────────────────────────────────

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  level: "Junior" | "Mid" | "Senior" | "Lead";
  description: string;
  skills: string[];
  posted: string;
}

interface Perk {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const jobListings: JobListing[] = [
  {
    id: "swe-01",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote / Dhaka",
    type: "Full-time",
    level: "Senior",
    description:
      "Build and own complex, scalable web applications end-to-end. You'll work across our entire stack — Next.js, Node.js, PostgreSQL — and help define architecture for our fastest-growing products.",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    posted: "2 days ago",
  },
  {
    id: "fe-01",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Craft pixel-perfect, performant user interfaces that delight our clients. You care deeply about the details — animations, accessibility, and design systems are your comfort zone.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    posted: "5 days ago",
  },
  {
    id: "devops-01",
    title: "DevOps / Cloud Engineer",
    department: "Infrastructure",
    location: "Remote / Hybrid",
    type: "Full-time",
    level: "Senior",
    description:
      "Architect and automate our cloud infrastructure on AWS. You'll own CI/CD pipelines, container orchestration with Docker & Kubernetes, and ensure 99.9% uptime for our clients.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    posted: "1 week ago",
  },
  {
    id: "design-01",
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Shape the visual identity and user experience of our products. You'll collaborate directly with engineers and clients to turn complex requirements into elegant, intuitive interfaces.",
    skills: ["Figma", "Prototyping", "Design Systems", "User Research"],
    posted: "3 days ago",
  },
  {
    id: "ai-01",
    title: "AI / ML Engineer",
    department: "AI Lab",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    description:
      "Build intelligent systems that power our AI-driven products. From LLM integrations to custom ML pipelines, you'll be at the frontier of what's possible.",
    skills: ["Python", "PyTorch", "LangChain", "FastAPI", "OpenAI API"],
    posted: "Today",
  },
];

const perks: Perk[] = [
  {
    icon: Globe,
    title: "100% Remote-First",
    description: "Work from anywhere in the world. We trust you to do your best work on your own terms.",
    accent: "#06B6D4",
  },
  {
    icon: TrendingUp,
    title: "Grow Fast",
    description: "Structured growth paths, mentorship, and a $1,200/year learning & development budget.",
    accent: "#2563EB",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Full medical, dental, and vision coverage plus a monthly wellness stipend.",
    accent: "#F24E1E",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Stack",
    description: "Work with the latest technologies — AI, cloud-native, and modern web frameworks.",
    accent: "#F59E0B",
  },
  {
    icon: Users,
    title: "Inclusive Culture",
    description: "A diverse, respectful team that values every voice. No politics, just great work.",
    accent: "#47A248",
  },
  {
    icon: Shield,
    title: "Stability & Equity",
    description: "Competitive salaries, performance bonuses, and equity options for all full-time roles.",
    accent: "#8B5CF6",
  },
];

const levelColors: Record<JobListing["level"], string> = {
  Junior: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400",
  Mid: "text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400",
  Senior: "text-violet-600 bg-violet-500/10 border-violet-500/20 dark:text-violet-400",
  Lead: "text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400",
};

const typeColors: Record<JobListing["type"], string> = {
  "Full-time": "text-primary bg-primary/10 border-primary/20",
  "Part-time": "text-cyan-600 bg-cyan-500/10 border-cyan-500/20 dark:text-cyan-400",
  Contract: "text-orange-600 bg-orange-500/10 border-orange-500/20 dark:text-orange-400",
  Remote: "text-green-600 bg-green-500/10 border-green-500/20 dark:text-green-400",
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── Perk Card ────────────────────────────────────────────────────────────────

function PerkCard({ perk, index }: { perk: Perk; index: number }) {
  const Icon = perk.icon;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface-raised p-6 overflow-hidden"
    >
      {/* Subtle corner glow */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: perk.accent }}
      />
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border"
        style={{
          background: `${perk.accent}18`,
          borderColor: `${perk.accent}30`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: perk.accent }} />
      </div>
      <div>
        <h3 className="text-[15px] font-bold text-text-base mb-1">{perk.title}</h3>
        <p className="text-sm leading-relaxed text-text-muted">{perk.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job }: { job: JobListing }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl border border-border-soft bg-surface-raised overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_32px_rgba(37,99,235,0.08)]"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

      <div className="p-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelColors[job.level]}`}>
                {job.level}
              </span>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeColors[job.type]}`}>
                {job.type}
              </span>
              <span className="text-[11px] text-text-subtle">{job.posted}</span>
            </div>
            <h3 className="text-lg font-bold text-text-base group-hover:text-primary transition-colors duration-200">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-text-muted mt-0.5">{job.department}</p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="self-start sm:self-center flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-4 py-2 text-[12px] font-semibold text-text-muted hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer shrink-0"
          >
            {expanded ? "Less" : "Details"}
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.div>
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-text-subtle mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary/60" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary/60" />
            {job.type}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary/60" />
            {job.department}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-lg border border-border-soft bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-muted"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="description"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-border-soft bg-surface p-4">
                <p className="text-sm leading-relaxed text-text-muted">{job.description}</p>
                <div className="mt-4 flex justify-end">
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-primary-foreground font-semibold px-5 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.5)] hover:bg-primary/90 transition-all duration-300"
                  >
                    Apply Now
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function Careers() {
  const sectionRef = useRef<HTMLElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const perksInView = useInView(perksRef, { once: true, margin: "-60px" });
  const jobsInView = useInView(jobsRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              background: "var(--brand-muted)",
              color: "var(--brand)",
              borderColor: "var(--border-soft)",
            }}
          >
            <Sparkles className="h-3 w-3" />
            We&apos;re Hiring
          </span>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-text-base leading-tight">
            Build the Future{" "}
            <span className="bg-gradient-to-r from-blue-500 via-primary to-cyan-500 bg-clip-text text-transparent">
              With Us
            </span>
          </h2>

          <p className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-text-muted">
            We&apos;re a small, ambitious team solving hard engineering problems for global clients.
            If you love ownership, autonomy, and meaningful impact — you&apos;ll fit right in.
          </p>

          {/* Stats bar */}
          <motion.div
            className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-border-soft bg-surface-raised px-8 py-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[
              { value: "5+", label: "Open Roles" },
              { value: "100%", label: "Remote-Friendly" },
              { value: "12+", label: "Countries" },
              { value: "48h", label: "Response Time" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-primary">{value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Perks Grid ── */}
        <div ref={perksRef} className="mb-20">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={perksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-text-base sm:text-3xl">
              Why <span className="text-primary">Fedora?</span>
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              We invest in people, not just products.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={perksInView ? "visible" : "hidden"}
          >
            {perks.map((perk, i) => (
              <PerkCard key={perk.title} perk={perk} index={i} />
            ))}
          </motion.div>
        </div>

        {/* ── Job Listings ── */}
        <div ref={jobsRef}>
          <motion.div
            className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={jobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-text-base sm:text-3xl">
                Open <span className="text-primary">Positions</span>
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {jobListings.length} roles available — click to explore each one
              </p>
            </div>
            <Button
              variant="outline"
              className="self-start sm:self-center rounded-full border-border-soft hover:border-primary/40 hover:bg-primary/5 font-semibold text-sm px-5 transition-all duration-300"
            >
              View All Roles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={jobsInView ? "visible" : "hidden"}
          >
            {jobListings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>
        </div>

        {/* ── Open Application CTA ── */}
        <motion.div
          className="mt-16 relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-cyan-500/10 p-10 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={jobsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow blobs */}
          <div className="absolute -top-16 left-1/4 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 right-1/4 w-32 h-32 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-extrabold text-text-base sm:text-3xl mb-3">
              Don&apos;t See Your Role?
            </h3>
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-text-muted mb-8">
              We&apos;re always open to extraordinary talent. Send us your portfolio and tell us what
              you&apos;d build at Fedora — we read every application.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground font-semibold px-8 shadow-[0_4px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.6)] hover:bg-primary/90 transition-all duration-300"
              >
                Send Open Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border-soft hover:border-primary/40 hover:bg-primary/5 font-semibold px-8 backdrop-blur-sm transition-all duration-300"
              >
                Learn Our Culture
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
