from fastapi import APIRouter, Depends
from app.services.weather_service import get_current_temperature
from app.core.dependencies import get_current_user

router = APIRouter(tags=["Weather"])


@router.get("/weather/current")
async def current_weather(
    current_user: dict = Depends(get_current_user)
):
    city = current_user["city"]
    return await get_current_temperature(city)
