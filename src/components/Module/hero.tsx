"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Award, Cpu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 12,
    },
  },
}

const textureLeftVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: {
    opacity: 0.22,
    x: 0,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
  animate: {
    y: [0, -12, 0],
    rotate: [0, 2, -1, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
}

const textureRightVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 0.22,
    x: 0,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
  animate: {
    y: [0, 12, 0],
    rotate: [0, -2, 1, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
}

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Central Blue Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.15),transparent_55%)] pointer-events-none" />

      {/* Background Texture Left */}
      <motion.img
        src="/left_texture.png"
        alt="Left Texture"
        className="absolute left-[-12%] top-[12%] w-[45%] max-w-[420px] aspect-square object-contain mix-blend-multiply dark:mix-blend-screen pointer-events-none select-none md:left-[-6%] lg:left-[-2%] z-0"
        variants={textureLeftVariants}
        initial="hidden"
        animate={["visible", "animate"]}
      />

      {/* Background Texture Right */}
      <motion.img
        src="/right_texture.png"
        alt="Right Texture"
        className="absolute right-[-12%] top-[22%] w-[45%] max-w-[420px] aspect-square object-contain mix-blend-multiply dark:mix-blend-screen pointer-events-none select-none md:right-[-6%] lg:right-[-2%] z-0"
        variants={textureRightVariants}
        initial="hidden"
        animate={["visible", "animate"]}
      />

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badges / Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:bg-primary/10 select-none shadow-[0_2px_12px_rgba(37,99,235,0.06)]">
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span>ISO-Certified Medical Products</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:bg-primary/10 select-none shadow-[0_2px_12px_rgba(37,99,235,0.06)]">
            <Cpu className="h-3.5 w-3.5 shrink-0" />
            <span>AI-Enhanced Technology</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:bg-primary/10 select-none shadow-[0_2px_12px_rgba(37,99,235,0.06)]">
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>Trusted by Clinics Worldwide</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight text-foreground leading-[1.12] mb-6 max-w-4xl animate-duration-1000"
        >
          Innovating Healthcare Through{" "}
          <span className="block mt-2 bg-gradient-to-r from-blue-500 via-primary to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(37,99,235,0.25)]">
            Smart Medical Technology
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10 px-4"
        >
          Advanced assistive devices, AI-powered diagnostics, and seamless clinical solutions designed to improve patient outcomes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground font-semibold px-8 py-5 text-[15px] shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.55)] hover:bg-primary/95 transition-all duration-300"
          >
            Explore Solutions
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-border hover:bg-accent/40 font-semibold px-8 py-5 text-[15px] backdrop-blur-sm transition-all duration-300"
          >
            Contact Support
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
