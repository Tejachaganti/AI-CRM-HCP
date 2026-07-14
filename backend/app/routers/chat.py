from fastapi import APIRouter
from pydantic import BaseModel

from app.langgraph.graph import graph

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "user_input": request.message
        }
    )

    return result