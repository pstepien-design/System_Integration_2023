import express from "express";
import * as fs from "fs";
import Papa from "papaparse";

const app = express();

// CSV
app.get("/getCsvFromNode", (req, res) => {
  fs.readFile("../data/me.csv", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedCsv = Papa.parse(data, { headers: true });

      const myObject = {};

      parsedCsv.data[0].map((key, index) => {
        myObject[key] = parsedCsv.data[1][index];
      });

      console.log(parsedCsv.data[1]);
      res.send(myObject);
    }
  });
});

app.get("/getCsvFromPython", (req, res) => {
  fetch("http://127.0.0.1:8000/getCsvFromPython")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

// JSON
app.get("/getJsonFromNode", (req, res) => {
  fs.readFile("../data/me.json", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const jsonData = JSON.parse(data);
      const meObject = {
        ...jsonData,
      };

      res.send(meObject);
    }
  });
});

app.get("/getJsonFromPython", (req, res) => {
  fetch("http://127.0.0.1:8000/getJsonFromPython")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

// TXT
app.get("/getTxtFromNode", (req, res) => {
  fs.readFile("../data/me.txt", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const [name, country, languages] = data
        .split("\n")
        .map((line) => line.trim());

      const meObject = {
        name,
        country,
        languages: languages.split(", "),
      };

      res.send(meObject);
    }
  });
});

app.get("/getTxtFromPython", (req, res) => {
  fetch("http://127.0.0.1:8000/getTxtFromPython")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
