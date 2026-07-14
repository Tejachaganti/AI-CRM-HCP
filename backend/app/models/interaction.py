from sqlalchemy import Column, Integer, String, Text, Date
from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String(100))

    specialty = Column(String(100))

    interaction_type = Column(String(50))

    products = Column(String(200))

    notes = Column(Text)

    followup_date = Column(Date)