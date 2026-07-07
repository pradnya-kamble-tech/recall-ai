"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Edit, MessageSquare, Shield, FileText, Database, Users, Layout, Activity, Calendar, ShieldAlert, Code, Megaphone, DollarSign, Crosshair, Target, HelpCircle, BarChart, Mail, Image as ImageIcon, AlertCircle, CheckSquare, Wrench, Send, Paperclip, Mic, Menu, X
} from "lucide-react";
import {
    GlassPanel,
    RecallOrb,
    Input,
    Button,
} from "@recallai/ui";
import { cn } from "@/lib/utils";
import {
    mockConversations,
    mockPrompts,
    mockAiResponses,
    type ConversationSnippet,
    type ChatMessage
} from "@/lib/mock/conversations";

const iconMap: Record<string, React.ElementType> = {
    "shield": Shield, "file-text": FileText, "database": Database, "users": Users,
    "message-square": MessageSquare, "layout": Layout, "activity": Activity,
    "calendar": Calendar, "shield-alert": ShieldAlert, "code": Code,
    "megaphone": Megaphone, "dollar-sign": DollarSign, "crosshair": Crosshair,
    "target": Target, "help-circle": HelpCircle, "bar-chart": BarChart,
    "mail": Mail, "image": ImageIcon, "alert-circle": AlertCircle,
    "check-square": CheckSquare, "tool": Wrench
};

const SimpleMarkdown = ({ text }: { text: string }) => {
    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
        .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h3>')
        .replace(/`(.*?)`/g, '<code class="bg-black/30 px-1.5 py-0.5 rounded text-primary text-[13px] font-mono border border-primary/10">$1</code>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n\* /g, '<br/>&bull; ')
        .replace(/\n- /g, '<br/>&bull; ');

    return <div className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: formatted }} />;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const messageVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const dotVariants = {
    hidden: { y: 0 },
    visible: { y: -4, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 0.4 } }
};

const getTimeString = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function AskPage() {
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [input, setInput] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const idCounterRef = React.useRef(0);
    const nextId = () => { idCounterRef.current += 1; return String(idCounterRef.current); };

    const handleSend = (text: string = input) => {
        if (!text.trim()) return;

        const msgId = nextId();
        const timeStr = getTimeString();
        const newMsg: ChatMessage = {
            id: msgId,
            role: "user",
            content: text,
            timestamp: timeStr
        };

        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);

        // Mock delay and response
        const replyId = nextId();
        const replyText = mockAiResponses[text] ?? "I don't have enough context from your Memory Space to answer that accurately yet. Would you like me to search broadly?";
        setTimeout(() => {
            setIsTyping(false);
            const replyTime = getTimeString();
            setMessages(prev => [...prev, {
                id: replyId,
                role: "ai",
                content: replyText,
                timestamp: replyTime,
                isMarkdown: true
            }]);
        }, 1500);
    };

    const groupedConversations = React.useMemo(() => {
        const groups: Record<string, ConversationSnippet[]> = { Pinned: [], Today: [], Yesterday: [], "This Week": [], Older: [] };
        mockConversations.forEach(c => groups[c.group].push(c));
        return groups;
    }, []);

    const hasMessages = messages.length > 0;

    return (
        <div className="flex h-[calc(100vh-64px)] -mx-6 md:-mx-8 -my-8 overflow-hidden bg-background relative selection:bg-primary/20">
            {/* Mobile Drawer Overlay */}
            {mobileDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setMobileDrawerOpen(false)}
                />
            )}

            {/* ── Left Panel ─────────────────────────────────────────────────── */}
            <div className={cn(
                "fixed md:static inset-y-0 left-0 z-50 w-[80%] max-w-[300px] md:w-[25%] lg:w-[30%] bg-black/20 md:bg-black/10 border-r border-white/[0.05] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] backdrop-blur-xl md:backdrop-blur-none",
                mobileDrawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                <div className="p-4 flex flex-col gap-4 border-b border-white/[0.05]">
                    <div className="flex items-center justify-between md:hidden pb-1">
                        <span className="font-semibold">Conversations</span>
                        <Button variant="ghost" size="icon" onClick={() => setMobileDrawerOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        className="w-full justify-start border border-white/[0.08] bg-white/[0.04] text-foreground hover:bg-white/[0.08]"
                        onClick={() => { setMessages([]); setMobileDrawerOpen(false); }}
                    >
                        <Edit className="h-4 w-4 mr-2" /> New Conversation
                    </Button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                        <Input placeholder="Search conversations..." className="pl-9 h-9 bg-black/20 border-white/[0.04]" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {Object.entries(groupedConversations).map(([group, items]) => items.length > 0 && (
                        <div key={group} className="space-y-2">
                            <h4 className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-2">{group}</h4>
                            <div className="space-y-0.5">
                                {items.map(item => {
                                    const Icon = iconMap[item.icon] || MessageSquare;
                                    return (
                                        <button
                                            key={item.id}
                                            className="w-full text-left group flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                                        >
                                            <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground truncate transition-colors">
                                                    {item.title}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-colors whitespace-nowrap">
                                                    {item.updatedAt}
                                                </span>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Right Panel (Main AI Workspace) ────────────────────────────── */}
            <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,_oklch(0.65_0.2_265_/_4%)_0%,_transparent_60%)]">

                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center gap-3 p-4 border-b border-white/[0.05] bg-background/80 backdrop-blur-md z-10 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => setMobileDrawerOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <span className="font-semibold text-sm">Ask RecallAI</span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full max-w-4xl mx-auto custom-scrollbar relative">
                    {!hasMessages ? (
                        /* Initial Empty State */
                        <div className="flex flex-col items-center justify-center h-full gap-10 opacity-0 animate-in fade-in duration-700 pb-16">
                            <div className="flex flex-col items-center gap-5 text-center">
                                <RecallOrb size="lg" status="idle" className="mb-2" />
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                                    Ask RecallAI
                                </h1>
                                <p className="text-muted-foreground text-sm md:text-base max-w-xl">
                                    Search across your team&apos;s memory. RecallAI synthesizes knowledge from your meetings, documents, and code.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-2">
                                {mockPrompts.map((prompt, i) => {
                                    const Icon = iconMap[prompt.icon] || MessageSquare;
                                    return (
                                        <motion.button
                                            key={prompt.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => handleSend(prompt.text)}
                                            className="flex items-center justify-between group rounded-xl p-3.5 text-left border border-white/[0.06] bg-black/20 hover:bg-black/40 hover:border-white/[0.12] transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-7 w-7 rounded-md bg-white/[0.04] group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors line-clamp-1">{prompt.text}</span>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        /* Conversation History */
                        <div className="flex flex-col gap-8 pb-24">
                            <AnimatePresence initial={false}>
                                {messages.map(msg => (
                                    <motion.div
                                        key={msg.id}
                                        variants={messageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            {msg.role === "ai" ? (
                                                <RecallOrb size="sm" status="idle" className="ring-1 ring-primary/20" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs ring-1 ring-primary/30 shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                                                    ME
                                                </div>
                                            )}
                                        </div>

                                        <div className={cn(
                                            "flex flex-col gap-1 max-w-[85%] md:max-w-[75%]",
                                            msg.role === "user" ? "items-end" : "items-start"
                                        )}>
                                            <div className="flex items-center gap-2 mb-1 px-1">
                                                <span className="text-[11px] font-semibold text-foreground">
                                                    {msg.role === "ai" ? "RecallAI" : "You"}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                                            </div>
                                            <div className={cn(
                                                "px-5 py-3.5 text-[15px] leading-relaxed relative",
                                                msg.role === "user"
                                                    ? "bg-white/[0.06] text-foreground rounded-2xl rounded-tr-sm"
                                                    : "bg-transparent text-foreground"
                                            )}>
                                                {msg.isMarkdown ? (
                                                    <SimpleMarkdown text={msg.content} />
                                                ) : (
                                                    <span className="whitespace-pre-wrap">{msg.content}</span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <RecallOrb size="sm" status="thinking" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-semibold text-foreground mb-2 px-1">RecallAI</span>
                                        <motion.div variants={typingVariants} initial="hidden" animate="visible" className="flex items-center gap-1.5 h-10 px-2">
                                            <motion.div variants={dotVariants} className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                            <motion.div variants={dotVariants} className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                            <motion.div variants={dotVariants} className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Sticky Bottom Input */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-background via-background to-transparent w-full max-w-4xl mx-auto">
                    <GlassPanel className="flex items-end gap-2 p-2 rounded-2xl border-white/[0.08] shadow-2xl bg-black/60 backdrop-blur-3xl focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
                        <div className="flex flex-col gap-1 pb-1 px-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/[0.08] shrink-0" aria-label="Attach file">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder={isTyping ? "RecallAI is thinking..." : "Ask anything..."}
                            disabled={isTyping}
                            className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-2 text-[15px] placeholder:text-muted-foreground/50 custom-scrollbar disabled:opacity-50"
                            rows={1}
                        />
                        <div className="flex items-center gap-1 pb-1 pr-1 shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled
                                className="h-8 w-8 rounded-full shrink-0 hidden sm:flex"
                                aria-label="Voice input (disabled)"
                            >
                                <Mic className="h-4 w-4 text-muted-foreground/30" />
                            </Button>
                            <Button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                size="sm"
                                className={cn(
                                    "h-9 w-9 rounded-full shrink-0 shadow-sm transition-all p-0",
                                    input.trim() && !isTyping ? "bg-primary text-primary-foreground" : "bg-white/[0.05] text-muted-foreground"
                                )}
                            >
                                <Send className="h-4 w-4 mr-0.5" />
                            </Button>
                        </div>
                    </GlassPanel>
                    <div className="text-center mt-2 pb-1">
                        <span className="text-[10px] text-muted-foreground/50">RecallAI limits artificial hallucination by grounding answers in your Memory Space.</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
