import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";
import { motion } from "framer-motion";

const spinnerVariants = cva(
    "animate-spin",
    {
        variants: {
            size: {
                sm: "h-4 w-4",
                md: "h-6 w-6",
                lg: "h-8 w-8",
                xl: "h-12 w-12",
            },
            spinnerColor: {
                primary: "text-primary",
                muted: "text-muted-foreground",
                white: "text-white",
            },
        },
        defaultVariants: {
            size: "md",
            spinnerColor: "primary",
        },
    }
);

export interface SpinnerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof spinnerVariants> {
    /** Alias for spinnerColor to keep a friendly API */
    color?: "primary" | "muted" | "white";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size, color, spinnerColor, ...props }, ref) => {
        // Prefer the `color` convenience prop, fall back to `spinnerColor`
        const resolvedColor = color ?? spinnerColor ?? "primary";

        return (
            <motion.div
                ref={ref as React.Ref<HTMLDivElement>}
                role="status"
                aria-label="Loading"
                className={cn(spinnerVariants({ size, spinnerColor: resolvedColor, className }))}
                {...(props as object)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-full w-full"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            </motion.div>
        );
    }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
