import { toast } from "../lib/toast";

/**
 * A hook wrapper for the toast system.
 * Useful when toasts need access to React contexts (e.g. i18n, router) in the future.
 * Currently just returns the static toast utility.
 */
export function useToast() {
    return {
        toast,
    };
}
