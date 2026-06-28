"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Mic,
  Search,
  MessageSquare,
  Zap,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────────────────────────────────────────────────────────────────────
   Features Data
   ────────────────────────────────────────────────────────────────────────────── */

const features = [
  {
    icon: Mic,
    title: "Speech-to-Text",
    description: "Upload meetings and get accurate transcripts powered by OpenAI Whisper.",
  },
  {
    icon: Brain,
    title: "AI Summaries",
    description: "Understand meetings instantly with intelligent, context-aware summaries.",
  },
  {
    icon: Zap,
    title: "Action Items",
    description: "Automatically extract tasks, decisions, and follow-ups from conversations.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find anything across all your meetings with meaning-based search.",
  },
  {
    icon: MessageSquare,
    title: "RAG Chat",
    description: "Ask questions about your meetings and get answers grounded in your data.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "RBAC, encryption, audit logs, and SOC 2-ready architecture.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────────
   Landing Page
   ────────────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Background Grid + Glow ──────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 8%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.65 0.2 265 / 12%) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Brain className="h-4.5 w-4.5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">RecallAI</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 flex flex-col items-center text-center pt-24 pb-20 px-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Knowledge Operating System
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
        >
          Your organization&apos;s
          <br />
          <span className="gradient-text">memory, amplified</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          RecallAI transforms meetings, conversations, and documents into a
          permanent, searchable knowledge base. Ask anything. Recall everything.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} custom={3} className="flex gap-4 mt-10">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all glow-primary"
          >
            Start for free
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
          >
            See features
          </Link>
        </motion.div>
      </motion.section>

      {/* ── Features Grid ───────────────────────────────────────────────── */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-32"
      >
        <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">never forget</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            From meeting upload to AI-powered retrieval — a complete knowledge
            pipeline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i + 1}
              className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 hover:bg-card transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border/50 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <span>RecallAI</span>
          </div>
          <span>© {new Date().getFullYear()} RecallAI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
