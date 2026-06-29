"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

const TITLE_MAP: Record<string, string> = {
    "/dashboard": "Memory Space",
    "/dashboard/library": "Knowledge Library",
    "/dashboard/ask": "Ask RecallAI",
    "/dashboard/capture": "Capture Memory",
    "/dashboard/workspace": "Workspace",
    "/dashboard/settings": "Settings",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
    const pathname = usePathname();
    const title = TITLE_MAP[pathname] ?? "Memory Space";

    return (
        <MotionConfig reducedMotion="user">
            <div className="flex h-screen overflow-hidden bg-background">
                {/* ── Sidebar ──────────────────────────────────────────── */}
                <Sidebar
                    mobileOpen={mobileNavOpen}
                    onMobileClose={() => setMobileNavOpen(false)}
                />

                {/* ── Main content area ────────────────────────────────── */}
                <div className="flex flex-1 flex-col overflow-hidden min-w-0">
                    <TopNav
                        title={title}
                        onMenuClick={() => setMobileNavOpen(true)}
                    />

                    {/* Scrollable page content */}
                    <main
                        role="main"
                        className="flex-1 overflow-y-auto px-6 py-8 md:px-8"
                    >
                        {children}
                    </main>
                </div>
            </div>
        </MotionConfig>
    );
}
