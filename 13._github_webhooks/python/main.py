from fastapi import FastAPI, Request, Response

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/githubwebhook")
async def github_webhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        payload = await request.form()
        print (payload)
        response.status_code = 200
    else: 
        response.status_code = 400

        