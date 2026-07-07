export interface ConversationSnippet {
    id: string;
    title: string;
    group: "Pinned" | "Today" | "Yesterday" | "This Week" | "Older";
    icon: string;
    updatedAt: string;
}

export interface SuggestedPrompt {
    id: string;
    text: string;
    icon: string;
}

export interface ChatMessage {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: string;
    isMarkdown?: boolean;
}

export const mockConversations: ConversationSnippet[] = [
    { id: "c1", title: "Authentication Flow Issues", group: "Pinned", icon: "shield", updatedAt: "1 hr ago" },
    { id: "c2", title: "Project Status Report", group: "Today", icon: "file-text", updatedAt: "2 hrs ago" },
    { id: "c3", title: "PostgreSQL Database Schema", group: "Today", icon: "database", updatedAt: "4 hrs ago" },
    { id: "c4", title: "Onboarding Flow Optimization", group: "Today", icon: "users", updatedAt: "5 hrs ago" },
    { id: "c5", title: "Summarize Yesterday's Meeting", group: "Yesterday", icon: "message-square", updatedAt: "Yesterday" },
    { id: "c6", title: "Design System Migration", group: "Yesterday", icon: "layout", updatedAt: "Yesterday" },
    { id: "c7", title: "API Rate Limiting Strategy", group: "Yesterday", icon: "activity", updatedAt: "Yesterday" },
    { id: "c8", title: "RecallAI Launch Timeline", group: "This Week", icon: "calendar", updatedAt: "Tue" },
    { id: "c9", title: "Security Audit Findings", group: "This Week", icon: "shield-alert", updatedAt: "Mon" },
    { id: "c10", title: "Frontend Architecture", group: "This Week", icon: "code", updatedAt: "Mon" },
    { id: "c11", title: "Weekly Sync Notes - Marketing", group: "Older", icon: "megaphone", updatedAt: "Oct 12" },
    { id: "c12", title: "AWS Cost Reduction Ideas", group: "Older", icon: "dollar-sign", updatedAt: "Oct 10" },
    { id: "c13", title: "User Interview Insights", group: "Older", icon: "users", updatedAt: "Oct 5" },
    { id: "c14", title: "Competitive Analysis: Linear", group: "Older", icon: "crosshair", updatedAt: "Oct 2" },
    { id: "c15", title: "Q3 OKR Planning", group: "Older", icon: "target", updatedAt: "Sep 28" }
];

export const mockPrompts: SuggestedPrompt[] = [
    { id: "p1", text: "Summarize yesterday's meeting", icon: "file-text" },
    { id: "p2", text: "What decisions were made about RecallAI?", icon: "help-circle" },
    { id: "p3", text: "Show every discussion about authentication", icon: "shield" },
    { id: "p4", text: "Find conversations mentioning PostgreSQL", icon: "database" },
    { id: "p5", text: "Generate project status report", icon: "bar-chart" },
    { id: "p6", text: "Draft an update for the investors", icon: "mail" },
    { id: "p7", text: "Find the latest UI mockups", icon: "image" },
    { id: "p8", text: "What's blocking the frontend team?", icon: "alert-circle" },
    { id: "p9", text: "Create a list of action items", icon: "check-square" },
    { id: "p10", text: "How did we resolve the CORS error?", icon: "tool" }
];

export const mockAiResponses: Record<string, string> = {
    "Summarize yesterday's meeting": "Based on our Memory Space, yesterday's meeting covered three primary topics:\n\n1. **Authentication Flow**: The team decided to stick with next-auth for frontend session management, but we will offload rate limiting to Redis.\n2. **Database Migration**: The PostgreSQL migration is delayed by a day to accommodate extra tests.\n3. **Design System**: Components are mostly ready, just pending final review of the empty state variants.\n\nThere are two main action items:\n- **Alice** to finalize the Redis config.\n- **Bob** to PR the empty states.",

    "What decisions were made about RecallAI?": "I found several key decisions about **RecallAI** in the knowledge base:\n\n*   **Name & Branding**: We are sticking with 'RecallAI' emphasizing the 'knowledge operating system' angle.\n*   **Tech Stack**: We finalized Next.js 15 for the frontend, FastAPI for Python microservices, and PostgreSQL.\n*   **Launch Strategy**: The MVP will target internal teams first for a 4-week beta before opening up waitlist invites.",

    "Show every discussion about authentication": "Here are the top discussions regarding authentication:\n\n*   **Auth Architecture ADR (Oct 10)**: Decision to use HttpOnly cookies for JWTs to prevent XSS.\n*   **Weekly Sync (Oct 12)**: Addressed issues with Next.js middleware failing to read the auth cookie reliably.\n*   **Security Audit (Monday)**: Highlighted a potential CSRF vector in the logout endpoint; fixed in PR #42.\n\nWould you like me to extract the specific code examples used in those discussions?",

    "Find conversations mentioning PostgreSQL": "I've pulled up references to PostgreSQL from your team's memory:\n\n*   **Database Schema Review (Yesterday)**: Bob mentioned that we need to add indexing to the `memories` table to speed up search queries.\n*   **Scaling Strategy (Oct 5)**: The team agreed that PostgreSQL should remain our primary data store, with embeddings stored directly via pgvector.\n\nLet me know if you need to see the exact queries discussed.",

    "Generate project status report": "Here is the generated project status report based on recent activity:\n\n### Frontend (Web)\n- Authentication flow complete.\n- Library page built with full mockup data.\n- **Ask RecallAI** in progress.\n\n### Backend (API)\n- Stable connection to Postgres.\n- Auth endpoints verified and secure.\n\n### Next Steps\n- Integrate genuine LLM generation instead of mocks.\n- Build the Workspace metrics dashboard.\n\n*Status is **Green**. No major blockers reported today.*"
};
