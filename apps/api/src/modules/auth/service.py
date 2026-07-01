from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from src.modules.auth.models import User
from src.modules.auth.repository import UserRepository
from src.modules.auth.schemas import UserCreate


class AuthService:
    @staticmethod
    async def register_user(db: AsyncSession, user_in: UserCreate) -> User:
        user = await UserRepository.get_by_email(db, email=user_in.email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
            
        class ObjIn:
            email = user_in.email
            full_name = user_in.full_name
            password_hash = hash_password(user_in.password)
            
        obj_in = ObjIn()
        return await UserRepository.create(db, obj_in=obj_in)

    @staticmethod
    async def authenticate(db: AsyncSession, email: str, password: str) -> dict:
        user = await UserRepository.get_by_email(db, email=email)
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Update last login
        await UserRepository.update(db, db_obj=user, obj_in={"last_login": datetime.utcnow()})
        
        access_token = create_access_token(data={"sub": str(user.id)})
        refresh_token = create_refresh_token(data={"sub": str(user.id)})
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user
        }
