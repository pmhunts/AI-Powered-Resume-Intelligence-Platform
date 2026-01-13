from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel, Field
from app.engines.content_generator import content_generator
from app.engines.ats_scorer import ats_scorer
from app.engines.gap_analyzer import gap_analyzer
from app.engines.interviewer_simulator import interviewer_simulator
from app.engines.pdf_generator import pdf_generator
from fastapi.responses import StreamingResponse
import io

router = APIRouter()

class ResumeContent(BaseModel):
    """Resume content for PDF generation."""
    content: dict = Field(..., description="Resume data structure")
    title: str = Field(default="Resume", description="Resume title for filename")

class ResumeAnalysisRequest(BaseModel):
    """Request model for resume analysis."""
    resume_content: dict = Field(..., description="Complete resume data")
    jd_content: dict = Field(..., description="Job description data")

class ContentEnhanceRequest(BaseModel):
    """Request model for AI content enhancement."""
    text: str = Field(..., min_length=10, max_length=500, description="Text to enhance")
    jd_context: dict = Field(default={}, description="Job description context")

@router.post("/enhance-content")
def enhance_content(request: ContentEnhanceRequest):
    """
    Enhance resume bullet points using AI.
    
    Returns 3 AI-generated variants of the input text optimized for ATS.
    """
    try:
        variants = content_generator.enhance_bullet(request.text, request.jd_context)
        return {"success": True, "variants": variants}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content enhancement failed: {str(e)}")


@router.post("/score")
def score_resume(request: ResumeAnalysisRequest):
    """
    Analyze and score resume against job description.
    
    Returns:
        - ATS score with detailed breakdown
        - Gap analysis (missing skills, keywords)
        - Interviewer simulation (6-second scan perspective)
    """
    try:
        # Validate inputs
        if not request.resume_content:
            raise HTTPException(status_code=400, detail="Resume content cannot be empty")
        if not request.jd_content:
            raise HTTPException(status_code=400, detail="Job description cannot be empty")
        
        # Convert to text format for analysis
        resume_text = str(request.resume_content)
        jd_text = str(request.jd_content)
        
        # Run analysis pipeline
        gaps = gap_analyzer.analyze_gaps(jd_text, resume_text)
        score_data = ats_scorer.score_resume(request.resume_content, request.jd_content, gaps)
        scan_simulation = interviewer_simulator.simulate_scan(request.resume_content)
        
        return {
            "success": True,
            "data": {
                "ats_score": score_data,
                "gap_analysis": gaps,
                "interviewer_simulation": scan_simulation
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.post("/download-pdf")
def download_pdf(resume: ResumeContent):
    """
    Generate and download resume as PDF.
    
    Returns PDF file as streaming response.
    """
    try:
        if not resume.content:
            raise HTTPException(status_code=400, detail="Resume content cannot be empty")
        
        pdf_bytes = pdf_generator.generate(resume.content)
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={resume.title}.pdf"}
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")
