"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Upload,
    Mic,
    FileText,
    Video,
    Image,
    FileArchive,
    Clock,
    CheckCircle2,
    ArrowUpFromLine,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    GlassPanel,
    Surface,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const supportedFormats = [
    { icon: Mic, label: "Audio", formats: "MP3, WAV, M4A, OGG" },
    { icon: Video, label: "Video", formats: "MP4, MOV, WebM" },
    { icon: FileText, label: "Documents", formats: "PDF, DOCX, TXT, MD" },
    { icon: Image, label: "Images", formats: "PNG, JPG, SVG" },
    { icon: FileArchive, label: "Archives", formats: "ZIP (with supported files)" },
];

const mockUploadHistory = [
    { id: "1", name: "Q3 Planning Call.mp4", status: "complete", size: "245 MB", date: "2h ago" },
    { id: "2", name: "Architecture Notes.md", status: "complete", size: "12 KB", date: "Yesterday" },
    { id: "3", name: "Client Brief — Acme.pdf", status: "complete", size: "2.4 MB", date: "Oct 12" },
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

export default function CapturePage() {
    const [isDragging, setIsDragging] = React.useState(false);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 pb-12 w-full max-w-5xl mx-auto"
        >
            {/* ── Header ─────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Capture Memory</h1>
                <p className="text-muted-foreground">
                    Upload recordings, documents, or notes to your knowledge base.
                </p>
            </motion.div>

            {/* ── Upload Zone ─────────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
                    className={cn(
                        "relative flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed p-16 transition-all duration-300 cursor-pointer",
                        isDragging
                            ? "border-primary/50 bg-primary/[0.05]"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                    )}
                >
                    <motion.div
                        animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
                    >
                        <ArrowUpFromLine className={cn(
                            "h-8 w-8 transition-colors",
                            isDragging ? "text-primary" : "text-primary/60"
                        )} />
                    </motion.div>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-semibold text-foreground">
                            {isDragging ? "Drop files here" : "Drag & drop files here"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            or click to browse from your computer
                        </p>
                    </div>

                    <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" /> Browse Files
                    </Button>
                </div>
            </motion.div>

            {/* ── Supported Formats ──────────────────────────── */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold tracking-tight mb-4">Supported Formats</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {supportedFormats.map((fmt) => {
                        const Icon = fmt.icon;
                        return (
                            <Surface
                                key={fmt.label}
                                variant="bordered"
                                padding="sm"
                                className="flex flex-col items-center gap-2 py-4 text-center border-white/[0.06] bg-black/30"
                            >
                                <Icon className="h-5 w-5 text-primary/60" />
                                <span className="text-xs font-semibold text-foreground">{fmt.label}</span>
                                <span className="text-[10px] text-muted-foreground/60 leading-tight">{fmt.formats}</span>
                            </Surface>
                        );
                    })}
                </div>
            </motion.div>

            {/* ── Upload History ──────────────────────────────── */}
            <motion.div variants={itemVariants}>
                <h2 className="text-lg font-semibold tracking-tight mb-4">Recent Uploads</h2>
                <div className="flex flex-col gap-2">
                    {mockUploadHistory.map((item) => (
                        <GlassPanel
                            key={item.id}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl border-white/[0.06] hover:bg-white/[0.04] transition-colors cursor-pointer"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                                <p className="text-[11px] text-muted-foreground/60">{item.size}</p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-[11px] text-muted-foreground/60 flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {item.date}
                                </span>
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            </div>
                        </GlassPanel>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
