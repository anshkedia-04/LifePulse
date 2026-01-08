from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.services.user_service import get_user
from app.core.security import create_access_token, verify_password

router = APIRouter(tags=["Auth"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)

    if not user or not verify_password(
        form_data.password,
        user["hashed_password"]
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": form_data.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
