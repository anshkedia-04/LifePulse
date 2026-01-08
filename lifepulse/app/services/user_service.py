from app.core.security import hash_password

users_db = {
    "ansh": {
        "username": "ansh",
        "hashed_password": hash_password("secret123"),
        "city": "Delhi",
        "health_flags": ["asthma"],
        "work_start_time": "09:30"
    }
}

def get_user(username: str):
    return users_db.get(username)
