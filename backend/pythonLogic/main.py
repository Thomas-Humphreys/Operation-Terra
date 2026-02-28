import os
import httpx
import uvicorn  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://operation-terra-5zum.vercel.app"],
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
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)