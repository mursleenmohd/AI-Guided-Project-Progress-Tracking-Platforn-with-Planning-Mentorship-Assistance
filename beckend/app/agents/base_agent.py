import asyncio
from google import genai
from app.config import settings
client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def ask_ai_async(prompt: str) -> str:
    """
    Executes Gemini API call asynchronously in a separate threadpool
    to prevent blocking the main FastAPI event loop.
    """
    def _sync_call():
        response = client.models.generate_content(
            model=settings.MODEL_NAME,
            contents=prompt,
        )
        return response.text

    return await asyncio.to_thread(_sync_call)