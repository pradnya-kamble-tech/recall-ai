import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";
import { motion, type HTMLMotionProps } from "framer-motion";

const floatingPanelVariants = cva(
    "rounded-xl border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5",
    {
        variants: {
            size: {
                sm: "w-48",
                default: "w-64",
                lg: "w-96",
                xl: "w-full max-w-lg",
                auto: "w-auto",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface FloatingPanelProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingPanelVariants> { }

const FloatingPanel = React.forwardRef<HTMLDivElement, FloatingPanelProps & HTMLMotionProps<"div">>(
    ({ className, size, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(floatingPanelVariants({ size, className }))}
                {...props}
            />
        );
    }
);
FloatingPanel.displayName = "FloatingPanel";

export { FloatingPanel, floatingPanelVariants };
