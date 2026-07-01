"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Sparkles,
    Brain,
    MessageSquare,
    FileSearch,
    Lightbulb,
    CornerDownLeft,
} from "lucide-react";
import {
    GlassPanel,
    RecallOrb,
    Input,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const suggestedPrompts = [
    { icon: Brain, text: "Summarize yesterday's engineering standup" },
    { icon: FileSearch, text: "What were the key decisions from Q3 planning?" },
    { icon: Lightbulb, text: "Find action items mentioning database migration" },
    { icon: MessageSquare, text: "What did the client say about the timeline?" },
];

const mockMessages = [
    {
        id: "1",
        role: "user" as const,
        content: "What were the main action items from the Q3 planning meeting?",
    },
    {
        id: "2",
        role: "assistant" as const,
        content:
            "Based on the Q3 Planning & Strategy Sync recording from 2 hours ago, here are the key action items:\n\n1. **Finalize API v2 spec** — Due Oct 20 (Owner: Engineering)\n2. **User research synthesis** — Due Oct 18 (Owner: Product)\n3. **Database migration plan** — Due Oct 22 (Owner: Backend)\n4. **Design system freeze** — Completed ✅\n\nWould you like me to dive deeper into any of these items?",
    },
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

const messageVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AskPage() {
    const [messages, setMessages] = React.useState(mockMessages);
    const [input, setInput] = React.useState("");
    const hasMessages = messages.length > 0;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col h-full max-w-4xl mx-auto w-full"
        >
            {!hasMessages ? (
                /* ── Empty State ──────────────────────────────────── */
                <motion.div
                    variants={itemVariants}
                    className="flex-1 flex flex-col items-center justify-center gap-8 px-4"
                >
                    <div className="flex flex-col items-center gap-4">
                        <RecallOrb size="lg" status="idle" />
                        <h1 className="text-2xl font-bold tracking-tight text-center">
                            Ask RecallAI anything
                        </h1>
                        <p className="text-muted-foreground text-center max-w-md">
                            Query your entire knowledge base using natural language.
                            RecallAI understands context from all your meetings and documents.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                        {suggestedPrompts.map((prompt, i) => {
                            const Icon = prompt.icon;
                            return (
                                <motion.button
                                    key={i}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setInput(prompt.text)}
                                    className={cn(
                                        "flex items-start gap-3 rounded-xl p-4 text-left",
                                        "border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-colors",
                                        "text-sm text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4 mt-0.5 text-primary/60 flex-shrink-0" />
                                    <span>{prompt.text}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            ) : (
                /* ── Chat Messages ────────────────────────────────── */
                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                className={cn(
                                    "flex gap-4",
                                    msg.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {msg.role === "assistant" && (
                                    <div className="flex-shrink-0 mt-1">
                                        <RecallOrb size="sm" status="idle" />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed",
                                        msg.role === "user"
                                            ? "bg-primary/15 border border-primary/20 text-foreground"
                                            : "bg-white/[0.04] border border-white/[0.06] text-foreground"
                                    )}
                                >
                                    {msg.content.split("\n").map((line, i) => (
                                        <p key={i} className={cn(i > 0 && "mt-2")}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                {msg.role === "user" && (
                                    <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-primary">P</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* ── Input Bar ──────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="sticky bottom-0 pb-4 pt-2">
                <GlassPanel className="flex items-center gap-3 px-4 py-3 rounded-2xl border-white/[0.08]">
                    <Sparkles className="h-4 w-4 text-primary/50 flex-shrink-0" />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your knowledge..."
                        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                    />
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-muted-foreground/50 font-mono flex items-center gap-1">
                            <CornerDownLeft className="h-3 w-3" /> Enter
                        </span>
                        <Button size="sm" className="rounded-xl h-8 w-8 p-0" aria-label="Send message">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </GlassPanel>
            </motion.div>
        </motion.div>
    );
}
