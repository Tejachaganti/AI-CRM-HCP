from app.langgraph.agent import llm


def log_interaction_tool(user_input: str):
    prompt = f"""
You are an AI CRM assistant for pharmaceutical field representatives.

Extract the following fields from the interaction.

Return ONLY JSON.

Fields:
- hcp_name
- specialty
- interaction_type
- products
- summary
- followup

Interaction:
{user_input}
"""

    response = llm.invoke(prompt)

    return response.content
