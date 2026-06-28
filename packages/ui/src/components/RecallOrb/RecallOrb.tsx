import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../Button/Button";

const orbVariants = cva(
    "relative flex items-center justify-center rounded-full flex-shrink-0",
    {
        variants: {
            size: {
                sm: "h-6 w-6",
                md: "h-12 w-12",
                lg: "h-20 w-20",
                xl: "h-32 w-32",
            },
            status: {
                idle: "bg-gradient-to-tr from-primary/40 to-primary/80",
                thinking: "bg-gradient-to-tr from-purple-500/80 to-indigo-500/80",
                active: "bg-gradient-to-tr from-emerald-400/80 to-teal-500/80",
                error: "bg-gradient-to-tr from-destructive/80 to-red-600/80",
            },
        },
        defaultVariants: {
            size: "md",
            status: "idle",
        },
    }
);

export interface RecallOrbProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof orbVariants> { }

const animations = {
    idle: {
        scale: [1, 1.05, 1],
        boxShadow: [
            "0 0 15px rgba(var(--primary), 0.3)",
            "0 0 25px rgba(var(--primary), 0.5)",
            "0 0 15px rgba(var(--primary), 0.3)",
        ],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
    thinking: {
        scale: [1, 1.1, 0.95, 1],
        rotate: [0, 180, 360],
        boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.4)",
            "0 0 40px rgba(168, 85, 247, 0.8)",
            "0 0 20px rgba(168, 85, 247, 0.4)",
        ],
        transition: {
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        },
    },
    active: {
        scale: [1, 1.05, 1],
        boxShadow: [
            "0 0 20px rgba(52, 211, 153, 0.5)",
            "0 0 35px rgba(52, 211, 153, 0.8)",
            "0 0 20px rgba(52, 211, 153, 0.5)",
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
    error: {
        scale: [1, 1.1, 1],
        boxShadow: [
            "0 0 15px rgba(var(--destructive), 0.5)",
            "0 0 30px rgba(var(--destructive), 0.8)",
            "0 0 15px rgba(var(--destructive), 0.5)",
        ],
        transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
        },
    },
};

const RecallOrb = React.forwardRef<HTMLDivElement, RecallOrbProps & HTMLMotionProps<"div">>(
    ({ className, size, status = "idle", ...props }, ref) => {
        return (
            <div ref={ref} className="relative inline-flex items-center justify-center">
                <motion.div
                    animate={animations[status as keyof typeof animations]}
                    className={cn(orbVariants({ size, status, className }))}
                    {...props}
                >
                    <div className="absolute inset-2 rounded-full bg-white/20 blur-sm pointer-events-none mix-blend-overlay" />
                    <div className="absolute inset-0 rounded-full bg-black/10 mix-blend-overlay shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] pointer-events-none" />
                </motion.div>
            </div>
        );
    }
);
RecallOrb.displayName = "RecallOrb";

export { RecallOrb, orbVariants };
