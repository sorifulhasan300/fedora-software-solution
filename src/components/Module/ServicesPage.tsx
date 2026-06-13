"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Globe,
  GraduationCap,
  Layers,
  ClipboardList,
  Calculator,
  MonitorSmartphone,
  Ticket,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  HeadphonesIcon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  features: string[];
  badge?: string;
  subServices?: { icon: React.ElementType; title: string; description: string }[];
}

// ─── Services Data ────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    id: "ecommerce-web",
    number: "01",
    title: "E-Commerce Website Development",
    subtitle: "Sell More. Convert Better.",
    description:
      "We design and build high-performance e-commerce storefronts that are fast, secure, and built to convert. From product catalogs to one-click checkout — every detail optimized for revenue.",
    icon: ShoppingCart,
    accent: "#2563EB",
    badge: "Most Popular",
    features: [
      "Custom storefront design & branding",
      "Product catalog & variant management",
      "Secure payment gateway integration",
      "Mobile-first, blazing-fast performance",
      "SEO-optimized architecture",
      "Multi-currency & multi-language support",
      "Inventory sync & stock alerts",
      "Analytics & conversion tracking",
    ] as string[],
  },
  {
    id: "other-web",
    number: "02",
    title: "Business Website Development",
    subtitle: "Your Digital Presence, Elevated.",
    description:
      "From corporate portals to landing pages and portfolio sites — we build websites that reflect your brand identity and drive real business outcomes.",
    icon: Globe,
    accent: "#06B6D4",
    features: [
      "Corporate & portfolio websites",
      "High-converting landing pages",
      "CMS integration (Sanity, Contentful)",
      "Contact forms & CRM integration",
      "Performance & Core Web Vitals optimization",
      "Custom animations & interactions",
      "Ongoing maintenance & support",
    ],
  },
  {
    id: "edutech",
    number: "03",
    title: "Edutech Website & System",
    subtitle: "Power the Future of Learning.",
    description:
      "We build feature-rich e-learning platforms and education management systems — from student enrollment and live classes to progress tracking and certification.",
    icon: GraduationCap,
    accent: "#7C3AED",
    features: [
      "LMS (Learning Management System)",
      "Course builder & video hosting",
      "Student enrollment & progress tracking",
      "Live class & webinar integration",
      "Quiz, assessment & certification engine",
      "Teacher & admin dashboards",
      "Payment & subscription management",
      "Mobile-responsive student portal",
    ],
  },
  {
    id: "saas",
    number: "04",
    title: "SaaS Software Solutions",
    subtitle: "Automate. Scale. Dominate.",
    description:
      "Purpose-built SaaS products for modern e-commerce businesses. Our four flagship software products handle every operational layer — from orders to accounting to in-store sales.",
    icon: Layers,
    accent: "#F59E0B",
    badge: "4 Products",
    features: [
      "Multi-tenant SaaS architecture",
      "Role-based access control",
      "Real-time data & reporting",
      "API-first design for integrations",
      "Cloud-hosted with 99.9% uptime SLA",
      "White-label options available",
    ],
    subServices: [
      {
        icon: ClipboardList,
        title: "E-Commerce Order Management",
        description:
          "Centralize orders from all your channels — website, marketplace, social. Automate fulfillment, track shipments, and manage returns from one powerful dashboard.",
      },
      {
        icon: Calculator,
        title: "Accounting Software",
        description:
          "Full-featured accounting tailored for e-commerce. Automate invoicing, VAT/tax calculations, expense tracking, and generate profit & loss reports instantly.",
      },
      {
        icon: MonitorSmartphone,
        title: "POS System",
        description:
          "A fast, modern point-of-sale system for your physical stores. Works offline, syncs with your online inventory, and supports barcode scanning and receipt printing.",
      },
      {
        icon: Ticket,
        title: "Coupon Selling System",
        description:
          "Create, manage, and sell digital coupon codes at scale. Set usage limits, expiry dates, and discount rules — with real-time analytics on redemption rates.",
      },
    ],
  },
];

const whyUs = [
  { icon: Zap, title: "Fast Delivery", text: "We move fast without cutting corners. Most projects launch in 4–8 weeks.", accent: "#F59E0B" },
  { icon: Shield, title: "Enterprise Security", text: "SSL, OWASP best practices, and regular security audits baked in.", accent: "#2563EB" },
  { icon: TrendingUp, title: "ROI-Focused", text: "Every decision is made to maximize your return on investment.", accent: "#47A248" },
  { icon: HeadphonesIcon, title: "Dedicated Support", text: "12-hour response SLA and a dedicated engineer for your account.", accent: "#7C3AED" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Sub-Service Card ─────────────────────────────────────────────────────────

function SubServiceCard({ item, accent }: { item: NonNullable<Service["subServices"]>[number]; accent: string }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group flex flex-col gap-3 rounded-2xl border border-border-soft bg-surface p-5 hover:border-primary/25 transition-all duration-300"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
        style={{
          background: `color-mix(in srgb, ${accent} 15%, transparent)`,
          borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`,
        }}
      >
        <Icon className="h-5 w-5" style={{ color: accent }} size={20} />
      </div>
      <div>
        <h4 className="text-[14px] font-bold text-text-base mb-1.5 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-[12px] leading-relaxed text-text-muted">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Service Section ──────────────────────────────────────────────────────────

function ServiceSection({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = service.icon;
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} id={service.id} className="relative py-20 scroll-mt-20">
      {/* Divider */}
      {index > 0 && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>

          {/* Text Side */}
          <motion.div
            className={isEven ? "order-1" : "order-1 lg:order-2"}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] font-black uppercase tracking-[0.22em] opacity-60"
                style={{ color: service.accent }}
              >
                {service.number}
              </span>
              {service.badge && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: `${service.accent}18`,
                    borderColor: `${service.accent}30`,
                    color: service.accent,
                  }}
                >
                  <Star className="h-2.5 w-2.5" />
                  {service.badge}
                </span>
              )}
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold tracking-tight text-text-base sm:text-4xl lg:text-[2.6rem] leading-tight mb-3"
            >
              {service.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-[15px] font-semibold mb-4"
              style={{ color: service.accent }}
            >
              {service.subtitle}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-relaxed text-text-muted mb-8"
            >
              {service.description}
            </motion.p>

            {/* Features */}
            <motion.ul variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {service.features.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 text-[13px] font-medium text-foreground/75"
                >
                  <CheckCircle
                    className="h-4 w-4 mt-0.5 shrink-0"
                    style={{ color: service.accent }}
                  />
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <Button
                className="rounded-full font-semibold px-7 shadow-lg transition-all duration-300"
                style={{
                  background: service.accent,
                  color: "#fff",
                  boxShadow: `0 4px 24px ${service.accent}40`,
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            className={isEven ? "order-2" : "order-2 lg:order-1"}
            initial={{ opacity: 0, scale: 0.94, x: isEven ? 32 : -32 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.subServices ? (
              /* SaaS: show sub-service cards */
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={stagger}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {service.subServices.map((sub) => (
                  <SubServiceCard key={sub.title} item={sub} accent={service.accent} />
                ))}
              </motion.div>
            ) : (
              /* Other services: decorative card */
              <div
                className="relative rounded-3xl border overflow-hidden p-10 flex flex-col items-center justify-center gap-6 min-h-[340px]"
                style={{
                  borderColor: `color-mix(in srgb, ${service.accent} 20%, transparent)`,
                  background: `linear-gradient(135deg, color-mix(in srgb, ${service.accent} 12%, transparent) 0%, transparent 70%)`,
                }}
              >
                {/* Glow blob */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{ background: service.accent }}
                />
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-3xl border-2"
                  style={{
                    borderColor: `color-mix(in srgb, ${service.accent} 35%, transparent)`,
                    background: `color-mix(in srgb, ${service.accent} 18%, transparent)`,
                  }}
                >
                  <Icon className="h-12 w-12" style={{ color: service.accent }} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground mb-1">{service.title}</p>
                  <p className="text-sm text-foreground/60">{service.subtitle}</p>
                </div>
                {/* Floating badges */}
                <div className="flex flex-wrap justify-center gap-2">
                  {service.features.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                      style={{
                        borderColor: `color-mix(in srgb, ${service.accent} 35%, transparent)`,
                        background: `color-mix(in srgb, ${service.accent} 12%, transparent)`,
                        color: service.accent,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/7 blur-3xl" />
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan-500/6 blur-3xl" />
        </div>

        <div ref={heroRef} className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              style={{
                background: "var(--brand-muted)",
                color: "var(--brand)",
                borderColor: "var(--border-soft)",
              }}
            >
              <Sparkles className="h-3 w-3" />
              E-Commerce Agency
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-text-base leading-tight"
            >
              Services Built for{" "}
              <span className="bg-gradient-to-r from-blue-500 via-primary to-cyan-500 bg-clip-text text-transparent">
                E-Commerce Growth
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-text-muted"
            >
              From your first online store to a full SaaS stack — Fedora delivers end-to-end
              engineering solutions that power every stage of your e-commerce business.
            </motion.p>

            {/* Quick nav */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-raised px-4 py-2 text-[12px] font-semibold text-text-muted hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <span
                    className="text-[10px] font-black"
                    style={{ color: s.accent }}
                  >
                    {s.number}
                  </span>
                  {s.title.split(" ").slice(0, 2).join(" ")}…
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Service Sections ──────────────────────────────────────────────── */}
      {services.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/6 blur-3xl" />
        </div>

        <div ref={whyRef} className="relative mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl font-extrabold text-text-base sm:text-4xl">
              Why Teams Choose{" "}
              <span className="text-primary">Fedora</span>
            </h2>
            <p className="mt-3 text-base text-text-muted max-w-xl mx-auto">
              We don&apos;t just write code — we build businesses.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            variants={stagger}
            initial="hidden"
            animate={whyInView ? "visible" : "hidden"}
          >
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group flex flex-col gap-4 rounded-2xl border border-border-soft bg-surface-raised p-6 hover:border-primary/25 transition-all duration-300"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `color-mix(in srgb, ${item.accent} 15%, transparent)`,
                      borderColor: `color-mix(in srgb, ${item.accent} 30%, transparent)`,
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: item.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-text-base mb-1.5">{item.title}</h3>
                    <p className="text-[13px] leading-relaxed text-text-muted">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 via-primary/5 to-cyan-500/10 p-12 text-center"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -top-20 left-1/3 w-48 h-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 right-1/4 w-36 h-36 rounded-full bg-cyan-500/12 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-text-base sm:text-4xl mb-4">
                Ready to Launch Your E-Commerce Empire?
              </h2>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-text-muted mb-8">
                Let&apos;s discuss your project. Our engineers are ready to scope your solution and
                deliver a proposal within 48 hours — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-3 text-base shadow-[0_4px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.6)] hover:bg-primary/90 transition-all duration-300"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border font-semibold px-8 py-3 text-base text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  View Pricing
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
