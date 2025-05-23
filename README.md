To run locally:
Go to frontend folder in command and run "npm instal" and "npm start"

to run in servers(like website):
For frontend use : Vercel
For backend use: Render

# 🌐 Grievance Dashboard - Full Deployment Guide

This documentation helps you deploy the full-stack **Grievance Dashboard**:
- Frontend (React + Tailwind) on **Vercel**
- Backend (FastAPI + Email SMTP) on **Render**

---

## 📁 Project Structure

```
grievance-dashboard/
├── frontend/             # React App (Vercel)
│   ├── src/
│   ├── public/
│   ├── .env              # With REACT_APP_BACKEND_URL
│   └── package.json
└── backend/              # FastAPI App (Render)
    ├── main.py
    ├── auth.py
    ├── requirements.txt
    └── .env              # With email credentials
```

---

## 🚀 FRONTEND DEPLOYMENT ON VERCEL

### ✅ 1. Setup
```bash
cd frontend
npm install
```

### ✅ 2. Add `.env` in frontend
```env
REACT_APP_BACKEND_URL=https://your-backend-name.onrender.com
```

### ✅ 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial frontend"
git remote add origin https://github.com/yourname/grievance-dashboard.git
git push -u origin main
```

### ✅ 4. Deploy on Vercel
1. Go to https://vercel.com
2. Import your GitHub repo
3. In build settings:
   - **Framework**: Create React App
   - **Build command**: `npm run build`
   - **Output dir**: `build`
4. Set environment variable:
   - `REACT_APP_BACKEND_URL=https://your-backend-name.onrender.com`

---

## 🛠 BACKEND DEPLOYMENT ON RENDER

### ✅ 1. Folder Structure
Ensure backend has:
- `main.py`, `auth.py`
- `.env` with:

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

### ✅ 2. requirements.txt
```txt
fastapi
uvicorn
python-dotenv
email-validator
```

### ✅ 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/yourname/grievance-backend.git
git push -u origin main
```

### ✅ 4. Deploy to Render
- Go to https://render.com
- Click "New Web Service"
- Connect GitHub repo
- Settings:
  - **Environment**: Python 3.11
  - **Build command**: `pip install -r requirements.txt`
  - **Start command**: `uvicorn main:app --host=0.0.0.0 --port=10000`
  - **Root directory**: `backend` (if it's in a subfolder)
  - **Environment variables**:
    - `GMAIL_USER=...`
    - `GMAIL_APP_PASSWORD=...`

---

## ✅ FINAL CHECKS

1. Test live frontend:
   ```
   https://your-vercel-project.vercel.app
   ```

2. Login: `admin / admin123`
3. Submit a grievance
4. You’ll receive an email at your configured inbox.

---

## 🧠 Tips

- Always test `.env` variables locally before deploying
- Vercel uses `.env` **only during build**
- Render can show errors in the **Logs** tab

---

Happy deploying! 💖
