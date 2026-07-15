import json
from datetime import datetime

from app.langgraph.agent import llm
from app.database.database import SessionLocal
from app.models.interaction import Interaction


def log_interaction_tool(user_input: str):

    prompt = f"""
You are an AI CRM assistant for pharmaceutical field representatives.

Extract the interaction information from the user's message.

Return ONLY valid JSON.

{{
    "hcp_name": "",
    "specialty": "",
    "interaction_type": "",
    "products": "",
    "notes": "",
    "followup_date": ""
}}

Rules:
1. interaction_type must be exactly one of:
   - Visit
   - Call
   - Video Meeting

2. followup_date must be in YYYY-MM-DD format.
   If no date is mentioned, return an empty string.

3. If any field is missing, use "Not specified".

4. Keep notes short and professional.

5. Return JSON only. Do NOT use markdown.

User Interaction:
{user_input}
"""

    try:
        # Call LLM
        response = llm.invoke(prompt).content.strip()

        # Remove markdown if present
        response = (
            response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        print("\n========== LLM RESPONSE ==========")
        print(response)
        print("==================================\n")

        # Parse JSON
        data = json.loads(response)

    except Exception as e:
        print("JSON PARSE ERROR:", e)
        return "❌ Unable to extract interaction details."

    # Convert follow-up date
    followup = None

    if data.get("followup_date"):
        try:
            followup = datetime.strptime(
                data["followup_date"],
                "%Y-%m-%d"
            ).date()
        except Exception:
            print("Invalid follow-up date format.")
            followup = None

    db = SessionLocal()

    try:

        interaction = Interaction(
            hcp_name=data.get("hcp_name", "Not specified"),
            specialty=data.get("specialty", "Not specified"),
            interaction_type=data.get(
                "interaction_type",
                "Visit",
            ),
            products=data.get("products", "Not specified"),
            notes=data.get("notes", "Not specified"),
            followup_date=followup,
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return f"""
✅ Interaction Logged Successfully

👨‍⚕️ Doctor
{interaction.hcp_name}

🩺 Specialty
{interaction.specialty}

📞 Interaction Type
{interaction.interaction_type}

💊 Product
{interaction.products}

📅 Follow-up
{interaction.followup_date if interaction.followup_date else "Not specified"}

📝 Notes
{interaction.notes}
"""

    except Exception as e:

        db.rollback()

        print("\n========== DATABASE ERROR ==========")
        print(e)
        print("====================================\n")

        return f"❌ Database Error\n\n{str(e)}"

    finally:
        db.close()