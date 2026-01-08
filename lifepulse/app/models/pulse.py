from pydantic import BaseModel
from typing import List

class PulseResponse(BaseModel):
    summary: List[str]
    risk_score: int
    priority: str
