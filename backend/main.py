from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home API
@app.get("/")
def home():
    return {"message": "Backend is working"}

# Summary API
@app.get("/summary")
def get_summary(topic: str):
    return {
        "summary": f"""
{topic} is a very important topic in computer science.

It is widely used in:
- Artificial Intelligence
- Web Development
- Data Science
- Automation

Learning {topic} helps students build strong programming skills.
"""
    }

# Quiz API
@app.get("/quiz")
def get_quiz(topic: str):
    return {
        "questions": [
            f"What is {topic} mainly used for?",
            f"Which field uses {topic} widely?",
            f"Is {topic} important for students?"
        ]
    }