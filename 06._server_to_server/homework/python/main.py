from fastapi import FastAPI
from datetime import datetime
import requests
import csv

app = FastAPI()

@app.get("/getCsvFromPython")
def get_date():
    with open("../data/me.csv") as file:

        data = csv.DictReader(file)

        meObject = [
        {
            "name": row["name"],
            "country": row["country"],
            "languages": row["languages"].split(", "),
        }
        for row in data
        ]
      
    return meObject

@app.get("/getCsvFromNode")
def get_date_from_express():
    response = requests.get("http://127.0.0.1:8080/getCsvFromNode")
    date = response.json()
    return date

