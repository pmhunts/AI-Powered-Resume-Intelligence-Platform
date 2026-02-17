import json
from typing import Any, List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration settings."""
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    # API Configuration
    PROJECT_NAME: str = "Resume Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"

    # Security Configuration
    SECRET_KEY: str = "CHANGE_THIS_IN_PRODUCTION"

    # CORS Origins - accepts EITHER format from env var:
    #   JSON array:    ["https://foo.vercel.app","https://bar.vercel.app"]
    #   Comma string:  https://foo.vercel.app,https://bar.vercel.app
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Any) -> List[str]:
        if isinstance(value, list):
            return [str(origin).strip() for origin in value if str(origin).strip()]

        if isinstance(value, str):
            value = value.strip()
            if not value:
                return []

            if value.startswith("["):
                try:
                    parsed = json.loads(value)
                    if isinstance(parsed, list):
                        return [str(origin).strip() for origin in parsed if str(origin).strip()]
                except json.JSONDecodeError:
                    pass

            return [origin.strip() for origin in value.split(",") if origin.strip()]

        raise ValueError("CORS_ORIGINS must be a list or string")

    # Logging
    LOG_LEVEL: str = "INFO"


settings = Settings()
