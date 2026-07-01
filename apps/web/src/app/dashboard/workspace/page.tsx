"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Activity,
    BarChart3,
    Clock,
    Brain,
    FileText,
    TrendingUp,
    Calendar,
    ArrowUpRight,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Surface,
    GlassPanel,
    AIStatusIndicator,
} from "@recallai/ui";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const stats = [
    { label: "Total Memories", value: "1,247", change: "+12%", icon: Brain },
    { label: "Team Members", value: "8", change: "+2", icon: Users },
    { label: "This Week", value: "34", change: "+8%", icon: TrendingUp },
    { label: "Storage Used", value: "4.2 GB", change: "of 10 GB", icon: BarChart3 },
];

const members = [
    { name: "Pradnya Kamble", role: "Owner", avatar: "PK", status: "online" },
    { name: "Alex Chen", role: "Admin", avatar: "AC", status: "online" },
    { name: "Sarah Miller", role: "Editor", avatar: "SM", status: "offline" },
    { name: "James Wilson", role: "Viewer", avatar: "JW", status: "offline" },
];

const recentActivity = [
    { action: "uploaded", item: "Client Meeting Recording", user: "Pradnya", time: "2h ago" },
    { action: "summarized", item: "Q3 Strategy Doc", user: "RecallAI", time: "4h ago" },
    { action: "commented", item: "Architecture Review", user: "Alex", time: "Yesterday" },
    { action: "shared", item: "Research Findings", user: "Sarah", time: "Oct 12" },
];

// ─── Animation ──────────────────────────────────────────────────────────────

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WorkspacePage() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 pb-12 w-full max-w-7xl mx-auto"
        >
            {/* ── Header ─────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
                <p className="text-muted-foreground">
                    Manage your team, review activity, and track knowledge growth.
                </p>
            </motion.div>

            {/* ── Stats Grid ─────────────────────────────────── */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <GlassPanel
                            key={stat.label}
                            className="flex flex-col gap-3 p-5 rounded-2xl border-white/[0.06]"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </span>
                                <Icon className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-foreground tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-medium text-emerald-500 mb-1">
                                    {stat.change}
                                </span>
                            </div>
                        </GlassPanel>
                    );
                })}
            </motion.div>

            {/* ── Main Layout ────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">

                {/* Left: Activity Feed */}
                <motion.div variants={itemVariants} className="flex flex-col gap-5">
                    <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
                    <div className="flex flex-col gap-2">
                        {recentActivity.map((item, i) => (
                            <Surface
                                key={i}
                                variant="bordered"
                                padding="sm"
                                className="flex items-center gap-4 px-4 py-3 border-white/[0.06] bg-black/30 hover:bg-black/50 transition-colors cursor-pointer group"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                    <Activity className="h-4 w-4 text-primary/60" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        <span className="font-medium text-foreground">{item.user}</span>
                                        <span className="text-muted-foreground"> {item.action} </span>
                                        <span className="font-medium text-foreground">{item.item}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-[11px] text-muted-foreground/60 flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {item.time}
                                    </span>
                                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Surface>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Team Members */}
                <motion.div variants={itemVariants} className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">Team</h2>
                        <span className="text-xs text-muted-foreground">{members.length} members</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {members.map((member) => (
                            <Surface
                                key={member.name}
                                variant="bordered"
                                padding="sm"
                                className="flex items-center gap-3 px-4 py-3 border-white/[0.06] bg-black/30"
                            >
                                <div className="relative">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                                        {member.avatar}
                                    </div>
                                    <span
                                        className={cn(
                                            "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                                            member.status === "online" ? "bg-emerald-500" : "bg-muted-foreground/40"
                                        )}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                                    <p className="text-[11px] text-muted-foreground/60">{member.role}</p>
                                </div>
                            </Surface>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
