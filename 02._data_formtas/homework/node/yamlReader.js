import * as fs from "fs";
import * as jsYaml from "js-yaml";

fs.readFile("../data/car.yaml", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    const carObject = jsYaml.load(data);

    console.log(carObject);
  }
});
