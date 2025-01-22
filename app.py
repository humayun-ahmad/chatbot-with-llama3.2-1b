from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import subprocess

app = FastAPI()

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/api/ask")
async def ask_model(request: PromptRequest):
    try:
        # Replace this with the command to interact with your Llama model
        result = subprocess.run(
            ["ollama", "run", "llama3.2:1b", request.prompt],
            capture_output=True, text=True
        )
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail="Model execution failed")
        return {"response": result.stdout.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("index.html", "r", encoding="utf-8") as f:  # Specify UTF-8 encoding
        return HTMLResponse(content=f.read())

