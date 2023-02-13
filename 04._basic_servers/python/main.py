from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "First FastAPI router"}

@app.get("/newroute")
def _():
    print(type({"message": "This is my second route"}))
    return {"message": "This is my second route"}
    