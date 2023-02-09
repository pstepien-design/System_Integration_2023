import * as fs from "fs";

fs.readFile("../data/car.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    const jsonData = JSON.parse(data);
    const carDetails = {
      ...jsonData,
    };

    console.log("JSON FILE");
    console.log(carDetails);
  }
});
