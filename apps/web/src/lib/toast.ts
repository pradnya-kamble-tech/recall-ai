import { toast as sonnerToast } from "sonner";
import * as React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";

/**
 * A wrapper around our underlying toast library (Sonner) that prevents vendor lock-in
 * and enforces our specific Notification system API (success, error, warning, info).
 */
export const toast = {
    success: (message: string, description?: string) => {
        sonnerToast.success(message, {
            description,
            icon: React.createElement(CheckCircle2, { className: "h-4 w-4 text-emerald-500" }),
        });
    },
    error: (message: string, description?: string) => {
        sonnerToast.error(message, {
            description,
            icon: React.createElement(AlertCircle, { className: "h-4 w-4 text-destructive" }),
        });
    },
    warning: (message: string, description?: string) => {
        sonnerToast.warning(message, {
            description,
            icon: React.createElement(AlertTriangle, { className: "h-4 w-4 text-orange-500" }),
        });
    },
    info: (message: string, description?: string) => {
        sonnerToast.info(message, {
            description,
            icon: React.createElement(Info, { className: "h-4 w-4 text-primary" }),
        });
    },
    // Useful for dismissing programmatically
    dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};
