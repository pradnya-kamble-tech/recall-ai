"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Bell, Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Props ────────────────────────────────────────────────────────────────────

interface TopNavProps {
    /** Page title shown in breadcrumb */
    title?: string;
    /** Called when the mobile hamburger is pressed */
    onMenuClick?: () => void;
}

// ─── Icon button helper ───────────────────────────────────────────────────────

function IconButton({
    icon: Icon,
    label,
    onClick,
}: {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            aria-label={label}
            className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-lg",
                "border border-white/[0.06] bg-white/[0.04]",
                "text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            )}
        >
            <Icon className="h-4 w-4" aria-hidden />
        </motion.button>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TopNav({ title = "Memory Space", onMenuClick }: TopNavProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-30 flex h-14 w-full flex-shrink-0 items-center gap-3 px-4",
                "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl"
            )}
        >
            {/* Mobile hamburger */}
            <IconButton icon={Menu} label="Open navigation" onClick={onMenuClick} />

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-sm">
                <span className="text-muted-foreground/60 select-none">RecallAI</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" aria-hidden />
                <span className="font-medium text-foreground">{title}</span>
            </nav>

            {/* Mobile title */}
            <span className="sm:hidden text-sm font-medium text-foreground truncate">
                {title}
            </span>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right controls */}
            <div className="flex items-center gap-2">
                {/* Search trigger */}
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.dispatchEvent(new Event("recallai:open-command-palette"))}
                    aria-label="Search memories (⌘K)"
                    className={cn(
                        "hidden sm:flex h-8 items-center gap-2 rounded-lg px-3",
                        "border border-white/[0.06] bg-white/[0.04]",
                        "text-xs text-muted-foreground",
                        "transition-colors hover:text-foreground hover:bg-white/[0.07]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                >
                    <Search className="h-3.5 w-3.5" aria-hidden />
                    <span>Search memories…</span>
                    <kbd className="ml-2 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/60">
                        ⌘K
                    </kbd>
                </motion.button>

                {/* Search icon-only for mobile */}
                <span className="sm:hidden">
                    <IconButton
                        icon={Search}
                        label="Search memories"
                        onClick={() => document.dispatchEvent(new Event("recallai:open-command-palette"))}
                    />
                </span>

                {/* Notifications */}
                <div className="relative">
                    <IconButton icon={Bell} label="Notifications" />
                    {/* Unread dot placeholder */}
                    <span
                        aria-hidden
                        className="pointer-events-none absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
                    />
                </div>

                {/* User avatar placeholder */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="User profile"
                    className={cn(
                        "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full",
                        "bg-gradient-to-br from-primary/70 to-primary text-xs font-semibold text-primary-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                    )}
                >
                    P
                </motion.button>
            </div>
        </header>
    );
}
