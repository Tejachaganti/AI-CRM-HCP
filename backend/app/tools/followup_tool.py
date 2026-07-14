from app.database.database import SessionLocal
from app.models.interaction import Interaction


def followup_tool(user_input: str):

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .order_by(Interaction.followup_date.asc())
            .all()
        )

        if not interactions:
            return "No follow-up interactions found."

        result = "📅 Pending Follow-ups\n\n"

        for interaction in interactions:
            result += (
                f"Doctor: {interaction.hcp_name}\n"
                f"Product: {interaction.products}\n"
                f"Follow-up Date: {interaction.followup_date}\n\n"
            )

        return result

    finally:
        db.close()