import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend Multi-Agent API Engine for AI Academic Project Mentor (AAPM)",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "message": f"Welcome to {settings.PROJECT_NAME} API",
        "documentation": "/docs"
    }

app.include_router(api_router, prefix="/api/v1")
if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )