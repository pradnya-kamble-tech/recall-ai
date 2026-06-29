import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";
import { Spinner } from "../Spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { variants, duration, ease } from "../../tokens";

const loadingOverlayVariants = cva(
    "z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm",
    {
        variants: {
            position: {
                absolute: "absolute inset-0",
                fixed: "fixed inset-0",
            },
        },
        defaultVariants: {
            position: "absolute",
        },
    }
);

export interface LoadingOverlayProps
    extends VariantProps<typeof loadingOverlayVariants> {
    isVisible?: boolean;
    text?: string;
    className?: string;
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
    ({ className, position, isVisible = true, text }, ref) => {
        return (
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: duration.fast, ease: ease.productive }}
                        className={cn(loadingOverlayVariants({ position, className }))}
                    >
                        <motion.div
                            variants={variants.scalePop}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center gap-4"
                        >
                            <Spinner size="lg" />
                            {text && (
                                <p className="text-sm text-muted-foreground animate-pulse">
                                    {text}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
);
LoadingOverlay.displayName = "LoadingOverlay";

export { LoadingOverlay, loadingOverlayVariants };
