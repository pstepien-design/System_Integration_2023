import express from "express";
import * as fs from "fs";
import Papa from "papaparse";

const app = express();

app.get("/getCsvFromNode", (req, res) => {
  fs.readFile("../data/car.csv", "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const parsedCsv = Papa.parse(data, { headers: true });

      const myObject = {};

      parsedCsv.data[0].map((key, index) => {
        myObject[key] = parsedCsv.data[1][index];
      });

      res.send(myObject);
    }
  });
});

app.get("/getCsvFromPython", (req, res) => {
  fetch("http://127.0.0.1:8000/date")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
