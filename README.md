# RecallAI

AI Knowledge Operating System

RecallAI transforms meetings, conversations, documents, and decisions into a permanent, searchable organizational memory. Instead of simply summarizing meetings, RecallAI understands them — extracting knowledge, connecting information, and allowing instant retrieval via AI.

## Architecture

| Layer    | Technology                                  |
|----------|---------------------------------------------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind v4 |
| Backend  | FastAPI, SQLAlchemy, Celery, Alembic        |
| AI       | OpenAI, Whisper, LangGraph, LiteLLM, Mem0  |
| Vector   | Qdrant                                      |
| Infra    | Docker, Vercel, Railway, GitHub Actions     |

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

### Local Development

```bash
# 1. Start infrastructure services
docker compose up -d

# 2. Start the backend
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 3. Start the frontend
cd frontend
npm install
npm run dev
```

### Environment

Copy `.env.example` to `.env` and fill in your credentials.

## License

Private — All rights reserved.
