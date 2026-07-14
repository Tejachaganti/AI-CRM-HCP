from app.langgraph.agent import llm
from app.database.database import SessionLocal
from app.models.interaction import Interaction


def summary_tool(user_input: str):

    # Extract doctor's name
    prompt = f"""
Extract only the doctor's name from this request.

Request:
{user_input}

Return only the doctor's name.
"""

    doctor = llm.invoke(prompt).content.strip()

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(Interaction.hcp_name.ilike(f"%{doctor}%"))
            .all()
        )

        if not interactions:
            return f"No interactions found for {doctor}."

        interaction_text = ""

        for interaction in interactions:
            interaction_text += f"""
Specialty: {interaction.specialty}
Interaction Type: {interaction.interaction_type}
Products: {interaction.products}
Notes: {interaction.notes}
Follow-up: {interaction.followup_date}

"""

        summary_prompt = f"""
You are a pharmaceutical CRM assistant.

Summarize these interactions professionally.

Doctor:
{doctor}

Interactions:

{interaction_text}

Provide:

1. Total interactions
2. Products discussed
3. Key discussion points
4. Recommended next action

Keep the response concise and professional.
"""

        return llm.invoke(summary_prompt).content

    finally:
        db.close()