import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";
import { motion, type HTMLMotionProps } from "framer-motion";

const surfaceVariants = cva(
    "rounded-xl border bg-card text-card-foreground shadow",
    {
        variants: {
            variant: {
                default: "border-border",
                muted: "bg-muted border-transparent shadow-none",
                bordered: "border-border shadow-sm",
                ghost: "bg-transparent border-transparent shadow-none",
            },
            padding: {
                none: "",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
        },
    }
);

export interface SurfaceProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
    asChild?: boolean;
}

const Surface = React.forwardRef<HTMLDivElement, SurfaceProps & HTMLMotionProps<"div">>(
    ({ className, variant, padding, asChild = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(surfaceVariants({ variant, padding, className }))}
                {...props}
            />
        );
    }
);
Surface.displayName = "Surface";

export { Surface, surfaceVariants };
