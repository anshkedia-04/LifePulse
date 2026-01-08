from pydantic import BaseModel
from typing import List

class User(BaseModel):
    username: str
    city: str
    health_flags: List[str] = []
    work_start_time: str
