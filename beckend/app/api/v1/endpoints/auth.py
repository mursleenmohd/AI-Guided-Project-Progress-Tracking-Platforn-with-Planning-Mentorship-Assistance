from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.database import User, get_db
from app.models.request import UserRegisterRequest, UserLoginRequest

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/signup")
def register_user(req: UserRegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == req.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Yeh email pehle se registered hai!")
    hashed_password = pwd_context.hash(req.password)
    
    new_user = User(
        username=req.username,
        email=req.email,
        password_hash=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"status": "success", "message": "User registered successfully!"}

@router.post("/login")
def login_user(req: UserLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    if not pwd_context.verify(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    return {
        "status": "success",
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }