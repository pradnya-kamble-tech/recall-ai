import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";
import { motion, type HTMLMotionProps } from "framer-motion";

const glassPanelVariants = cva(
    "rounded-xl backdrop-blur-xl border border-white/10 overflow-hidden",
    {
        variants: {
            intensity: {
                light: "bg-background/40",
                medium: "bg-background/20",
                heavy: "bg-background/10",
            },
        },
        defaultVariants: {
            intensity: "medium",
        },
    }
);

export interface GlassPanelProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassPanelVariants> { }

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps & HTMLMotionProps<"div">>(
    ({ className, intensity, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(glassPanelVariants({ intensity, className }))}
                {...props}
            />
        );
    }
);
GlassPanel.displayName = "GlassPanel";

export { GlassPanel, glassPanelVariants };
