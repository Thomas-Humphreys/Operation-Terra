import os
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: list

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.greenpt.ai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {os.getenv('GREENPT_API_KEY')}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "green-r",
                    "messages": req.messages
                }
            )
        print("STATUS:", response.status_code)
        print("BODY:", response.text)
        return response.json()
    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}