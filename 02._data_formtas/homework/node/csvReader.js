import * as fs from "fs";
import Papa from "papaparse";

fs.readFile("../data/car.csv", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    const parsedCsv = Papa.parse(data, { headers: false });

    const carObject = {};

    parsedCsv.data[0].map((key, index) => {
      carObject[key] = parsedCsv.data[1][index];
    });

    console.log("CSV FILE");
    console.log(carObject);
  }
});
