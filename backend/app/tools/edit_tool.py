import json
from datetime import datetime

from app.langgraph.agent import llm
from app.database.database import SessionLocal
from app.models.interaction import Interaction


def edit_interaction_tool(user_input: str):

    prompt = f"""
Extract the following information.

Instruction:
{user_input}

Return ONLY valid JSON.

{{
    "doctor":"",
    "followup_date":"YYYY-MM-DD"
}}

Rules:
- followup_date must always be YYYY-MM-DD.
- Return JSON only.
"""

    response = llm.invoke(prompt).content

    response = (
        response.replace("```json", "")
        .replace("```", "")
        .strip()
    )

    try:
        data = json.loads(response)

    except Exception:
        return "❌ Unable to understand the update request."

    doctor = data.get("doctor")
    followup = data.get("followup_date")

    if not doctor:
        return "❌ Doctor name not found."

    if not followup:
        return "❌ Follow-up date not found."

    try:
        followup = datetime.strptime(
            followup,
            "%Y-%m-%d"
        ).date()

    except Exception:
        return "❌ Invalid date format. Please use YYYY-MM-DD."

    db = SessionLocal()

    try:

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.hcp_name.ilike(f"%{doctor}%")
            )
            .all()
        )

        if not interactions:
            return f"❌ No interaction found for {doctor}."

        for interaction in interactions:
            interaction.followup_date = followup

        db.commit()

        return f"""
✅ Interaction Updated Successfully

👨‍⚕️ Doctor
{doctor}

📅 New Follow-up
{followup}

📄 Updated Records
{len(interactions)}
"""

    except Exception as e:

        db.rollback()

        return f"❌ Database Error\n\n{e}"

    finally:
        db.close()