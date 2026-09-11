import os
import urllib.parse
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, declarative_base

load_dotenv()

DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "aapm_db")

encoded_password = urllib.parse.quote_plus(DB_PASSWORD)

DATABASE_URL = f"postgresql://{DB_USER}:{encoded_password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    
    projects = relationship("UserProject", back_populates="owner")

class UserProject(Base):
    __tablename__ = "user_projects"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    project_name = Column(String)
    payload_json = Column(Text)
    kanban_tasks_json = Column(Text)
    
    owner = relationship("User", back_populates="projects")

Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()