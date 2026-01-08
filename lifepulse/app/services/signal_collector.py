from typing import List
from app.models.signal import Signal
from app.services.external_apis import fetch_weather, fetch_aqi, fetch_news
from app.core.config import settings

async def collect_signals(city: str) -> List[Signal]:
    signals = []

    try:
        signals.append(await fetch_weather(city, settings.WEATHER_API_KEY))
    except:
        pass

    try:
        signals.append(await fetch_aqi(city, settings.AQI_API_KEY))
    except:
        pass

    try:
        signals.append(await fetch_news(city, settings.NEWS_API_KEY))
    except:
        pass

    return signals
