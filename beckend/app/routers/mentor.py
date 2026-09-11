from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.database import SessionLocal, UserProject
from app.auth import get_current_user_id
import json

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/my-projects")
def get_user_projects(user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    projects = db.query(UserProject).filter(UserProject.user_id == user_id).all()
    
    return [
        {
            "id": p.id,
            "project_name": p.project_name,
            "created_at": getattr(p, 'created_at', 'Saved Project')
        }
        for p in projects
    ]

@router.get("/{project_id}")
def get_project_details(project_id: int, user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    project = db.query(UserProject).filter(UserProject.id == project_id, UserProject.user_id == user_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    return {
        "project_name": project.project_name,
        "payload": json.loads(project.payload_json) if project.payload_json else {},
        "kanban": json.loads(project.kanban_tasks_json) if project.kanban_tasks_json else []
    }