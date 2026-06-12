"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Mail,
  ArrowUpRight,
  Rss,
  BookOpen,
  FileText,
  LifeBuoy,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web" },
    { label: "Mobile Apps", href: "/services/mobile" },
    { label: "Cloud & DevOps", href: "/services/cloud" },
    { label: "AI & Automation", href: "/services/ai" },
    { label: "UI/UX Design", href: "/services/design" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/docs", icon: BookOpen },
    { label: "Case Studies", href: "/case-studies", icon: FileText },
    { label: "Support", href: "/support", icon: LifeBuoy },
    { label: "API Reference", href: "/api", icon: Rss },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: FaSquareXTwitter, href: "#", label: "Twitter" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function FooterSection({
  title,
  links,
  icon: Icon,
}: {
  title: string;
  links: { label: string; href: string; icon?: React.ElementType }[];
  icon?: React.ElementType;
}) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 text-primary/70" />}
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.icon && (
                <link.icon className="h-3.5 w-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-primary/60" />
              )}
              <span>{link.label}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 -ml-2 group-hover:opacity-60 group-hover:ml-0 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <motion.form
      variants={itemVariants}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <label className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80">
        Stay Updated
      </label>
      <p className="text-[12px] text-muted-foreground leading-relaxed">
        Get the latest tech insights, case studies, and product updates
        delivered to your inbox.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 min-w-0 rounded-xl border border-border-soft bg-white/[0.03] px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
          required
        />
        <Button
          type="submit"
          size="icon"
          className="shrink-0 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.45)] transition-all duration-300"
        >
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    </motion.form>
  );
}

export function Footer() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)",
      }}
    >
      {/* Top decorative tech-grid line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-strong), var(--brand), var(--border-strong), transparent)",
          opacity: 0.6,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient side glows */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, var(--brand) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="pt-16 pb-10 border-b border-border-soft/50"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand Column — spans 4 cols */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 flex flex-col gap-5"
            >
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary group-hover:border-primary/50 group-hover:bg-primary/15 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="font-sans text-[17px] font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  Fedora
                </span>
              </Link>

              <p className="text-[13px] leading-relaxed text-muted-foreground max-w-sm">
                We engineer high-performance digital products — from AI-driven
                platforms to cloud-native infrastructure. Built for scale,
                designed for impact.
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <ShieldCheck className="h-4 w-4 text-primary/60" />
                <span className="text-[11px] font-medium text-muted-foreground/80">
                  SOC 2 Type II Compliant
                </span>
              </div>
            </motion.div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <FooterSection title="Services" links={footerLinks.services} />
              <FooterSection title="Company" links={footerLinks.company} />
              <FooterSection
                title="Resources"
                links={footerLinks.resources}
                icon={BookOpen}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-[12px] text-muted-foreground/80 font-medium">
            © {currentYear} Fedora Solutions. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-medium text-muted-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-widest text-primary/80 hover:text-primary transition-colors duration-200 group"
          >
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>

      {/* Bottom tech line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-soft), transparent)",
        }}
      />
    </footer>
  );
}
