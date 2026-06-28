import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../Button/Button";
import { cn } from "../Button/Button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    onRetry?: () => void;
    retryText?: string;
    icon?: React.ReactNode;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
    (
        {
            className,
            title = "Something went wrong",
            description = "An unexpected error occurred. Please try again or contact support.",
            onRetry,
            retryText = "Try again",
            icon = <AlertCircle className="h-10 w-10 text-destructive/80" />,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex min-h-[300px] flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500 rounded-xl border border-destructive/20 bg-destructive/5",
                    className
                )}
                {...props}
            >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                    {icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                    {title}
                </h3>
                <p className="mb-6 max-w-[400px] text-sm text-muted-foreground">
                    {description}
                </p>
                {onRetry && (
                    <Button
                        variant="destructive"
                        onClick={onRetry}
                        leftIcon={<RefreshCw className="h-4 w-4" />}
                    >
                        {retryText}
                    </Button>
                )}
            </div>
        );
    }
);
ErrorState.displayName = "ErrorState";

export { ErrorState };
