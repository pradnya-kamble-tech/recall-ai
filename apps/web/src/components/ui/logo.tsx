"use client";

import { Brain } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
    const sizeClasses = {
        sm: "h-6 w-6 rounded-md",
        md: "h-8 w-8 rounded-lg",
        lg: "h-10 w-10 rounded-xl",
    };

    const iconClasses = {
        sm: "h-3.5 w-3.5",
        md: "h-4.5 w-4.5",
        lg: "h-5 w-5",
    };

    const textClasses = {
        sm: "text-base",
        md: "text-lg",
        lg: "text-xl",
    };

    return (
        <Link
            href="/"
            className={cn("flex items-center gap-2.5 transition-opacity hover:opacity-80", className)}
        >
            <div
                className={cn(
                    "bg-primary/20 flex items-center justify-center shrink-0",
                    sizeClasses[size]
                )}
            >
                <Brain className={cn("text-primary", iconClasses[size])} />
            </div>
            {showText && (
                <span className={cn("font-semibold tracking-tight", textClasses[size])}>
                    RecallAI
                </span>
            )}
        </Link>
    );
}
