# RecallAI — Architectural Blueprint (Turborepo)

## 1. Monorepo Structural Decision
We adopted **Turborepo** over a simple `frontend`/`backend` split. 
**Why this is better:** A standard folder split breaks down as a startup grows. Turborepo provides isolated environments via `pnpm workspaces`, guarantees strict dependency boundaries (preventing spaghetti imports between front/back), and utilizes a hyper-optimized caching layer. When a developer modifies only the REST API, Turborepo aggressively skips rebuilding the frontend Docker image or UI packages.

## 2. Complete Folder Tree
``` text
recall-ai/
├── apps/
│   ├── api/                # FastAPI Application (Backend)
│   └── web/                # Next.js 16 Application (Frontend)
├── packages/
│   ├── config/             # Shared constants and parsed ENV maps
│   ├── eslint-config/      # Universal Linting rules
│   ├── shared/             # Isomorphic utility functions
│   ├── tsconfig/           # Base strict TS configurations
│   ├── types/              # Cross-stack TypeScript interfaces (Zod/Pydantic sync)
│   └── ui/                 # Reusable shadcn/ui and custom components
├── workers/
│   ├── emails/             # Async email dispatcher (Celery/Redis)
│   ├── embedding/          # Async vector embedding generation Pipeline
│   ├── notifications/      # Real-time WebSockets/Push handlers
│   ├── summarization/      # Async LLM summary generator
│   └── transcription/      # Async audio ingestion node
├── docker/                 # Centralized Dockerfiles and Compose configurations
├── docs/                   # Internal Wiki (Architecture, Security, Deployment)
├── scripts/                # CI/CD and DB migration automations
├── .github/                # GitHub Actions Workflows
├── pnpm-workspace.yaml     # Workspace declaration
└── turbo.json              # Turborepo task orchestrator
```

## 3. Explaining Directory Purposes
- **`apps/`**: The running instances. They consume `packages` but never act as dependencies themselves.
- **`packages/`**: The core library layer. UI components, linters, and network types live here. They guarantee DRY principles across `web`, potential `mobile`, and `docs` apps.
- **`workers/`**: Heavy compute (Transcription, LLMs, Vector DB indexing) must never block the FastAPI event loop. Separating these ensures we can autoscale GPU instances for `transcription/` independently of general traffic hitting `api/`.
- **`docs/` & `docker/`**: Infrastructure as code. Standardizes local dev environments and knowledge transfer for new engineers.

## 4. Backend Refactor (Feature-Based vs MVC)
The backend moved from traditional MVC layers (`routers/`, `models/`, `schemas/`) into **Isolated Feature Modules** (e.g., `src/modules/auth`, `src/modules/meetings`).
**Why this is better:** In layered architectures, modifying the "Meeting Summary" feature requires bouncing between 4 different directories. In feature-based architectures, every component of an entity (DB schema, Pydantic type, API routes) lives in the exact same folder `modules/meetings/`. This natively supports microservice extraction in the future if a specific module needs its own deployment.

## 5. Verification State
- `pnpm install` successfully links workspaces.
- `turbo build` successfully executes the cached DAG pipeline across `apps/web`.
- `apps/api/src/main.py` properly integrates feature routers natively.
