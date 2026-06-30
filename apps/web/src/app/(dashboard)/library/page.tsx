"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    FileText,
    Upload,
    Clock,
    Grid3x3,
    List,
    MoreHorizontal,
    Tag,
    Users,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Surface,
    GlassPanel,
    Input,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const filters = ["All", "Documents", "Recordings", "Notes", "Summaries"];

const mockDocuments = [
    {
        id: "1",
        title: "Q3 Product Roadmap",
        type: "Document",
        source: "Google Docs",
        date: "2 hours ago",
        tags: ["roadmap", "product"],
        size: "2.4 MB",
    },
    {
        id: "2",
        title: "Engineering Standup — Oct 15",
        type: "Recording",
        source: "Zoom",
        date: "Yesterday",
        tags: ["engineering", "standup"],
        size: "45 MB",
    },
    {
        id: "3",
        title: "User Research Interview #12",
        type: "Recording",
        source: "Google Meet",
        date: "Oct 12",
        tags: ["research", "interviews"],
        size: "120 MB",
    },
    {
        id: "4",
        title: "Architecture Decision Record — Auth",
        type: "Note",
        source: "Capture",
        date: "Oct 10",
        tags: ["architecture", "auth"],
        size: "12 KB",
    },
    {
        id: "5",
        title: "Client Call Summary — Acme",
        type: "Summary",
        source: "RecallAI",
        date: "Oct 8",
        tags: ["client", "summary"],
        size: "8 KB",
    },
    {
        id: "6",
        title: "Design System Tokens v2",
        type: "Document",
        source: "Notion",
        date: "Oct 5",
        tags: ["design", "tokens"],
        size: "1.1 MB",
    },
];

// ─── Animation ──────────────────────────────────────────────────────────────

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function LibraryPage() {
    const [activeFilter, setActiveFilter] = React.useState("All");
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 pb-12 w-full max-w-7xl mx-auto"
        >
            {/* ── Header ─────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Knowledge Library</h1>
                <p className="text-muted-foreground">
                    Browse, search, and manage all your stored knowledge.
                </p>
            </motion.div>

            {/* ── Search & Filters ────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search documents, recordings, notes..."
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" /> Filters
                    </Button>
                    <div className="flex items-center rounded-lg border border-white/[0.08] overflow-hidden">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-2 transition-colors",
                                viewMode === "grid" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-label="Grid view"
                        >
                            <Grid3x3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "p-2 transition-colors",
                                viewMode === "list" ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-label="List view"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ── Filter pills ────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 flex-wrap">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                            activeFilter === f
                                ? "bg-primary/15 border-primary/30 text-primary"
                                : "bg-white/[0.04] border-white/[0.06] text-muted-foreground hover:text-foreground hover:border-white/[0.12]"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </motion.div>

            {/* ── Document Grid ───────────────────────────────── */}
            <motion.div
                variants={containerVariants}
                className={cn(
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "flex flex-col gap-3"
                )}
            >
                {mockDocuments.map((doc) => (
                    <motion.div key={doc.id} variants={itemVariants} whileHover={{ y: -2 }} className="group">
                        <Card className="h-full border-white/[0.06] bg-black/40 hover:bg-black/60 transition-colors cursor-pointer overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase font-semibold tracking-widest text-muted-foreground/60 px-2 py-0.5 rounded-full bg-white/[0.06]">
                                        {doc.type}
                                    </span>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded" aria-label="More options">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                                <CardTitle className="text-sm leading-tight group-hover:text-primary transition-colors">
                                    {doc.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <Upload className="h-3.5 w-3.5" /> {doc.source}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" /> {doc.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Tag className="h-3 w-3 text-muted-foreground/50" />
                                        {doc.tags.map((tag) => (
                                            <span key={tag} className="px-1.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.04] text-[10px] text-muted-foreground uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
