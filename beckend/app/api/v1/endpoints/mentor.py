from fastapi import APIRouter, HTTPException, status
from app.models.request import ProjectRequest
from app.models.response import MentorReportResponse
from app.agents.orchestrator import run_academic_mentor_pipeline

router = APIRouter()

@router.post(
    "/analyze-project",
    response_model=MentorReportResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze Academic Project Idea via Multi-Agents",
    description="Executes sub-agents in parallel to evaluate idea, scope, tech stack, roadmap, and documentation structure."
)
async def analyze_project(project_request: ProjectRequest):
    try:
        result = await run_academic_mentor_pipeline(project_request)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during multi-agent orchestration: {str(e)}"
        )