# AI CRM – HCP Module

An AI-powered Customer Relationship Management (CRM) application for Medical Representatives to log healthcare professional (HCP) interactions, manage follow-ups, and gain AI-assisted insights using LangGraph and LLMs.

---

## Features

- AI-assisted interaction logging
- Structured HCP interaction form
- AI Chat Assistant
- Search doctor interactions
- Generate interaction summaries
- Product insights
- Pending follow-up management
- Edit interaction details
- Dashboard analytics
- Responsive Material UI interface

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- Material UI
- Axios

### Backend
- FastAPI
- SQLAlchemy
- LangGraph
- OpenAI-compatible LLM

### Database
- MySQL

---

## Architecture

React
↓

FastAPI REST API
↓

LangGraph Agent
↓

AI Tools
• Search Tool
• Summary Tool
• Follow-up Tool
• Product Insight Tool
• Edit Tool

↓

MySQL

---

## AI Capabilities

The AI Assistant can:

- Find doctor interactions
- Summarize doctor history
- Show pending follow-ups
- Recommend products
- Update follow-up dates

---

## Screenshots

(Add 4–5 screenshots)

Dashboard

Structured Form

AI Assistant

Saved Interactions

Swagger UI

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoints

GET /interaction/

POST /interaction/

PUT /interaction/{id}

POST /chat/

---

## Folder Structure

frontend/

backend/

README.md

---

## Future Improvements

Authentication

Doctor Profiles

Role-based Access

Analytics Dashboard

Email Follow-up Reminders

Deployment (Docker + Cloud)

---

## Author

Chaganti Naga Veera Satya Teja