from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

load_dotenv()

from auth import router as auth_router
app = FastAPI()
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or list like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PARTNER_EMAIL = "partner@example.com"  # Replace this
SENDER_EMAIL = os.getenv("GMAIL_USER")
APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")

def send_email(title, body, mood, severity):
    msg = EmailMessage()
    msg["Subject"] = f"Grievance Submitted: {title}"
    msg["From"] = SENDER_EMAIL
    msg["To"] = PARTNER_EMAIL

    content = f"""
    Title: {title}
    Mood: {mood}
    Severity: {severity}

    What's bothering them?
    -----------------------
    {body}
    """
    msg.set_content(content)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(SENDER_EMAIL, APP_PASSWORD)
        smtp.send_message(msg)

@app.post("/submit")
def submit_grievance(
    title: str = Form(...),
    description: str = Form(...),
    mood: str = Form(...),
    severity: str = Form(...)
):
    send_email(title, description, mood, severity)
    return {"message": "Grievance submitted."}
    
@app.get("/")
def root():
    return {"status": "Backend is up and running"}
