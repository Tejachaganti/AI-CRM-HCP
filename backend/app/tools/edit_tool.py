import json

from app.langgraph.agent import llm
from app.database.database import SessionLocal
from app.models.interaction import Interaction


def edit_interaction_tool(user_input: str):

    prompt = f"""
Extract the following information from the instruction.

Instruction:
{user_input}

Return JSON only.

Example:

{{
    "doctor":"Dr Ravi",
    "followup_date":"Friday"
}}
"""

    response = llm.invoke(prompt).content

    response = response.replace("```json", "").replace("```", "").strip()

    try:
        data = json.loads(response)
    except Exception:
        return "Unable to understand the update request."

    doctor = data.get("doctor")
    followup = data.get("followup_date")

    if not doctor or not followup:
        return "Doctor name or follow-up date missing."

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(Interaction.hcp_name.ilike(f"%{doctor}%"))
            .all()
        )

        if not interactions:
            return f"No interaction found for {doctor}."

        for interaction in interactions:
            interaction.followup_date = followup

        db.commit()

        return (
            f"✅ Interaction Updated Successfully\n\n"
            f"Doctor: {doctor}\n"
            f"New Follow-up: {followup}\n"
            f"Updated Records: {len(interactions)}"
        )

    finally:
        db.close()