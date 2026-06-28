import * as React from "react";
import { Search, FolderOpen, LayoutTemplate, Brain } from "lucide-react";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

export const EmptySearch = (props: Omit<EmptyStateProps, "title" | "icon">) => (
    <EmptyState
        icon={<Search className="h-8 w-8" />}
        title="No results found"
        description="We couldn't find any memories matching your search. Try adjusting your filters or search terms."
        {...props}
    />
);

export const EmptyLibrary = (props: Omit<EmptyStateProps, "title" | "icon">) => (
    <EmptyState
        icon={<FolderOpen className="h-8 w-8" />}
        title="Library is empty"
        description="You haven't added any memories to your library yet. Capture your first memory to get started."
        {...props}
    />
);

export const EmptyWorkspace = (props: Omit<EmptyStateProps, "title" | "icon">) => (
    <EmptyState
        icon={<LayoutTemplate className="h-8 w-8" />}
        title="No workspace selected"
        description="Select a workspace from the sidebar or create a new one to organize your memories."
        {...props}
    />
);

export const EmptyMemory = (props: Omit<EmptyStateProps, "title" | "icon">) => (
    <EmptyState
        icon={<Brain className="h-8 w-8" />}
        title="No memory selected"
        description="Select a memory to view its details, extracted knowledge, and connections."
        {...props}
    />
);
