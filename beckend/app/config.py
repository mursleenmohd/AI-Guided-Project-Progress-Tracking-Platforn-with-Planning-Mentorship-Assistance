import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI Academic Project Mentor (AAPM)"
    VERSION: str = "1.0.0"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    
    MODEL_NAME: str = "gemini-3.6-flash"

settings = Settings()

if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == "your_actual_gemini_api_key_here":
    raise ValueError("GEMINI_API_KEY environment variable missing or invalid in .env file.")