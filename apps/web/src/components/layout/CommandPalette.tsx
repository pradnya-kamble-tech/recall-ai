"use client";

import * as React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigationPlugin } from "../../lib/commands/plugins/navigation";

// Expose a custom event for other components (like TopNav search button) to open the palette programmatically
export const OPEN_COMMAND_PALETTE_EVENT = "recallai:open-command-palette";

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);

    // Execute plugins to gather commands
    const navigationPlugin = useNavigationPlugin();
    const commandGroups = navigationPlugin();

    // Setup global keyboard shortcut
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const onCustomOpen = () => setOpen(true);

        document.addEventListener("keydown", down);
        document.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);

        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onCustomOpen);
        };
    }, []);

    // Effect to handle body locking
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <Command.Dialog
                    open={open}
                    onOpenChange={setOpen}
                    label="Global Command Palette"
                    // We render cmdk inside framer-motion layers, so we disable the default cmdk overlay
                    className="fixed inset-0 z-50"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 flex items-start justify-center pt-[15vh]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className={cn(
                                "relative w-full max-w-[640px] overflow-hidden rounded-xl",
                                "border border-white/[0.08] bg-[rgba(10,10,10,0.85)] backdrop-blur-2xl",
                                "shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_32px_64px_-16px_rgba(0,0,0,0.6)]"
                            )}
                        >
                            <Command
                                className="flex h-full w-full flex-col text-foreground"
                                shouldFilter={true}
                                loop
                            >
                                {/* Search input area */}
                                <div className="flex items-center border-b border-white/[0.08] px-4">
                                    <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground/60" aria-hidden />
                                    <Command.Input
                                        autoFocus
                                        placeholder="What do you want to recall? (e.g. 'settings', 'documents')"
                                        className={cn(
                                            "flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none",
                                            "placeholder:text-muted-foreground/50",
                                            "disabled:cursor-not-allowed disabled:opacity-50"
                                        )}
                                    />
                                    <div className="ml-2 flex items-center gap-1 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/60">
                                        ESC
                                    </div>
                                </div>

                                {/* Results list */}
                                <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden p-2">
                                    <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                                        No results found.
                                    </Command.Empty>

                                    {commandGroups.map((group) => (
                                        <Command.Group
                                            key={group.heading}
                                            heading={group.heading}
                                            className="px-2 text-xs font-semibold text-muted-foreground/60 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
                                        >
                                            {group.commands.map((cmd) => {
                                                const Icon = cmd.icon;
                                                return (
                                                    <Command.Item
                                                        key={cmd.id}
                                                        value={cmd.title + " " + (cmd.keywords?.join(" ") || "")}
                                                        onSelect={() => {
                                                            cmd.onSelect();
                                                            setOpen(false);
                                                        }}
                                                        className={cn(
                                                            "relative flex cursor-default select-none items-center rounded-lg px-2 py-2.5 text-sm outline-none",
                                                            "aria-selected:bg-white/[0.08] aria-selected:text-foreground",
                                                            "transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                        )}
                                                    >
                                                        {Icon && <Icon className="mr-3 h-4 w-4 text-muted-foreground" aria-hidden />}
                                                        <span>{cmd.title}</span>
                                                    </Command.Item>
                                                );
                                            })}
                                        </Command.Group>
                                    ))}
                                </Command.List>
                            </Command>
                        </motion.div>
                    </div>
                </Command.Dialog>
            )}
        </AnimatePresence>
    );
}
