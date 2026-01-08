import httpx
from datetime import datetime
from app.models.signal import Signal

# ---------------- WEATHER (OpenWeather) ---------------- #

OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

async def fetch_weather(city: str, api_key: str) -> Signal:
    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(OPENWEATHER_URL, params=params)
        data = response.json()

    weather = data["weather"][0]["main"]
    temp = data["main"]["temp"]

    severity = "HIGH" if weather in ["Thunderstorm", "Extreme"] else "LOW"

    return Signal(
        signal_type="WEATHER",
        value=f"{weather}, {temp}°C",
        severity=severity,
        confidence=0.9,
        source="OpenWeather",
        timestamp=datetime.utcnow()
    )

# ---------------- AQI (WAQI) ---------------- #

WAQI_URL = "https://api.waqi.info/feed/{city}/"

async def fetch_aqi(city: str, token: str) -> Signal:
    url = WAQI_URL.format(city=city)

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={"token": token})
        data = response.json()

    aqi = data["data"]["aqi"]

    if aqi <= 50:
        severity = "LOW"
    elif aqi <= 100:
        severity = "MEDIUM"
    else:
        severity = "HIGH"

    return Signal(
        signal_type="AQI",
        value=aqi,
        severity=severity,
        confidence=0.95,
        source="WAQI",
        timestamp=datetime.utcnow()
    )

# ---------------- NEWS (Risk Sentiment) ---------------- #

NEWS_URL = "https://newsapi.org/v2/top-headlines"

async def fetch_news(city: str, api_key: str) -> Signal:
    params = {
        "q": city,
        "apiKey": api_key,
        "pageSize": 5
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(NEWS_URL, params=params)
        data = response.json()

    articles = data.get("articles", [])
    titles = [a["title"] for a in articles]

    risk_keywords = ["protest", "strike", "flood", "riot"]
    severity = "HIGH" if any(
        any(word in title.lower() for word in risk_keywords)
        for title in titles
    ) else "LOW"

    return Signal(
        signal_type="NEWS",
        value="; ".join(titles[:3]),
        severity=severity,
        confidence=0.7,
        source="NewsAPI",
        timestamp=datetime.utcnow()
    )
