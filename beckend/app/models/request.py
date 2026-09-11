from pydantic import BaseModel, Field, EmailStr

class UserRegisterRequest(BaseModel):
    username: str = Field(..., example="mursleen_ai")
    email: EmailStr = Field(..., example="user@example.com")
    password: str = Field(..., min_length=6, example="secret123")

class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., example="user@example.com")
    password: str = Field(..., example="secret123")

class ProjectRequest(BaseModel):
    name: str = Field(..., description="Project Name", example="AI Academic Project Mentor")
    problem: str = Field(..., description="Problem Statement or Idea in 2-3 lines")
    domain: str = Field(..., description="Target Domain", example="Artificial Intelligence / Web Development")
    technologies: str = Field(..., description="Initial technologies in mind", example="Python, React, FastAPI")
    duration: int = Field(..., ge=1, le=12, description="Project duration in months", example=4)

class ChatRequest(BaseModel):
    project_context: str = Field(..., description="Summary or name of the project context")
    user_query: str = Field(..., description="Student's doubt or question", example="How do I setup parallel API calls in FastAPI?")