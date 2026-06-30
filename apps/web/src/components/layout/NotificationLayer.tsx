"use client";

import { Toaster } from "sonner";
import * as React from "react";

/**
 * Global NotificationLayer wrapping Sonner Toaster.
 * Enforces the RecallAI OKLCH design language and animations.
 */
export function NotificationLayer() {
    return (
        <Toaster
            position="bottom-right"
            theme="dark"
            visibleToasts={3}
            duration={4000}
            richColors={false}
            toastOptions={{
                classNames: {
                    toast: "group flex items-start gap-3 w-full rounded-xl border border-white/[0.08] bg-[rgba(15,15,15,0.95)] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl text-foreground !transition-all !duration-400 !ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    description: "text-xs text-muted-foreground mt-1 tracking-wide opacity-90",
                    title: "text-sm font-medium tracking-tight",
                },
            }}
        />
    );
}
