import * as fs from "fs";
import * as xml2js from "xml2js";

// CSV file
fs.readFile("../data/car.xml", "utf-8", (err, data) => {
  if (err) {
    throw err;
  } else {
    xml2js.parseString(data, (err, result) => {
      if (err) {
        throw err;
      } else {
        const carObject = {
          brand: result.car.brand[0],
          price: result.car.price[0],
          availableColors: result.car.availableColors[0].color,
        };

        console.log(carObject);
      }
    });
  }
});
