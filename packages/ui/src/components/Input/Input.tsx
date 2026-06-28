import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";

/* ─────────────────────────────────────────────────────────────────────────────
   Variants
   ───────────────────────────────────────────────────────────────────────────── */

const inputWrapperVariants = cva(
    "relative flex items-center w-full rounded-md transition-colors",
    {
        variants: {
            variant: {
                default: "bg-muted border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
                ghost: "bg-transparent border border-transparent focus-within:border-input",
                search: "bg-muted border border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            },
            size: {
                sm: "h-9 text-sm",
                default: "h-10 text-sm",
                lg: "h-12 text-base",
            },
            hasError: {
                true: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
                false: "",
            },
            isDisabled: {
                true: "opacity-50 pointer-events-none",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            hasError: false,
            isDisabled: false,
        },
    }
);

/* ─────────────────────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────────────────────── */

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** Label shown above the input */
    label?: string;
    /** Helper text shown below the input */
    helperText?: string;
    /** Error message — shown instead of helperText when truthy; also sets aria-invalid */
    error?: string;
    /** Icon rendered on the left inside the input */
    leftIcon?: React.ReactNode;
    /** Icon or element rendered on the right inside the input */
    rightIcon?: React.ReactNode;
    /** Shows a spinner on the right (replaces rightIcon) */
    isLoading?: boolean;
    variant?: "default" | "ghost" | "search";
    size?: "sm" | "default" | "lg";
}

/* ─────────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────────── */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            label,
            helperText,
            error,
            leftIcon,
            rightIcon,
            isLoading = false,
            variant = "default",
            size = "default",
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id ?? React.useId();
        const descId = `${inputId}-desc`;
        const hasError = Boolean(error);

        const paddingLeft = leftIcon ? "pl-10" : "pl-3";
        const paddingRight = isLoading || rightIcon ? "pr-10" : "pr-3";

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium leading-none text-foreground"
                    >
                        {label}
                    </label>
                )}

                <div
                    className={cn(
                        inputWrapperVariants({
                            variant,
                            size,
                            hasError,
                            isDisabled: disabled,
                        })
                    )}
                >
                    {/* Left icon */}
                    {leftIcon && (
                        <span
                            className="pointer-events-none absolute left-3 text-muted-foreground"
                            aria-hidden="true"
                        >
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        aria-invalid={hasError}
                        aria-describedby={helperText || error ? descId : undefined}
                        aria-busy={isLoading}
                        className={cn(
                            "flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed",
                            paddingLeft,
                            paddingRight,
                            "py-2 h-full",
                            className
                        )}
                        {...props}
                    />

                    {/* Right icon / spinner */}
                    {isLoading ? (
                        <span
                            className="absolute right-3 text-muted-foreground"
                            aria-hidden="true"
                        >
                            <svg
                                className="h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
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
                        </span>
                    ) : rightIcon ? (
                        <span className="absolute right-3 text-muted-foreground" aria-hidden="true">
                            {rightIcon}
                        </span>
                    ) : null}
                </div>

                {/* Helper / error text */}
                {(helperText || error) && (
                    <p
                        id={descId}
                        className={cn(
                            "text-xs leading-tight",
                            hasError ? "text-destructive" : "text-muted-foreground"
                        )}
                        role={hasError ? "alert" : undefined}
                    >
                        {error ?? helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
