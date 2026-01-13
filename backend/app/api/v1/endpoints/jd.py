from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.engines.jd_intelligence import jd_engine

router = APIRouter()

class JDAnalyzeRequest(BaseModel):
    """Request model for job description analysis."""
    text: str = Field(..., min_length=50, description="Job description text")

@router.post("/analyze")
def analyze_jd(request: JDAnalyzeRequest):
    """
    Analyze job description to extract key information.
    
    Extracts:
        - Role/title
        - Primary skills required
        - Keywords for ATS optimization
    """
    try:
        if not request.text or len(request.text.strip()) < 50:
            raise HTTPException(
                status_code=400, 
                detail="Job description must be at least 50 characters"
            )
        
        analysis = jd_engine.analyze(request.text)
        return {"success": True, "data": analysis}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"JD analysis failed: {str(e)}")
