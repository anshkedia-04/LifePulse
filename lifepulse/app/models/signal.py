from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Signal(BaseModel):
    signal_type: str          # WEATHER, AQI, NEWS, TRAFFIC
    value: str | int | float
    severity: str             # LOW / MEDIUM / HIGH
    confidence: float
    source: str
    timestamp: datetime
