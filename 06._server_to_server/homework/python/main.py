from fastapi import FastAPI
import requests
import csv
import json
import xml.etree.ElementTree as ET
import yaml

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

# XML

@app.get("/getXmlFromPython")
def get_txt_from_python():
    with open("../data/me.xml") as file:

        data = ET.fromstring(file.read())

        meObject = {
        "name": data.find("name").text,
        "country": data.find("country").text,
        "languages": [language.text for language in data.find("languages")],
        }

        return meObject

@app.get("/getXmlFromNode")
def get_xml_from_node():
    response = requests.get("http://127.0.0.1:8080/getXmlFromNode")
    date = response.json()
    return date

# YAML

@app.get("/getYamlFromPython")
def get_yaml_from_python():
    with open("../data/me.yaml") as file:

        meObject = yaml.load(file, Loader=yaml.FullLoader)

        return meObject

@app.get("/getYamlFromNode")
def get_yaml_from_node():
    response = requests.get("http://127.0.0.1:8080/getYamlFromNode")
    date = response.json()
    return date



