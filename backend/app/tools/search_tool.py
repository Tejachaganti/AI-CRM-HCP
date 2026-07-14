from app.langgraph.agent import llm
from app.database.database import SessionLocal
from app.models.interaction import Interaction


def search_interaction_tool(user_input: str):

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

        result = f"🔍 Interactions for {doctor}\n\n"

        for interaction in interactions:
            result += (
                f"HCP: {interaction.hcp_name}\n"
                f"Specialty: {interaction.specialty}\n"
                f"Type: {interaction.interaction_type}\n"
                f"Products: {interaction.products}\n"
                f"Notes: {interaction.notes}\n"
                f"Follow-up: {interaction.followup_date}\n\n"
            )

        return result

    finally:
        db.close()