from fastapi import FastAPI

app = FastAPI(port=5050)

@app.get("/")
def root():
    return {"message": "First FastAPI router"}

@app.get("/newroute")
def _():
    print(type({"message": "This is my second route"}))
    return {"message": "This is my second route"}
    