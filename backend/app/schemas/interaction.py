from pydantic import BaseModel
from datetime import date


class InteractionCreate(BaseModel):
    hcp_name: str
    specialty: str
    interaction_type: str
    products: str
    notes: str
    followup_date: date


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True