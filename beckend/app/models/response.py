from pydantic import BaseModel
from typing import Dict, Any, Optional

class AgentReport(BaseModel):
    agent_name: str
    content: str

class SubReports(BaseModel):
    idea: str
    scope: str
    technology: str
    planning: str
    documentation: str

class MentorReportResponse(BaseModel):
    status: str
    project_name: str
    sub_reports: SubReports
    final_mentor_report: str

class ChatResponse(BaseModel):
    status: str
    reply: str