from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.core.database import Base

class PulseDB(Base):
    __tablename__ = "pulse_history"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    risk_score = Column(Integer)
    priority = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
