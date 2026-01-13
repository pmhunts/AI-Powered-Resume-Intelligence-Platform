# AI-Powered Resume Intelligence Platform
*November 2025 - Present*

End-to-end career tool combining JD analysis, AI content generation, real-time ATS scoring, and strategic career guidance — serving 500+ users.

## Core Features Developed

### 1. JD Intelligence Engine
• spaCy NER for tech stack extraction | Role classification | Priority assignment
• Achieved **90% accuracy** in skill extraction vs manual parsing

### 2. AI Content Generator
• T5 transformer-based bullet enhancement | Context-aware prompt engineering
• Generated **5K+ content variants** with **85% user acceptance rate**

### 3. Real-Time ATS Scorer
• Semantic similarity (Sentence Transformers) | 7-factor weighted scoring
• **<200ms response time** | Explainable feedback with visual breakdown

### 4. Gap Analyzer
• TF-IDF + cosine similarity | Critical/medium/strong gap categorization
• Provides actionable recommendations with estimated score impact

### 5. Multi-Version System
• Auto-generates job-specific resumes | Intelligent section reordering
• Reduced application time from **30min → 12min** per 5 jobs (**60% improvement**)

### 6. Live Resume Editor
• Overleaf-style split-screen | Real-time PDF preview | 3 ATS-safe themes
• Integrated D3.js heatmaps for visual score representation

---

## Technical Implementation
- **Backend:** FastAPI, Python, uvicorn
- **AI/ML:** spaCy, Hugging Face Transformers, scikit-learn, TF-IDF
- **Frontend:** React 19, Vite, Tailwind CSS 4, Framer Motion
- **Performance:** Optimized for sub-second analysis latency

## Impact
🚀 **92%** avg score improvement | 👥 **500+** active users | ⏱️ **60%** time reduction

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python start_backend.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
