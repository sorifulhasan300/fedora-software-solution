"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Briefcase,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";

// ─── Types & Data ─────────────────────────────────────────────────────────────

const contactReasons = [
  { id: "project", label: "Start a Project", icon: Briefcase },
  { id: "support", label: "Technical Support", icon: LifeBuoy },
  { id: "general", label: "General Inquiry", icon: MessageSquare },
];

const officeDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@fedorasolution.dev",
    sub: "We reply within 24 hours",
    accent: "#2563EB",
    href: "mailto:hello@fedorasolution.dev",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+880 1234-567890",
    sub: "Mon–Fri, 9 AM – 6 PM BST",
    accent: "#06B6D4",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Dhaka, Bangladesh",
    sub: "Remote-first · Serving globally",
    accent: "#F24E1E",
    href: "#",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "< 24 Hours",
    sub: "Guaranteed on business days",
    accent: "#47A248",
    href: "#",
  },
];

const socials = [
  { icon: SiGithub, label: "GitHub", href: "https://github.com" },
  { icon: SiX, label: "Twitter/X", href: "https://twitter.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─── Info Card ────────────────────────────────────────────────────────────────

function InfoCard({
  item,
}: {
  item: (typeof officeDetails)[number];
}) {
  const Icon = item.icon;
  return (
    <motion.a
      variants={fadeUp}
      href={item.href}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex items-start gap-4 rounded-2xl border border-border-soft bg-surface-raised p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(37,99,235,0.07)] cursor-pointer"
    >
      <div
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${item.accent}18`,
          borderColor: `${item.accent}28`,
        }}
      >
        <Icon className="h-4.5 w-4.5" style={{ color: item.accent }} size={18} />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-text-subtle mb-0.5">
          {item.label}
        </p>
        <p className="text-[15px] font-bold text-text-base group-hover:text-primary transition-colors duration-200">
          {item.value}
        </p>
        <p className="text-[12px] text-text-muted mt-0.5">{item.sub}</p>
      </div>
    </motion.a>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [reason, setReason] = useState("project");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("sent");
  };

  const inputCls =
    "w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-[14px] text-text-base placeholder:text-text-subtle outline-none transition-all duration-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/15";

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-5 py-20 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-base mb-2">
            Message Sent!
          </h3>
          <p className="text-sm text-text-muted max-w-sm">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", company: "", message: "" });
          }}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Reason selector */}
      <div>
        <label className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-text-subtle">
          What can we help with?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {contactReasons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setReason(id)}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-[12px] font-semibold transition-all duration-200 cursor-pointer ${reason === id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border-soft bg-surface text-text-muted hover:border-primary/25 hover:bg-primary/5 hover:text-text-base"
                }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-text-subtle">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            required
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-text-subtle">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputCls}
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-text-subtle">
          Company / Organization
        </label>
        <input
          type="text"
          placeholder="Acme Inc. (optional)"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className={inputCls}
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-text-subtle">
          Your Message <span className="text-primary">*</span>
        </label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your project, timeline, and what you'd like to achieve..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === "sending"}
        size="lg"
        className="w-full rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_4px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.55)] hover:bg-primary/90 transition-all duration-300 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-[11px] text-text-subtle">
        By submitting, you agree to our Privacy Policy. No spam — ever.
      </p>
    </form>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="relative w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-16 right-10 w-72 h-72 rounded-full bg-cyan-500/6 blur-3xl" />
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
              <MessageSquare className="h-3 w-3" />
              Get In Touch
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-text-base leading-tight"
            >
              Let&apos;s Build{" "}
              <span className="bg-gradient-to-r from-blue-500 via-primary to-cyan-500 bg-clip-text text-transparent">
                Something Great
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-text-muted"
            >
              Have a project in mind? Need expert engineering support? Or just want to say hello?
              We&apos;d love to hear from you. Our team typically responds within one business day.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              variants={fadeUp}
              className="mt-10 inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-border-soft bg-surface-raised px-8 py-4"
            >
              {[
                { value: "< 24h", label: "Response Time" },
                { value: "150+", label: "Projects Done" },
                { value: "98%", label: "Satisfaction" },
                { value: "12+", label: "Countries Served" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-primary">{value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-subtle mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Grid: Form + Info ─────────────────────────────────────────── */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* ── Contact Form (3 cols) ── */}
            <motion.div
              ref={formRef}
              className="lg:col-span-3 rounded-3xl border border-border-soft bg-surface-raised p-8 sm:p-10 shadow-[0_8px_48px_rgba(0,0,0,0.05)]"
              initial={{ opacity: 0, x: -32 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-text-base sm:text-3xl mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-text-muted">
                  Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>
                <div className="mt-4 h-px bg-gradient-to-r from-primary/40 via-cyan-500/20 to-transparent" />
              </div>
              <ContactForm />
            </motion.div>

            {/* ── Info Panel (2 cols) ── */}
            <motion.div
              ref={infoRef}
              className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 32 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Contact details */}
              <div>
                <h2 className="text-xl font-extrabold text-text-base mb-1">
                  Contact Details
                </h2>
                <p className="text-sm text-text-muted mb-5">
                  Multiple ways to reach our team.
                </p>
                <motion.div
                  className="flex flex-col gap-3"
                  variants={stagger}
                  initial="hidden"
                  animate={infoInView ? "visible" : "hidden"}
                >
                  {officeDetails.map((item) => (
                    <InfoCard key={item.label} item={item} />
                  ))}
                </motion.div>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-border-soft bg-surface-raised p-6">
                <p className="text-[12px] font-bold uppercase tracking-widest text-text-subtle mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-surface text-text-muted hover:border-primary/40 hover:bg-primary/8 hover:text-primary transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA panel */}
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-cyan-500/10 p-7">
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/15 blur-2xl pointer-events-none" />
                <div className="relative">
                  <h3 className="text-[15px] font-extrabold text-text-base mb-2">
                    Need an urgent quote?
                  </h3>
                  <p className="text-[13px] text-text-muted mb-5 leading-relaxed">
                    Skip the form — book a free 30-minute discovery call with our engineering lead directly.
                  </p>
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.55)] hover:bg-primary/90 transition-all duration-300"
                  >
                    Book a Free Call
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ Strip ─────────────────────────────────────────────────────── */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-2xl font-extrabold text-text-base sm:text-3xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Quick answers before you reach out.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                q: "How quickly do you respond?",
                a: "We reply to all inquiries within 24 business hours. For urgent matters, call us directly.",
              },
              {
                q: "What's your minimum project budget?",
                a: "We work with startups and enterprises alike. Our engagements typically start at $2,000 USD.",
              },
              {
                q: "Do you work with international clients?",
                a: "Absolutely. We serve clients across 12+ countries with full remote collaboration workflows.",
              },
              {
                q: "What happens after I submit the form?",
                a: "You'll receive a confirmation email, then a scoping call is scheduled within 48 hours.",
              },
              {
                q: "Can I hire your team on a retainer?",
                a: "Yes — we offer monthly retainer packages for ongoing development, DevOps, and design support.",
              },
              {
                q: "Do you sign NDAs?",
                a: "Of course. We treat all project discussions as confidential from day one.",
              },
            ].map(({ q, a }) => (
              <motion.div
                key={q}
                variants={fadeUp}
                className="group rounded-2xl border border-border-soft bg-surface-raised p-6 hover:border-primary/25 transition-all duration-300"
              >
                <h3 className="text-[14px] font-bold text-text-base mb-2 group-hover:text-primary transition-colors duration-200">
                  {q}
                </h3>
                <p className="text-[13px] leading-relaxed text-text-muted">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
