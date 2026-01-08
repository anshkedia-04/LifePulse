from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    APP_NAME = "LifePulse"
    DEBUG = True
    WEATHER_API_KEY: str = os.getenv("WEATHER_API_KEY")
    AQI_API_KEY: str = os.getenv("AQI_API_KEY")
    NEWS_API_KEY: str = os.getenv("NEWS_API_KEY")

settings = Settings()
