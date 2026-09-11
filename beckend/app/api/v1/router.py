from fastapi import APIRouter
from app.api.v1.endpoints import mentor, chat, auth

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["User Authentication"])
api_router.include_router(mentor.router, prefix="/mentor", tags=["Academic Mentor"])
api_router.include_router(chat.router, prefix="/mentor", tags=["Mentor Chat"])