"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    User,
    Palette,
    Bell,
    Key,
    Brain,
    ChevronRight,
    Moon,
    Sun,
    Monitor,
    Globe,
    Shield,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Surface,
    GlassPanel,
    Input,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";

// ─── Settings Sections ─────────────────────────────────────────────────────

const settingsSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
    { id: "ai", label: "AI Preferences", icon: Brain },
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

export default function SettingsPage() {
    const [activeSection, setActiveSection] = React.useState("profile");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 pb-12 w-full max-w-5xl mx-auto"
        >
            {/* ── Header ─────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account, preferences, and integrations.
                </p>
            </motion.div>

            {/* ── Main Layout ────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">

                {/* Left: Navigation */}
                <motion.nav variants={itemVariants} className="flex flex-col gap-1">
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left",
                                    activeSection === section.id
                                        ? "bg-white/[0.08] text-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {section.label}
                            </button>
                        );
                    })}
                </motion.nav>

                {/* Right: Content */}
                <motion.div variants={itemVariants} className="flex flex-col gap-6">

                    {/* Profile */}
                    {activeSection === "profile" && (
                        <Card className="border-white/[0.06] bg-black/40">
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>Manage your personal information.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                                        PK
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">Pradnya Kamble</p>
                                        <p className="text-sm text-muted-foreground">pradnya@recallai.dev</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                                        <Input defaultValue="Pradnya Kamble" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-muted-foreground">Email</label>
                                        <Input defaultValue="pradnya@recallai.dev" />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button size="sm">Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Appearance */}
                    {activeSection === "appearance" && (
                        <Card className="border-white/[0.06] bg-black/40">
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how RecallAI looks.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: Moon, label: "Dark", active: true },
                                        { icon: Sun, label: "Light", active: false },
                                        { icon: Monitor, label: "System", active: false },
                                    ].map((theme) => (
                                        <button
                                            key={theme.label}
                                            className={cn(
                                                "flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors",
                                                theme.active
                                                    ? "border-primary/40 bg-primary/10 text-foreground"
                                                    : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:border-white/[0.12]"
                                            )}
                                        >
                                            <theme.icon className="h-5 w-5" />
                                            <span className="text-xs font-medium">{theme.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Notifications */}
                    {activeSection === "notifications" && (
                        <Card className="border-white/[0.06] bg-black/40">
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Choose what you want to be notified about.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                {[
                                    { label: "New AI summaries", description: "When RecallAI finishes processing a memory", enabled: true },
                                    { label: "Team activity", description: "When team members upload or comment", enabled: true },
                                    { label: "Weekly digest", description: "Summary of your knowledge base activity", enabled: false },
                                    { label: "Product updates", description: "New features and improvements", enabled: false },
                                ].map((pref) => (
                                    <div key={pref.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{pref.label}</p>
                                            <p className="text-xs text-muted-foreground">{pref.description}</p>
                                        </div>
                                        <div
                                            className={cn(
                                                "h-5 w-9 rounded-full transition-colors cursor-pointer relative",
                                                pref.enabled ? "bg-primary" : "bg-white/[0.1]"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow",
                                                    pref.enabled ? "translate-x-4" : "translate-x-0.5"
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* API Keys */}
                    {activeSection === "api" && (
                        <Card className="border-white/[0.06] bg-black/40">
                            <CardHeader>
                                <CardTitle>API Keys</CardTitle>
                                <CardDescription>Manage API access for integrations.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <GlassPanel className="flex items-center justify-between px-4 py-3 rounded-xl border-white/[0.06]">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Production Key</p>
                                        <p className="text-xs text-muted-foreground font-mono">sk-recall-••••••••••••••••</p>
                                    </div>
                                    <Button variant="outline" size="sm">Reveal</Button>
                                </GlassPanel>
                                <GlassPanel className="flex items-center justify-between px-4 py-3 rounded-xl border-white/[0.06]">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Development Key</p>
                                        <p className="text-xs text-muted-foreground font-mono">sk-recall-dev-••••••••••••</p>
                                    </div>
                                    <Button variant="outline" size="sm">Reveal</Button>
                                </GlassPanel>
                                <Button variant="outline" size="sm" className="self-start">
                                    <Key className="h-4 w-4 mr-2" /> Generate New Key
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* AI Preferences */}
                    {activeSection === "ai" && (
                        <Card className="border-white/[0.06] bg-black/40">
                            <CardHeader>
                                <CardTitle>AI Preferences</CardTitle>
                                <CardDescription>Configure how RecallAI processes your knowledge.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                {[
                                    { label: "Auto-summarize uploads", description: "Automatically generate summaries for new memories", enabled: true },
                                    { label: "Extract action items", description: "Identify tasks and follow-ups from conversations", enabled: true },
                                    { label: "Smart tagging", description: "Automatically tag memories based on content", enabled: true },
                                    { label: "Cross-reference insights", description: "Find connections between different memories", enabled: false },
                                ].map((pref) => (
                                    <div key={pref.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{pref.label}</p>
                                            <p className="text-xs text-muted-foreground">{pref.description}</p>
                                        </div>
                                        <div
                                            className={cn(
                                                "h-5 w-9 rounded-full transition-colors cursor-pointer relative",
                                                pref.enabled ? "bg-primary" : "bg-white/[0.1]"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow",
                                                    pref.enabled ? "translate-x-4" : "translate-x-0.5"
                                                )}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
