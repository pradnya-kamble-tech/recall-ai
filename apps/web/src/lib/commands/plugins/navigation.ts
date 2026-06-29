import { useRouter } from "next/navigation";
import {
    Brain,
    BookOpen,
    MessageSquare,
    Upload,
    LayoutGrid,
    Settings
} from "lucide-react";
import { type CommandPlugin } from "../types";

/**
 * Provides the global navigation commands for the Command Palette.
 */
export function useNavigationPlugin(): CommandPlugin {
    const router = useRouter();

    return () => [
        {
            heading: "Navigation",
            commands: [
                {
                    id: "nav-memory-space",
                    title: "Memory Space",
                    icon: Brain,
                    keywords: ["home", "dashboard", "main"],
                    onSelect: () => router.push("/dashboard"),
                },
                {
                    id: "nav-library",
                    title: "Knowledge Library",
                    icon: BookOpen,
                    keywords: ["documents", "files", "library", "search"],
                    onSelect: () => router.push("/dashboard/library"),
                },
                {
                    id: "nav-ask",
                    title: "Ask RecallAI",
                    icon: MessageSquare,
                    keywords: ["chat", "ask", "ai", "assistant"],
                    onSelect: () => router.push("/dashboard/ask"),
                },
                {
                    id: "nav-capture",
                    title: "Capture Memory",
                    icon: Upload,
                    keywords: ["upload", "new", "record", "capture"],
                    onSelect: () => router.push("/dashboard/capture"),
                },
                {
                    id: "nav-workspace",
                    title: "Workspace",
                    icon: LayoutGrid,
                    keywords: ["grid", "boards", "workspace"],
                    onSelect: () => router.push("/dashboard/workspace"),
                },
                {
                    id: "nav-settings",
                    title: "Settings",
                    icon: Settings,
                    keywords: ["preferences", "account", "billing", "settings"],
                    onSelect: () => router.push("/dashboard/settings"),
                },
            ],
        },
    ];
}
