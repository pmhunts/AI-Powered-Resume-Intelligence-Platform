import uvicorn
import os

if __name__ == "__main__":
    # Production start script for Render
    # Uses uvicorn directly without Windows-specific port management
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
        workers=1,
        reload=False  # Disable reload in production
    )
