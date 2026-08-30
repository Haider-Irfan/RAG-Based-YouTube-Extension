from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.youtube_rag import generate_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    video_url: str
    question: str

@app.post("/ask")
async def ask_question(request: QueryRequest):
    answer = generate_answer(request.video_url, request.question)
    return {"answer": answer}
