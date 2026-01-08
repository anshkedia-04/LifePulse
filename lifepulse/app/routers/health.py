from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "LifePulse",
        "version": "1.0.0"
    }
