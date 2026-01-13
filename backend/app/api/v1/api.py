from fastapi import APIRouter
from app.api.v1.endpoints import resume, jd

api_router = APIRouter()
api_router.include_router(resume.router, prefix="/resumes", tags=["resumes"])
api_router.include_router(jd.router, prefix="/jds", tags=["job-descriptions"])
