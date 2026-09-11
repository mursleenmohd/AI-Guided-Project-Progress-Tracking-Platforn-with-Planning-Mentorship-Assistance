import asyncio
from app.models.request import ProjectRequest
from app.agents.base_agent import ask_ai_async
from app.utils.prompts import get_mentor_prompt
from app.agents.sub_agents import (
    idea_agent,
    scope_agent,
    planning_agent,
    technology_agent,
    documentation_agent
)

async def run_academic_mentor_pipeline(project: ProjectRequest) -> dict:
    idea_res, scope_res, tech_res, plan_res, docs_res = await asyncio.gather(
        idea_agent(project),
        scope_agent(project),
        technology_agent(project),
        planning_agent(project),
        documentation_agent(project)
    )

    mentor_prompt = get_mentor_prompt(
        project, idea_res, scope_res, tech_res, plan_res, docs_res
    )
    final_mentor_report = await ask_ai_async(mentor_prompt)

    return {
        "status": "success",
        "project_name": project.name,
        "sub_reports": {
            "idea": idea_res,
            "scope": scope_res,
            "technology": tech_res,
            "planning": plan_res,
            "documentation": docs_res
        },
        "final_mentor_report": final_mentor_report
    }

async def handle_mentor_chat(project_context: str, user_query: str) -> str:
    prompt = f"""
    You are an AI Academic Project Mentor assisting a student with their ongoing project.
    
    Project Context:
    {project_context}

    Student's Question:
    {user_query}

    Provide a clear, encouraging, and highly practical technical response.
    """
    return await ask_ai_async(prompt)