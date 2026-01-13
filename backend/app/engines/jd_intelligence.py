import spacy
from typing import Dict, List, Any
import re

class JDIntelligenceEngine:
    def __init__(self):
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("Warning: en_core_web_sm not found. Using blank 'en' model.")
            self.nlp = spacy.blank("en")

        # Basic taxonomy (in production this would be larger/external)
        self.skill_taxonomy = {
            "languages": {"python", "java", "javascript", "typescript", "c++", "go", "rust", "sql"},
            "frameworks": {"react", "fastapi", "django", "flask", "spring boot", "next.js", "express"},
            "tools": {"docker", "kubernetes", "aws", "gcp", "azure", "git", "jenkins", "redis", "kafka"},
            "concepts": {"microservices", "rest api", "distributed systems", "ci/cd", "agile", "scrum"}
        }

    def analyze(self, text: str) -> Dict[str, Any]:
        doc = self.nlp(text)
        return {
            "role": self._extract_role(text),
            "experience_level": self._extract_experience(text),
            "primary_skills": self._extract_skills(text),
            "must_have": [], # To be implemented with more complex logic
            "nice_to_have": []
        }

    def _extract_role(self, text: str) -> str:
        # Simple regex based role extraction
        roles = ["Backend Engineer", "Frontend Developer", "Full Stack Developer", "DevOps Engineer", "Data Scientist"]
        for role in roles:
            if re.search(role, text, re.IGNORECASE):
                return role
        return "Unknown Role"

    def _extract_experience(self, text: str) -> str:
        # Extract "X+ years"
        match = re.search(r"(\d+\+?)\s*years?", text, re.IGNORECASE)
        if match:
            return match.group(0)
        return "Not specified"

    def _extract_skills(self, text: str) -> List[str]:
        found_skills = set()
        text_lower = text.lower()
        
        # Check against taxonomy
        for category, skills in self.skill_taxonomy.items():
            for skill in skills:
                if skill in text_lower: # Simple substring match, better to use token matching
                    found_skills.add(skill) # Normalize?
        
        # Also use NER for ORG/PRODUCT entities as potential skills
        for ent in self.nlp(text).ents:
            if ent.label_ in ["ORG", "PRODUCT", "LANGUAGE"]:
                found_skills.add(ent.text.lower())
                
        return list(found_skills)

jd_engine = JDIntelligenceEngine()
