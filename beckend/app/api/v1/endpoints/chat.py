from fastapi import APIRouter, HTTPException, status
from app.models.request import ChatRequest
from app.models.response import ChatResponse
from app.agents.orchestrator import handle_mentor_chat

router = APIRouter()

@router.post(
    "/chat",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Conversational Mentor Chat",
    description="Ask follow-up questions to the AI Mentor regarding the analyzed project."
)
async def mentor_chat(chat_request: ChatRequest):
    try:
        reply = await handle_mentor_chat(
            project_context=chat_request.project_context,
            user_query=chat_request.user_query
        )
        return ChatResponse(status="success", reply=reply)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while generating mentor response: {str(e)}"
        )