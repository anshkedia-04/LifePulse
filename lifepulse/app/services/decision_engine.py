def generate_decisions(signals: list):
    return {
        "summary": ["Decision engine placeholder"],
        "risk_score": 0,
        "priority": "LOW"
    }

from typing import List
from app.models.signal import Signal

def evaluate_signals(signals: List[Signal]) -> dict:
    risk_score = 0
    reasons = []
    summary = []

    for signal in signals:
        if signal.signal_type == "AQI":
            if signal.severity == "HIGH":
                risk_score += 40
                reasons.append("Poor air quality detected")
                summary.append("Avoid outdoor activities due to high pollution")
            elif signal.severity == "MEDIUM":
                risk_score += 25
                reasons.append("Moderate air pollution")

        elif signal.signal_type == "WEATHER":
            if signal.severity == "HIGH":
                risk_score += 20
                reasons.append("Severe weather conditions")
                summary.append("Plan travel carefully due to weather")

        elif signal.signal_type == "NEWS":
            if signal.severity == "HIGH":
                risk_score += 15
                reasons.append("Local disruptive events reported")
                summary.append("Possible disruptions due to local events")

    # Cap score
    risk_score = min(risk_score, 100)

    # Priority classification
    if risk_score >= 70:
        priority = "HIGH"
    elif risk_score >= 40:
        priority = "MEDIUM"
    else:
        priority = "LOW"

    if not summary:
        summary.append("No significant risks detected today")

    return {
        "summary": summary,
        "risk_score": risk_score,
        "priority": priority,
        "reasons": reasons
    }
