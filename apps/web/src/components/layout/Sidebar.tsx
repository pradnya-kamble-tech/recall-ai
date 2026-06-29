"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    BookOpen,
    MessageSquare,
    Upload,
    LayoutGrid,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RecallOrb } from "@recallai/ui";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

interface SidebarProps {
    /** Mobile drawer state — controlled by parent */
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
    { label: "Memory Space", href: "/dashboard", icon: Brain },
    { label: "Knowledge Library", href: "/dashboard/library", icon: BookOpen },
    { label: "Ask RecallAI", href: "/dashboard/ask", icon: MessageSquare },
    { label: "Capture Memory", href: "/dashboard/capture", icon: Upload },
    { label: "Workspace", href: "/dashboard/workspace", icon: LayoutGrid },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 64;

// ─── Motion variants ─────────────────────────────────────────────────────────

const sidebarVariants = {
    expanded: { width: SIDEBAR_EXPANDED },
    collapsed: { width: SIDEBAR_COLLAPSED },
};

const labelVariants = {
    expanded: { opacity: 1, x: 0, display: "block" },
    collapsed: { opacity: 0, x: -8, transitionEnd: { display: "none" } },
};

// ─── NavLink ─────────────────────────────────────────────────────────────────

function NavLink({
    item,
    collapsed,
}: {
    item: NavItem;
    collapsed: boolean;
}) {
    const pathname = usePathname();
    const isActive =
        item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                "group relative flex h-10 items-center gap-3 rounded-lg px-3",
                "text-sm font-medium transition-colors duration-150 outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                isActive
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
            )}
        >
            {/* Active indicator bar */}
            <AnimatePresence>
                {isActive && (
                    <motion.span
                        layoutId="sidebar-active-indicator"
                        className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                )}
            </AnimatePresence>

            {/* Icon */}
            <Icon
                className={cn(
                    "h-[18px] w-[18px] flex-shrink-0 transition-colors duration-150",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden
            />

            {/* Label */}
            <motion.span
                variants={labelVariants}
                animate={collapsed ? "collapsed" : "expanded"}
                transition={{ duration: 0.15 }}
                className="truncate"
            >
                {item.label}
            </motion.span>

            {/* Tooltip on collapsed */}
            {collapsed && (
                <span
                    role="tooltip"
                    className={cn(
                        "pointer-events-none absolute left-[72px] z-50 whitespace-nowrap",
                        "rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-md",
                        "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    )}
                >
                    {item.label}
                </span>
            )}
        </Link>
    );
}

// ─── Sidebar inner content ────────────────────────────────────────────────────

function SidebarContent({
    collapsed,
    onToggle,
    isMobile = false,
    onMobileClose,
}: {
    collapsed: boolean;
    onToggle?: () => void;
    isMobile?: boolean;
    onMobileClose?: () => void;
}) {
    return (
        <div className="flex h-full flex-col">
            {/* Logo row */}
            <div className="flex h-16 flex-shrink-0 items-center justify-between px-4">
                <div className="flex items-center gap-2 overflow-hidden">
                    <RecallOrb size="sm" status="idle" className="flex-shrink-0" />
                    <AnimatePresence initial={false}>
                        {(!collapsed || isMobile) && (
                            <motion.span
                                key="brand"
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.15 }}
                                className="text-sm font-semibold tracking-tight text-foreground"
                            >
                                RecallAI
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile close */}
                {isMobile && (
                    <button
                        onClick={onMobileClose}
                        className="rounded-md p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label="Close sidebar"
                    >
                        <X className="h-4 w-4" aria-hidden />
                    </button>
                )}

                {/* Desktop collapse toggle */}
                {!isMobile && (
                    <button
                        onClick={onToggle}
                        className="ml-auto rounded-md p-1.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                        ) : (
                            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                        )}
                    </button>
                )}
            </div>

            {/* Nav items */}
            <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-0.5 px-2 py-2">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                    <NavLink key={item.href} item={item} collapsed={!isMobile && collapsed} />
                ))}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Settings at bottom */}
                <NavLink item={NAV_ITEMS[5]!} collapsed={!isMobile && collapsed} />
            </nav>
        </div>
    );
}

// ─── Main Sidebar export ──────────────────────────────────────────────────────

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <>
            {/* ── Desktop fixed sidebar ─────────────────────────────────────── */}
            <motion.aside
                variants={sidebarVariants}
                animate={collapsed ? "collapsed" : "expanded"}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "relative hidden h-screen flex-shrink-0 flex-col overflow-hidden border-r border-white/[0.06] md:flex",
                    "bg-[rgba(0,0,0,0.55)] backdrop-blur-xl"
                )}
            >
                <SidebarContent
                    collapsed={collapsed}
                    onToggle={() => setCollapsed((c) => !c)}
                />
            </motion.aside>

            {/* ── Mobile drawer ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={onMobileClose}
                            aria-hidden
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="mobile-drawer"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={cn(
                                "fixed inset-y-0 left-0 z-50 md:hidden",
                                "bg-[rgba(0,0,0,0.85)] backdrop-blur-xl border-r border-white/[0.06]"
                            )}
                            style={{ width: SIDEBAR_EXPANDED }}
                        >
                            <SidebarContent
                                collapsed={false}
                                isMobile
                                onMobileClose={onMobileClose}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
