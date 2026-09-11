from app.models.request import ProjectRequest
from app.agents.base_agent import ask_ai_async
from app.utils.prompts import (
    get_idea_prompt,
    get_scope_prompt,
    get_planning_prompt,
    get_tech_prompt,
    get_docs_prompt
)

async def idea_agent(project: ProjectRequest) -> str:
    prompt = get_idea_prompt(project)
    return await ask_ai_async(prompt)

async def scope_agent(project: ProjectRequest) -> str:
    prompt = get_scope_prompt(project)
    return await ask_ai_async(prompt)

async def planning_agent(project: ProjectRequest) -> str:
    prompt = get_planning_prompt(project)
    return await ask_ai_async(prompt)

async def technology_agent(project: ProjectRequest) -> str:
    prompt = get_tech_prompt(project)
    return await ask_ai_async(prompt)

async def documentation_agent(project: ProjectRequest) -> str:
    prompt = get_docs_prompt(project)
    return await ask_ai_async(prompt)