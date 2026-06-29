import * as React from "react";

/**
 * Represents a single executable action inside the Command Palette.
 */
export interface CommandAction {
    /** Unique identifier for the command */
    id: string;
    /** Human-readable title */
    title: string;
    /** Keywords to match against during search */
    keywords?: string[];
    /** Optional Lucide icon to display */
    icon?: React.ElementType;
    /** The action to execute when this command is selected */
    onSelect: () => void | Promise<void>;
}

/**
 * Represents a group of commands that share a category heading.
 */
export interface CommandGroup {
    /** The heading displayed above the commands in the palette */
    heading: string;
    /** The commands within this group */
    commands: CommandAction[];
}

/**
 * A plugin is a function that returns an array of CommandGroups based on context.
 * In a real app, this might accept state/context (e.g., current route, user role).
 */
export type CommandPlugin = () => CommandGroup[];
