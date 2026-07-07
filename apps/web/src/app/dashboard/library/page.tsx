"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Upload,
    Clock,
    MoreHorizontal,
    FileText,
    Heart,
    Folder,
    Video,
    Image as ImageIcon,
    Users,
    ChevronDown,
    ExternalLink
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    Input,
    Button,
    EmptyState,
    Skeleton,
} from "@recallai/ui";
import { cn } from "@/lib/utils";
import { mockMemories, MemoryCategory, FilterCategory } from "@/lib/mock/memories";

const filters: FilterCategory[] = ["All", "Meetings", "Documents", "Notes", "Images", "Videos"];
const sortOptions = ["Newest", "Oldest", "Recently Viewed", "Alphabetical"] as const;
type SortOption = typeof sortOptions[number];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function getCategoryIcon(cat: MemoryCategory) {
    if (cat === "Meeting" || cat === "Customer Call") return <Users className="h-3.5 w-3.5" />;
    if (cat === "Document" || cat === "Transcript" || cat === "Research" || cat === "Planning" || cat === "Design Review") return <FileText className="h-3.5 w-3.5" />;
    if (cat === "Video") return <Video className="h-3.5 w-3.5" />;
    if (cat === "Image") return <ImageIcon className="h-3.5 w-3.5" />;
    if (cat === "Note") return <Folder className="h-3.5 w-3.5" />;
    return <FileText className="h-3.5 w-3.5" />;
}

export default function LibraryPage() {
    const [search, setSearch] = React.useState("");
    const [activeFilter, setActiveFilter] = React.useState<FilterCategory>("All");
    const [sortBy, setSortBy] = React.useState<SortOption>("Newest");
    const [isLoading, setIsLoading] = React.useState(true);

    // Simulate loading state
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredMemories = React.useMemo(() => {
        let result = mockMemories;

        if (activeFilter !== "All") {
            result = result.filter(m => m.filterGroup === activeFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(m =>
                m.title.toLowerCase().includes(q) ||
                m.summary.toLowerCase().includes(q) ||
                m.owner.name.toLowerCase().includes(q)
            );
        }

        // Sorting
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case "Newest":
                    return b.timestamp - a.timestamp;
                case "Oldest":
                    return a.timestamp - b.timestamp;
                case "Recently Viewed":
                    // Fake for mock: slightly randomize or just different sort
                    return (b.timestamp * 1.5) - (a.timestamp * 1.2);
                case "Alphabetical":
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return result;
    }, [search, activeFilter, sortBy]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 pb-12 w-full max-w-7xl mx-auto"
        >
            {/* Library Header */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">Knowledge Library</h1>
                        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {mockMemories.length} Memories
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-xl">
                        Organize and search your team&apos;s memory. Find documents, meetings, and insights instantly.
                    </p>
                </div>
                <Button className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm border border-primary-foreground/10">
                    <Upload className="h-4 w-4 mr-2" /> Upload Memory
                </Button>
            </motion.div>

            {/* Search & Filters & Sort */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search memories..."
                            className="pl-10 h-10 w-full bg-black/20 border-white/[0.08] focus-visible:ring-primary/30 transition-all shadow-inner hover:border-white/[0.15]"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
                        <div className="flex items-center gap-1.5 shrink-0 bg-white/[0.02] p-1 rounded-lg border border-white/[0.05]">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                                        activeFilter === f
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        {/* Sort Dropdown  */}
                        <div className="relative shrink-0">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none h-9 pl-3 pr-8 rounded-md bg-white/[0.02] border border-white/[0.08] text-sm text-foreground hover:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt} value={opt} className="bg-background text-foreground">
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Grid / Empty / Loading */}
            <motion.div variants={itemVariants} className="min-h-[400px]">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} className="h-full border-white/[0.06] bg-black/20 p-5 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-md" />
                                </div>
                                <div className="space-y-2 mt-2">
                                    <Skeleton className="h-5 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-4 w-12" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : filteredMemories.length === 0 ? (
                    <EmptyState
                        icon={<Search className="h-8 w-8" />}
                        title="No memories found"
                        description="Try adjusting your search or filters to find what you're looking for."
                        action={
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch("");
                                    setActiveFilter("All");
                                }}
                            >
                                Clear Filters
                            </Button>
                        }
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredMemories.map((doc) => (
                                <motion.div
                                    key={doc.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group h-full"
                                >
                                    <Card className="h-full flex flex-col border-white/[0.06] bg-black/40 hover:bg-black/60 transition-colors cursor-pointer overflow-hidden relative shadow-sm hover:shadow-md hover:border-white/[0.12]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                        <CardHeader className="pb-3 flex-none relative z-10">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-semibold tracking-widest text-muted-foreground/80 px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.04]">
                                                    {getCategoryIcon(doc.category)}
                                                    {doc.category}
                                                </span>

                                                {/* Hover actions */}
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                                    <button
                                                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-white/[0.06]"
                                                        title="Open"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-md hover:bg-white/[0.06]"
                                                        title="Favorite"
                                                    >
                                                        <Heart className={cn("h-4 w-4", doc.favorite && "fill-primary text-primary")} />
                                                    </button>
                                                    <button
                                                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-white/[0.06]"
                                                        title="More"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {doc.title}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="flex-1 flex flex-col justify-between relative z-10">
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 group-hover:text-muted-foreground/80 transition-colors">
                                                {doc.summary}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.03]">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/20">
                                                        {doc.owner.initials}
                                                    </div>
                                                    <span className="text-xs font-medium text-foreground/80">
                                                        {doc.owner.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                                    <Clock className="h-3 w-3" />
                                                    {doc.date}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
