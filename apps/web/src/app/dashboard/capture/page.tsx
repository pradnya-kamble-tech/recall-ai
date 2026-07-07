"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Video, FileText, Image as ImageIcon, Music, Type, Link, UploadCloud,
    FileBox, CheckCircle2, AlertCircle, X, RefreshCw, FolderOpen, MoreVertical, File
} from "lucide-react";
import {
    Card, CardHeader, CardContent, CardTitle,
    GlassPanel, Button, RecallOrb, EmptyState
} from "@recallai/ui";
import { cn } from "@/lib/utils";
import { mockUploads, type MockUpload, type UploadType, type UploadStatus } from "@/lib/mock/uploads";

// ─── Animation Variants ──────────────────────────────────────────────

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Helper Functions ────────────────────────────────────────────────

const getTypeIcon = (type: UploadType) => {
    switch (type) {
        case "Meeting Recording": return <Video className="h-5 w-5" />;
        case "Video": return <Video className="h-5 w-5" />;
        case "Audio": return <Music className="h-5 w-5" />;
        case "Document": return <FileText className="h-5 w-5" />;
        case "PDF": return <File className="h-5 w-5" />;
        case "Image": return <ImageIcon className="h-5 w-5" />;
        case "Text Note": return <Type className="h-5 w-5" />;
        case "URL": return <Link className="h-5 w-5" />;
        default: return <FileBox className="h-5 w-5" />;
    }
};

const getStatusColor = (status: UploadStatus) => {
    switch (status) {
        case "ready": return "text-green-500";
        case "failed": return "text-red-500";
        case "uploading":
        case "scanning":
        case "extracting":
        case "embedding":
            return "text-primary";
        default: return "text-muted-foreground";
    }
};

const formatStatusText = (status: UploadStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

// ─── Components ──────────────────────────────────────────────────────

const UploadMethodCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-start gap-2 p-4 rounded-xl border border-white/[0.08] bg-black/40 hover:bg-white/[0.04] hover:border-primary/40 transition-all text-left relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="p-2 rounded-lg bg-white/[0.06] text-muted-foreground group-hover:text-primary group-hover:bg-primary/20 transition-colors">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">{title}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
            </div>
        </motion.button>
    );
};

const ActiveUploadRow = ({ upload }: { upload: MockUpload }) => {
    return (
        <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/[0.08] bg-black/30">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-white/[0.06]", getStatusColor(upload.status))}>
                        {getTypeIcon(upload.type)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">{upload.fileName}</span>
                        <span className="text-xs text-muted-foreground mt-1">{upload.size} • {formatStatusText(upload.status)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {upload.status === "failed" && (
                        <button className="p-1.5 rounded-md hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-colors">
                            <RefreshCw className="h-4 w-4" />
                        </button>
                    )}
                    <button className="p-1.5 rounded-md hover:bg-white/[0.1] text-muted-foreground hover:text-foreground transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${upload.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "h-full rounded-full transition-colors",
                        upload.status === "failed" ? "bg-red-500" : "bg-primary"
                    )}
                />
            </div>
        </div>
    );
};

const TimelineItem = ({ title, active, complete, isLast }: { title: string, active: boolean, complete: boolean, isLast?: boolean }) => {
    return (
        <div className="flex gap-4 relative">
            {!isLast && (
                <div className={cn(
                    "absolute left-[11px] top-7 bottom-[-10px] w-[2px] rounded-full transition-colors",
                    complete ? "bg-primary/50" : "bg-white/[0.08]"
                )} />
            )}
            <div className="relative z-10">
                <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    complete ? "bg-primary border-primary text-primary-foreground" :
                        active ? "bg-background border-primary text-primary" :
                            "bg-background border-white/[0.1] text-muted-foreground"
                )}>
                    {complete ? <CheckCircle2 className="h-3.5 w-3.5" /> : <div className={cn("h-2 w-2 rounded-full", active ? "bg-primary animate-pulse" : "bg-transparent")} />}
                </div>
            </div>
            <div className="pb-6">
                <span className={cn(
                    "text-sm font-medium transition-colors",
                    active ? "text-primary" : complete ? "text-foreground" : "text-muted-foreground/50"
                )}>
                    {title}
                </span>
            </div>
        </div>
    );
};

// ─── Main Page Component ──────────────────────────────────────────────

export default function CapturePage() {
    const activeUploads = mockUploads.filter(u => !["ready", "failed"].includes(u.status)).slice(0, 3);
    const recentUploads = mockUploads.filter(u => ["ready", "failed"].includes(u.status)).slice(0, 5);
    const processingItem = activeUploads.length > 0 ? activeUploads[0] : null;

    const timelineSteps = [
        { key: "uploading", label: "Uploaded" },
        { key: "scanning", label: "Scanning" },
        { key: "extracting", label: "Extracting Text" },
        { key: "embedding", label: "Generating Embeddings" },
        { key: "ready", label: "Ready" }
    ];

    const getTimelineState = (stepKey: string, currentStatus: string) => {
        const statuses = ["uploading", "scanning", "extracting", "embedding", "ready"];
        const currentIndex = statuses.indexOf(currentStatus);
        const stepIndex = statuses.indexOf(stepKey);

        return {
            active: currentIndex === stepIndex,
            complete: currentIndex > stepIndex
        };
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col xl:flex-row gap-8 w-full pb-12"
        >
            {/* ── Left Column (35%) ─────────────────────────────── */}
            <div className="w-full xl:w-[35%] flex flex-col gap-8">
                {/* Hero */}
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                    <div className="mt-1">
                        <RecallOrb size="sm" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold tracking-tight">Capture Memory</h1>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            Add meetings, documents, recordings, and notes to your Knowledge Library to give your team instant access.
                        </p>
                    </div>
                </motion.div>

                {/* Upload Methods Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                    <UploadMethodCard icon={<Video className="h-5 w-5" />} title="Meeting" description="Zoom, Meet, Teams" />
                    <UploadMethodCard icon={<FileBox className="h-5 w-5" />} title="Document" description="PDF, DOCX, TXT" />
                    <UploadMethodCard icon={<Music className="h-5 w-5" />} title="Audio" description="MP3, WAV, M4A" />
                    <UploadMethodCard icon={<Type className="h-5 w-5" />} title="Note" description="Write or paste text" />
                    <UploadMethodCard icon={<Link className="h-5 w-5" />} title="URL" description="Import from web" />
                    <UploadMethodCard icon={<ImageIcon className="h-5 w-5" />} title="Image" description="PNG, JPG, WebP" />
                </motion.div>

                {/* Tips Panel */}
                <motion.div variants={itemVariants}>
                    <GlassPanel className="p-5 flex flex-col gap-4">
                        <h3 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" /> Supported Formats & Limits
                        </h3>
                        <div className="flex flex-col gap-2 text-xs text-muted-foreground leading-relaxed">
                            <p><strong>Documents:</strong> PDF, DOCX, TXT, CSV (up to 50MB)</p>
                            <p><strong>Media:</strong> MP4, MP3, WAV, M4A (up to 2GB)</p>
                            <p><strong>Images:</strong> PNG, JPG, JPEG, WEBP (up to 20MB)</p>
                        </div>
                        <div className="mt-2 pt-4 border-t border-white/[0.08] text-[11px] text-muted-foreground/60 flex items-start gap-2">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                            <p>All captured data is end-to-end encrypted and visible only to authorized members within your workspace.</p>
                        </div>
                    </GlassPanel>
                </motion.div>
            </div>

            {/* ── Right Column (65%) ────────────────────────────── */}
            <div className="w-full xl:w-[65%] flex flex-col gap-6">
                {/* Drag & Drop Zone */}
                <motion.div variants={itemVariants}>
                    <div className="w-full relative group rounded-2xl border-2 border-dashed border-white/[0.1] hover:border-primary/50 transition-colors bg-black/20 hover:bg-primary/[0.03] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden text-center min-h-[300px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <UploadCloud className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-semibold">Drag files here</h3>
                            <p className="text-muted-foreground">or <span className="text-primary hover:underline">browse your computer</span></p>
                        </div>
                        <p className="text-xs text-muted-foreground/60 max-w-[250px]">
                            Securely upload multiple files at once. They will be immediately scheduled for extraction.
                        </p>
                    </div>
                </motion.div>

                {/* Processing State / Active Uploads */}
                {activeUploads.length > 0 && (
                    <motion.div variants={itemVariants} className="flex flex-col xl:flex-row gap-6 mt-4">
                        <div className="flex-1 flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Active Uploads</h3>
                            {activeUploads.map(upload => (
                                <ActiveUploadRow key={upload.id} upload={upload} />
                            ))}
                        </div>
                        {processingItem && (
                            <div className="xl:w-[280px] shrink-0 p-5 rounded-2xl border border-white/[0.08] bg-black/40 xl:border-l-0 xl:rounded-l-none xl:-ml-6 relative z-10 xl:bg-background/80 xl:backdrop-blur-xl">
                                <h3 className="text-sm font-semibold mb-6">Processing Pipeline</h3>
                                <div className="flex flex-col">
                                    {timelineSteps.map((step, idx) => {
                                        const state = getTimelineState(step.key, processingItem.status);
                                        return (
                                            <TimelineItem
                                                key={step.key}
                                                title={step.label}
                                                active={state.active}
                                                complete={state.complete}
                                                isLast={idx === timelineSteps.length - 1}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Recent Uploads */}
                {recentUploads.length > 0 ? (
                    <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Uploads</h3>
                            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {recentUploads.map(upload => (
                                <Card key={upload.id} className="bg-black/30 border-white/[0.06] hover:bg-black/50 transition-colors">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={cn("p-2 rounded-lg bg-white/[0.06] shrink-0", getStatusColor(upload.status))}>
                                                {getTypeIcon(upload.type)}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-sm font-medium truncate">{upload.fileName}</span>
                                                <span className="text-xs text-muted-foreground truncate">{upload.timestamp} • {upload.size}</span>
                                            </div>
                                        </div>
                                        <div className="shrink-0 ml-3">
                                            {upload.status === "failed" ? (
                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                            ) : (
                                                <Button size="sm" variant="secondary" className="h-7 text-xs px-3 rounded-full">Open</Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                ) : null}

                {/* Empty State */}
                {activeUploads.length === 0 && recentUploads.length === 0 && (
                    <motion.div variants={itemVariants} className="mt-8">
                        <EmptyState
                            icon={<FolderOpen className="h-8 w-8" />}
                            title="No memories yet"
                            description="Your Knowledge Library is waiting for its first memory."
                            action={<Button size="sm">Upload your first memory</Button>}
                            className="bg-black/20 border border-dashed border-white/[0.05]"
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
