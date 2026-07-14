from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate


def create_interaction(db: Session, interaction: InteractionCreate):

    

    new_interaction = Interaction(
        hcp_name=interaction.hcp_name,
        specialty=interaction.specialty,
        interaction_type=interaction.interaction_type,
        products=interaction.products,
        notes=interaction.notes,
        followup_date=interaction.followup_date,
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction

def get_all_interactions(db: Session):
    return db.query(Interaction).all()

def update_interaction(db: Session, interaction_id: int, data):
    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )

    if not interaction:
        return None

    interaction.hcp_name = data.hcp_name
    interaction.specialty = data.specialty
    interaction.interaction_type = data.interaction_type
    interaction.products = data.products
    interaction.notes = data.notes
    interaction.followup_date = data.followup_date

    db.commit()
    db.refresh(interaction)

    return interaction