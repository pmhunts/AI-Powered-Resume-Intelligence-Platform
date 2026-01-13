from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

class AIContentGenerator:
    def __init__(self):
        self.model_name = "t5-small"
        self.model = None
        self.tokenizer = None
        try:
            self.tokenizer = T5Tokenizer.from_pretrained(self.model_name)
            self.model = T5ForConditionalGeneration.from_pretrained(self.model_name)
        except Exception as e:
            print(f"Warning: Could not load T5 model. AI features will be disabled. Error: {e}")

    def enhance_bullet(self, text: str, jd_context: dict, style: str = "balanced") -> list[str]:
        if not self.model or not self.tokenizer:

            # Heuristic fallback for when model is missing
            # Provides realistic-looking enhancements using rule-based logic
            words = text.split()
            first_word = words[0] if words else ""
            rest = " ".join(words[1:]) if len(words) > 1 else ""
            
            return [
                f"Spearheaded {text.lower()} to drive operational efficiency.",
                f"Orchestrated {text.lower()} resulting in measurable improvements.",
                f"Developed and deployed {text.lower()}, aligning with business goals."
            ]

        # Construct prompt
        role = jd_context.get("role", "Engineer")
        skills = ", ".join(jd_context.get("primary_skills", []))
        
        prompt = f"enhance resume bullet: {text} | role: {role} | skills: {skills} | style: {style}"
        
        input_ids = self.tokenizer.encode(prompt, return_tensors="pt", max_length=512, truncation=True)
        
        outputs = self.model.generate(
            input_ids,
            max_length=150,
            num_return_sequences=3,
            num_beams=5, # Beam search for better quality
            temperature=0.7,
            early_stopping=True
        )
        
        variants = [self.tokenizer.decode(o, skip_special_tokens=True) for o in outputs]
        return variants

content_generator = AIContentGenerator()
