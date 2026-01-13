from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class GapAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def analyze_gaps(self, jd_text: str, resume_text: str) -> dict:
        # Simple TF-IDF comparison
        corpus = [jd_text, resume_text]
        tfidf_matrix = self.vectorizer.fit_transform(corpus)
        
        # Cosine similarity
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
        
        gaps = {
            "overall_match_score": float(similarity * 100),
            "critical": [],
            "medium": [],
            "strong_matches": []
        }
        
        feature_names = self.vectorizer.get_feature_names_out()
        dense = tfidf_matrix.todense()
        jd_scores = dense[0].tolist()[0]
        resume_scores = dense[1].tolist()[0]
        
        for idx, jd_req in enumerate(feature_names):
            # We focus on keywords present in JD (score > 0.05)
            # lowered threshold to ensure we catch important terms even in short text
            jd_score = jd_scores[idx]
            if jd_score < 0.05:
                continue

            # Check resume score
            resume_score = resume_scores[idx]
            
            # Simple similarity proxy: ratio
            # If resume has it (score > 0), similarity is high vs 0
            if resume_score > 0:
                 gaps["strong_matches"].append({
                    "requirement": jd_req,
                    "similarity": 1.0 # Simplified
                })
            else:
                # Missing
                impact_data = self.calculate_impact(jd_req, jd_score)
                gap_item = {
                    "requirement": jd_req,
                    "similarity": 0.0,
                    "impact": impact_data["score_delta"],
                    "severity": impact_data["severity"],
                    "action": f"Add experience with {jd_req}"
                }
                
                if impact_data["severity"] == "high":
                    gaps["critical"].append(gap_item)
                else:
                    gaps["medium"].append(gap_item)
        
        # Transform to Frontend-expected structure
        improvement_suggestions = []
        strengths = []
        keyword_gaps = []
        missing_skills = []
        
        # Process Critical/Medium for Suggestions & Gaps
        all_gaps = gaps["critical"] + gaps["medium"]
        for i, gap in enumerate(all_gaps):
            priority = "High" if gap["severity"] == "high" else "Medium"
            
            # Add to Suggestions
            improvement_suggestions.append({
                "id": i,
                "title": f"Missing Keyword: {gap['requirement']}",
                "category": "Keywords",
                "priority": priority,
                "current": "Not found in resume",
                "suggested": f"Include '{gap['requirement']}' in your experience or skills section.",
                "impact": "High penalty on ATS score",
                "aiGenerated": False
            })
            
            # Add to Keyword Gaps
            keyword_gaps.append({
                "keyword": gap["requirement"],
                "found": False,
                "occurrences": 0,
                "recommended": "1+"
            })
            
            # Heuristic: If it looks like a skill (simple check), add to missing skills
            # In a real app, we'd check against a skill DB
            missing_skills.append({
                "skill": gap["requirement"],
                "importance": priority,
                "suggestions": f"Add {gap['requirement']} to your Skills section."
            })

        # Process Strong Matches for Strengths
        for i, match in enumerate(gaps["strong_matches"]):
            strengths.append({
                "area": f"Proficiency in {match['requirement']}",
                "score": 100,
                "description": f"You have successfully highlighted {match['requirement']}."
            })
            
        # Add generic AI suggestion if list is short
        if len(improvement_suggestions) < 3:
            improvement_suggestions.append({
                "id": 999,
                "title": "Quantify Achievements",
                "category": "Content",
                "priority": "Medium",
                "current": "Generic descriptions",
                "suggested": "Add metrics (e.g., 'Improved performance by 20%')",
                "impact": "Increases impact score",
                "aiGenerated": True
            })

        return {
            "overall_match_score": gaps["overall_match_score"],
            "improvement_suggestions": improvement_suggestions,
            "strengths": strengths,
            "keyword_gaps": keyword_gaps,
            "missing_skills": missing_skills
        }

    def calculate_impact(self, requirement: str, importance: float) -> dict:
        # Heuristic: if importance is high in JD, impact is high
        if importance > 0.3:
            return {"score_delta": -25, "severity": "high"}
        elif importance > 0.15:
            return {"score_delta": -10, "severity": "medium"}
        else:
            return {"score_delta": -5, "severity": "low"}

gap_analyzer = GapAnalyzer()
