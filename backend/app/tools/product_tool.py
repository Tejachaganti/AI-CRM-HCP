from sqlalchemy import func

from app.database.database import SessionLocal
from app.models.interaction import Interaction


def product_insight_tool(user_input: str):

    db = SessionLocal()

    try:
        products = (
            db.query(
                Interaction.products,
                func.count(Interaction.id)
            )
            .group_by(Interaction.products)
            .all()
        )

        if not products:
            return "No product discussions found."

        result = "📊 Product Insights\n\n"

        for product, count in products:
            result += f"• {product}: {count} discussion(s)\n"

        return result

    finally:
        db.close()