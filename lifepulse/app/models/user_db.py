from sqlalchemy import Column, Integer, String, ARRAY
from app.core.database import Base

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    city = Column(String)
    health_flags = Column(ARRAY(String))
    work_start_time = Column(String)
