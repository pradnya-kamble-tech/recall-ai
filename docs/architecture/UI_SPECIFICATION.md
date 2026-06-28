# RecallAI — High-Fidelity UI Specification

*This specification serves as the absolute source of truth for the RecallAI visual identity, layout hierarchy, and terminology. All code implementation must faithfully execute these definitions to avoid generic SaaS dashboard patterns.*

## 1. Product Terminology (The RecallAI Lexicon)
To establish a distinct, AI-native identity, standard SaaS terminology is replaced globally:
*   **"Dashboard" / "Home"** → **Memory Space** (The primary canvas where recent context and insights congregate).
*   **"Documents" / "Files"** → **Knowledge Library** (The permanent, searchable organizational memory).
*   **"Recent Items"** → **Recent Memories** (Recently captured meetings, decisions, or text).
*   **"Search Bar" / "Cmd+K"** → **Command Palette** (The centralized brain interface. Internally referred to as the Omni-Node architecture).
*   **"Meeting Transcripts"** → **Transcripts** (Or Transcript & Summary. Clarified for expected terminology).

## 2. Global Spatial Hierarchy & Layout
The overall app shell uses a 3-pane structure (when fully expanded), optimized for deep focus and AI interaction.
*   **Layer 0 (Background):** Solid, pure black (`#000000`) or ultra-deep indigo (`oklch(20% 0.05 285)`). No generic grays.
*   **Layer 1 (The Sidebar - Left):** A 280px fixed-width column containing the Memory Space navigation, Knowledge Library hierarchy, and Workspace context. 
    *   **Style:** Translucent glassmorphism (`backdrop-blur-md`) with a subtle `1px` inner border.
*   **Layer 2 (The Canvas - Center):** The primary content area. Highly breathable padding. Maximum width constraints (`max-w-5xl`) centered on the screen for optimal reading line length.
*   **Layer 3 (The Notification / Floating Layer - Z-top):** Toasts, Modals, and the Command Palette floating over a heavily blurred, darkened background via Framer Motion springs.

## 3. High-Fidelity Component Definitions

### The Omni-Node (AI Command Palette)
*Not just a search bar—it's the primary interaction layer.*
*   **Trigger:** `Cmd + K` or floating persistent pill at the top of the Memory Space.
*   **Architecture:** Command bus pattern. Accepts dynamic "plugins".
*   **Visuals:** Appears in center-screen seamlessly (Framer Motion scale+fade). A large, borderless input field occupying the top. Followed by a dynamic list of contextual capabilities:
    *   *Context AI:* Ask a question across the Knowledge Library.
    *   *Quick Actions:* Switch Workspace, Upload Memory, Invite Colleague.
    *   *Recent Memories:* Instantly jump to the last 3 accessed items.

### Content Cards (Memory Cards)
*   **Structure:** Used to represent meetings or documents.
*   **Visuals:** Subtle border gradients. Resting state opacity of `0.0` for borders, animating to `1.0` via a conic-gradient mask on hover.
*   **Typography:** Title (Medium, high contrast), Date/Metadata (Regular, low contrast).

## 4. Spacing, Typography & Motion Parameters
*   **Typography:** Modern Sans-serif (Inter/Geist). Heavy reliance on negative tracking for display headers (`tracking-tight`), and relaxed line heights for conversational text.
*   **Spacing Unit Base:** `4px` grid system. Content breathing room defaults to large gaps (`gap-8`, `p-10`) rather than cramped tables.
*   **Motion:** Defined spring presets globally.
    *   `spring-bouncy`: (stiffness: 300, damping: 20) — Used for micro-interactions (Button clicks, hover states).
    *   `ease-smooth`: (stiffness: 260, damping: 25) — Used for layout shifts (Sidebar toggle, Omni-Node entrance).

## 5. Execution Rules
*   Under no circumstances should default browser focus rings be used. All focus states use high-contrast `ring-2` with `ring-offset-background`.
*   Empty states never use generic "No data found." They use illustrations or high-typography messages guiding the user to "Feed the Knowledge Library."
