from typing import Dict, Any, List

class InterviewerSimulator:
    def __init__(self):
        self.attention_weights = {
            "header": 0.20,
            "skills": 0.25,
            "experience": 0.30,
            "projects": 0.15,
            "education": 0.10
        }
        self.scan_time = 6.0 # seconds

    def simulate_scan(self, resume_structure: Dict[str, Any]) -> Dict[str, Any]:
        # Generate dynamic insights based on resume content length and structure
        # This is a heuristic simulation
        
        # Calculate a mock rating based on completeness
        score = 3.0
        concerns = []
        impression = "The resume looks structured."
        
        # Check for basics
        if not resume_structure.get('experience', []):
            concerns.append("Lack of experience details")
            score -= 0.5
        else:
            score += 1.0
            impression = "Solid experience section stands out."
            
        if not resume_structure.get('education', []):
            concerns.append("Education section missing")
        else:
            score += 0.5
            
        if not resume_structure.get('skills', []):
            concerns.append("Skills section underpopulated")
        else:
            score += 0.5
            
        recruiter_perspective = {
            "first_impression": impression + " A recruiter would likely spend about 15 seconds scanning this.",
            "concerns": concerns,
            "recommendation": "Move Forward" if score > 3.5 else "Needs Improvement",
            "rating": min(5.0, score)
        }
        
        likely_questions = [
            {"question": "Can you walk me through your most recent project?"},
            {"question": "How did you handle a difficult technical challenge?"},
            {"question": "Why did you choose this tech stack?"}
        ]

        return {
            "recruiter_perspective": recruiter_perspective,
            "likely_questions": likely_questions
        }

interviewer_simulator = InterviewerSimulator()
