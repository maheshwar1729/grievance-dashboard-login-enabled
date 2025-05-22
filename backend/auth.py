from fastapi import APIRouter, Form, HTTPException
from datetime import datetime, timedelta
from jose import jwt

router = APIRouter()

# Static credentials
VALID_USERNAME = "admin"
VALID_PASSWORD = "admin123"

# JWT config
SECRET_KEY = "your-secret-key"  # Replace with a strong secret in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


@router.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    if username != VALID_USERNAME or password != VALID_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    expiration = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {
        "sub": username,
        "exp": expiration
    }

    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token}
