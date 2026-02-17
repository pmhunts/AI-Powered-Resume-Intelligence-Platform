from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    """Application configuration settings."""

    # API Configuration
    PROJECT_NAME: str = "Resume Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"

    # Security Configuration
    SECRET_KEY: str = "CHANGE_THIS_IN_PRODUCTION"

    # Logging
    LOG_LEVEL: str = "INFO"

    # NOTE: CORS_ORIGINS is intentionally NOT a pydantic field.
    # pydantic-settings tries to JSON-parse List fields from env vars,
    # which causes crashes when the value isn't valid JSON.
    # Instead we read it manually via get_cors_origins() below.

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

def get_cors_origins() -> List[str]:
    """
    Read CORS_ORIGINS from environment variable safely.
    Accepts multiple formats:
      - Not set at all → returns default localhost list
      - JSON array:   ["https://a.com","https://b.com"]
      - Comma string: https://a.com,https://b.com
      - Single URL:   https://a.com
    """
    raw = os.environ.get("CORS_ORIGINS", "")

    if not raw or not raw.strip():
        return [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
        ]

    raw = raw.strip()

    # Try JSON parse first: ["https://a.com","https://b.com"]
    if raw.startswith("["):
        import json
        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                return [str(u).strip() for u in parsed if str(u).strip()]
        except Exception:
            pass  # Fall through to comma split

    # Comma-separated: https://a.com,https://b.com
    return [u.strip() for u in raw.split(",") if u.strip()]