"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Award, Cpu, Code2, ShieldCheck, Briefcase, Heart, Headset } from "lucide-react"

const tickerItems = [
  { text: "Trusted by 20+ Businesses", icon: ShieldCheck },
  { text: "5+ Years of Industry Experience", icon: Briefcase },
  { text: "ISO Standard Practices", icon: Award },
  { text: "99% Client Satisfaction", icon: Heart },
  { text: "24/7 Dedicated Support", icon: Headset },
  { text: "Next-Gen AI Integrations", icon: Cpu },
  { text: "Custom Software Solutions", icon: Code2 },
]

// Triple the items to ensure seamless loop covering wide viewports
const loopedItems = [...tickerItems, ...tickerItems, ...tickerItems]

const marqueeVariants = {
  animate: {
    x: ["0%", "-33.333%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear" as const,
      },
    },
  },
}

export function SocialProof() {
  return (
    <section className="relative w-full overflow-hidden border-y border-primary/10 bg-card/25 dark:bg-card/15 py-6 backdrop-blur-md z-10">
      {/* Premium Glassmorphic Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-background via-background/60 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-background via-background/60 to-transparent z-20 pointer-events-none" />

      {/* Marquee Wrapper */}
      <div className="flex w-max">
        <motion.div
          className="flex gap-16 sm:gap-24 px-8 sm:px-12 whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {loopedItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 text-muted-foreground hover:text-primary transition-colors duration-300 select-none group cursor-pointer"
              >
                <Icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-colors duration-300 group-hover:scale-110 duration-200" />
                <span className="text-[13px] sm:text-sm font-semibold tracking-wider uppercase font-sans">
                  {item.text}
                </span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
