"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Cpu,
  Globe,
  TrendingUp,
  Users,
  Clock,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialProof } from "./social-proof";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -inset-[1px] opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        className="absolute left-[8%] top-[15%] w-64 h-64 rounded-full border border-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[20%] w-48 h-48 rounded-full border border-cyan-500/10"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix = "",
  label,
  icon: Icon,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  delay?: number;
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const step = value / (duration / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300 group"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-center gap-2 text-primary">
        <Icon className="h-5 w-5" />
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {count}
          {suffix}
        </span>
      </div>
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

function TechPill({
  icon: Icon,
  text,
  delay = 0,
}: {
  icon: React.ElementType;
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-xs font-semibold text-foreground/80">{text}</span>
    </motion.div>
  );
}

function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-70px)] flex flex-col items-center justify-center overflow-hidden pt-8 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <BackgroundGrid />

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.2),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_40%)] pointer-events-none" />

      {/* Floating decorative elements */}
      <FloatingElement
        className="left-[5%] top-[20%] opacity-20"
        delay={0}
        duration={7}
      >
        <div className="w-20 h-20 rounded-2xl border border-primary/30 rotate-12" />
      </FloatingElement>
      <FloatingElement
        className="right-[8%] top-[30%] opacity-15"
        delay={1}
        duration={8}
      >
        <div className="w-16 h-16 rounded-full border border-cyan-400/30" />
      </FloatingElement>
      <FloatingElement
        className="left-[10%] bottom-[25%] opacity-10"
        delay={2}
        duration={9}
      >
        <div className="w-12 h-12 rounded-lg border border-primary/20 rotate-45" />
      </FloatingElement>
      <FloatingElement
        className="right-[15%] bottom-[30%] opacity-15"
        delay={1.5}
        duration={7.5}
      >
        <div className="w-14 h-14 rounded-xl border border-white/10 rotate-12" />
      </FloatingElement>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tech pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <TechPill icon={Award} text="ISO-Certified" delay={0.1} />
            <TechPill icon={Cpu} text="AI-Powered" delay={0.2} />
            <TechPill icon={Globe} text="Global Scale" delay={0.3} />
            <TechPill icon={Shield} text="Enterprise Security" delay={0.4} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-8"
          >
            Engineering the
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-primary to-cyan-400 bg-clip-text text-transparent">
              Future of Digital
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12"
          >
            We build scalable, AI-driven platforms and cloud-native solutions
            that transform how businesses operate. From concept to deployment,
            we deliver engineering excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Button
              size="lg"
              className="group rounded-full bg-primary text-primary-foreground font-semibold px-10 py-6 text-base shadow-[0_4px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.6)] hover:bg-primary/95 transition-all duration-300"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border hover:bg-accent/40 font-semibold px-10 py-6 text-base backdrop-blur-sm transition-all duration-300"
            >
              View Case Studies
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            <AnimatedCounter
              value={150}
              suffix="+"
              label="Projects Delivered"
              icon={TrendingUp}
              delay={0.3}
            />
            <AnimatedCounter
              value={98}
              suffix="%"
              label="Client Retention"
              icon={Users}
              delay={0.5}
            />
            <AnimatedCounter
              value={12}
              suffix="hrs"
              label="Avg. Response"
              icon={Clock}
              delay={0.7}
            />
            <AnimatedCounter
              value={5}
              suffix="+"
              label="Years Experience"
              icon={Award}
              delay={0.9}
            />
          </motion.div>
        </motion.div>

        {/* Trusted by / tech stack banner */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["Next.js", "React", "Node.js", "Python", "AWS", "TypeScript"].map((tech) => (
              <span key={tech} className="text-sm font-bold text-foreground/60 hover:text-foreground transition-colors duration-300">
                {tech}
              </span>
            ))}
          </div>
        </motion.div> */}
      </div>

      {/* Social Proof Ticker */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <SocialProof />
      </div>
    </section>
  );
}
