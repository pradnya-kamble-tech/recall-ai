"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Mic,
    MessageSquare,
    Upload,
    FileText,
    Clock,
    Users,
    Tag,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Calendar,
    ChevronRight,
} from "lucide-react";
import {
    RecallOrb,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Surface,
    surfaceVariants,
    GlassPanel,
    EmptyState,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const quickActions = [
    { title: "Capture Memory", description: "Write notes", icon: FileText, href: "/dashboard/capture" },
    { title: "Upload Recording", description: "Audio/Video", icon: Mic, href: "/dashboard/capture" },
    { title: "Ask RecallAI", description: "Query knowledge", icon: MessageSquare, href: "/dashboard/ask" },
    { title: "Import Notes", description: "Notion, Docs", icon: Upload, href: "/dashboard/capture" },
];

const mockMemories = [
    {
        id: "1",
        title: "Q3 Planning & Strategy Sync",
        source: "Upload / Zoom",
        duration: "45m",
        participants: "Pradnya, Engineering Team",
        date: "2 hours ago",
        tags: ["engineering", "planning"],
    },
    {
        id: "2",
        title: "Design System Architecture",
        source: "Note / Capture",
        duration: "12m",
        participants: "Pradnya",
        date: "Yesterday",
        tags: ["design", "architecture"],
    },
    {
        id: "3",
        title: "Client Feedback Call: Acme Corp",
        source: "Upload / Meet",
        duration: "30m",
        participants: "Pradnya, Jane Doe",
        date: "Oct 12",
        tags: ["client", "feedback"],
    },
];

const mockInsights = [
    { title: "Q3 Planning notes summarized", time: "10m ago", icon: Sparkles, color: "text-purple-500" },
    { title: "Pending followup: Send API docs", time: "2h ago", icon: CheckCircle2, color: "text-amber-500" },
    { title: "Meeting transcribed: Tech Sync", time: "4h ago", icon: FileText, color: "text-blue-500" },
];

const mockTimeline = [
    { id: 1, action: "Summarized", title: "Q3 Planning", time: "10:45 AM" },
    { id: 2, action: "Uploaded", title: "Acme Requirements.pdf", time: "Yesterday" },
    { id: 3, action: "Searched", title: "'database schema'", time: "Oct 12" },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Components ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const hasMemories = mockMemories.length > 0;

    // Format today's date smoothly
    const today = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-10 pb-12 w-full max-w-7xl mx-auto"
        >
            {/* ── Hero Section ────────────────────────────────────────────── */}
            <motion.section variants={itemVariants} className="flex relative items-center justify-between">
                <div className="flex flex-col gap-2 relative z-10">
                    <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {today}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Good evening, {user?.full_name || "User"}.
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl">
                        Your second brain is ready. 3 memories safely stored.
                    </p>
                </div>
                <div className="hidden sm:block absolute right-0 top-0 opacity-80 mix-blend-screen scale-150 transform-gpu pointer-events-none">
                    <RecallOrb size="xl" status="idle" className="blur-xl opacity-20" />
                </div>
            </motion.section>

            {/* ── Quick Actions ───────────────────────────────────────────── */}
            <motion.section variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, i) => {
                    const Icon = action.icon;
                    return (
                        <Link key={i} href={action.href} className="outline-none">
                            <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    surfaceVariants({ variant: "bordered", padding: "default" }),
                                    "flex flex-col gap-3 p-5 rounded-2xl cursor-pointer group",
                                    "border border-white/[0.08] hover:border-white/[0.15] transition-colors"
                                )}
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] group-hover:bg-primary/20 transition-colors">
                                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-sm tracking-tight">{action.title}</h3>
                                    <p className="text-xs text-muted-foreground opacity-80">{action.description}</p>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </motion.section>

            {/* ── Main Dashboard Layout ────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">

                {/* Left Column: Memories */}
                <motion.section variants={itemVariants} className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">Recent Memories</h2>
                        <Link href="/dashboard/library" className="group text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                            View all <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {!hasMemories ? (
                        <GlassPanel className="py-16">
                            <EmptyState
                                title="No memories yet"
                                description="Start by capturing a note or uploading a recording."
                                action={<Button>Capture Memory</Button>}
                            />
                        </GlassPanel>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockMemories.map((memory) => (
                                <motion.div
                                    key={memory.id}
                                    whileHover={{ y: -2 }}
                                    className="group"
                                >
                                    <Card className="h-full border-white/[0.06] bg-black/40 hover:bg-black/60 transition-colors cursor-pointer overflow-hidden relative">
                                        {/* Hover gradient border effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 pointer-events-none" />

                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                                    <Mic className="h-3.5 w-3.5" />
                                                    {memory.source}
                                                </div>
                                                <span className="text-xs text-muted-foreground/60">{memory.date}</span>
                                            </div>
                                            <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                                                {memory.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {memory.duration}</span>
                                                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 truncate max-w-[120px]" /> {memory.participants}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Tag className="w-3.5 h-3.5 text-muted-foreground/60" />
                                                    {memory.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.04] text-[10px] text-muted-foreground tracking-wide uppercase">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* Right Column: Insights & Timeline */}
                <motion.section variants={itemVariants} className="flex flex-col gap-6">
                    {/* Insights */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-semibold tracking-tight">Active Insights</h2>
                        <Surface variant="bordered" className="flex flex-col gap-1 p-3 rounded-2xl border-white/[0.06] bg-black/40">
                            {mockInsights.map((insight, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                    <insight.icon className={cn("h-4 w-4 mt-0.5", insight.color)} />
                                    <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate group-hover:whitespace-normal group-hover:text-clip transition-all duration-300">
                                            {insight.title}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground tracking-wider">{insight.time}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors self-center" />
                                </div>
                            ))}
                        </Surface>
                    </div>

                    {/* Timeline */}
                    <div className="flex flex-col gap-4 mt-2">
                        <h2 className="text-lg font-semibold tracking-tight">Activity</h2>
                        <div className="flex flex-col">
                            {mockTimeline.map((item, i) => (
                                <div key={item.id} className="flex gap-4 relative">
                                    {/* Timeline line */}
                                    {i < mockTimeline.length - 1 && (
                                        <div className="absolute left-2 top-6 bottom-[-8px] w-px bg-white/[0.08]" />
                                    )}
                                    {/* Timeline dot */}
                                    <div className="relative mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                        <div className="h-2 w-2 relative rounded-full bg-primary/40 ring-4 ring-background" />
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-primary/20"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                                        />
                                    </div>
                                    <div className="flex flex-col pb-6">
                                        <p className="text-sm">
                                            <span className="text-muted-foreground">{item.action} </span>
                                            <span className="font-medium text-foreground">{item.title}</span>
                                        </p>
                                        <span className="text-[11px] text-muted-foreground/60 tracking-wider mt-0.5">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

            </div>
        </motion.div>
    );
}
