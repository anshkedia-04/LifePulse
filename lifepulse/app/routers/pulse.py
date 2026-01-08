from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db_dependency import get_db
from app.core.dependencies import get_current_user
from app.models.pulse_db import PulseDB
from app.services.signal_collector import collect_signals
from app.services.decision_engine import evaluate_signals

router = APIRouter(tags=["Pulse"])


@router.get("/pulse/today")
async def get_daily_pulse(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    city = current_user["city"]

    signals = await collect_signals(city)
    decisions = evaluate_signals(signals)

    pulse = PulseDB(
        username=current_user["username"],
        risk_score=decisions["risk_score"],
        priority=decisions["priority"]
    )

    db.add(pulse)
    db.commit()

    return decisions
