import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../Button/Button";

const emptyStateVariants = cva(
    "flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500",
    {
        variants: {
            size: {
                sm: "min-h-[200px]",
                default: "min-h-[300px]",
                lg: "min-h-[400px]",
                full: "h-full min-h-[500px]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface EmptyStateProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
    ({ className, size, icon, title, description, action, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(emptyStateVariants({ size, className }))}
                {...props}
            >
                {icon && (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground/80">
                        {icon}
                    </div>
                )}
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h3>
                {description && (
                    <p className="mb-6 max-w-[400px] text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
                {action && <div className="mt-2">{action}</div>}
            </div>
        );
    }
);
EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };
