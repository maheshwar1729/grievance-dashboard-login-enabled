from fastapi import APIRouter, HTTPException, Form
from jose import jwt
import os
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter()

# Static credentials
VALID_USERNAME = "admin"
VALID_PASSWORD = "admin123"

@router.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    if username != VALID_USERNAME or password != VALID_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    expiration = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": username, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token}
