from typing import TypedDict
from langgraph.graph import StateGraph, END

from app.tools.log_tool import log_interaction_tool
from app.tools.edit_tool import edit_interaction_tool
from app.tools.search_tool import search_interaction_tool
from app.tools.followup_tool import followup_tool
from app.tools.summary_tool import summary_tool
from app.tools.product_tool import product_insight_tool


class AgentState(TypedDict):
    user_input: str
    tool: str
    response: str
def router(state: AgentState):

    text = state["user_input"].lower()

    # Summary
    if any(word in text for word in ["summary", "summarize"]):
        return {"tool": "summary"}

    # Search
    elif any(word in text for word in ["search", "find"]):
        return {"tool": "search"}

    # Edit
    elif any(word in text for word in ["edit", "update", "change"]):
        return {"tool": "edit"}

    # Log Interaction (BEFORE Follow-up)
    elif any(word in text for word in [
        "met",
        "visited",
        "visit",
        "called",
        "call",
        "meeting",
        "today",
        "discussed",
        "spoke",
        "doctor",
        "interaction"
    ]):
        return {"tool": "log"}

    # Follow-up
    elif any(word in text for word in [
        "pending follow",
        "show follow",
        "follow-ups",
        "followups",
        "upcoming follow"
    ]):
        return {"tool": "followup"}

    # Product
    elif any(word in text for word in [
        "product insight",
        "product insights",
        "top product",
        "most discussed"
    ]):
        return {"tool": "product"}

    else:
        return {"tool": "log"}

def tool_node(state: AgentState):

    tool = state["tool"]

    if tool == "edit":
        print(">>> Using Edit Tool")
        result = edit_interaction_tool(state["user_input"])

    elif tool == "summary":
        print(">>> Using Summary Tool")
        result = summary_tool(state["user_input"])

    elif tool == "search":
        print(">>> Using Search Tool")
        result = search_interaction_tool(state["user_input"])

    elif tool == "product":
        print(">>> Using Product Insight Tool")
        result = product_insight_tool(state["user_input"])

    elif tool == "followup":
        print(">>> Using Follow-up Tool")
        result = followup_tool(state["user_input"])

    else:
        print(">>> Using Log Interaction Tool")
        result = log_interaction_tool(state["user_input"])

    return {"response": result}

builder = StateGraph(AgentState)

builder.add_node("router", router)

builder.add_node("tool", tool_node)

builder.set_entry_point("router")

builder.add_edge("router", "tool")

builder.add_edge("tool", END)

graph = builder.compile()