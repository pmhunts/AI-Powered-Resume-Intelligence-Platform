from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application configuration settings."""
    
    # API Configuration
    PROJECT_NAME: str = "Resume Intelligence Platform"
    API_V1_STR: str = "/api/v1"
    VERSION: str = "1.0.0"
    
    # Security Configuration  
    SECRET_KEY: str = "CHANGE_THIS_IN_PRODUCTION"
    
    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://localhost:3000",
        "*"  # Temporarily allow all for debugging
    ]
    
    # Logging
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
