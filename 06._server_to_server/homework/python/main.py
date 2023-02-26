from fastapi import FastAPI
from datetime import datetime
import requests
import csv
import json

app = FastAPI()


# CSB
@app.get("/getCsvFromPython")
def get_csv_from_python():
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
def get_csv_from_node():
    response = requests.get("http://127.0.0.1:8080/getCsvFromNode")
    date = response.json()
    return date

# JSON

@app.get("/getJsonFromPython")
def get_json_from_python():
    with open("../data/me.json") as file:

        data = json.load(file)

        meObject = data

        return meObject

@app.get("/getJsonFromNode")
def get_json_from_node():
    response = requests.get("http://127.0.0.1:8080/getJsonFromNode")
    date = response.json()
    return date

# TXT

@app.get("/getTxtFromPython")
def get_txt_from_python():
    with open("../data/me.txt") as file:

        data = file.read()

        name, country, languages = data.strip().split("\n")

        meObject = {
            "name": name,
            "country": country,
            "languages": languages.split(", ")
        }

        return meObject

@app.get("/getTxtFromNode")
def get_txt_from_node():
    response = requests.get("http://127.0.0.1:8080/getTxtFromNode")
    date = response.json()
    return date



