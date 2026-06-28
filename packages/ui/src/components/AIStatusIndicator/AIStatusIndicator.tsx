import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "../Button/Button";
import { RecallOrb } from "../RecallOrb/RecallOrb";

const indicatorVariants = cva(
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 shadow-sm backdrop-blur-md",
    {
        variants: {
            status: {
                idle: "bg-muted/50 border-border text-foreground",
                thinking: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300",
                active: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300",
                error: "bg-destructive/10 border-destructive/20 text-destructive",
            },
        },
        defaultVariants: {
            status: "idle",
        },
    }
);

export interface AIStatusIndicatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
    text?: string;
    showOrb?: boolean;
}

const statusTextMap = {
    idle: "Ready",
    thinking: "Thinking...",
    active: "Active",
    error: "Error",
};

const AIStatusIndicator = React.forwardRef<HTMLDivElement, AIStatusIndicatorProps>(
    ({ className, status = "idle", text, showOrb = true, ...props }, ref) => {
        const displayText = text || statusTextMap[status as keyof typeof statusTextMap];

        return (
            <div
                ref={ref}
                className={cn(indicatorVariants({ status, className }))}
                {...props}
            >
                {showOrb && (
                    <RecallOrb
                        size="sm"
                        status={status}
                        className="shadow-none border border-black/10 dark:border-white/10"
                    />
                )}
                <span className="text-sm font-medium tracking-tight">
                    {displayText}
                </span>

                {status === "thinking" && (
                    <motion.div className="flex gap-0.5 ml-1">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className={cn(
                                    "h-1 w-1 rounded-full",
                                    "bg-purple-700 dark:bg-purple-300"
                                )}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        );
    }
);
AIStatusIndicator.displayName = "AIStatusIndicator";

export { AIStatusIndicator, indicatorVariants };
