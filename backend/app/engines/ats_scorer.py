from typing import Dict, Any

class ATSScorer:
    def __init__(self):
        self.weights = {
            "skill_match": 0.30,
            "keyword_coverage": 0.20,
            "experience_relevance": 0.15,
            "format_compliance": 0.15,
            "content_quality": 0.10,
            "gap_penalty": 0.05,
            "completeness": 0.05
        }

    def score_resume(self, resume_data: Dict[str, Any], jd_data: Dict[str, Any], gap_analysis: Dict[str, Any]) -> Dict[str, Any]:
        # Placeholder logic for scoring components
        # In a real implementation, these would be calculated based on detailed analysis
        
        skill_match_score = self._calculate_skill_match(resume_data, jd_data)
        keyword_coverage_score = gap_analysis.get("overall_match_score", 0)
        experience_relevance_score = 80.0 # Placeholder
        format_compliance_score = 95.0 # Placeholder (assuming our builder produces clean JSON/PDF)
        content_quality_score = 75.0 # Placeholder
        
        # Calculate dynamic gap penalty
        # Mapping: High priority suggestions = Critical, Medium = Medium
        suggestions = gap_analysis.get("improvement_suggestions", [])
        critical_count = len([s for s in suggestions if s.get("priority") == "High"])
        medium_count = len([s for s in suggestions if s.get("priority") == "Medium"])
        
        # Example penalty logic: -5 for each critical, -2 for each medium, max 100
        penalty_val = (critical_count * 5.0) + (medium_count * 2.0)
        gap_penalty = max(0.0, 100.0 - penalty_val)
        completeness_score = 90.0 # Placeholder

        overall_score = (
            self.weights["skill_match"] * skill_match_score +
            self.weights["keyword_coverage"] * keyword_coverage_score +
            self.weights["experience_relevance"] * experience_relevance_score +
            self.weights["format_compliance"] * format_compliance_score +
            self.weights["content_quality"] * content_quality_score +
            self.weights["gap_penalty"] * gap_penalty +
            self.weights["completeness"] * completeness_score
        )

        return {
            "overall_score": round(overall_score, 1),
            "breakdown": {
                "skill_match": skill_match_score,
                "keyword_coverage": keyword_coverage_score,
                "experience_relevance": experience_relevance_score,
                "format_compliance": format_compliance_score,
                "content_quality": content_quality_score
            }
        }

    def _calculate_skill_match(self, resume_data: Dict[str, Any], jd_data: Dict[str, Any]) -> float:
        jd_skills = set(jd_data.get("primary_skills", []))
        if not jd_skills:
            return 100.0
        
        resume_skills = set(resume_data.get("skills", []))
        matched = jd_skills.intersection(resume_skills)
        
        return (len(matched) / len(jd_skills)) * 100

ats_scorer = ATSScorer()
