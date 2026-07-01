"""
RecallAI Backend — Feature-Based API Factory

Creates and configures the FastAPI application pulling from
decoupled feature modules instead of a traditional layered architecture.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from src.core.config import get_settings

# --- Feature Module Routers ---
from src.modules.auth.router import router as auth_router
from src.modules.users.router import router as users_router
# from src.modules.meetings.router import router as meetings_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan — startup and shutdown events."""
    logger.info(f"🚀 Starting {settings.APP_NAME} [{settings.ENVIRONMENT}]")
    yield
    logger.info(f"👋 Shutting down {settings.APP_NAME}")


def create_app() -> FastAPI:
    """Factory function to create the FastAPI application."""
    app = FastAPI(
        title=settings.APP_NAME,
        description="AI Knowledge Operating System — API",
        version="0.1.0",
        docs_url="/docs" if not settings.is_production else None,
        redoc_url="/redoc" if not settings.is_production else None,
        lifespan=lifespan,
    )

    # ── CORS ─────────────────────────────────────────────────────────────
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Health ───────────────────────────────────────────────────────────
    @app.get(f"{settings.API_V1_PREFIX}/health", tags=["System"])
    async def health_check():
        return {"status": "healthy"}

    # ── Module Routers ───────────────────────────────────────────────────
    app.include_router(auth_router, prefix=f"{settings.API_V1_PREFIX}/auth", tags=["Auth"])
    app.include_router(users_router, prefix=f"{settings.API_V1_PREFIX}/users", tags=["Users"])
    # app.include_router(meetings_router, prefix=f"{settings.API_V1_PREFIX}/meetings", tags=["Meetings"])

    return app


# ── App Instance ─────────────────────────────────────────────────────────────
app = create_app()
