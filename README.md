# 🩺 AI CRM - HCP Module

An AI-powered Healthcare Professional (HCP) CRM that enables Medical Representatives to record, manage, and analyze doctor interactions using **LangGraph**, **LLMs**, **FastAPI**, **React**, and **MySQL**.

---

## 🚀 Features

### 📋 Structured Interaction Logging
- Add HCP interactions
- Edit existing interactions
- Store follow-up dates
- Search interactions
- Responsive Material UI interface

### 🤖 AI Assistant (LangGraph + LLM)
Supports natural language commands such as:

- Log an interaction
- Find a doctor
- Summarize doctor interactions
- Show product insights
- Show pending follow-ups

### 📊 Dashboard
- Total Doctors
- Total Interactions
- Upcoming Follow-ups
- Most Discussed Product

### 🛠 Backend
- FastAPI REST APIs
- Swagger API Documentation
- MySQL Database
- SQLAlchemy ORM
- Pydantic Validation

---

# 🏗 Tech Stack

## Frontend
- React.js
- Material UI
- Redux Toolkit
- Axios

## Backend
- FastAPI
- SQLAlchemy
- LangGraph
- Groq LLM
- Pydantic

## Database
- MySQL

---

# 📂 Project Structure

```
AI-CRM-HCP/
│
├── backend/
│   ├── routers/
│   ├── database/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── graph/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🗄 MySQL Configuration

Create a database:

```sql
CREATE DATABASE ai_crm;
```

Configure your database URL in:

```
database.py
```

Example:

```python
DATABASE_URL = "mysql+pymysql://root:password@localhost/ai_crm"
```

Run the backend to automatically create tables.

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /interaction | Get all interactions |
| POST | /interaction | Create interaction |
| PUT | /interaction/{id} | Update interaction |
| POST | /chat | AI Assistant |

---

# 🤖 AI Commands

The AI Assistant supports:

### Log Interaction

```
I met Dr. Arjun Rao today.
We discussed CardioPlus.
Follow up on 2026-07-28.
```

---

### Find Doctor

```
Find Dr Sharma
```

---

### Summarize Interactions

```
Summarize Dr Sharma interactions
```

---

### Product Insights

```
Show product insights
```

---

### Pending Follow-ups

```
Show pending follow-ups
```

---

# 📸 Screenshots

## Dashboard

![Dashboard](dashboardai.png)

---

---

## AI Log Interaction

![AI Log](logtool.png)

---

## Find Doctor

![Search](searchtool.png)

---

## AI Summary

![Summary](summarytool.png)

---

## Product Insights

![Product](productinsightstool.png)

---

## Pending Follow-ups

![Follow-up](followuptool.png)

---

## Swagger API

![Swagger](swagger.png)

---

## MySQL Database

![MySQL](mysql.png)

---

# ✅ Completed Functionalities

- ✔ Structured HCP Interaction Form
- ✔ Edit Interaction
- ✔ Search Interaction
- ✔ AI Chat Interface
- ✔ LangGraph Workflow
- ✔ Groq LLM Integration
- ✔ Doctor Search
- ✔ Interaction Summary
- ✔ Product Insights
- ✔ Pending Follow-ups
- ✔ Dashboard Analytics
- ✔ FastAPI REST APIs
- ✔ Swagger Documentation
- ✔ MySQL Database
- ✔ Responsive UI

---

# Future Improvements

- Authentication (JWT)
- Role-based Access
- Doctor Profile Management
- Export Reports (PDF/Excel)
- Email Follow-up Reminders
- Charts & Analytics
- Voice Interaction

---

# 👨‍💻 Author

**Chaganti Naga Veera Satya Teja**

B.Tech Computer Science Engineering

AI | Full Stack Developer

GitHub:
https://github.com/Tejachaganti/AI-CRM-HCP

LinkedIn:
https://www.linkedin.com/in/tejachaganti

---