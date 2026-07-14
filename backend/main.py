from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.models.interaction import Interaction

from app.langgraph.graph import graph

from app.routers.chat import router as chat_router

from app.routers.interaction import router as interaction_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI CRM HCP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)

app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "message": "AI CRM Backend Running"
    }

@app.get("/ai-test")
def ai_test():

    result = graph.invoke(
        {
            "user_input": "I met Dr Ravi today. He requested clinical trial data. Follow up next Monday."
        }
    )

    return result