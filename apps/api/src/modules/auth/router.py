from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm

from src.core.database import get_db
from src.core.security import decode_token, create_access_token, create_refresh_token
from src.modules.auth.dependencies import get_current_user
from src.modules.auth.models import User
from src.modules.auth.schemas import UserRead, UserCreate, Token, TokenPayload
from src.modules.auth.service import AuthService
from src.modules.auth.repository import UserRepository

router = APIRouter()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)) -> Any:
    """Register a new user."""
    return await AuthService.register_user(db, user_in=user_in)


@router.post("/login", response_model=Token)
async def login(
    response: Response,
    db: AsyncSession = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """OAuth2 compatible token login, getting an access token for future requests."""
    auth_data = await AuthService.authenticate(db, email=form_data.username, password=form_data.password)
    response.set_cookie(
        key="refresh_token",
        value=auth_data["refresh_token"],
        httponly=True,
        secure=False,  # Set False for localhost iteration mapped to real production true later
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
    )
    return {
        "access_token": auth_data["access_token"],
        "refresh_token": "http-only-cookie",
        "token_type": auth_data["token_type"]
    }


@router.post("/refresh", response_model=Token)
async def refresh_token(
    response: Response,
    refresh_token: Optional[str] = Cookie(None),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """Refresh the access token using the HttpOnly refresh token."""
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
        
    payload = decode_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
        
    token_data = TokenPayload(**payload)
    if token_data.type != "refresh" or not token_data.sub:
        raise HTTPException(status_code=401, detail="Invalid refresh token type")
        
    user = await UserRepository.get_by_id(db, user_id=token_data.sub)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    access_token = create_access_token(data={"sub": str(user.id)})
    new_refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
    )
    
    return {
        "access_token": access_token,
        "refresh_token": "http-only-cookie",
        "token_type": "bearer"
    }


@router.get("/me", response_model=UserRead)
async def get_me(current_user: User = Depends(get_current_user)) -> Any:
    """Get the currently authenticated user."""
    return current_user


@router.post("/logout")
async def logout(response: Response, current_user: User = Depends(get_current_user)) -> Any:
    """Logout the current user and flush refresh token."""
    response.delete_cookie("refresh_token")
    return {"message": "Successfully logged out"}
