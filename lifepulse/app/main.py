from fastapi import FastAPI
from app.routers import health, pulse
from app.routers import auth
from app.core.database import engine
from app.models import user_db, pulse_db
from fastapi.middleware.cors import CORSMiddleware

user_db.Base.metadata.create_all(bind=engine)
pulse_db.Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="LifePulse API",
    description="Decision Intelligence Platform",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message": "LifePulse API is running"}

app.include_router(health.router, prefix="/api/v1")
app.include_router(pulse.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")

